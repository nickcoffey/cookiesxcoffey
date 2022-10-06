import type { ReactNode } from 'react'

type Props = {
  id: string
  header: string
  className?: string
  children: ReactNode
}

export const Section = ({ id, header, className, children }: Props) => {
  return (
    <section id={id} className={className}>
      <h2 className='mb-4 text-3xl text-center lg:text-left text-darkprimary'>
        {header}
      </h2>
      {children}
    </section>
  )
}
