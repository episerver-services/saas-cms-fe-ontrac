import '../app/globals.css'
import type { Preview } from '@storybook/nextjs-vite'
import Header from '../app/components/layout/header'
import Footer from '../app/components/layout/footer'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },

  decorators: [
    (Story) => (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Story />
        </main>
        <Footer />
      </>
    ),
  ],
}

export default preview
