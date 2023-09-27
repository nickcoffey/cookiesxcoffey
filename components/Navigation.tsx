import { useState, useEffect, useRef, forwardRef } from 'react'
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibraryOutlined'
import EmailIcon from '@mui/icons-material/EmailOutlined'
import MenuIcon from '@mui/icons-material/MenuOutlined'
import CloseIcon from '@mui/icons-material/CloseOutlined'
import classNames from 'classnames'
import { Transition } from '@headlessui/react'
import { useOnClickOutside } from '../hooks'
import type { Icon } from '../types'

type LinkName = 'Home' | 'About' | 'Gallery' | 'Order'
type Link = { name: LinkName; icon: Icon; id: string }

const links: Link[] = [
  { name: 'Home', icon: HomeIcon, id: '/' },
  { name: 'Gallery', icon: PhotoLibraryIcon, id: '/gallery' },
  { name: 'Order', icon: EmailIcon, id: '/order' }
]

export const Navigation = forwardRef<HTMLElement>((_props, ref) => {
  const [navVisEnabled, setNavVisEnabled] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      const scrollHeight = 0
      if (
        document.body.scrollTop !== scrollHeight ||
        document.documentElement.scrollTop !== scrollHeight
      ) {
        setNavVisEnabled(true)
      } else {
        setNavVisEnabled(false)
      }
    }
  }, [])

  const navClasses = classNames(
    'fixed top-0 left-0 p-2 z-10 w-full transition duration-150 block text-black lg:gap-8 lg:flex',
    {
      'bg-white shadow-lg': navVisEnabled
    }
  )

  return (
    <nav className={navClasses} id='navbar' ref={ref}>
      {/* Desktop Nav */}
      {links.map((link, index) => (
        <Link href={link.id} key={index}>
          <span className='items-start justify-center hidden gap-2 px-4 py-2 transition duration-150 rounded-md cursor-pointer select-none lg:flex hover:text-black hover:bg-primary'>
            <link.icon />
            {link.name}
          </span>
        </Link>
      ))}
      {/* Mobile Nav */}
      <Link href='/'>
        <HomeIcon className='text-4xl-important lg-hidden-important' />
      </Link>
      <MobileNavButton />
    </nav>
  )
})

Navigation.displayName = 'Navigation'

const MobileNavButton = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLUListElement>(null)
  const btnRef = useRef<SVGSVGElement>(null)

  useOnClickOutside(drawerRef, () => setIsDrawerOpen(false), [btnRef])

  const toggleDrawer = () =>
    isDrawerOpen ? setIsDrawerOpen(false) : setIsDrawerOpen(true)

  return (
    <>
      {!isDrawerOpen && (
        <span className='fixed right-2 top-2 lg:hidden'>
          <MenuIcon
            className='text-4xl-important'
            ref={btnRef}
            onClick={toggleDrawer}
          />
        </span>
      )}
      <Transition
        show={isDrawerOpen}
        enter='transition duration-150'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        {isDrawerOpen && (
          <span className='fixed right-2 top-2 text-white z-50 lg:hidden'>
            <CloseIcon
              className='text-4xl-important'
              ref={btnRef}
              onClick={toggleDrawer}
            />
          </span>
        )}
        <ul
          className='h-full fixed z-20 top-0 right-0 bg-[rgba(0,0,0,0.9)] pt-16 pl-6 pr-20 text-white text-xl flex flex-col gap-4'
          ref={drawerRef}
        >
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.id}>
                <span className='flex items-center gap-2'>
                  <link.icon className='text-4xl-important' />
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Transition>
    </>
  )
}
