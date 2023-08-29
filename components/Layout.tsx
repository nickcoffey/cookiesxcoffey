import type { ReactNode, RefObject } from 'react'
import Head from 'next/head'
import { Navigation } from './Navigation'

type Props = {
  children: ReactNode
  navRef?: RefObject<HTMLElement>
}

export const Layout = ({ children, navRef }: Props) => {
  return (
    <>
      <Head>
        <title>Cookies by Coffey</title>
        <meta name='description' content='Custom Boutique Cookies' />
        <link rel='icon' href='/logo.svg' />
      </Head>
      <Navigation ref={navRef} />
      {children}
    </>
  )
}
