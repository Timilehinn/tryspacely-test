import React, { useState, useEffect } from 'react'
import { Field } from 'formik'
import Toggle from 'react-toggle'
import '../addOn.scss'
import { useTranslation } from 'react-i18next'
import { BsCheck, BsXLg } from 'react-icons/bs'
import Cookies from 'universal-cookie'
import useLimitedRoute from '../../../hooks/useLimitedRoute'

const VerifyPhoneNumber = ({
  settingStatus,
  setTriggerRecall,
  setPopUpSms,
  id,
}) => {
  const cookies = new Cookies()
  const [secret, setSecret] = useState('')
  const { t } = useTranslation()

  const sendSmsReq = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/send-otp`,
        {
          method: 'POST',
          // body: JSON.stringify({

          // }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
    } catch (error) {}
  }
  const verifySmsReq = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/verify-otp
            `,
        {
          method: 'POST',
          body: JSON.stringify({
            secret,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
    } catch (error) {}
  }

  useEffect(() => {
    sendSmsReq()
  }, [])

  return (
    <>
      <div
        style={{ zIndex: 100 }}
        className='h-full w-[100%] bg-[#f3f3f3da] fixed inset-0 flex justify-center items-center '
      >
        <form className='py-2 space-y-4 bg-[white] w-[50%] h-[auto] rounded ml-[10px] pt-[20px] pb-[20px] shadow-xl pl-[50px] pr-[50px] drop-shadow-2xl'>
          <div className='h-[auto] flex flex-col justify-center'>
            <p className='leading-6 text-[#141115] text-[22px] font-semibold'>
              Add SMS Authentication
            </p>
            <p className='leading-6 text-[#141115] text-[16px] mt-[13px]'>
              We’ll send a time-sensitive authentication code to your phone
              number when you’re signing in
            </p>
          </div>
          <div className='min-h-[50px] w-[90%] pl-5 rounded bg-[#D6F6DE] flex flex-col justify-center'>
            <p className='leading-6 text-[#30D158] text-[16px]'>
              Please check your phone for the verification code.
            </p>
          </div>
          <div
            className='w-[512px] min-h-[146px] p-5 flex flex-col justify-center rounded bg-[ #FFFFFF]'
            style={{
              borderStyle: 'solid',
              borderColor: '#D4D4D4',
              borderWidth: 1,
            }}
          >
            <div className='flex h-[auto] w-[90%] gap-10 justify-between mb-5'>
              <p className='leading-6 text-[#121212] text-[14px]'>
                **** **** **00
              </p>
              <p className='leading-6 text-[#0559FD] text-[14px]'>Edit</p>
            </div>
            <hr />
            <p className='leading-6 text-[#121212] text-[13px] mb-2 mt-5'>
              We’ve sent a 6-digit verification code to the number above
            </p>
            <input
              id='overideBorder'
              type='number'
              className='rounded w-[90%] h-[48px] bg-[#FCFCFC] p-[10px]'
            />
            <button className='w-[124px] h-[58px] p-[20px] mt-10 rounded flex items-center justify-center bg-[#0559FD] text-[#FCFCFC]'>
              Add Number
            </button>
          </div>
          <p className='leading-6 text-[#121212] text-[13px] mb-2 mt-5'>
            Didn’t receive code?{' '}
            <span className='text-[#1E6AFD]'>Resend code</span>, or{' '}
            <span className='text-[#1E6AFD]'>send to a different number</span>.
          </p>
          {/* 
                <div className="h-[auto]">
                    <div className='flex justify-between w-[100%]'>
                        <p>Pasword</p>
                        <p className='text-[#0559FD] cursor-pointer'>Update</p>
                    </div>
                    <label htmlFor="name">{t("******")}</label>
                    <hr className='mt-[5px] mb-[20px]' style={{ borderColor: '#D4D4D4' }} />
                </div> */}
        </form>
      </div>
    </>
  )
}

export default VerifyPhoneNumber
