import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name="description" content="NoMoo is your all-in-one app to discover, order, and book plant-powered meals while making a real impact on the planet. Join the plant-based revolution!" />
        <meta name="keywords" content="plant-based, vegan, sustainable, food delivery, eco-friendly, NoMoo, restaurant booking, healthy eating" />
        <meta property="og:title" content="NoMoo | Plant-Powered Meals & Sustainable Living" />
        <meta property="og:description" content="Discover, order, and book plant-powered meals with NoMoo. Make a real impact on the planet while enjoying delicious food." />
        <meta property="og:image" content="/footerAssets/logowithname.svg" />
        <meta property="og:url" content="https://nomoo.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NoMoo | Plant-Powered Meals & Sustainable Living" />
        <meta name="twitter:description" content="Discover, order, and book plant-powered meals with NoMoo. Make a real impact on the planet while enjoying delicious food." />
        <meta name="twitter:image" content="/footerAssets/logowithname.svg" />
        <link rel="canonical" href="https://nomoo.app/" />
        <meta name="theme-color" content="#00C853" />
      </Head>
      <body className='antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
