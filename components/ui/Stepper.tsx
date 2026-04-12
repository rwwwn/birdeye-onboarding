interface StepperProps {
  currentStep: number
  steps: string[]
}

export default function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((label, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isActive = stepNumber === currentStep

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                  ${
                    isCompleted
                      ? 'bg-navy text-white'
                      : isActive
                      ? 'bg-navy text-white'
                      : 'bg-white border-2 border-gray text-gray-400'
                  }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`mt-1 text-xs font-medium ${
                  isActive ? 'text-navy' : isCompleted ? 'text-navy' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`h-px w-16 sm:w-24 md:w-32 mx-1 mb-5 transition-all ${
                  stepNumber < currentStep ? 'bg-navy' : 'bg-gray'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
