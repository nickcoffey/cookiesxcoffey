import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import {
  Navigation,
  AboutSection,
  GallerySection,
  OrderSection
} from '../components'
import logoPic from '../public/logo.svg'
import type { NextPage } from 'next'
import type { RefObject } from 'react'

const getElementHeight = <T extends HTMLElement>(ref: RefObject<T>) =>
  ref.current?.offsetHeight

let navHeight = 0
let headerHeight = 0

const Home: NextPage = () => {
  const navRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const [iconHeight, setIconHeight] = useState(0)

  const handleResize = () => {
    const refNavHeight = getElementHeight(navRef)
    const refHeaderHeight = getElementHeight(headerRef)

    if (refNavHeight && refHeaderHeight) {
      // only set height state when it's different to avoid unnecessary rerenders
      if (refNavHeight !== navHeight || refHeaderHeight !== headerHeight) {
        navHeight = refNavHeight
        headerHeight = refHeaderHeight
        setIconHeight(refHeaderHeight - refNavHeight)
      }
    }
  }

  useEffect(() => {
    const refNavHeight = getElementHeight(navRef)
    const refHeaderHeight = getElementHeight(headerRef)
    if (refNavHeight && refHeaderHeight) {
      setIconHeight(refHeaderHeight - refNavHeight)
    }
  }, [])

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Cookies by Coffey</title>
        <meta name='description' content='Custom Boutique Cookies' />
        <link rel='icon' href='/logo.svg' />
      </Head>
      <Navigation ref={navRef} />
      <header
        className='flex items-end justify-center h-[50vh]'
        ref={headerRef}
      >
        <Image src={logoPic} alt='Logo' height={iconHeight} />
      </header>
      <main className='grid gap-8 p-4 lg:py-8 lg:px-24 xl:px-48 lg:grid-cols-2'>
        <AboutSection />
        <GallerySection />
        <OrderSection className='lg:col-span-2' />
      </main>
    </>
  )
}

export default Home
