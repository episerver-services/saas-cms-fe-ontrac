import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Footer from '@/app/components/layout/footer'

import { footerMockData } from '@/app/components/layout/footer/footer.mock'

const MockData = footerMockData

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
  },
  args: {
    data: MockData,
  },
}
export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {}
