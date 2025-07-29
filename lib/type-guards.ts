/**
 * Describes the shape of a typical Vercel-style error object.
 */
export interface VercelErrorLike {
  status: number
  message: Error
  cause?: Error
}

/**
 * Type guard that checks if the given value is a plain object (not null, not an array).
 *
 * @param object - The value to check
 * @returns True if the value is a plain object
 */
export const isObject = (
  object: unknown
): object is Record<string, unknown> => {
  return typeof object === 'object' && object !== null && !Array.isArray(object)
}

/**
 * Type guard to determine whether an error-like object matches the VercelErrorLike interface.
 * It handles both native Error instances and objects that inherit from Error.
 *
 * @param error - The value to test
 * @returns True if the value appears to be a Vercel-like error
 */
export const isVercelError = (error: unknown): error is VercelErrorLike => {
  if (!isObject(error)) return false

  if (error instanceof Error) return true

  return findError(error)
}

/**
 * Recursively checks the prototype chain to detect if an object is derived from Error.
 *
 * @param error - The object whose prototype chain will be traversed
 * @returns True if an Error is found in the prototype chain
 */
function findError<T extends object>(error: T): boolean {
  if (Object.prototype.toString.call(error) === '[object Error]') {
    return true
  }

  const prototype = Object.getPrototypeOf(error) as T | null

  return prototype === null ? false : findError(prototype)
}
