import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Footer from '@/app/components/layout/footer'

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
