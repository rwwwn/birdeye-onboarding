'use client'

import { useState } from 'react'
import Navbar from '@/components/home/Navbar'
import Hero from '@/components/home/Hero'
import FeatureAccordion from '@/components/home/FeatureAccordion'
import FreeTools from '@/components/home/FreeTools'
import IndustryCards from '@/components/home/IndustryCards'
import PricingSection from '@/components/home/PricingSection'
import FinalCTASection from '@/components/home/FinalCTASection'
import Footer from '@/components/home/Footer'
import ContactForm from '@/components/home/ContactForm'
import TrustBar from '@/components/home/TrustBar'

export default function HomePage() {
  const [showContactForm, setShowContactForm] = useState(false)

  return (
    <>
      <Navbar />
      <main>
        <Hero onContactClick={() => setShowContactForm(true)} />
        <TrustBar />
        <FeatureAccordion />
        <FreeTools />
        <IndustryCards />
        <PricingSection />
        <FinalCTASection onContactClick={() => setShowContactForm(true)} />
      </main>
      <Footer />

      {showContactForm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowContactForm(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ContactForm onClose={() => setShowContactForm(false)} />
          </div>
        </div>
      )}
    </>
  )
}
