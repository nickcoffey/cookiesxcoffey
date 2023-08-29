import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import {
  AboutSection,
  GallerySection,
  OrderSection, Layout
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
      <main className='p-4 lg:py-8 lg:px-24 xl:px-48'>
        <p className='pb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis tristique sollicitudin nibh sit amet commodo nulla. Lacinia at quis risus sed vulputate. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. Sit amet justo donec enim diam vulputate ut pharetra. Aliquet sagittis id consectetur purus ut faucibus pulvinar. Fermentum odio eu feugiat pretium. Molestie nunc non blandit massa enim. Enim blandit volutpat maecenas volutpat blandit aliquam. In pellentesque massa placerat duis. Arcu dui vivamus arcu felis. Adipiscing elit pellentesque habitant morbi tristique senectus. Vitae suscipit tellus mauris a diam maecenas sed enim. Vivamus arcu felis bibendum ut tristique. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Tristique sollicitudin nibh sit amet commodo. A pellentesque sit amet porttitor eget dolor morbi non arcu.</p>
        <p>Eu lobortis elementum nibh tellus molestie. Auctor augue mauris augue neque gravida in fermentum. Eu facilisis sed odio morbi quis commodo. Donec enim diam vulputate ut. Dui faucibus in ornare quam. Tristique nulla aliquet enim tortor at auctor urna nunc id. Libero justo laoreet sit amet cursus sit amet. Ac tortor dignissim convallis aenean et tortor at risus. Cras ornare arcu dui vivamus arcu. Ornare aenean euismod elementum nisi quis eleifend. Egestas congue quisque egestas diam. Elementum eu facilisis sed odio. Felis eget velit aliquet sagittis id consectetur purus ut. Dictum varius duis at consectetur. Sagittis purus sit amet volutpat consequat. Proin fermentum leo vel orci porta. Posuere lorem ipsum dolor sit amet consectetur adipiscing. In mollis nunc sed id. Massa placerat duis ultricies lacus sed. Aenean sed adipiscing diam donec adipiscing tristique risus nec.</p>
      </main>
    </Layout>
  )
}

export default Home
