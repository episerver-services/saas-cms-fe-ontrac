import SharedPageLayout from '@/app/components/layout/shared-page-layout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SharedPageLayout>{children}</SharedPageLayout>
}
