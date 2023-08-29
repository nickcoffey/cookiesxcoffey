import { useRef, useState, useEffect } from 'react'
import {
  AboutSection,
  Layout
} from '../components'
import type { NextPage } from 'next'
import type { RefObject } from 'react'

const getElementHeight = <T extends HTMLElement>(ref: RefObject<T>) =>
  ref.current?.offsetHeight

let navHeight = 0
let headerHeight = 0

const About: NextPage = () => {
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
      <AboutSection />
    </Layout>
  )
}

export default About
