import React from 'react'
import Header from './_components/Header/Header';
import Footer from './_components/Footer/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>)
 {
  return (
    <html lang="pt">
      <body>
        <div>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}