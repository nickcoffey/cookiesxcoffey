import Image from 'next/image'
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
  return (
    <Section id='gallery' header='Gallery'>
      <div className='grid gap-4 lg:grid-cols-3'>
        {posts.map((post, index) => (
          <Image src={post} alt='Post' className='rounded-xl' key={index} />
        ))}
      </div>
    </Section>
  )
}
