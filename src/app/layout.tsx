import './globals.css'
import SiteHeader from '../components/navigation/SiteHeader'
import Footer from '@/components/navigation/Footer'
import AunthenticatedHeader from '@/components/navigation/AunthenticatedHeader';
import Provider from "@/components/providers/Provider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
    <body suppressHydrationWarning={true}>
    <Provider>
      <AunthenticatedHeader/>
        {/* <SiteHeader /> */}
         {children}
         <Footer />
    </Provider>
          </body>
    </html>
  )
}
