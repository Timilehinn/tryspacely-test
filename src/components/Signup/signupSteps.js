import React, { useState } from 'react'
import Signup from './Signup'
import { SignupDetails } from './SignupDetails'
import Account_Setup from './AccountSetup'
import Workspace_Address from './Workspace_Address'
import Job_Role from './Job_Role'

const Signup_Steps = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const steps = [
    <Signup next={nextStep} />,
    <SignupDetails next={nextStep} />,
    <Account_Setup prev={prevStep} next={nextStep} />,
    <Workspace_Address prev={prevStep} next={nextStep} />,
    <Job_Role prev={prevStep} next={nextStep} />,
  ]

  return (
    <main className=''>
      <div className='lg:h-screen'>{steps[currentStep]}</div>
    </main>
  )
}

export default Signup_Steps
