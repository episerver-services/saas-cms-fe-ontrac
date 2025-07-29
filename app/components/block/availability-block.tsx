import { Card, CardContent } from '../ui/card'
import type { AvailabilityBlock as AvailabilityBlockType } from '@/lib/optimizely/sdk'

type AvailabilityBlockProps = {
  /** Availability text (usually a short description or status) */
  availability: AvailabilityBlockType['availability']
  /** List of project types or categories */
  projectTypes: AvailabilityBlockType['projectTypes']
}

/**
 * Renders an availability block section with descriptive text and a list of project types.
 * Intended to be mapped from a CMS block (e.g., via Visual Builder or structured content).
 *
 * @example
 * <AvailabilityBlock
 *   availability="Currently available for freelance work."
 *   projectTypes={['Next.js apps', 'CMS integrations']}
 * />
 */
export default function AvailabilityBlock({
  availability,
  projectTypes,
}: AvailabilityBlockProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <Card className="border-none">
        <CardContent className="p-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <p
              className="leading-relaxed text-[#2d2d2d]"
              data-epi-edit="availability"
            >
              {availability}
            </p>
            <div>
              <p className="leading-relaxed text-[#2d2d2d]">
                Projects include:
              </p>
              <ul
                className="mt-2 list-inside list-disc space-y-1"
                data-epi-edit="projectTypes"
              >
                {projectTypes?.map((type, index) => (
                  <li key={index} className="text-[#2d2d2d]">
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
