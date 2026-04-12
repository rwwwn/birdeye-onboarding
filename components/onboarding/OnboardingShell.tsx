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

          {/* Right illustration panel — Step 1 only */}
          {step === 1 && (
            <div className="hidden md:flex md:w-80 bg-yellow items-center justify-center p-8 flex-shrink-0">
              <div className="w-full h-64 bg-white/30 rounded-2xl flex items-center justify-center text-navy/40 text-sm font-medium">
                Illustration
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
