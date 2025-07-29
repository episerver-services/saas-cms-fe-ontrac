import Image from 'next/image'
import {
  LogosBlock as LogosBlockProps,
  LogoItemBlock,
} from '@/lib/optimizely/sdk'
import { castContent } from '@/lib/optimizely/types/type-utils'
import placeholder from '@/public/placeholder.svg'

/**
 * Renders a block of logos in a grid layout.
 *
 * This component maps over a list of logo items (typically images),
 * displaying each one with a consistent size and aspect ratio.
 *
 * Logos are expected to come from the CMS via the `LogosBlockProps` type.
 * Falls back to a placeholder image if `src` is missing.
 *
 * @param logos - Array of logo block items from Optimizely CMS
 */
export default function LogosBlock({ logos }: LogosBlockProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div
        className="flex flex-wrap justify-center gap-12"
        data-epi-edit="logos"
      >
        {logos?.map((logo, index) => {
          const safeLogoItem = castContent<LogoItemBlock>(logo, 'LogoItemBlock')
          if (!safeLogoItem) return null

          return (
            <div key={index} className="relative w-32 aspect-[5/2]">
              <Image
                src={safeLogoItem.src || placeholder}
                alt={safeLogoItem.alt || 'Company logo'}
                fill
                sizes="128px"
                className="object-contain"
                unoptimized={!safeLogoItem.src}
                priority={index === 0}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
