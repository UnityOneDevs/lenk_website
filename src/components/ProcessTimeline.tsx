import React, { useEffect, useMemo, useRef, useState } from 'react'

// Process Timeline — Scroll‑SCRUB with STICKY pin (no body lock)
// • Pinned, full‑screen content via position: sticky; user scroll scrubs progress.
// • Desktop: horizontal bar; Mobile: vertical bar. Clean, industry standard.
// • No wheel/touch hijack, so page scroll never breaks. Honors prefers‑reduced‑motion.

// ---- Minimal stroke icons ----
const IconDiscovery = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.6'
    aria-hidden
    {...props}
  >
    <path d='M12 5a7 7 0 1 0 4.95 11.95' />
    <path d='M12 2v3M4.2 6.2l2.1 2.1M2 12h3M6.2 19.8l2.1-2.1M12 19v3M19.8 17.8l-2.1-2.1' />
  </svg>
)
const IconPlan = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.6'
    aria-hidden
    {...props}
  >
    <path d='M4 5h12M4 12h8M4 19h6' />
    <path d='M16 3v6l4 2V5l-4-2Z' />
  </svg>
)
const IconDesign = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.6'
    aria-hidden
    {...props}
  >
    <rect x='4' y='5' width='16' height='14' rx='2' />
    <path d='M8 5v14M16 5v14' />
  </svg>
)
const IconDev = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.6'
    aria-hidden
    {...props}
  >
    <circle cx='6' cy='8' r='2' />
    <circle cx='18' cy='8' r='2' />
    <circle cx='12' cy='16' r='2' />
    <path d='M8 9.5l3 5M16 9.5l-3 5' />
  </svg>
)
const IconTest = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.6'
    aria-hidden
    {...props}
  >
    <path d='M5 20V10M10 20V6M15 20V13M20 20V8' />
  </svg>
)
const IconShip = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.6'
    aria-hidden
    {...props}
  >
    <path d='M12 3l8 4v10l-8 4-8-4V7l8-4Z' />
    <path d='M12 7l8 4M12 7L4 11' />
  </svg>
)

