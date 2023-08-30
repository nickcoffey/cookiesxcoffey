import Image from 'next/image'
import classNames from 'classnames'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRightOutlined'
import { posts } from '../pages/gallery'
import type { CommonGalleryProps, GalleryButtonProps } from '../pages/gallery'

export const MobileGallery = ({
  postIndex,
  goToNextPost,
  goToPrevPost,
  atFirstPost,
  atLastPost
}: CommonGalleryProps) => (
  <div className='relative flex items-center lg:hidden'>
    <div className='absolute z-10 flex items-center justify-between w-full'>
      <GalleryButton
        side='left'
        onClick={goToPrevPost}
        disabled={atFirstPost}
      />
      <GalleryButton
        side='right'
        onClick={goToNextPost}
        disabled={atLastPost}
      />
    </div>
    <Image
      src={posts[postIndex]}
      alt='Post'
      className='absolute top-0 rounded-xl'
    />
  </div>
)

const GalleryButton = ({ side, ...props }: GalleryButtonProps) => {
  const classes = classNames(
    'flex items-center text-white bg-black opacity-100 bg-opacity-70 disabled:opacity-30',
    side === 'left' ? 'rounded-r-md' : 'rounded-l-md'
  )

  return (
    <button type='button' className={classes} {...props}>
      {side === 'left' ? <ChevronLeftIcon className='text-4xl-important' /> : <ChevronRightIcon className='text-4xl-important' />}
    </button>
  )
}
