'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='w-full py-2 sm:py-4 fixed top-0 left-0 right-0 z-50'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className='bg-white/5 backdrop-blur-sm border border-white/20 rounded-full shadow-2xl shadow-black/10'>
          <div className='p-4 sm:p-6 py-4 sm:py-6'>
            <div className='flex justify-between items-center'>
              {/* Logo */}
              <div className='flex-shrink-0'>
                <Image
                  src='/logo.svg'
                  alt='logo'
                  width={1000}
                  height={1000}
                  className='w-24 h-6 sm:w-32 sm:h-8 lg:w-40 lg:h-8'
                />
              </div>

              {/* Desktop Navigation */}
              <div className='hidden lg:flex items-center gap-8 xl:gap-10 text-base xl:text-lg font-afacad'>
                {['Home', 'Services', 'Industries', 'About us', 'Blog'].map(
                  (text) => (
                    <Link
                      key={text}
                      href={`/${text.toLowerCase().replace(/\s/g, '')}`}
                      className='text-black hover:text-gray-700 transition-all duration-300 font-inter relative group whitespace-nowrap'
                    >
                      {text}
                      <div className='absolute inset-0 bg-white/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </Link>
                  )
                )}
              </div>

              {/* Contact Button - Desktop */}
              <div className='hidden lg:block flex-shrink-0'>
                <Link
                  href='/contact'
                  className='bg-black/80 backdrop-blur-sm text-white px-6 xl:px-8 py-3 xl:py-4 rounded-full hover:bg-black/90 transition-all duration-300 font-afacad text-base xl:text-lg font-bold shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transform hover:scale-105 whitespace-nowrap'
                >
                  Contact us
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className='lg:hidden'>
                <button
                  onClick={toggleMenu}
                  className='text-black hover:text-gray-700 focus:outline-none transition-colors duration-300 p-2'
                  aria-label='Toggle mobile menu'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    ) : (
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 6h16M4 12h16M4 18h16'
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMenuOpen && (
          <div className='lg:hidden absolute top-full left-0 w-full bg-white backdrop-blur-sm z-40 rounded-xl shadow-xl overflow-hidden'>
            <div className='flex flex-col px-6 py-4 space-y-4'>
              {['Home', 'Services', 'Industries', 'About us', 'Blog'].map(
                (text) => (
                  <Link
                    key={text}
                    href={`/${text.toLowerCase().replace(/\s/g, '')}`}
                    className='text-black hover:text-gray-700 transition-all duration-300 font-inter text-lg py-2'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {text}
                  </Link>
                )
              )}
              <Link
                href='/contact'
                className='bg-black/80 text-white px-6 py-3 rounded-full hover:bg-black/90 transition-all duration-300 text-center font-afacad text-lg font-bold shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transform hover:scale-105 mt-2'
                onClick={() => setIsMenuOpen(false)}
              >
                Contact us
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
