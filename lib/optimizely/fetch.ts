import { DocumentNode } from 'graphql'
import { print } from 'graphql/language/printer'
import { getSdk } from './sdk'
import { isVercelError } from '../type-guards'

interface OptimizelyFetchOptions {
  headers?: Record<string, string>
  cache?: RequestCache
  preview?: boolean
  cacheTag?: string
}

interface OptimizelyFetch<Variables> extends OptimizelyFetchOptions {
  query: string
  variables?: Variables
}

interface GraphqlResponse<Response> {
  errors: unknown[]
  data: Response
}

/**
 * Fetches data from the Optimizely GraphQL API.
 * Handles auth, caching, preview mode, and Vercel error wrapping.
 * Skips execution if IS_BUILD=true.
 */
const optimizelyFetch = async <Response, Variables = object>({
  query,
  variables,
  headers,
  cache = 'force-cache',
  preview,
  cacheTag,
}: OptimizelyFetch<Variables>): Promise<
  GraphqlResponse<Response> & { headers: Headers }
> => {
  if (process.env.IS_BUILD === 'true') {
    console.warn('Skipping Optimizely fetch due to IS_BUILD=true')
    return {
      data: {} as Response,
      errors: [],
      headers: new Headers(),
    }
  }

  const configHeaders = { ...headers }
  if (preview) {
    if (!process.env.OPTIMIZELY_PREVIEW_SECRET) {
      throw new Error('Missing OPTIMIZELY_PREVIEW_SECRET in preview mode')
    }
    configHeaders.Authorization = `Basic ${process.env.OPTIMIZELY_PREVIEW_SECRET}`
    cache = 'no-store'
  }

  const apiUrl = process.env.OPTIMIZELY_API_URL
  const apiKey = process.env.OPTIMIZELY_SINGLE_KEY

  if (!apiUrl || !apiKey) {
    console.error('Missing OPTIMIZELY_API_URL or OPTIMIZELY_SINGLE_KEY')
    throw new Error('Optimizely API configuration is incomplete')
  }

  const endpoint = `${apiUrl}?auth=${apiKey}`
  const cacheTags = ['optimizely-content', cacheTag].filter(Boolean)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...configHeaders,
      },
      body: JSON.stringify({
        query,
        ...(variables && { variables }),
      }),
      cache,
      next: { tags: cacheTags as string[] },
    })

    const result = await response.json()

    return {
      ...result,
      headers: response.headers,
    }
  } catch (e) {
    if (isVercelError(e)) {
      throw {
        status: e.status || 500,
        message: e.message,
        query,
      }
    }

    throw {
      error: e,
      query,
    }
  }
}

/**
 * GraphQL requester used by the generated SDK.
 */
const requester = async <T, V>(
  doc: DocumentNode,
  variables: V,
  options?: OptimizelyFetchOptions
): Promise<T> => {
  const response = await optimizelyFetch<T, V>({
    query: print(doc),
    variables,
    ...options,
  })

  return response.data
}

export const optimizely = getSdk(requester)