const STEPS = [
  {
    title: 'Discovery',
    blurb: 'Every great build starts with sharp understanding.',
    Icon: IconDiscovery,
  },
  {
    title: 'Plan',
    blurb: 'Insights transformed into an actionable roadmap.',
    Icon: IconPlan,
  },
  {
    title: 'Design',
    blurb: 'Design that thinks, not just looks good.',
    Icon: IconDesign,
  },
  {
    title: 'Development',
    blurb: 'Clean code. Agile rhythm. Relentless precision.',
    Icon: IconDev,
  },
  {
    title: 'Testing',
    blurb: "We don't hope it works, we prove it does.",
    Icon: IconTest,
  },
  {
    title: 'Delivery',
    blurb: 'We ship with confidence, not compromise.',
    Icon: IconShip,
  },
] as const

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0) // 0..1
  const [reveal, setReveal] = useState(false)
  const [reduced, setReduced] = useState(false)

  // Scrub length (how many screens tall the section is). Bigger = slower scrub.
  const SCRUB_SCREENS = 2.2

  const stepsCount = STEPS.length
  const pos = progress * (stepsCount - 1)
  const activeIndex = Math.round(pos)
  const fillPercent = Math.max(0, Math.min(progress * 100, 100))

  // prefers‑reduced‑motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  // Scroll listener: compute progress from section scroll position
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let raf = 0
    const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const docY = window.pageYOffset || document.documentElement.scrollTop
        const sectionTop = rect.top + docY
        const vh = window.innerHeight || document.documentElement.clientHeight
        const total = el.offsetHeight - vh // scrollable distance inside section
        const passed = docY - sectionTop
        const p = clamp01(total <= 0 ? 0 : passed / total)
        setProgress(p)
        setReveal(p > 0 || rect.top < vh) // fade once visible
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const headlineClass = useMemo(
    () =>
      `text-center text-lg md:text-3xl font-extrabold text-neutral-300 leading-snug transition-opacity ${
        reduced ? '' : 'duration-700'
      } ${reveal ? 'opacity-100' : 'opacity-0'}`,
    [reduced, reveal]
  )

  const pct = (idx: number) => (idx / (stepsCount - 1)) * 100

  return (
    <section
      ref={sectionRef}
      style={{ height: `${SCRUB_SCREENS * 100}vh` }}
      className='w-full bg-white'
      aria-label='Process timeline'
    >
      {/* Sticky pin fills the viewport while the user scrolls through the section */}
      <div className='sticky top-0 h-screen grid place-items-center px-4 overflow-hidden pt-10'>
        <div className='max-w-6xl w-full'>
          {/* Headline */}
          <h2 className={headlineClass}>
            Built with trust, Powered to Deliver, Developed to Scale, Automate
            Services, Function Seamless.
            <br />
            And Your Focus Growth and Innovate!
          </h2>

          {/* Desktop: horizontal timeline */}
          <div className='hidden md:block mt-16'>
            <div
              className='relative h-10'
              role='group'
              aria-roledescription='timeline'
            >
              <div className='absolute left-[4px] right-[4px] top-1/2 h-px -translate-y-1/2 bg-neutral-300' />
              <div
                className='absolute left-[4px] top-1/2 h-[2px] -translate-y-1/2 bg-black origin-left'
                style={{ width: `calc(${fillPercent}% - 8px)` }}
                aria-hidden
              />
              {STEPS.map((step, i) => {
                const isDone = i < pos
                const isActive = i === activeIndex
                return (
                  <div
                    key={step.title}
                    className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2'
                    style={{ left: `${pct(i)}%` }}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <span className='relative block'>
                      {isActive && !reduced && (
                        <>
                          <span
                            className='absolute -inset-2 rounded-full bg-purple-500/25 blur-md'
                            aria-hidden
                          />
                          <span
                            className='absolute -inset-3 rounded-full bg-purple-500/10 blur-lg animate-ping'
                            aria-hidden
                          />
                        </>
                      )}
                      <span
                        className={`block rounded-full size-2.5 md:size-3 ${
                          isActive
                            ? 'bg-black'
                            : isDone
                            ? 'bg-black'
                            : 'bg-black/80'
                        }`}
                      />
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Current step label */}
            <div className='mt-6 text-center'>
              <div className='text-sm uppercase tracking-wide text-neutral-600'>
                {STEPS[activeIndex].title}
              </div>
              <p className='mt-2 text-base md:text-lg text-neutral-700 max-w-3xl mx-auto'>
                {STEPS[activeIndex].blurb}
              </p>
            </div>

            {/* All steps with icons */}
            <div className='mt-16 grid grid-cols-6 gap-4'>
              {STEPS.map((step, i) => {
                const isDone = i < pos
                const isActive = i === activeIndex
                return (
                  <div
                    key={step.title}
                    className={`text-center transition-all duration-300 ${
                      isActive
                        ? 'scale-110'
                        : isDone
                        ? 'opacity-80'
                        : 'opacity-60'
                    }`}
                  >
                    <div className='flex justify-center mb-3'>
                      <step.Icon
                        className={`w-8 h-8 ${
                          isActive
                            ? 'text-black'
                            : isDone
                            ? 'text-black'
                            : 'text-neutral-400'
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-sm font-bold mb-2 ${
                        isActive
                          ? 'text-black'
                          : isDone
                          ? 'text-black'
                          : 'text-neutral-500'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        isActive ? 'text-neutral-700' : 'text-neutral-400'
                      }`}
                    >
                      {step.blurb}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile: vertical timeline — simplified & sized to fit */}
          <div
            className='md:hidden mt-6 max-w-md mx-auto flex flex-col items-center'
            role='group'
            aria-roledescription='timeline'
          >
            <div className='relative w-12 h-[34vh] min-h-[220px] max-h-[320px]'>
              <div className='absolute left-1/2 -translate-x-1/2 top-[4px] bottom-[4px] w-px bg-neutral-300' />
              <div
                className='absolute left-1/2 -translate-x-1/2 top-[4px] w-[2px] bg-black origin-top'
                style={{ height: `calc(${fillPercent}% - 8px)` }}
                aria-hidden
              />
              {STEPS.map((step, i) => {
                const isDone = i < pos
                const isActive = i === activeIndex
                return (
                  <div
                    key={step.title}
                    className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2'
                    style={{ top: `${pct(i)}%` }}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <span className='relative block'>
                      {isActive && !reduced && (
                        <span
                          className='absolute -inset-3 rounded-full bg-purple-500/15 blur-lg'
                          aria-hidden
                        />
                      )}
                      <span
                        className={`block rounded-full size-3 ${
                          isActive
                            ? 'bg-black'
                            : isDone
                            ? 'bg-black'
                            : 'bg-black/80'
                        }`}
                      />
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Current step info with icon */}
            <div className='mt-3 text-center px-2'>
              <div className='flex flex-col items-center mb-4'>
                <div className='flex justify-center mb-2'>
                  {(() => {
                    const CurrentIcon = STEPS[activeIndex].Icon
                    return <CurrentIcon className='w-8 h-8 text-black' />
                  })()}
                </div>
                <div className='text-xs uppercase tracking-wide text-neutral-600'>
                  {STEPS[activeIndex].title}
                </div>
                <p className='mt-1 text-sm text-neutral-700 max-w-[90%] mx-auto'>
                  {STEPS[activeIndex].blurb}
                </p>
              </div>
            </div>

            {/* All steps with icons - mobile grid */}
            <div className='mt-4 grid grid-cols-2 gap-4 w-full max-w-sm mx-auto'>
              {STEPS.map((step, i) => {
                const isDone = i < pos
                const isActive = i === activeIndex
                return (
                  <div
                    key={step.title}
                    className={`text-center transition-all duration-300 ${
                      isActive
                        ? 'scale-105'
                        : isDone
                        ? 'opacity-80'
                        : 'opacity-60'
                    }`}
                  >
                    {/* <div className='flex justify-center mb-2'>
                      {(() => {
                        const StepIcon = step.Icon
                        return (
                          <StepIcon
                            className={`w-6 h-6 ${
                              isActive
                                ? 'text-black'
                                : isDone
                                ? 'text-black'
                                : 'text-neutral-400'
                            }`}
                          />
                        )
                      })()}
                    </div>
                    <h3
                      className={`text-xs font-bold mb-1 ${
                        isActive
                          ? 'text-black'
                          : isDone
                          ? 'text-black'
                          : 'text-neutral-500'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        isActive ? 'text-neutral-700' : 'text-neutral-400'
                      }`}
                    >
                      {step.blurb}
                    </p> */}
                  </div>
                )
              })}
            </div>
          </div>

          {/* ARIA progress for assistive tech */}
          <div
            role='progressbar'
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(fillPercent)}
            className='sr-only'
          />
        </div>
      </div>
    </section>
  )
}
