import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

// Built for Every Industry – mobile‑first, responsive grid with images
// - Headline + subhead
// - 12 dark cards (title, blurb, image)
// - Grid: 1 col → 2 cols (sm) → 3 cols (lg)
// - Light on-scroll reveal (IntersectionObserver)

const industries = [
  {
    title: 'Fintech',
    blurb:
      'From faster payments to fraud-fighting systems, we build trust into every transaction.',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1400&auto=format&fit=crop',
    alt: 'Digital banking and fintech interface',
  },
  {
    title: 'Energy',
    blurb:
      'Clean code for a clean grid. We power smarter, greener ops from edge to enterprise.',
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1400&auto=format&fit=crop',
    alt: 'Solar panels and renewable energy',
  },
  {
    title: 'Automotive',
    blurb:
      'Drive fast, code faster. Intelligent in-car and factory systems that actually ship.',
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1400&auto=format&fit=crop',
    alt: 'Modern car dashboard with technology',
  },
  {
    title: 'Healthcare',
    blurb:
      "Tech that doesn't get in the way. Build for outcomes, privacy, and clinicians.",
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1400&auto=format&fit=crop',
    alt: 'Medical technology and digital health',
  },
  {
    title: 'Government',
    blurb:
      'Secure, transparent digital services at scale. No more maze—just outcomes.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop',
    alt: 'Modern government building with technology',
  },
  {
    title: 'Education',
    blurb:
      'Learning platforms that work in real classrooms—measurable results, elegant UX.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop',
    alt: 'Students using digital learning tools',
  },
  {
    title: 'Retail',
    blurb:
      'From checkout flows to inventory, we design and build retail that converts.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1400&auto=format&fit=crop',
    alt: 'Modern retail checkout and shopping experience',
  },
  {
    title: 'Real Estate',
    blurb:
      'Listings, CRM, and transactions—all stitched with clear, performant UX.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop',
    alt: 'Modern real estate office with technology',
  },
  {
    title: 'Hospitality',
    blurb:
      'Delightful guest journeys—from booking to stay—reliable, smooth, and branded.',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400&auto=format&fit=crop',
    alt: 'Luxury hotel lobby and digital check-in',
  },
  {
    title: 'Media & Entertainment',
    blurb:
      'Tools for creators and fans. Crisp content flows with rock-solid infra.',
    img: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1400&auto=format&fit=crop',
    alt: 'Professional video production and streaming setup',
  },
  {
    title: 'Logistics',
    blurb:
      'We track, route, and automate with pixel-perfect visibility across the chain.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1400&auto=format&fit=crop',
    alt: 'Modern warehouse with automation and tracking systems',
  },
  {
    title: 'Lifestyle',
    blurb:
      'From wellness apps to smart home systems—design that blends into life.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop',
    alt: 'Smart home technology and lifestyle apps',
  },
]

// Simple in-view hook for reveal animations
function useInView<T extends Element>(threshold = 0.12) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function IndustriesSection() {
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.3)

  return (
    <section className='w-full bg-white py-20 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Headline */}
        <div
          ref={headRef}
          className={`text-center transition-all duration-700 ${
            headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <h2 className='text-2xl md:text-4xl font-thin text-neutral-400'>
            Built for Every Industry.
            <br className='hidden sm:block' /> Trusted Across All.
          </h2>
          <p className='mt-6 text-base md:text-xl font-bold text-neutral-900 max-w-3xl mx-auto'>
            We don’t just serve industries. We shape them. With code, craft, and
            credibility, we turn complex needs into seamless digital realities.
          </p>
        </div>

        {/* Grid */}
        <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {industries.map((item, i) => (
            <IndustryCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function IndustryCard({
  item,
  index,
}: {
  item: (typeof industries)[number]
  index: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 p-5 md:p-6 flex flex-col h-full transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Text */}
      <div>
        <h3 className='text-white font-semibold text-base md:text-lg'>
          {item.title}
        </h3>
        <p className='mt-2 text-sm md:text-[15px] leading-relaxed text-neutral-300'>
          {item.blurb}
        </p>
      </div>

      {/* Image */}
      <div className='mt-4 rounded-xl overflow-hidden aspect-[16/10]'>
        <Image
          src={item.img}
          alt={item.alt}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          loading='lazy'
          width={500}
          height={500}
        />
      </div>

      {/* Subtle hover border glow */}
      <span className='pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-white/10 transition' />
    </div>
  )
}
