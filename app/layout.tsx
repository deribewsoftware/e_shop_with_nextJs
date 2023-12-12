import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import CartProvider from '@/providers/cartProvider'
import { Toaster } from 'react-hot-toast'



const poppins = Poppins({ subsets: ['latin'] ,weight:['400','700']})

export const metadata: Metadata = {
  title: 'E-Shop',
  description: 'Eccomerce App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  

  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster toastOptions={
          {style:{background:'rgb(51,65,85' ,color:'#fff'}}
        }/>
        <CartProvider>
        <div className="flex flex-col min-h-screen">
        <Navbar/>
       <main className='flex-grow'> {children}</main>
       <Footer/>
        </div>
        </CartProvider>
        </body>
    </html>
  )
}
