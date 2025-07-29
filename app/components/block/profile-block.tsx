import Image from 'next/image'
import { Card, CardContent } from '../ui/card'
import { ProfileBlock as ProfileBlockProps } from '@/lib/optimizely/sdk'
import { BlockBase } from '@/lib/optimizely/types/block'
import { cva } from 'class-variance-authority'

type ProfileBlockPropsV2 = ProfileBlockProps & BlockBase

const backgroundVariants = cva('container mx-auto px-4 py-16', {
  variants: {
    colorScheme: {
      default: 'border-none bg-[#f9e6f0] text-[#2d2d2d]',
      primary: 'border-none bg-primary text-white',
      secondary: 'border-none bg-secondary text-secondary-foreground',
    },
  },
  defaultVariants: {
    colorScheme: 'default',
  },
})

/**
 * Renders a profile card with image, name, title, and bio.
 *
 * Uses Optimizely CMS content to populate a responsive layout,
 * with optional background color schemes and layout priority.
 *
 * Falls back to a local placeholder if no image is provided.
 *
 * @param imageSrc - Profile image URL
 * @param name - Person’s name
 * @param title - Job title or headline
 * @param bio - Short biography text
 * @param isFirst - Whether this is the first block (used to enable priority loading)
 * @param displaySettings - CMS-driven visual settings like color scheme
 */
export default function ProfileBlock({
  imageSrc,
  name,
  title,
  bio,
  isFirst,
  displaySettings,
}: ProfileBlockPropsV2) {
  const colorScheme =
    displaySettings?.find((setting) => setting.key === 'colorScheme')?.value ||
    'default'

  const fallbackSrc = imageSrc || '/placeholder.svg'

  return (
    <section className="container mx-auto px-4 py-16">
      <Card
        className={backgroundVariants({
          colorScheme: colorScheme as 'default' | 'primary' | 'secondary',
        })}
      >
        <CardContent className="p-8">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <Image
                src={fallbackSrc}
                alt={name ? `${name} - ${title}` : title || 'Profile image'}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="rounded-lg object-cover"
                priority={isFirst}
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold" data-epi-edit="name">
                {name}
              </h1>
              <p className="text-xl" data-epi-edit="title">
                {title}
              </p>
              <div className="mt-6">
                <h2 className="mb-2 text-lg font-semibold">Bio:</h2>
                <p className="leading-relaxed" data-epi-edit="bio">
                  {bio}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
