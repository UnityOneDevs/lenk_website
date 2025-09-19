import AboutLampHero from '../components/AboutLampHero'
import HeroSection from '../components/HeroSection'
import VisionMissionTriptych from '../components/VisionMissionTriptych'
import IndustriesSection from '../components/IndustriesSection'
import ProcessTimeline from '../components/ProcessTimeline'
import ServicesSection from '../components/ServicesSection'
import ContactForm from '../components/ContactForm'

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
        <ContactForm />
      </div>
    </div>
  )
}
