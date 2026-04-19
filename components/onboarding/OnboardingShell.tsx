'use client'

import { useState } from 'react'
import Stepper from '@/components/ui/Stepper'
import Step1Type from './Step1Type'
import Step2Size from './Step2Size'
import Step3Plan from './Step3Plan'
import Step4Signup from './Step4Signup'
import Step5Success from './Step5Success'
import { BusinessSize, Plan, getRecommendation, resolveCategory } from '@/lib/recommendation'

const STEPS = ['Type', 'Size', 'Plan', 'Signup']

export default function OnboardingShell() {
  const [step, setStep] = useState(1)
  const [businessTypes, setBusinessTypes] = useState<string[]>([])
  const [businessSize, setBusinessSize] = useState<BusinessSize | ''>('')
  const [recommendedPlan, setRecommendedPlan] = useState<Plan>('free')
  const [selectedPlan, setSelectedPlan] = useState<Plan>('free')
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
  })

  function handleSizeSelect(size: BusinessSize) {
    setBusinessSize(size)
    const category = resolveCategory(businessTypes)
    const rec = getRecommendation(category, size)
    setRecommendedPlan(rec)
    setSelectedPlan(rec)
  }

  function goNext() {
    setStep((s) => Math.min(s + 1, 5))
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1))
  }

  if (step === 5) {
    return (
      <div className="min-h-screen bg-[#DBE1E9] flex items-center justify-center p-4">
        <div className="bg-white rounded-[20px] w-full max-w-3xl p-8 md:p-12 shadow-sm">
          <Step5Success
            firstName={userData.firstName}
            lastName={userData.lastName}
            email={userData.email}
            phone={userData.phone}
            businessName={userData.businessName}
            businessType={businessTypes.join(', ')}
            businessSize={businessSize}
            recommendedPlan={recommendedPlan === 'free' ? 'Starter' : recommendedPlan === 'professional' ? 'Professional' : 'Premium'}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#DBE1E9] flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-[20px] w-full max-w-5xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Left: content */}
          <div className="flex-1 p-8 md:p-12 flex flex-col">
            <div className="mb-8">
              <Stepper currentStep={step} steps={STEPS} />
            </div>

            <div className="flex-1 flex flex-col">
              {step === 1 && (
                <Step1Type
                  selected={businessTypes}
                  onSelect={setBusinessTypes}
                  onContinue={goNext}
                />
              )}
              {step === 2 && (
                <Step2Size
                  selected={businessSize}
                  businessType={businessTypes.join(', ')}
                  onSelect={handleSizeSelect}
                  onContinue={goNext}
                  onBack={goBack}
                />
              )}
              {step === 3 && (
                <Step3Plan
                  businessTypes={businessTypes}
                  businessSize={businessSize}
                  recommendedPlan={recommendedPlan}
                  selectedPlan={selectedPlan}
                  onSelectPlan={setSelectedPlan}
                  onContinue={goNext}
                  onBack={goBack}
                />
              )}
              {step === 4 && (
                <Step4Signup
                  businessType={businessTypes.join(', ')}
                  businessSize={businessSize}
                  selectedPlan={selectedPlan}
                  userData={userData}
                  onUserDataChange={setUserData}
                  onSubmit={goNext}
                  onBack={goBack}
                />
              )}
            </div>
          </div>

          {/* Right illustration panel */}
          {step <= 3 && (
            <div className="hidden md:flex md:w-80 bg-[#0F0C36] items-center justify-center p-0 flex-shrink-0 relative overflow-hidden">
              {/* Background pattern */}
              <img
                src="/Illustrations/Patterns.svg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
              />
              {/* Illustration changes per step */}
              {step === 1 && (
                <div className="relative z-10 flex flex-col items-center gap-6 p-8">
                  <img
                    src="/Illustrations/Illustrations 1.svg"
                    alt=""
                    className="w-48 opacity-90"
                  />
                  <div className="text-center">
                    <p className="font-display text-white text-lg leading-snug mb-2">كاشير يفهم تجارتك</p>
                    <p className="text-white/40 text-xs">A POS that understands your business</p>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="relative z-10 flex flex-col items-center gap-4 p-8">
                  <img
                    src="/pos_screen/p1.webp"
                    alt="BirdEye Dashboard"
                    className="w-full rounded-xl shadow-2xl opacity-90"
                  />
                  <p className="text-white/40 text-xs text-center">لوحة تحكم واضحة لكل قرار</p>
                </div>
              )}
              {step === 3 && (
                <div className="relative z-10 flex flex-col items-center gap-4 p-8">
                  <img
                    src="/pos_images/i1.webp"
                    alt="BirdEye POS"
                    className="w-full rounded-xl shadow-2xl opacity-90"
                  />
                  <p className="text-white/40 text-xs text-center">جهاز واحد لكل شيء</p>
                </div>
              )}
            </div>
          )}
          {step === 4 && (
            <div className="hidden md:flex md:w-80 bg-[#FFEB95] items-center justify-center p-8 flex-shrink-0 relative overflow-hidden">
              <img
                src="/Illustrations/Illustrations 2.svg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
              />
              <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <img
                  src="/pos_screen/p2.webp"
                  alt="BirdEye Interface"
                  className="w-full rounded-xl shadow-lg"
                />
                <p className="font-display text-navy text-base leading-snug">خطوة واحدة تفصلك عن بيردآي</p>
                <p className="text-navy/50 text-xs">One step away from BirdEye</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
