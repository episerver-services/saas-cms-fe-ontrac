import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import {
  ServicesBlock as ServicesBlockProps,
  ServiceItem,
} from '@/lib/optimizely/sdk'
import { castContent } from '@/lib/optimizely/types/type-utils'

/**
 * Renders a grid of service cards.
 *
 * Each card displays an icon, a title, and a short description.
 * Images are auto-optimized using the global image loader.
 *
 * @param services - An array of service content blocks from Optimizely CMS.
 */
export default function ServicesBlock({ services }: ServicesBlockProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-8 md:grid-cols-3">
        {services?.map((serviceItem, index) => {
          const service = castContent<ServiceItem>(serviceItem, 'ServiceItem')
          if (!service) return null

          const iconSrc = service.icon || '/placeholder.svg'

          return (
            <Card key={index}>
              <CardHeader>
                <div className="mb-4">
                  <Image
                    src={iconSrc}
                    alt={service?.title || 'Service icon'}
                    width={50}
                    height={50}
                    unoptimized={!service.icon}
                  />
                </div>
                <CardTitle data-epi-edit="title">{service?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-muted-foreground"
                  data-epi-edit="description"
                >
                  {service?.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
