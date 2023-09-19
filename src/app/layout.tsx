import './globals.css'
import SiteHeader from '../components/navigation/SiteHeader'
import Footer from '@/components/navigation/Footer'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
    <body suppressHydrationWarning={true}>
        <SiteHeader />
         {children}
         <Footer />
          </body>
    </html>
  )
}
