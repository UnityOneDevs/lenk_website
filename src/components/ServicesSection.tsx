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

  // Reveal animation trigger
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Track viewport (SSR-safe: runs only in client)
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth
      setViewport(w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop')
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const cardsPerView = viewport === 'mobile' ? 1 : viewport === 'tablet' ? 2 : 4
  const maxIndex = Math.max(0, services.length - cardsPerView)
  const stepPercent = 100 / cardsPerView // shift by one card

  // Clamp index if viewport changes
  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex)
  }, [maxIndex])

  const next = () => setCurrentIndex((i) => (i + 1) % (maxIndex + 1))
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + (maxIndex + 1)) % (maxIndex + 1))

  const translate = currentIndex * stepPercent

  return (
    <section className='relative w-full bg-neutral-50 py-20 px-4 overflow-hidden antialiased'>
      <div className='max-w-7xl mx-auto'>
        {/* Headings */}
        <div className='text-left mb-16'>
          <div
            className={`transition-all duration-1000 ease-out transform ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className='font-inter font-[100] lowercase text-[clamp(34px,6vw,72px)] leading-[1.15] tracking-[0.015em] text-neutral-900'>
              built to design.
            </h2>
            <h2 className='font-inter font-[100] lowercase text-[clamp(34px,6vw,72px)] leading-[1.15] tracking-[0.015em] text-neutral-900 mt-1'>
              engineered to scale.
            </h2>
          </div>

          <p
            className={`max-w-4xl text-xl md:text-2xl lg:text-3xl font-bold text-black leading-relaxed transition-all duration-1000 ease-out delay-300 transform ${
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
          className='relative mb-12'
          role='region'
          aria-roledescription='carousel'
          aria-label='Our services'
        >
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-500 ease-in-out touch-pan-x select-none'
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
                    className={`bg-white border border-neutral-200 rounded-[24px] p-4 md:p-6 lg:p-8 h-full transition-all duration-700 ease-out transform ${
                      isVisible
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-12 opacity-0'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className='flex items-start gap-3 md:gap-4'>
                      <span
                        className='w-2 md:w-3 h-2 md:h-3 bg-white border border-black rounded-full mt-2 flex-shrink-0'
                        aria-hidden
                      />
                      <div>
                        <h3 className='text-lg md:text-xl font-extralight text-black mb-2 md:mb-3'>
                          {service.title}
                        </h3>
                        <p className='text-sm md:text-base text-neutral-700 leading-relaxed font-extralight'>
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
        <div className='flex justify-center gap-4 mb-6'>
          <button
            onClick={prev}
            className='w-10 h-10 md:w-12 md:h-12 bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 group touch-manipulation'
            aria-label='Previous'
          >
            <svg
              className='w-4 h-4 md:w-5 md:h-5 text-neutral-600 group-hover:text-black transition-colors duration-200'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <button
            onClick={next}
            className='w-10 h-10 md:w-12 md:h-12 bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 group touch-manipulation'
            aria-label='Next'
          >
            <svg
              className='w-4 h-4 md:w-5 md:h-5 text-neutral-600 group-hover:text-black transition-colors duration-200'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>

        {/* Position dots (one per scroll position) */}
        <div className='flex justify-center gap-2'>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to position ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === currentIndex ? 'bg-neutral-400 w-6' : 'bg-neutral-200 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/*
Notes
-----
1) Headline uses Inter at weight 100. Ensure Inter 100 is loaded in your app.
2) Paging logic: index ranges from 0..(services.length - cardsPerView). We shift by one card at a time for smooth control.
3) If you prefer page-by-page movement, change next/prev to +/- cardsPerView and clamp to maxIndex.
*/
