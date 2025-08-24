import React from 'react'

// About hero with purple lamp effect + blinking cursor
// - Mobile friendly (stacks nicely, smaller lamp)
// - Accessible and lightweight (pure Tailwind + a tiny <style> for keyframes)
// - Copy tightened to be confident but human

export default function AboutLampHero() {
  return (
    <section className='relative w-full bg-white'>
      {/* Lamp effect (purple) */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 overflow-hidden'
      >
        {/* soft spread */}
        <div
          className='absolute left-1/2 md:left-[30%] top-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl'
          style={{
            width: '70vw',
            height: '70vw',
            background:
              'radial-gradient(closest-side, rgba(168,85,247,0.35), rgba(168,85,247,0.18) 40%, rgba(168,85,247,0.05) 65%, transparent 70%)',
            animation: 'lampFloat 10s ease-in-out infinite',
          }}
        />
        {/* bright core */}
        <div
          className='absolute left-1/2 md:left-[32%] top-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl'
          style={{
            width: '26vw',
            height: '26vw',
            background:
              'radial-gradient(circle, rgba(168,85,247,0.55), rgba(168,85,247,0.15) 60%, transparent 70%)',
            animation: 'lampFloat 8s ease-in-out infinite',
          }}
        />
      </div>

      <div className='relative max-w-6xl mx-auto px-4 py-24 sm:py-28 lg:py-36'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-thin text-neutral-800 tracking-tight'>
          It’s not{' '}
          <em className='not-italic font-light text-neutral-400'>‘About Us’</em>
          . It’s bigger..
          <span className='align-baseline ml-2 inline-block w-[2px] h-[0.9em] bg-neutral-400 translate-y-[2px] cursor-blink' />
        </h1>

        <p className='mt-8 text-lg sm:text-xl font-semibold text-neutral-900 max-w-3xl'>
          We’ll skip the team photos. Here’s what keeps us building: clarity,
          craft, and shipping things that work in the real world.
        </p>

        {/* value bullets (optional, helpful on mobile) */}
        <ul className='mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-neutral-700'>
          <li className='flex items-start gap-3'>
            <span className='mt-1 inline-block size-2 rounded-full bg-purple-500' />
            <div>
              <div className='font-medium text-neutral-900'>Clarity first</div>
              <div>Understand the problem before touching the stack.</div>
            </div>
          </li>
          <li className='flex items-start gap-3'>
            <span className='mt-1 inline-block size-2 rounded-full bg-purple-500' />
            <div>
              <div className='font-medium text-neutral-900'>
                Craft with intent
              </div>
              <div>Interfaces that feel right. Systems that scale.</div>
            </div>
          </li>
          <li className='flex items-start gap-3'>
            <span className='mt-1 inline-block size-2 rounded-full bg-purple-500' />
            <div>
              <div className='font-medium text-neutral-900'>
                Outcomes over hype
              </div>
              <div>Less ceremony, more shipping. Measure, improve, repeat.</div>
            </div>
          </li>
        </ul>
      </div>

      {/* keyframes for lamp + blinking cursor */}
      <style>{`
        @keyframes lampFloat { 0% { transform: translate(-50%, -55%); } 50% { transform: translate(-48%, -50%); } 100% { transform: translate(-50%, -55%); } }
        @keyframes cursorBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .cursor-blink { animation: cursorBlink 1s steps(1, end) infinite; }
      `}</style>
    </section>
  )
}
