import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from "next/font/google";
import SiteHeader from './(client-components)/(Header)/SiteHeader'
import Footer from '@/components/Footer'
import FooterNav from '@/components/FooterNav'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body >
        <SiteHeader />
         {children}
         {/* <FooterNav /> */}
         <Footer />
          </body>
    </html>
  )
}
