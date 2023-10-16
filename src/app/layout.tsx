import './globals.css'
import Footer from '@/components/navigation/Footer'
import HeaderDefault from '@/components/navigation/HeaderDefault';
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
      <HeaderDefault/>
      {children}
         <Footer />
    </Provider>
          </body>
    </html>
  )
}
