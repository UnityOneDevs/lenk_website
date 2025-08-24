import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='description'
          content='Lenk is a leading digital & technology solutions company specializing in innovative web solutions, digital transformation, and cutting-edge technology services. We help businesses thrive in the digital age.'
        />
        <meta
          name='keywords'
          content='digital agency, web development, digital transformation, technology services, innovation, Lenk, business solutions, digital strategy, technology solutions, digital products, digital marketing, digital transformation, digital strategy, digital agency, digital solutions, digital technology, digital innovation, digital transformation, digital strategy, digital agency, digital solutions, digital technology, digital innovation'
        />
        <meta
          property='og:title'
          content='Lenk | Digital & Technology Solutions'
        />
        <meta
          property='og:description'
          content="Transform your business with Lenk's innovative digital solutions. We specialize in web development, digital transformation, and cutting-edge technology services."
        />
        <meta property='og:image' content='/logo.svg' />
        <meta property='og:url' content='https://lenksolutions.com/' />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='Lenk | Digital & Technology Solutions'
        />
        <meta
          name='twitter:description'
          content="Transform your business with Lenk's innovative digital solutions. We specialize in web development, digital transformation, and cutting-edge technology services."
        />
        <meta name='twitter:image' content='/logo.svg' />
        <link rel='canonical' href='https://lenksolutions.com/' />
        <meta name='theme-color' content='#000000' />
      </Head>
      <body className='antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
