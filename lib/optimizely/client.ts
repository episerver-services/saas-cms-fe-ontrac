import { getSdk } from './sdk'
import { print } from 'graphql'
import type { DocumentNode } from 'graphql'
import type { RequestInit } from 'node-fetch'

/**
 * Type definition for a GraphQL fetcher function used by the SDK.
 *
 * @template R - The expected response shape.
 * @template V - The expected variables shape.
 */
type Fetcher = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: RequestInit
) => Promise<R>

/**
 * Returns a configured Optimizely GraphQL client using authentication
 * logic based on environment settings and whether preview mode is enabled.
 *
 * @param preview - Whether to use preview credentials.
 * @param previewToken - Optional bearer token for authenticated preview requests.
 * @returns A fully initialized Optimizely SDK client instance.
 *
 * @throws If required authentication environment variables are missing.
 */
export function getOptimizelyClient({
  preview = false,
  previewToken,
}: {
  preview?: boolean
  previewToken?: string
}) {
  const endpointBase = process.env.OPTIMIZELY_API_URL ?? ''
  let endpoint = endpointBase

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  // Auth logic
  if (preview && previewToken) {
    // Use bearer token if explicitly provided
    headers.Authorization = `Bearer ${previewToken}`
  } else if (preview) {
    // Fall back to Basic Auth using app key/secret
    const appKey = process.env.OPTIMIZELY_APP_KEY
    const appSecret = process.env.OPTIMIZELY_APP_SECRET
    if (!appKey || !appSecret) {
      throw new Error('Missing OPTIMIZELY_APP_KEY or OPTIMIZELY_APP_SECRET')
    }
    const basicToken = Buffer.from(`${appKey}:${appSecret}`).toString('base64')
    headers.Authorization = `Basic ${basicToken}`
  } else {
    // Production auth via single delivery key
    const singleKey = process.env.OPTIMIZELY_SINGLE_KEY
    if (!singleKey) {
      throw new Error('Missing OPTIMIZELY_SINGLE_KEY')
    }
    endpoint = `${endpoint}?auth=${singleKey}`
  }

  /**
   * Internal fetcher function used by GraphQL codegen SDK.
   *
   * @param doc - The GraphQL query or mutation document.
   * @param vars - Optional variables for the query.
   * @returns The parsed response data.
   *
   * @throws If the request fails or returns GraphQL errors.
   */
  const requester: Fetcher = async (doc, vars) => {
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
