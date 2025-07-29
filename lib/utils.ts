import { ReadonlyURLSearchParams } from 'next/navigation'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Creates a full URL string from a pathname and a set of query parameters.
 *
 * @param pathname - The base path of the URL (e.g., `/search`).
 * @param params - A URLSearchParams or ReadonlyURLSearchParams instance.
 * @returns A complete URL with query string (e.g., `/search?q=test&page=2`).
 */
export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
): string => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`
  return `${pathname}${queryString}`
}

/**
 * Ensures a given pathname starts with a leading slash.
 *
 * @param pathname - A URL path (e.g., `about` or `/about`).
 * @returns The path prefixed with `/` if not already present.
 */
export const leadingSlashUrlPath = (pathname: string): string => {
  return `${pathname.startsWith('/') ? '' : '/'}${pathname}`
}

/**
 * Merges Tailwind CSS class names conditionally.
 * Combines `clsx` for logic with `tailwind-merge` for deduplication.
 *
 * @param inputs - A list of class names, boolean expressions, or arrays of these.
 * @returns A merged string of valid Tailwind classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
