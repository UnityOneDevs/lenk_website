import HeroSection from '../components/HeroSection'
import IndustriesSection from '../components/IndustriesSection'
import ProcessTimeline from '../components/ProcessTimeline'
import ServicesSection from '../components/ServicesSection'

export default function Home() {
  return (
    <div className='bg-white'>
      <HeroSection />
      <ServicesSection />
      <ProcessTimeline />
      <IndustriesSection />
    </div>
  )
}
