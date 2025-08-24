import React from 'react'

// LENK Footer – mobile‑first, responsive, accessible
// - Dark theme, centered hero line
// - 3-column info grid (contact, location, social)
// - Logo SVG (white color)
// - Bottom legal row

function LenkLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label='LENK'
    >
      <svg
        width='135'
        height='25'
        viewBox='0 0 135 25'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 sm:h-7 lg:h-8 w-auto'
      >
        <path d='M7.03145 0H0V24.1703H7.03145V0Z' fill='white' />
        <path d='M18.8776 16.1401V24.1528H10.8944' fill='white' />
        <path
          d='M54.3675 5.36902H42.2893V9.37929H53.9555V14.6629H42.2893V18.8013H54.3675V24.0849H36.0722V0.0854034H54.3675V5.36902Z'
          fill='white'
        />
        <path
          d='M71.5622 24.0849V0.0873489H77.7793L89.2617 14.76V0.0873489H95.4459V24.0849H89.2617L77.7793 9.41229V24.0849H71.5622Z'
          fill='white'
        />
        <path
          d='M118.856 9.98491L126.437 0.0873489H134.112L124.628 11.4504L135 24.0849H126.943L118.856 13.6768V24.0849H112.639V0.0873489H118.856V9.98491Z'
          fill='white'
        />
      </svg>
    </div>
  )
}

export default function LenkFooter() {
  return (
    <footer className='w-full bg-black text-neutral-300'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20'>
        {/* Logo */}
        <LenkLogo className='mb-8 flex justify-center' />

        {/* Headline */}
        <h3 className='text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white max-w-3xl mx-auto px-4'>
          You made it to the end — ready to build what&apos;s next?
        </h3>

        {/* Grid */}
        <div className='mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12'>
          {/* Contact */}
          <div className='space-y-3 text-center sm:text-left'>
            <div className='text-sm uppercase tracking-wide text-neutral-400'>
              Start a conversation
            </div>
            <div>
              <a
                href='mailto:info@lenksolutions.com'
                className='hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded transition-colors duration-200'
              >
                info@lenksolutions.com
              </a>
            </div>
            <div>
              <a
                href='tel:+91'
                className='hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded transition-colors duration-200'
              >
                +91
              </a>
            </div>
          </div>

          {/* Location */}
          <div className='space-y-3 text-center sm:text-left'>
            <div className='text-sm uppercase tracking-wide text-neutral-400'>
              Find us
            </div>
            <p className='leading-relaxed'>
              Bengaluru,
              <br />
              India
            </p>
          </div>

          {/* Social */}
          <div className='space-y-3 text-center sm:text-left'>
            <div className='text-sm uppercase tracking-wide text-neutral-400'>
              Connect
            </div>
            <div className='flex items-center justify-center sm:justify-start gap-4'>
              <a
                href='#'
                aria-label='Facebook'
                className='p-2 rounded-full bg-white/5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-colors duration-200'
              >
                <svg
                  viewBox='0 0 24 24'
                  width='18'
                  height='18'
                  fill='currentColor'
                  className='text-white'
                >
                  <path d='M22 12a10 10 0 1 0-11.6 9.9v-7h-2.4v-2.9h2.4V9.6c0-2.4 1.4-3.8 3.6-3.8 1 0 2 .2 2 .2v2.3h-1.1c-1.1 0-1.5.7-1.5 1.4v1.7h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12Z' />
                </svg>
              </a>
              <a
                href='#'
                aria-label='Twitter'
                className='p-2 rounded-full bg-white/5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-colors duration-200'
              >
                <svg
                  viewBox='0 0 24 24'
                  width='18'
                  height='18'
                  fill='currentColor'
                  className='text-white'
                >
                  <path d='M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.9-2.6 1.1A4.1 4.1 0 0 0 12 8.8c0 .3 0 .6.1.9-3.4-.2-6.5-1.8-8.6-4.4-.4.7-.6 1.4-.6 2.3 0 1.4.7 2.7 1.8 3.5-.6 0-1.2-.2-1.7-.5v.1a4.1 4.1 0 0 0 3.3 4 4 4 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.8A8.3 8.3 0 0 1 2 19.6a11.7 11.7 0 0 0 6.3 1.8c7.6 0 11.8-6.3 11.8-11.8v-.5c.8-.5 1.4-1.2 1.9-1.9Z' />
                </svg>
              </a>
              <a
                href='#'
                aria-label='Instagram'
                className='p-2 rounded-full bg-white/5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-colors duration-200'
              >
                <svg
                  viewBox='0 0 24 24'
                  width='18'
                  height='18'
                  fill='currentColor'
                  className='text-white'
                >
                  <path d='M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.8-.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z' />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='mt-10 sm:mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between text-xs text-neutral-400'>
          <div className='flex items-center gap-3 order-2 sm:order-1'>
            <a
              href='#'
              className='hover:text-white transition-colors duration-200'
            >
              Terms of Service
            </a>
            <span className='hidden sm:inline'>•</span>
            <a
              href='#'
              className='hover:text-white transition-colors duration-200'
            >
              Privacy Policy
            </a>
          </div>
          <div className='text-center order-1 sm:order-2 text-white/90 font-black tracking-widest'>
            LENK Solutions Pvt Ltd
          </div>
          <div className='text-center sm:text-right w-full sm:w-auto order-3'>
            © {new Date().getFullYear()} LENK. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
