'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  contactFormSchema,
  ContactFormData,
  services,
  timelineOptions,
} from '../types/contact'
import toast, { Toaster } from 'react-hot-toast'

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(result.message)
        reset()
      } else {
        toast.error(result.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Get In Touch
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Ready to start your project? Let&apos;s discuss how we can help
            bring your vision to life with robust infrastructure and precision
            engineering.
          </p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
          <form onSubmit={handleSubmit(onSubmit)} className='p-8 md:p-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              {/* Name */}
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-semibold text-gray-900 mb-2'
                >
                  Full Name *
                </label>
                <input
                  {...register('name')}
                  type='text'
                  id='name'
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500 ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-black'
                  }`}
                  placeholder='John Doe'
                />
                {errors.name && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-semibold text-gray-900 mb-2'
                >
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type='email'
                  id='email'
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500 ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-black'
                  }`}
                  placeholder='john@company.com'
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor='phone'
                  className='block text-sm font-semibold text-gray-900 mb-2'
                >
                  Phone Number *
                </label>
                <input
                  {...register('phone')}
                  type='tel'
                  id='phone'
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500 ${
                    errors.phone
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-black'
                  }`}
                  placeholder='+1 (555) 123-4567 or +91 98765 43210'
                />
                {errors.phone && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor='company'
                  className='block text-sm font-semibold text-gray-900 mb-2'
                >
                  Company
                </label>
                <input
                  {...register('company')}
                  type='text'
                  id='company'
                  className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black transition-all duration-300 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500'
                  placeholder='Your Company (Optional)'
                />
              </div>

              {/* Services */}
              <div className='md:col-span-2'>
                <label className='block text-sm font-semibold text-gray-900 mb-3'>
                  Services Needed *
                </label>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  {services.map((service) => (
                    <label
                      key={service}
                      className='flex items-center space-x-3 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-300'
                    >
                      <input
                        {...register('services')}
                        type='checkbox'
                        value={service}
                        className='w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2'
                      />
                      <span className='text-sm font-medium text-gray-900'>
                        {service}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.services && (
                  <p className='mt-2 text-sm text-red-500'>
                    {errors.services.message}
                  </p>
                )}
              </div>

              {/* Timeline */}
              <div className='md:col-span-2'>
                <label
                  htmlFor='timeline'
                  className='block text-sm font-semibold text-gray-900 mb-2'
                >
                  Project Timeline
                </label>
                <select
                  {...register('timeline')}
                  id='timeline'
                  className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black transition-all duration-300 focus:outline-none focus:ring-0 text-gray-900'
                >
                  <option value=''>Select timeline</option>
                  {timelineOptions.map((timeline) => (
                    <option key={timeline} value={timeline}>
                      {timeline}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className='md:col-span-2'>
                <label
                  htmlFor='message'
                  className='block text-sm font-semibold text-gray-900 mb-2'
                >
                  Project Details *
                </label>
                <textarea
                  {...register('message')}
                  id='message'
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-0 resize-none text-gray-900 placeholder-gray-500 ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-black'
                  }`}
                  placeholder='Tell us about your project, goals, and any specific requirements...'
                />
                {errors.message && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`bg-black text-white px-8 py-4 rounded-full transition-all duration-300 font-semibold text-lg shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg ${
                  isSubmitting ? 'animate-pulse' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>

              <button
                type='button'
                onClick={() => reset()}
                disabled={isSubmitting}
                className='border-2 border-black text-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Additional CTA */}
        <div className='mt-12 text-center'>
          <p className='text-gray-600 mb-4'>
            Prefer to talk directly? We&apos;re here to help.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            {/* <a
              href='tel:+1234567890'
              className='inline-flex items-center gap-2 bg-gray-100 text-gray-900 px-6 py-3 rounded-full hover:bg-gray-200 transition-all duration-300 font-medium'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                />
              </svg>
              Call Us
            </a> */}
            <a
              href='https://mail.google.com/mail/?view=cm&fs=1&to=contact@lenksolutions.com&su=Project%20Inquiry&body=Hello%2C%0A%0AI%20am%20interested%20in%20discussing%20a%20project%20with%20your%20team.%0A%0AProject%20Details%3A%0A-%0A%0AExpected%20Timeline%3A%0A-%0A%0ABudget%3A%0A-%0A%0AThank%20you%21'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 bg-gray-100 text-gray-900 px-6 py-3 rounded-full hover:bg-gray-200 transition-all duration-300 font-medium'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactForm
