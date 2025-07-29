/**
 * Cloudinary URL regex matcher.
 * Captures cloud name, asset type, delivery type, optional transformations, version, and public ID.
 */
const CLOUDINARY_REGEX =
  /^.+\.cloudinary\.com\/([^/]+)\/(?:(image|video|raw)\/)?(?:(upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/)?(?:(?:[^/]+\/[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^.^\s]+)(?:\.(.+))?$/

/**
 * Extracts the public ID (with extension) from a Cloudinary URL.
 * @param link The Cloudinary asset URL.
 * @returns The public ID including file extension, or an empty string if parsing fails.
 */
export const extractCloudinaryPublicID = (link: string): string => {
  if (!link) return ''

  const parts = CLOUDINARY_REGEX.exec(link)
  if (parts && parts.length > 2) {
    const path = parts[parts.length - 2]
    const extension = parts[parts.length - 1]
    return `${path}${extension ? '.' + extension : ''}`
  }

  return link
}

/**
 * Extracts the Cloudinary cloud name from a given URL.
 * @param link The Cloudinary asset URL.
 * @returns The cloud name or the original link if not matched.
 */
const extractCloudName = (link: string): string => {
  if (!link) return ''
  const parts = CLOUDINARY_REGEX.exec(link)
  return parts && parts.length > 2 && parts[1] ? parts[1] : link
}

/**
 * Generates Cloudinary transformation parameters for image optimization.
 * Skips transformation for SVGs.
 * @param path The image path or filename.
 * @param width Desired image width.
 * @param quality Desired image quality (optional).
 * @returns A Cloudinary transformation string.
 */
const getParams = (path: string, width: number, quality?: number): string => {
  const isSVG = path.toLowerCase().endsWith('.svg')

  if (isSVG) return '/'

  const params = [
    'f_auto', // format auto
    'c_limit', // crop limit
    `w_${width || 'auto'}`, // width
    `q_${quality || 'auto'}`, // quality
  ]

  return `/${params.join(',')}/`
}

const paramFormats = ['f_', 'c_']

/**
 * Cloudinary-compatible loader for Next.js image optimization.
 * @param src Source image URL.
 * @param width Target image width.
 * @param quality Target image quality (optional).
 * @returns A transformed Cloudinary URL or the original URL if not supported.
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  if (src.startsWith('https://res.cloudinary.com')) {
    // Skip transformation if the URL already has Cloudinary parameters
    if (paramFormats.some((f) => src.includes(f))) {
      return src
    }

    const publicId = extractCloudinaryPublicID(src)
    if (!publicId) return src

    const cloudName = extractCloudName(src)
    const params = getParams(publicId, width, quality)

    return `https://res.cloudinary.com/${cloudName}/image/upload${params}${publicId}`
  }

  // Non-Cloudinary URLs are returned unchanged
  return src
}
