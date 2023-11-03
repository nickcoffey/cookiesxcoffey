import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ArrowIcon from '@mui/icons-material/ArrowForwardOutlined'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibraryOutlined'
import EmailIcon from '@mui/icons-material/EmailOutlined'
import { Layout, Main } from '../components'
import logoPic from '../public/logo.svg'
import type { NextPage } from 'next'
import type { RefObject } from 'react'
import type { Icon } from '../types'

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

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Layout navRef={navRef}>
      <header
        className='flex items-end justify-center h-[50vh]'
        ref={headerRef}
      >
        <Image src={logoPic} alt='Logo' height={iconHeight} />
      </header>
      <Main>
        <div className='flex flex-col gap-12'>
          <p>
            Welcome to Cookies by Coffey, your favorite custom cookie boutique!
            We offer custom butter sugar and chocolate sugar cookies and are
            continually experimenting with new flavors and ideas. Currently,
            cookies may be picked up in the Greater St. Louis area, but we
            expect to start shipping to the rest of the US soon!
          </p>
          <div className='grid gap-8 text-lg justify-center sm:grid-cols-2'>
            <HomePageLink
              Icon={PhotoLibraryIcon}
              text='View Past Orders'
              href='/gallery'
            />
            <HomePageLink
              Icon={EmailIcon}
              text='Place an Order'
              href='/order'
            />
          </div>
        </div>
      </Main>
    </Layout>
  )
}

type HomePageLinkProps = {
  Icon: Icon
  text: string
  href: string
}

const HomePageLink = ({ Icon, text, href }: HomePageLinkProps) => (
  <Link href={href}>
    <span className='flex items-center justify-between w-full gap-6 transition duration-150 cursor-pointer sm:justify-center lg:hover:text-darkprimary'>
      <span className='flex items-center gap-2'>
        <Icon />
        {text}
      </span>
      <ArrowIcon />
    </span>
  </Link>
)

export default Home
