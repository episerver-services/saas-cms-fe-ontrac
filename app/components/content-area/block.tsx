import dynamic from 'next/dynamic'
import blocksMapperFactory from '@/lib/utils/block-factory'

/**
 * Dynamically imports all known CMS block components.
 * These are used by the CMS renderer to map block types to components.
 * Lazy loading reduces initial bundle size and improves performance.
 */

const AvailabilityBlock = dynamic(() => import('../block/availability-block'))
const ContactBlock = dynamic(() => import('../block/contact-block'))
const HeroBlock = dynamic(() => import('../block/hero-block'))
const LogosBlock = dynamic(() => import('../block/logos-block'))
const PortfolioGridBlock = dynamic(
  () => import('../block/portfolio-grid-block')
)
const ProfileBlock = dynamic(() => import('../block/profile-block'))
const ServicesBlock = dynamic(() => import('../block/services-block'))
const StoryBlock = dynamic(() => import('../block/story-block'))
const TestimonialsBlock = dynamic(() => import('../block/testimonials-block'))

/**
 * A mapping of Optimizely CMS block types to corresponding React components.
 * Keys must match the `__typename` returned by the GraphQL API.
 */
export const blocks = {
  AvailabilityBlock,
  ContactBlock,
  HeroBlock,
  LogosBlock,
  PortfolioGridBlock,
  ProfileBlock,
  ServicesBlock,
  StoryBlock,
  TestimonialsBlock,
} as const

/**
 * Returns a render function that maps CMS block data to matching components.
 * Used in `ContentAreaMapper` to render block content dynamically.
 */
export default blocksMapperFactory(blocks)
