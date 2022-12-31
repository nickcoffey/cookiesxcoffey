import { useRef, useState, forwardRef } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { useOnClickOutside } from '../hooks'
import { posts } from '.'
import type { CommonGalleryProps, GalleryButtonProps } from './GallerySection'

type DesktopGalleryProps = CommonGalleryProps & {
  setPostIndex: (postIndex: number) => void
}

export const DesktopGallery = (props: DesktopGalleryProps) => {
  const [showFullscreenPost, setShowFullscreenPost] = useState(false)

  const onPostClick = (index: number) => {
    props.setPostIndex(index)
    setShowFullscreenPost(true)
  }

  return (
    <>
      <div className='hidden grid-cols-3 gap-4 lg:grid'>
        {posts.map((post, index) => (
          <Image
            src={post}
            alt='Post'
            className='transition duration-150 cursor-pointer rounded-xl hover:opacity-70'
            onClick={() => onPostClick(index)}
            key={index}
          />
        ))}
      </div>
      {showFullscreenPost && (
        <FullscreenCarousel
          setShowFullscreenPost={setShowFullscreenPost}
          {...props}
        />
      )}
    </>
  )
}

type FullscreenCarouselProps = {
  setShowFullscreenPost: (showFullscreenPost: boolean) => void
} & Omit<DesktopGalleryProps, 'setPostIndex'>

const FullscreenCarousel = ({
  postIndex,
  goToNextPost,
  goToPrevPost,
  atFirstPost,
  atLastPost,
  setShowFullscreenPost
}: FullscreenCarouselProps) => {
  const leftBtnRef = useRef<HTMLSpanElement>(null)
  const rightBtnRef = useRef<HTMLSpanElement>(null)
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
        className='fixed flex items-center px-2 py-1 text-white transition duration-150 bg-black bg-opacity-50 rounded-md cursor-pointer top-4 right-4 hover:bg-opacity-100'
      >
        <span className='text-3xl material-symbols-outlined'>close</span>
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

const GalleryButton = forwardRef<HTMLSpanElement, GalleryButtonProps>(
  ({ side, ...props }: GalleryButtonProps, ref) => {
    const classes = classNames(
      'fixed flex items-center text-white bg-black rounded-md transition duration-150 bg-opacity-50 hover:bg-opacity-100 disabled:opacity-30 disabled:bg-opacity-100 disabled:cursor-not-allowed',
      side === 'left' ? 'left-64' : 'right-64'
    )

    return (
      <button type='button' className={classes} {...props}>
        <span
          className='text-5xl material-symbols-outlined'
          ref={ref}
        >{`chevron_${side}`}</span>
      </button>
    )
  }
)

GalleryButton.displayName = 'GalleryButton'
