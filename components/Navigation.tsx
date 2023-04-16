import { useState, useEffect, useRef, forwardRef } from 'react'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import PersonIcon from '@mui/icons-material/PersonOutlined'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibraryOutlined'
import EmailIcon from '@mui/icons-material/EmailOutlined'
import MenuIcon from '@mui/icons-material/MenuOutlined'
import CloseIcon from '@mui/icons-material/CloseOutlined'
import classNames from 'classnames'
import { Transition } from '@headlessui/react'
import { useOnClickOutside } from '../hooks'
import type { Icon } from '../types'

type LinkName = 'Home' | 'About' | 'Gallery' | 'Order'
type Link = { name: LinkName; icon: Icon; id?: string }

const links: Link[] = [
  { name: 'Home', icon: HomeIcon },
  { name: 'About', icon: PersonIcon, id: 'about' },
  { name: 'Gallery', icon: PhotoLibraryIcon, id: 'gallery' },
  { name: 'Order', icon: EmailIcon, id: 'order' }
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
        <a
          className='items-start justify-center hidden gap-2 px-4 py-2 transition duration-150 rounded-md cursor-pointer select-none lg:flex hover:text-black hover:bg-primary'
          onClick={() => handleLinkClick(link.id)}
          key={index}
        >
          <link.icon />
          {link.name}
        </a>
      ))}
      {/* Mobile Nav */}
      <HomeIcon onClick={scrollToTop} className='text-4xl-important lg-hidden-important' />
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
      <span className='fixed right-2 top-2 lg:hidden'>
        {isDrawerOpen ? <CloseIcon className='text-4xl-important' ref={btnRef} onClick={toggleDrawer} /> :
          <MenuIcon className='text-4xl-important' ref={btnRef}  onClick={toggleDrawer} />}
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
              <link.icon className='text-4xl-important' />
              {link.name}
            </li>
          ))}
        </ul>
      </Transition>
    </>
  )
}
