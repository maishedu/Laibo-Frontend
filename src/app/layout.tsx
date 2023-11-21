import './globals.css'
import Footer from '@/components/navigation/Footer'
import HeaderDefault from '@/components/navigation/HeaderDefault';
import Provider from "@/components/providers/Provider";
import { Metadata } from 'next';
import favicon from '../images/logo4 copy.png';

export const metadata: Metadata = {
  title: 'Laibo',
  description: 'Laibo takes book trading from the streets and brings it into a user friendly app where transactions and negotiations between buyers and sellers are made easy and transparent. We give traders live stock valuations, market prices, accounting, receipts and the ability to sell to as many people as possible by sharing links.',
  icons:{
      icon:favicon.src,
      apple:favicon.src
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" >
    <body suppressHydrationWarning={true}>
    <Provider>
      <HeaderDefault/>
      {children}
         <Footer />
    </Provider>
          </body>
    </html>
  )
}
