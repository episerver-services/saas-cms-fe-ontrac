import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Footer from '@/app/components/layout/footer'
import type { FooterData } from '@/app/components/layout/footer.types'

const mockData: FooterData = {
  logo: {
    src: '/image/logo.svg',
    alt: 'OnTrac',
    href: '/',
  },
  socialText: 'Follow us',
  socialLinks: [
    { platform: 'facebook', href: 'https://facebook.com/ontrac' },
    { platform: 'linkedin', href: 'https://linkedin.com/company/ontrac' },
    { platform: 'youtube', href: 'https://youtube.com/@ontrac' },
    { platform: 'x', href: 'https://x.com/ontrac' },
  ],
  policyText: '© 2025 OnTrac. All rights reserved.',
  policyLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Equal Opportunity Employer', href: '/equal-opportunity' },
    { label: 'Contact Us', href: '/contact' },
  ],
  footerLinks: [
    { label: 'E‑Commerce Delivery', href: '/ecommerce' },
    { label: 'Transcontinental', href: '/transcontinental' },
    { label: 'Everyday Delivery', href: '/everyday' },
    { label: 'Provide Delivery Services', href: '/provide-delivery-services' },
    { label: 'Careers', href: '/careers' },
    { label: 'About', href: '/about' },
    { label: 'Community Impact', href: '/community' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Additional Terms & Conditions', href: '/additional-terms' },
    { label: 'Surcharges and Rates', href: '/surcharges' },

    { label: 'Knowledge Center', href: '/knowledge' },
    { label: 'Support', href: '/support' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Custom Logistics Solutions', href: '/custom-logistics' },
    { label: 'Client Login', href: '/client-login' },
    { label: 'OnTrac International', href: '/international' },
    { label: 'Schedule a Pickup', href: '/pickup' },
    { label: 'WebOnTrac Login', href: '/we-b-ontrac' },
    { label: 'Service Alerts', href: '/service-alerts' },
  ],
}

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
  },
  args: {
    data: mockData,
  },
}
export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {}
