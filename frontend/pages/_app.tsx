import '../styles/globals.css'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import {ThemeProvider} from 'next-themes'
import  RefreshContext  from '../components/RefreshContext'

function MyApp({ Component, pageProps : {session, ...pageProps} }: AppProps) {
  const [refresh, setRefresh] = useState(false);

  return (
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </RefreshContext.Provider>
  )
}


export default MyApp
