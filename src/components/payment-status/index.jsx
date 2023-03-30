import React, { useState } from 'react'
import clsx from 'clsx'
import Button from '../button'
import SuccessfullIcon from '../../assets/icons/payment-successful-icon.svg'
import FailureIcon from '../../assets/icons/failure.svg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const PaymentSuccessful = ({ workspaceData }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [paymentStatus, setPaymentStatus] = useState(true)

  const goToBooking = () => {
    navigate('/dashboard/user/bookings')
  }

  return (
    <div className='flex justify-between w-[95%] lg:w-3/4 mx-auto flex-col md:flex-row items-center h-screen py-6'>
      <div className='text-center lg:text-left'>
        <h2
          className={clsx({
            ['text-5xl lg:text-4xl mb-4 font-bold text-red-600']: true,
            ['!text-[#0559FD]']: paymentStatus,
          })}
        >
          Payment {paymentStatus ? 'Successful' : 'Failed'}
        </h2>
        {paymentStatus ? (
          <div className='mb-8'>
            {t('You successfully booked for')}
            <span className='font-bold'>
              {`${workspaceData?.name}`} Workspace
            </span>
            {t('.You can check for the status of your reservation at')}
            <span className='font-bold'>{t('Bookings.')}</span>
          </div>
        ) : (
          <div className='mb-8'>
            {t(
              'Oops! We are unable to complete your transaction. Please try again'
            )}
          </div>
        )}

        {/* {paymentStatus ? <StepsIcon className="hidden md:inline-block" /> : <FailureStepIcon className="hidden md:inline-block" />} */}
        <div className='flex gap-x-4 mt-14'>
          {paymentStatus && (
            <>
            <Button
              handleClick={()=>navigate('/booking')}
              // onClick={}
              label='Back to Bookings'
              variant='primary'
              extraClass='text-sm lg:text-base'
            />
            <Button
              handleClick={goToBooking}
              // onClick={}
              label='Goto Spaces'
              variant='primary'
              extraClass='text-sm lg:text-base'
            />
            </>
            // <div onClick={goToBooking}>
            // </div>
          )}
          {/* <Button
            handleClick={goToHome}
            label={paymentStatus ? 'Go Home' : 'Try again'}
            variant='outline'
            extraClass='py-4'
          /> */}
          {/* <button onClick={() => goToBooking()}>GO Bookings</button> */}
        </div>
      </div>
      <div>{paymentStatus ? <SuccessfullIcon /> : <FailureIcon />}</div>
    </div>
  )
}

export default PaymentSuccessful
