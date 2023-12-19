import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import NextAuthProvider from '../components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SubManager',
  description: 'Never Forget a Subscription Again',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar/>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
