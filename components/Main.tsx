import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Main = ({ children }: Props) => {
  return (
    <main className='p-4 lg:py-8 lg:px-24 lg:flex lg:flex-col lg:items-center'>
      <div className='max-w-5xl'>{children}</div>
    </main>
  )
}
