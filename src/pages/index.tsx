import AboutLampHero from '../components/AboutLampHero'
import HeroSection from '../components/HeroSection'
import VisionMissionTriptych from '../components/VisionMissionTriptych'
import IndustriesSection from '../components/IndustriesSection'
import ProcessTimeline from '../components/ProcessTimeline'
import ServicesSection from '../components/ServicesSection'

export default function Home() {
  return (
    <div className='bg-white'>
      <div className='overflow-x-hidden'>
        <div id='hero'>
          <HeroSection />
        </div>
      </div>
      <div id='services'>
        <ServicesSection />
      </div>
      <div id='process'>
        <ProcessTimeline />
      </div>
      <div id='industries'>
        <IndustriesSection />
      </div>
      <div id='about'>
        <AboutLampHero />
      </div>
      <div id='vision'>
        <VisionMissionTriptych />
      </div>
      <div id='contact' className='py-20'>
        {/* Contact section placeholder - you can add your contact form here */}
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl font-bold text-gray-900 mb-6'>
            Get In Touch
          </h2>
          <p className='text-xl text-gray-600 mb-8'>
            Ready to start your project? Let&apos;s discuss how we can help
            bring your vision to life.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 font-semibold'>
              Schedule a Call
            </button>
            <button className='border-2 border-black text-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300 font-semibold'>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
