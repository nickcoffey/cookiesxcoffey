import { useState } from 'react'
import { MobileGallery } from './MobileGallery'
import { DesktopGallery } from './DesktopGallery'
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

export const GallerySection = () => {
  const [postIndex, setPostIndex] = useState(0)

  const atFirstPost = postIndex === 0
  const atLastPost = postIndex === posts.length - 1

  const goToNextPost = () => setPostIndex(postIndex + 1)
  const goToPrevPost = () => setPostIndex(postIndex - 1)

  const commonGalleryProps = {
    postIndex,
    goToNextPost,
    goToPrevPost,
    atFirstPost,
    atLastPost
  }

  return (
    <Section id='gallery' header='Gallery'>
      <MobileGallery {...commonGalleryProps} />
      <DesktopGallery setPostIndex={setPostIndex} {...commonGalleryProps} />
    </Section>
  )
}
