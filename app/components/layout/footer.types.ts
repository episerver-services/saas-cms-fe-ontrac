export type LinkItem = {
  label: string
  href: string
  external?: boolean
  isActive?: boolean
}

export type SocialLink = {
  platform: 'facebook' | 'linkedin' | 'youtube' | 'x'
  href: string
}

export type FooterData = {
  logo: {
    src: string
    alt: string
    href: string
  }
  footerLinks: LinkItem[] // Ordered: first 10 left column, rest right
  policyLinks: LinkItem[] // Appears as bottom meta links
  policyText: string // Copyright/disclaimer
  socialText: string // “Follow us”
  socialLinks: SocialLink[] // Icons + hrefs
}
