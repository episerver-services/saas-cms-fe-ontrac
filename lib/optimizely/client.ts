import { getSdk } from './sdk'
import { print } from 'graphql'
import type { DocumentNode } from 'graphql'
import type { RequestInit } from 'node-fetch'

type GraphQLFetcher = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: RequestInit
) => Promise<R>

interface OptimizelyClientOptions {
  preview?: boolean
  previewToken?: string
}

/**
 * Creates a configured GraphQL client for Optimizely CMS.
 *
 * @param options.preview - If true, uses preview credentials (bearer or basic auth).
 * @param options.previewToken - Optional bearer token from preview mode.
 * @returns An initialized GraphQL SDK client.
 */
export function getOptimizelyClient({
  preview = false,
  previewToken,
}: OptimizelyClientOptions) {
  const endpointBase = process.env.OPTIMIZELY_API_URL ?? ''
  let endpoint = endpointBase

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (preview && previewToken) {
    headers.Authorization = `Bearer ${previewToken}`
  } else if (preview) {
    const appKey = process.env.OPTIMIZELY_APP_KEY
    const appSecret = process.env.OPTIMIZELY_APP_SECRET
    if (!appKey || !appSecret) {
      throw new Error(
        'Missing preview credentials: OPTIMIZELY_APP_KEY or OPTIMIZELY_APP_SECRET'
      )
    }
    const basicToken = Buffer.from(`${appKey}:${appSecret}`).toString('base64')
    headers.Authorization = `Basic ${basicToken}`
  } else {
    const singleKey = process.env.OPTIMIZELY_SINGLE_KEY
    if (!singleKey) {
      throw new Error('Missing production key: OPTIMIZELY_SINGLE_KEY')
    }
    endpoint = `${endpoint}?auth=${singleKey}`
  }

  const requester: GraphQLFetcher = async (doc, vars) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: print(doc),
        variables: vars,
      }),
    })

    const json = await response.json()

    if (!response.ok || json.errors) {
      throw new Error(
        `Optimizely fetch failed: ${response.status} ${JSON.stringify(json.errors)}`
      )
    }

    return json.data
  }

  return getSdk(requester)
}
