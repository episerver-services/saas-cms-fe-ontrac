import cloudinaryLoader from './cloudinary-loader'
import { getOptimizedImageUrl } from './cdn-image'

/**
 * Next.js-compatible global image loader.
 * Automatically transforms Cloudinary or relative URLs via appropriate loaders.
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  if (!src) return ''

  if (src.startsWith('https://res.cloudinary.com')) {
    return cloudinaryLoader({ src, width, quality })
  }

  if (src.startsWith('/')) {
    return getOptimizedImageUrl(src, { width, quality })
  }

  return src
}
