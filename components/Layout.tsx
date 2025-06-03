import { ReactNode, RefObject } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import comingSoon from '../public/coming-soon.jpg'

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
      {/*
        <Navigation ref={navRef} />
        {children}
      */}
      <main className='flex justify-center h-screen'>
        <Image
          src={comingSoon}
          alt='Coming soon'
          layout='fill'
          objectFit='contain'
        />
      </main>
    </>
  )
}
