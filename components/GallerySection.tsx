import { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { Section } from '.'

import babyPic from '../public/posts/baby.jpg'
import baby2Pic from '../public/posts/baby2.jpg'
import birthdayPic from '../public/posts/birthday.jpg'
import carsPic from '../public/posts/cars.jpg'
import cars2Pic from '../public/posts/cars2.jpg'
import marvelPic from '../public/posts/marvel.jpg'
import potterPic from '../public/posts/potter.jpg'
import potter2Pic from '../public/posts/potter2.jpg'
import potter3Pic from '../public/posts/potter3.jpg'

const posts = [
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

export const GallerySection = () => {
  const [postIndex, setPostIndex] = useState(0)

  const atFirstPost = postIndex === 0
  const atLastPost = postIndex === posts.length - 1

  const goToNextPost = () => setPostIndex(postIndex + 1)
  const goToPrevPost = () => setPostIndex(postIndex - 1)

  return (
    <Section id='gallery' header='Gallery'>
      {/* Mobile Gallery */}
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
      {/* Desktop Gallery */}
      <div className='hidden grid-cols-3 gap-4 lg:grid'>
        {posts.map((post, index) => (
          <Image src={post} alt='Post' className='rounded-xl' key={index} />
        ))}
      </div>
    </Section>
  )
}

type GalleryButtonProps = {
  side: 'left' | 'right'
  onClick: () => void
  disabled: boolean
}

const GalleryButton = ({ side, ...props }: GalleryButtonProps) => {
  const classes = classNames(
    'flex items-center text-white bg-black opacity-100 bg-opacity-70 disabled:opacity-30',
    side === 'left' ? 'rounded-r-md' : 'rounded-l-md'
  )

  return (
    <button className={classes} {...props}>
      <span className='material-symbols-outlined large'>{`chevron_${side}`}</span>
    </button>
  )
}
