import React from 'react'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './globals.css';

export default function layout({ children }) {
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