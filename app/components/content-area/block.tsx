import dynamic from 'next/dynamic'
import blocksMapperFactory from '@/lib/utils/block-factory'

/**
 * Lazy-load fallback block for unknown or unmapped CMS block types.
 * Used to render a safe placeholder when a component isn't defined in the block map.
 */
const PlaceholderBlock = dynamic(() => import('./placeholder-block'))

/**
 * A map of CMS block `__typename` values to their corresponding React components.
 *
 * Extend this map with new block components as needed:
 *
 * Example:
 * ```ts
 * export const blocks = {
 *   HeroBlock: dynamic(() => import('./hero-block')),
 *   ImageBlock: dynamic(() => import('./image-block')),
 *   UnknownBlock: PlaceholderBlock, // fallback
 * }
 * ```
 */
export const blocks = {
  UnknownBlock: PlaceholderBlock,
}

/**
 * Exports a block mapper function that returns the appropriate component
 * based on the given `__typename`. Falls back to `UnknownBlock` if no match.
 */
export default blocksMapperFactory(blocks)
