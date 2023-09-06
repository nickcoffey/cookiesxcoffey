import { forwardRef, useRef, useState } from 'react'
import Image from 'next/image'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Page } from '../components'
import { useOnClickOutside } from '../hooks'
import CloseIcon from '@mui/icons-material/CloseOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRightOutlined'
import type { NextPage } from 'next'

import babyPic from '../public/posts/baby.jpg'
import baby2Pic from '../public/posts/baby2.jpg'
import birthdayPic from '../public/posts/birthday.jpg'
import carsPic from '../public/posts/cars.jpg'
import cars2Pic from '../public/posts/cars2.jpg'
import marvelPic from '../public/posts/marvel.jpg'
import potterPic from '../public/posts/potter.jpg'
import potter2Pic from '../public/posts/potter2.jpg'
import potter3Pic from '../public/posts/potter3.jpg'

export const posts = [
  babyPic,
  baby2Pic,
  birthdayPic,
  carsPic,
  cars2Pic,
  marvelPic,
  potterPic,
  potter2Pic,
  potter3Pic
]

const LARGE_PAGE_SIZE = 1024

export type CommonGalleryProps = {
  postIndex: number
  goToNextPost: () => void
  goToPrevPost: () => void
  atFirstPost: boolean
  atLastPost: boolean
}

export type GalleryButtonProps = {
  side: 'left' | 'right'
  onClick: () => void
  disabled: boolean
}

const Gallery: NextPage = () => {
  const [postIndex, setPostIndex] = useState(0)
  const [showFullscreenPost, setShowFullscreenPost] = useState(false)

  const atFirstPost = postIndex === 0
  const atLastPost = postIndex === posts.length - 1

  const goToNextPost = () => setPostIndex(postIndex + 1)
  const goToPrevPost = () => setPostIndex(postIndex - 1)

  const onPostClick = (index: number) => {
    setPostIndex(index)
    setShowFullscreenPost(true)
  }

  const handlePostClick = (postIndex: number) => {
    if (
      window.innerWidth > LARGE_PAGE_SIZE ||
      window.innerWidth === LARGE_PAGE_SIZE
    ) {
      onPostClick(postIndex)
    }
  }

  return (
    <Page header='Gallery'>
      <div className='grid gap-4 lg:grid-cols-3'>
        {posts.map((post, index) => (
          <Image
            src={post}
            alt='Post'
            className='transition duration-150 rounded-xl lg:cursor-pointer lg:hover:opacity-70'
            onClick={() => handlePostClick(index)}
            key={index}
          />
        ))}
      </div>
      <Transition
        show={showFullscreenPost}
        enter='transition duration-150'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <FullscreenCarousel
          setShowFullscreenPost={setShowFullscreenPost}
          atLastPost={atLastPost}
          atFirstPost={atFirstPost}
          goToNextPost={goToNextPost}
          goToPrevPost={goToPrevPost}
          postIndex={postIndex}
        />
      </Transition>
    </Page>
  )
}

type FullscreenCarouselProps = {
  setShowFullscreenPost: (showFullscreenPost: boolean) => void
} & CommonGalleryProps

const FullscreenCarousel = ({
  postIndex,
  goToNextPost,
  goToPrevPost,
  atFirstPost,
  atLastPost,
  setShowFullscreenPost
}: FullscreenCarouselProps) => {
  const leftBtnRef = useRef<SVGSVGElement>(null)
  const rightBtnRef = useRef<SVGSVGElement>(null)
  const imgRef = useRef<HTMLSpanElement>(null)

  useOnClickOutside(
    imgRef,
    () => {
      setShowFullscreenPost(false)
    },
    [leftBtnRef, rightBtnRef]
  )

  return (
    <div className='fixed top-0 right-0 z-10 flex items-center justify-center w-screen h-screen bg-[rgba(0,0,0,0.9)]'>
      <button
        type='button'
        onClick={() => setShowFullscreenPost(false)}
        className='fixed flex items-center p-2 text-white transition duration-150 bg-black bg-opacity-50 rounded-md cursor-pointer top-4 right-4 hover:bg-opacity-100'
      >
        <CloseIcon className='text-3xl-important' />
      </button>
      <GalleryButton
        side='left'
        ref={leftBtnRef}
        onClick={goToPrevPost}
        disabled={atFirstPost}
      />
      <span className='flex items-center justify-center w-1/2' ref={imgRef}>
        <Image
          src={posts[postIndex]}
          alt='Post'
          className='rounded-xl'
          objectFit='fill'
        />
      </span>
      <GalleryButton
        side='right'
        ref={rightBtnRef}
        onClick={goToNextPost}
        disabled={atLastPost}
      />
    </div>
  )
}

const GalleryButton = forwardRef<SVGSVGElement, GalleryButtonProps>(
  ({ side, ...props }: GalleryButtonProps, ref) => {
    const classes = classNames(
      'fixed flex items-center text-white bg-black rounded-md transition duration-150 bg-opacity-50 hover:bg-opacity-100 disabled:opacity-30 disabled:bg-opacity-100 disabled:cursor-not-allowed',
      side === 'left' ? 'left-64' : 'right-64'
    )

    return (
      <button type='button' className={classes} {...props}>
        {side === 'left' ? (
          <ChevronLeftIcon className='text-5xl-important' ref={ref} />
        ) : (
          <ChevronRightIcon className='text-5xl-important' ref={ref} />
        )}
      </button>
    )
  }
)

GalleryButton.displayName = 'GalleryButton'

export default Gallery
