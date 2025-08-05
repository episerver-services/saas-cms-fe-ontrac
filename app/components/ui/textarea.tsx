import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * A styled textarea component using Tailwind CSS.
 *
 * @param props - Standard textarea element props with optional `className` override.
 * @param ref - Ref forwarded to the native textarea element.
 * @returns A fully styled textarea element.
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

export { Textarea }
