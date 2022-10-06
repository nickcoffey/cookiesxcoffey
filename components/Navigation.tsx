import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Transition } from '@headlessui/react'
import { useOnClickOutside } from '../hooks'

type LinkName = 'Home' | 'About' | 'Gallery' | 'Order'
type Link = { name: LinkName; icon: string; id?: string }

const links: Link[] = [
  { name: 'Home', icon: 'home' },
  { name: 'About', icon: 'person', id: 'about' },
  { name: 'Gallery', icon: 'photo_library', id: 'gallery' },
  { name: 'Order', icon: 'mail', id: 'order' }
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToSection(id: string) {
  const element = document.querySelector(`#${id}`)
  const navbar = document.querySelector('#navbar')

  if (element && navbar) {
    // @ts-ignore
    const navbarOffset = navbar.offsetHeight + 8
    const elementPosition = element.getBoundingClientRect().top
    const offsetTop = elementPosition + window.pageYOffset - navbarOffset

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

const handleLinkClick = (linkId?: string) => {
  if (!linkId) {
    scrollToTop()
  } else {
    scrollToSection(linkId)
  }
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
    'fixed top-0 left-0 p-2 z-10 w-full transition duration-150',
    {
      'bg-lightgrey shadow-lg text-black': navVisEnabled,
      'text-white': !navVisEnabled
    }
  )

  const headerClasses = classNames(baseHeaderClasses, 'block lg:gap-8 lg:flex')

  return (
    <>
      <nav className={headerClasses} id='navbar'>
        {/* Desktop Nav */}
        {links.map((link, index) => (
          <a
            className='items-start justify-center hidden gap-2 px-4 py-2 transition duration-150 rounded-md cursor-pointer select-none lg:flex hover:text-black hover:bg-primary'
            onClick={() => handleLinkClick(link.id)}
            key={index}
          >
            <span className='material-symbols-outlined'>{link.icon}</span>
            {link.name}
          </a>
        ))}
        {/* Mobile Nav */}
        <span className='material-symbols-outlined large' onClick={scrollToTop}>
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

  return (
    <>
      <span
        className='fixed right-2 top-2 material-symbols-outlined large lg:hidden'
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
          className='h-full fixed z-20 top-0 left-0 bg-[rgba(0,0,0,0.9)] pt-12 pl-6 pr-20 text-white text-xl flex flex-col gap-4'
          ref={drawerRef}
        >
          {links.map((link, index) => (
            <li
              key={index}
              onClick={() => {
                setIsDrawerOpen(false)
                handleLinkClick(link.id)
              }}
              className='flex items-center gap-2'
            >
              <span className='material-symbols-outlined large'>
                {link.icon}
              </span>
              {link.name}
            </li>
          ))}
        </ul>
      </Transition>
    </>
  )
}
