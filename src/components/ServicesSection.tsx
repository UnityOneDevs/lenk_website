import React, { useEffect, useState } from 'react'

// Responsive services carousel with super‑thin headline
// - Keeps the ultra‑light headline style
// - Correct paging math (no over/underscroll)
// - Animates cards on reveal
// - Works for 1/2/4 cards per view (mobile/tablet/desktop)

const services = [
  {
    title: 'Design',
    description:
      'Crafting intuitive, emotionally-driven interfaces. We blend aesthetics with strategy to design digital experiences that speak to your users and support business goals.',
  },
  {
    title: 'Branding & Strategy',
    description:
      'Distinctive identity with meaningful direction. We craft visual identities and strategic roadmaps that align design, messaging, and long-term business goals.',
  },
  {
    title: 'Product Engineering',
    description:
      'Robust architecture meets seamless functionality. Scalable and reliable products with a focus on precision, speed, and future proofing.',
  },
  {
    title: 'Data & Machine Learning',
    description:
      'Unlock insights, automate decisions, drive growth. We build ML models, train data pipelines, and deliver intelligent systems that empower data-driven transformation.',
  },
  {
    title: 'Optimisation',
    description:
      'Boost performance, reduce friction, increase ROI. We audit your systems, fine-tune processes, and eliminate inefficiencies across design, code, and cloud.',
  },
  {
    title: 'Application Development',
    description:
      'From MVP to enterprise-grade software. We build responsive, secure, and scalable applications tailored to your product vision and market demands.',
  },
  {
    title: 'Cloud Services',
    description:
      'Flexible, secure, and scalable cloud solutions. Our cloud team architects and manages systems that support scale, uptime, and future-readiness across infrastructures.',
  },
  {
    title: 'DevOps & QA',
    description:
      'Smooth deployment and rock-solid stability. We automate delivery pipelines, monitor systems, and test thoroughly to ensure your product performs under pressure.',
  },
]

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop'
  )
  const [isClient, setIsClient] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Reveal animation trigger
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Track viewport (SSR-safe: runs only in client)
  useEffect(() => {
    setIsClient(true)
    const onResize = () => {
      const w = window.innerWidth
      setViewport(w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop')
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPaused && isClient) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(0, services.length - cardsPerView)
          return (prevIndex + 1) % (maxIndex + 1)
        })
      }, 4000) // Auto-scroll every 4 seconds

      return () => clearInterval(interval)
    }
  }, [isPaused, isClient])

  // Use default viewport until client-side hydration is complete
  const effectiveViewport = isClient ? viewport : 'desktop'
  const cardsPerView =
    effectiveViewport === 'mobile' ? 1 : effectiveViewport === 'tablet' ? 2 : 4
  const maxIndex = Math.max(0, services.length - cardsPerView)
  const stepPercent = 100 / cardsPerView // shift by one card

  // Clamp index if viewport changes
  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex)
  }, [maxIndex, currentIndex])

  const next = () => {
    setIsPaused(true)
    setCurrentIndex((i) => (i + 1) % (maxIndex + 1))
    // Resume auto-scroll after 3 seconds of manual navigation
    setTimeout(() => setIsPaused(false), 3000)
  }

  const prev = () => {
    setIsPaused(true)
    setCurrentIndex((i) => (i - 1 + (maxIndex + 1)) % (maxIndex + 1))
    // Resume auto-scroll after 3 seconds of manual navigation
    setTimeout(() => setIsPaused(false), 3000)
  }

  const translate = currentIndex * stepPercent

  return (
    <section className='relative w-full bg-neutral-50 py-20 px-4 overflow-hidden antialiased'>
      {/* Elegant animated background effect */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 overflow-hidden'
      >
        {/* Floating geometric shapes */}
        <div
          className='absolute right-[15%] top-[20%] w-32 h-32 border border-neutral-200/30 rounded-full blur-sm'
          style={{
            animation: 'floatShape 15s ease-in-out infinite',
          }}
        />
        <div
          className='absolute left-[10%] top-[60%] w-24 h-24 border border-neutral-200/20 rotate-45 blur-sm'
          style={{
            animation: 'floatShape 12s ease-in-out infinite reverse',
          }}
        />
        <div
          className='absolute right-[25%] bottom-[25%] w-20 h-20 border border-neutral-200/25 rounded-full blur-sm'
          style={{
            animation: 'floatShape 18s ease-in-out infinite',
          }}
        />

        {/* Subtle gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-neutral-50/80 via-neutral-50/40 to-neutral-100/60' />

        {/* Floating dots pattern */}
        <div
          className='absolute left-[20%] top-[30%] w-2 h-2 bg-neutral-300/40 rounded-full'
          style={{
            animation: 'floatDot 8s ease-in-out infinite',
          }}
        />
        <div
          className='absolute right-[30%] top-[50%] w-1.5 h-1.5 bg-neutral-300/30 rounded-full'
          style={{
            animation: 'floatDot 10s ease-in-out infinite reverse',
          }}
        />
        <div
          className='absolute left-[40%] bottom-[40%] w-1 h-1 bg-neutral-300/50 rounded-full'
          style={{
            animation: 'floatDot 12s ease-in-out infinite',
          }}
        />
      </div>

      <div className='relative max-w-7xl mx-auto'>
        {/* Headings */}
        <div className='text-left mb-20'>
          <div
            className={`transition-all duration-1200 ease-out transform ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className='font-inter font-[100] lowercase text-[clamp(34px,6vw,72px)] leading-[1.15] tracking-[0.015em] text-neutral-800'>
              built to design.
            </h2>
            <h2 className='font-inter font-[100] lowercase text-[clamp(34px,6vw,72px)] leading-[1.15] tracking-[0.015em] text-neutral-800 mt-1'>
              engineered to scale.
            </h2>
          </div>

          <p
            className={`max-w-4xl text-xl md:text-2xl lg:text-3xl font-light text-neutral-600 leading-relaxed transition-all duration-1200 ease-out delay-500 transform ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            From branding to backend, we craft powerful digital ecosystems that
            think, feel, and perform.
          </p>
        </div>

        {/* Carousel */}
        <div
          className='relative mb-16'
          role='region'
          aria-roledescription='carousel'
          aria-label='Our services'
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-700 ease-out touch-pan-x select-none'
              style={{ transform: `translateX(-${translate}%)` }}
            >
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`${
                    cardsPerView === 1
                      ? 'w-full'
                      : cardsPerView === 2
                      ? 'w-1/2'
                      : 'w-1/4'
                  } flex-shrink-0 px-2 md:px-4`}
                >
                  <div
                    className={`group bg-white/90 backdrop-blur-md border border-neutral-200/40 rounded-[28px] p-6 md:p-8 lg:p-10 h-full transition-all duration-800 ease-out transform hover:bg-white/95 hover:border-neutral-300/60 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.04)] hover:-translate-y-1 ${
                      isVisible
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-12 opacity-0'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className='flex items-start gap-4 md:gap-5'>
                      <span
                        className='w-3 md:w-4 h-3 md:h-4 bg-purple-100 border border-purple-400/30 rounded-full mt-2 flex-shrink-0 shadow-sm group-hover:shadow-md transition-all duration-300'
                        aria-hidden
                      />
                      <div className='flex-1'>
                        <h3 className='text-xl md:text-2xl font-extralight text-neutral-800 mb-3 md:mb-4 group-hover:text-neutral-900 transition-colors duration-300'>
                          {service.title}
                        </h3>
                        <p className='text-sm md:text-base text-neutral-600 leading-relaxed font-light group-hover:text-neutral-700 transition-colors duration-300'>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nav buttons */}
        <div className='flex justify-center gap-6 mb-8'>
          <button
            onClick={prev}
            className='w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md border border-neutral-200/50 rounded-full flex items-center justify-center shadow-[0_8px_25px_-8px_rgba(0,0,0,0.15),0_4px_10px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25),0_8px_20px_-4px_rgba(0,0,0,0.1)] hover:bg-white/95 hover:border-purple-300/40 hover:scale-105 transition-all duration-300 group touch-manipulation'
            aria-label='Previous'
          >
            <svg
              className='w-5 h-5 md:w-6 md:h-6 text-neutral-500 group-hover:text-purple-600 transition-colors duration-300'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <button
            onClick={next}
            className='w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md border border-neutral-200/50 rounded-full flex items-center justify-center shadow-[0_8px_25px_-8px_rgba(0,0,0,0.15),0_4px_10px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25),0_8px_20px_-4px_rgba(0,0,0,0.1)] hover:bg-white/95 hover:border-purple-300/40 hover:scale-105 transition-all duration-300 group touch-manipulation'
            aria-label='Next'
          >
            <svg
              className='w-5 h-5 md:w-6 md:h-6 text-neutral-500 group-hover:text-purple-600 transition-colors duration-300'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>

        {/* Position dots (one per scroll position) */}
        <div className='flex justify-center gap-3'>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsPaused(true)
                setCurrentIndex(i)
                // Resume auto-scroll after 3 seconds of manual navigation
                setTimeout(() => setIsPaused(false), 3000)
              }}
              aria-label={`Go to position ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 hover:scale-110 ${
                i === currentIndex
                  ? 'bg-black w-8 shadow-sm'
                  : 'bg-neutral-200/60 w-2 hover:bg-neutral-300/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Keyframes for floating animations */}
      <style>{`
        @keyframes floatShape {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-15px) scale(1.2); opacity: 0.8; }
        }
      `}</style>
    </section>
  )
}

/*
Notes
-----
1) Headline uses Inter at weight 100. Ensure Inter 100 is loaded in your app.
2) Paging logic: index ranges from 0..(services.length - cardsPerView). We shift by one card at a time for smooth control.
3) If you prefer page-by-page movement, change next/prev to +/- cardsPerView and clamp to maxIndex.
4) Added elegant floating geometric shapes and subtle gradient overlay for visual interest.
5) Enhanced cards with backdrop-blur and improved hover effects.
*/
