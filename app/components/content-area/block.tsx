import dynamic from 'next/dynamic'
import blocksMapperFactory from '@/lib/utils/block-factory'

const PlaceholderBlock = dynamic(() => import('./placeholder-block'))

export const blocks = {
  UnknownBlock: PlaceholderBlock,
}

export default blocksMapperFactory(blocks)
