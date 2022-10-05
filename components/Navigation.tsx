import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Transition } from '@headlessui/react'
import { useOnClickOutside } from '../hooks'

type LinkName = 'Home' | 'About' | 'Order'
type Link = { name: LinkName; icon: string }

const links: Link[] = [
  { name: 'Home', icon: 'home' },
  { name: 'About', icon: 'person' },
  { name: 'Order', icon: 'mail' }
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const Navigation = () => {
  const [navVisEnabled, setNavVisEnabled] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      const scrollHeight = 100
      if (
        document.body.scrollTop > scrollHeight ||
        document.documentElement.scrollTop > scrollHeight
      ) {
        setNavVisEnabled(true)
      } else {
        setNavVisEnabled(false)
      }
    }
  }, [])

  const baseHeaderClasses = classNames(
    'fixed top-0 left-0 p-2 w-full transition duration-150',
    {
      'bg-lightgrey shadow-lg text-black': navVisEnabled,
      'text-white': !navVisEnabled
    }
  )

  const desktopHeaderClasses = classNames(
    baseHeaderClasses,
    'gap-8 hidden md:flex'
  )

  const mobileHeaderClasses = classNames(baseHeaderClasses, 'block md:hidden')

  return (
    <>
      {/* Desktop Nav */}
      <nav className={desktopHeaderClasses}>
        {links.map((link, index) => (
          <a
            className='flex items-start justify-center gap-2 px-4 py-2 transition duration-150 rounded-md cursor-pointer select-none hover:text-black hover:bg-primary'
            onClick={() => link.name === 'Home' && scrollToTop()}
            key={index}
          >
            <span className='material-symbols-outlined'>{link.icon}</span>
            {link.name}
          </a>
        ))}
      </nav>
      {/* Mobile Nav */}
      <nav className={mobileHeaderClasses}>
        <span
          className='text-3xl material-symbols-outlined'
          onClick={scrollToTop}
        >
          home
        </span>
        <MobileNavButton />
      </nav>
    </>
  )
}

const MobileNavButton = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLUListElement>(null)
  const btnRef = useRef<HTMLSpanElement>(null)

  useOnClickOutside(drawerRef, () => setIsDrawerOpen(false), [btnRef])

  const toggleDrawer = () =>
    isDrawerOpen ? setIsDrawerOpen(false) : setIsDrawerOpen(true)

  const handleLinkClick = (linkName: LinkName) => {
    if (linkName === 'Home') {
      scrollToTop()
      setIsDrawerOpen(false)
    }
  }

  return (
    <>
      <span
        className='fixed text-3xl right-2 top-2 material-symbols-outlined'
        onClick={toggleDrawer}
        ref={btnRef}
      >
        {isDrawerOpen ? 'close' : 'menu'}
      </span>
      <Transition
        show={isDrawerOpen}
        enter='transition duration-150'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <ul
          className='h-full fixed z-10 top-0 left-0 bg-[rgba(0,0,0,0.9)] pt-12 pl-6 pr-20 text-white text-xl flex flex-col gap-4'
          ref={drawerRef}
        >
          {links.map((link, index) => (
            <li
              key={index}
              onClick={() => handleLinkClick(link.name)}
              className='flex items-center gap-2'
            >
              <span className='material-symbols-outlined'>{link.icon}</span>
              {link.name}
            </li>
          ))}
        </ul>
      </Transition>
    </>
  )
}
