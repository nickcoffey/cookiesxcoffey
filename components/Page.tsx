import { Layout, Main } from '.'
import type { ReactNode } from 'react'

type Props = {
  header: string
  children: ReactNode
}

export const Page = ({ header, children }: Props) => {
  return (
    <Layout>
      <h1 className='mt-[52px] lg:mt-14 mb-4 tracking-normal text-center text-8xl text-darkprimary font-bdscript'>
        {header}
      </h1>
      <Main>{children}</Main>
    </Layout>
  )
}
