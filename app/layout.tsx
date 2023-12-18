import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import ClientSessionProvider from '@/libs/clientSessionProvider'
import NavBar from './components/nav/NavBar'
import Footer from './components/footer/footer'

const poppins = Poppins({ subsets: ['latin'], weight:["400","700"] })

export const metadata: Metadata = {
  title: 'Ecommerce Store',
  description: 'This is an ecommerce store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
          <ClientSessionProvider>
            <div className='flex flex-col min-h-screen'>
              <NavBar/>
              <main className='flex-grow'>{children}</main>
              <Footer/>
            </div>
          </ClientSessionProvider>
        </body>
    </html>
  )
}
