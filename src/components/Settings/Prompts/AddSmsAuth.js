import React, { useState, useEffect } from 'react'
import { Field } from 'formik'
import Toggle from 'react-toggle'
import '../addOn.scss'
import { useTranslation } from 'react-i18next'
import { BsCheck, BsXLg } from 'react-icons/bs'
import Cookies from 'universal-cookie'
import useLimitedRoute from '../../../hooks/useLimitedRoute'
import { toast } from 'react-toastify'

const AddSmsAuth = ({
  settingStatus,
  setTriggerRecall,
  setPopUpSms,
  id,
  setPopUpVerifyPhoneNumber,
  email,
  setMobile_number,
}) => {
  const cookies = new Cookies()
  const [secret, setSecret] = useState('')
  const [btnMsg, setBtnMsg] = useState('Add Number')
  const [phone_number, setPhone_Number] = useState()
  const { t } = useTranslation()

  const updatePhoneNumber = async (e) => {
    e.preventDefault()
    if (!phone_number) {
      return
    }
    const token = cookies.get('user_token')
    if (!token) {
      alert('Not authenticated!!!')
      return
    }
    setBtnMsg('Please wait.....')
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/${id}/update`,
        {
          method: 'POST',
          body: JSON.stringify({
            phone_number,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      if (!data?.status) {
        toast.error('Error adding phone number')
        setBtnMsg('Add Number')
        return
      }
      setBtnMsg('Added')
      toast.success('Phone number added successfully')
      setPopUpSms(false)
    } catch (error) {
      setBtnMsg('Add Number')
    }
  }

  const sendSmsReq = async (e) => {
    e.preventDefault()
    if (!phone_number) {
      return
    }
    const token = cookies.get('user_token')
    if (!token) {
      alert('Not authenticated!!!')
      return
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/send-otp`,
        {
          method: 'POST',
          body: JSON.stringify({
            phone_number,
            email,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()

      if (!data?.status) {
        toast.error('Error adding phone number')
        setBtnMsg('Add Number')
        return
      }
      setMobile_number(phone_number)
      setBtnMsg('Added')
      // toast.success('Phone number added successfully');
      setPopUpVerifyPhoneNumber(true)
      setPopUpSms(false)
    } catch (error) {
      setBtnMsg('Add Number')
    }
  }
  const verifySmsReq = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/verify-otp
            `,
        {
          method: 'POST',
          body: JSON.stringify({
            secret,
            phone_number,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
    } catch (error) {}
  }

  // useEffect(() => {
  //     sendSmsReq();
  // }, [])

  return (
    <>
      <div
        onClick={() => null}
        className='h-full w-[100%] bg-[#f3f3f3da] fixed inset-0 flex justify-center items-center '
      >
        <div
          className='py-2 space-y-4 bg-[white] w-[100%] h-[auto] rounded ml-[10px] pt-[20px] pb-[20px] shadow-xl pl-[10px] pr-[50px]'
          style={{ boxShadow: '1px 1px 2px #adadad, -1px -1px 2px #adadad' }}
        >
          <div className='h-[auto] flex flex-col justify-center'>
            <p className='leading-6 text-[#141115] text-[22px] font-semibold'>
              Add SMS Authentication
            </p>
            <p className='leading-6 text-[#141115] text-[16px] mt-[13px]'>
              Please add a phone number in profile tab before you continue.
            </p>
          </div>
          <div
            className='w-[512px] h-[146px] p-[10px] flex flex-col justify-center rounded bg-[ #FFFFFF]'
            style={{
              borderStyle: 'solid',
              borderColor: '#D4D4D4',
              borderWidth: 1,
            }}
          >
            <p className='leading-6 text-[#141115] text-[19px]'>Phone Number</p>
            <div className='flex mt-[10px] gap-2'>
              <select className='outline-none' name='' id=''>
                <option value='nigeria'>Nigeria</option>
              </select>
              <input
                id='overideBorder'
                value={phone_number}
                onChange={(e) => setPhone_Number(e.target.value)}
                type='number'
                className='rounded w-[300px] h-[48px] bg-[#FCFCFC] p-[10px]'
              />
              <button
                onClick={sendSmsReq}
                className='w-[124px] h-[48px] p-[20px] rounded flex items-center justify-center bg-[#0559FD] text-[#FCFCFC]'
              >
                {btnMsg}
              </button>
            </div>
          </div>
          {/* 
                <div className="h-[auto]">
                    <div className='flex justify-between w-[100%]'>
                        <p>Pasword</p>
                        <p className='text-[#0559FD] cursor-pointer'>Update</p>
                    </div>
                    <label htmlFor="name">{t("******")}</label>
                    <hr className='mt-[5px] mb-[20px]' style={{ borderColor: '#D4D4D4' }} />
                </div> */}
        </div>
      </div>
    </>
  )
}

export default AddSmsAuth
