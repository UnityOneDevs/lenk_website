import React, { useEffect, useRef, useState } from 'react'

// LENK – Vision & Mission Triptych
// Responsive 3-column layout with subtle Aceternity-style animations:
// - Sticky-ish soft spotlight on hover
// - Fade-up on scroll (IntersectionObserver)
// - Mobile stacks to 1 col, tablet 2, desktop 3

const blocks = [
  {
    no: '01',
    title: 'What keeps us building..',
    body: 'Hey there, welcome to LENK—where bold ideas meet brilliant builders. We’re a curated crew of senior devs, creative technologists, and product‑minded problem solvers. Think of us as your on‑demand tech dream team—ready to turn ambitious ideas into slick, scalable products. We don’t just code—we co‑create. Whether you’re launching your first startup, reinventing your platform, or dreaming up something wild, we’re here to build it with you: fast, smart, and with zero fluff. What sets us apart? It’s the vibe. We bring energy, honesty, and top‑tier craft—minus the agency bloat or freelance chaos. You talk. We listen. Then we get to work. Let’s build something that actually ships.',
  },
  {
    no: '02',
    title: 'LENK’s Vision',
    body: 'We’re raising the bar for digital products—how they’re imagined, engineered, and experienced. For us, ‘awesome’ isn’t a buzzword; it’s a standard. We partner with teams who care about doing it right, not just fast. Together we craft products that are bold, smart, and built to last. This is LENK: where clear thinking meets exceptional execution.',
  },
  {
    no: '03',
    title: 'LENK’s Mission',
    body: 'Lead the next wave of digital transformation by solving real business problems with human‑centered technology. We decode inefficiency, streamline workflows, and design intelligent systems that expand reach and accelerate growth. Every solution is purposeful, measurable, and made to endure—one focused outcome at a time.',
  },
] as const

type Block = (typeof blocks)[number]

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
      ([e]) => e.isIntersecting && setInView(true),
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function VisionMissionTriptych() {
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>(0.25)

  return (
    <section className='w-full bg-white py-20 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div
          ref={headRef}
          className={`mb-10 md:mb-14 transition-all duration-700 ${
            headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <h2 className='text-center text-2xl md:text-4xl font-thin text-neutral-400'>
            Why LENK exists
          </h2>
          <p className='mt-4 text-center max-w-3xl mx-auto text-neutral-800 font-semibold text-base md:text-xl'>
            Not just an agency. Not just a dev shop. We’re the product team you
            call when outcomes matter.
          </p>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {blocks.map((b, i) => (
            <TriptychCard key={b.no} block={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TriptychCard({ block, index }: { block: Block; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.18)
  return (
    <article
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* spotlight (Aceternity-style) */}
      <div
        aria-hidden
        className='pointer-events-none absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500'
        style={{
          background:
            'radial-gradient(250px 250px at var(--mx,50%) var(--my,35%), rgba(168,85,247,0.12), transparent 60%)',
        }}
      />
      {/* track mouse for spotlight */}
      <div
        className='absolute inset-0'
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty(
            '--mx',
            `${((e.clientX - r.left) / r.width) * 100}%`
          )
          e.currentTarget.style.setProperty(
            '--my',
            `${((e.clientY - r.top) / r.height) * 100}%`
          )
        }}
      />

      <div className='text-sm font-semibold text-purple-500'>{block.no}</div>
      <h3 className='mt-3 text-xl font-semibold text-neutral-900'>
        {block.title}
      </h3>
      <p className='mt-3 text-[15px] leading-7 text-neutral-700'>
        {block.body}
      </p>
    </article>
  )
}
