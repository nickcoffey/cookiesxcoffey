import { Html, Head, Main, NextScript } from 'next/document'

// https://fonts.google.com/specimen/Poppins

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Google Fonts */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@200;500&display=swap'
          rel='stylesheet'
        />
        {/* Material Icons */}
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&display=swap'
        />
      </Head>
      <body className='text-black bg-lightgrey'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
