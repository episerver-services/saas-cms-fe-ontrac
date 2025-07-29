import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ContactBlock as ContactBlockProps } from '@/lib/optimizely/sdk'

/**
 * Renders a contact form block with a title and description pulled from CMS.
 * This is a static form UI; no submit handling is implemented.
 *
 * @param title - Heading for the contact section
 * @param description - Optional description below the title
 *
 * @example
 * <ContactBlock
 *   title="Get in touch"
 *   description="Have a project in mind? Drop us a message."
 * />
 */
export default function ContactBlock({
  title,
  description,
}: ContactBlockProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle data-epi-edit="title">{title}</CardTitle>
          <p data-epi-edit="description" className="text-muted-foreground">
            {description}
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <Input placeholder="Name" />
            <Input placeholder="Email" type="email" />
            <Textarea placeholder="Message" />
            <Button className="w-full">Send</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
