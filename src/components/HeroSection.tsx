import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const tickerTexts = [
    "you don't control?",
    "that doesn't let you leave?",
    "that doesn't let you leave?",
    "your team doesn't understand?",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)

      // Wait for animation to complete, then change text
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % tickerTexts.length)
        setIsAnimating(false)
      }, 500) // Half a second for the slide animation
    }, 5500) // 5 seconds + 0.5 seconds for animation

    return () => clearInterval(interval)
  }, [])

  return (
    <section className='relative w-screen min-h-screen md:min-h-svh grid place-items-center overflow-hidden bg-white'>
      {/* Decorative 3D shapes */}
      <Image
        src='/left-glass.png' // put your left asset in /public
        className='pointer-events-none select-none hidden md:block absolute left-6 top-1/3 w-[26vw] max-w-[360px] z-10'
        alt=''
        aria-hidden='true'
        width={1000}
        height={1000}
      />
      <Image
        src='/right-glass.png' // put your right asset in /public
        className='pointer-events-none select-none hidden md:block absolute right-6 bottom-8 w-[26vw] max-w-[360px] z-10'
        alt=''
        aria-hidden='true'
        width={1000}
        height={1000}
      />

      {/* Center content */}
      <div className='w-11/12 max-w-3xl mx-auto px-4 text-center z-20'>
        {/* Thin intro line: Inter 100, 42/58 at md+ */}
        <p className='text-[28px] leading-[40px] md:text-[42px] font-extralight md:leading-[58px] text-neutral-600'>
          Will your future stand on the
          <br className='hidden sm:block' />
          foundation of robust infrastructure
        </p>

        {/* Animated ticker headline */}
        <div className='mt-4 h-[6rem] md:h-[8rem] relative overflow-hidden'>
          <h1
            className={`absolute inset-0 text-4xl md:text-6xl font-extrabold tracking-tight text-black transition-all duration-500 ease-in-out flex items-center justify-center ${
              isAnimating
                ? 'transform translate-y-full opacity-0'
                : 'transform translate-y-0 opacity-100'
            }`}
          >
            {tickerTexts[currentTextIndex]}
          </h1>
        </div>

        {/* Supporting copy */}
        <p className='mt-4 max-w-2xl mx-auto text-base md:text-lg text-neutral-700'>
          Half-baked tech? Not our style. We serve precision, performance, and a
          damn good design
        </p>

        {/* CTA with subtle purple glow */}
        <div className='mt-8'>
          <a
            href='#contact'
            className='inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white font-semibold
                       outline outline-2 outline-purple-500/40 shadow-[0_0_24px_0_rgba(168,85,247,0.35)]
                       hover:outline-purple-500/60 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.45)]
                       transition-all'
          >
            Let&apos;s get moving!
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
