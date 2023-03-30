import React, { useState } from 'react'
import Paystack from '../../pages/Booking/paymentsMethodsFn/Paystack'
import Button from '../button'
import PaymentMethod from './payment-method'
import Steps from './Steps'
// import PaystackPaymentHook from '../../hooks/usePaystackPayment';

const PaymentSteps = ({
  setIsSuccess,
  userDetails,
  workspaceData,
  transactionId,
  dateBooked,
  blockPayment,
}) => {
  const [currentStep, setCurrentStep] = useState(3)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('')
  const [activeComponent, setActiveComponent] = useState(true)
  const [paymentActive, setPaymentActive] = useState(true)

  const availableSteps = [
    {
      value: 1,
      text: 'Payment Info',
    },
    {
      value: 2,
      text: 'Payment',
    },
    {
      value: 3,
      text: 'Space Confirmation',
    },
  ]

  // const handleStepChanges = current => {
  //   setCurrentStep(current)
  // };

  // const handleNextBtn = () => {
  //   setCurrentStep(prevState => prevState + 1)
  // }

  return (
    <>
      <Steps current={currentStep} availableSteps={availableSteps} />
      <div className='my-2 payment'>
        <h2 className='text-3xl font-bold mb-6 mt-10'>Payment Info</h2>

        <div className='flex justify-between my-8 w-full lg:w-[568px] gap-x-4'>
          <Button
            label='Back to workspace'
            variant='outline'
            extraClass='text-xs lg:text-base'
          />
          {/* <Button label="Next" variant="primary" extraClass="lg:w-1/4" handleClick={handleNextBtn} /> */}
          <Paystack
            blockPayment={blockPayment}
            workspaceData={workspaceData}
            setIsSuccess={setIsSuccess}
            userDetails={userDetails}
            transactionId={transactionId}
            dateBooked={dateBooked}
          />
        </div>
      </div>
    </>
  )
}

export default PaymentSteps
