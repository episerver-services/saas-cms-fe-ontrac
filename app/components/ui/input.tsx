import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * A styled input component using Tailwind CSS.
 *
 * @param props - Standard input element props with optional `className` override.
 * @param ref - Ref forwarded to the native input element.
 * @returns A fully styled input element.
 */
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }
