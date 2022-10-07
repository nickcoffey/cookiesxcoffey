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
      <h2 className='mb-4 tracking-normal text-center text-8xl lg:text-left text-darkprimary font-bdscript'>
        {header}
      </h2>
      {children}
    </section>
  )
}
