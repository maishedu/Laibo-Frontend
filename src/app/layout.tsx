import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from "next/font/google";
import SiteHeader from './(client-components)/(Header)/SiteHeader'
import Footer from '@/components/Footer'
import FooterNav from '@/components/FooterNav'


const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className} >
      <body >
        <SiteHeader />
         {children}
         <FooterNav />
         <Footer />
          </body>
    </html>
  )
}
