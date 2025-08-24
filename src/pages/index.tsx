import HeroSection from '../components/HeroSection'
import ProcessTimeline from '../components/ProcessTimeline'
import ServicesSection from '../components/ServicesSection'

export default function Home() {
  return (
    <div className='bg-white'>
      <HeroSection />
      <ServicesSection />
      <ProcessTimeline />
      <ServicesSection />
      <ServicesSection />
    </div>
  )
}
