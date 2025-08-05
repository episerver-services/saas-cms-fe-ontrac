import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            OnTrac Company Site
          </Link>

          <nav aria-label="Main navigation" className="hidden md:flex gap-6">
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
            <Link href="/services" className="text-sm font-medium">
              Services
            </Link>
            <Link href="/contact" className="text-sm font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
