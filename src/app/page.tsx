'use client'

import Header from '@/components/sections/Header'
import HeroSection from '@/components/sections/HeroSection'
import WhySaudiSection from '@/components/sections/WhySaudiSection'
import ServicesSection from '@/components/sections/ServicesSection'
import StepsSection from '@/components/sections/StepsSection'
import PricingSection from '@/components/sections/PricingSection'
import WhyCorpentaSection from '@/components/sections/WhyCorpentaSection'
import FAQSection from '@/components/sections/FAQSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhySaudiSection />
        <ServicesSection />
        <StepsSection />
        {/* <PricingSection /> */}
        {/* <WhyCorpentaSection /> */}
        {/* <FAQSection /> */}
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
