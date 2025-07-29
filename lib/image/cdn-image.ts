/**
 * Rewrites a relative Optimizely image path to use Cloudflare CDN transforms.
 *
 * Example output:
 *   /cdn-cgi/image/width=800,quality=75/globalassets/my-image.jpg
 *
 * @param src Relative image path (e.g. /globalassets/my-image.jpg)
 * @param opts Optional transform settings: width and quality
 * @returns A CDN-transformed image URL
 */
export function getOptimizedImageUrl(
  src: string,
  opts: { width?: number; quality?: number } = {}
): string {
  const { width = 800, quality = 75 } = opts

  // Only rewrite Optimizely-managed images
  if (!src.startsWith('/')) return src

  return `/cdn-cgi/image/width=${width},quality=${quality}${src}`
}
