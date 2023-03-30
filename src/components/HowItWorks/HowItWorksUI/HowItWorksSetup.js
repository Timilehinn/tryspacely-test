import React, { useState } from 'react'
import HowItWorks from "../HowItWorks";
import {SignupDetails} from "../../Signup/SignupDetails";
import Account_Setup from "../../Signup/AccountSetup";
import Workspace_Address from "../../Signup/Workspace_Address";
import Job_Role from "../../Signup/Job_Role";



const HowItWorksSetup = (props) => {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const steps = [

    <HowItWorks next={nextStep} />,
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

export default HowItWorksSetup
