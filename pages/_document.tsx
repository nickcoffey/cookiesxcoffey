import { Html, Head, Main, NextScript } from 'next/document'

// https://fonts.google.com/specimen/Poppins

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* Material Icons */}
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap'
        />
      </Head>
      <body className='tracking-widest text-black bg-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
