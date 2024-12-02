import React from 'react'
import Header from 'components/Header/Header'
import './globals.css';

export default function layout({ children }) {
  return (
    <html>
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