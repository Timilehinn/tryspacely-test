import React, { useState, useEffect, useRef } from 'react'
import { Field } from 'formik'
import Toggle from 'react-toggle'
import '../addOn.scss'
import { useTranslation } from 'react-i18next'
import { BsCheck, BsXLg } from 'react-icons/bs'
import Cookies from 'universal-cookie'
import useLimitedRoute from '../../../hooks/useLimitedRoute'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const DoubleFactorAuthPrompt = ({
  popUp2faAuth,
  setPopUp2faAuth,
  id,
  setAccessable,
  getQR_Code,
  initQrCode2fa,
}) => {
  const authRef = useRef()
  const cookies = new Cookies()
  const navigate = useNavigate()
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const [btnMsg, setBtnMsg] = useState('Confirm Password')

  const passwordCheck = async (e) => {
    e.preventDefault()
    if (!password) {
      toast.error('Please input your password.')
      return
    }
    const token = cookies.get('user_token')
    try {
      setBtnMsg('Checking...')
      setLoading(true)
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/signup/validatepassword`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            password,
          }),
        }
      )
      const data = await res.json()

      if (data?.status !== true) {
        setBtnMsg('Check Password')
        setLoading(false)
        toast.error(Object.values(data?.errors)[0])
        return
      }
      setBtnMsg('Checked')
      // account deactivation successful;
      toast.success(
        'Your password is validated successfully. Qr code will be generated in few seconds.'
      )
      setTimeout(() => {
        getQR_Code()
      }, 5000)
      return
    } catch (e) {
      setBtnMsg('Check Password')
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (popUp2faAuth && ref.current && !ref.current.contains(e.target)) {
        setPopUp2faAuth(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [popUp2faAuth])

  return (
    <>
      <div
        ref={authRef}
        className='h-full lg:w-[100%] w-[100%] bg-[#000000b2] fixed inset-0 flex justify-center items-center '
      >
        <form
          className='py-2 space-y-4 bg-[white] lg:w-[620px] w-[320px] h-[316px] rounded ml-[10px] p-[20px] pt-[20px] pb-[20px] shadow-xl mt-[20px]'
          style={{ boxShadow: '1px 1px 2px #adadad' }}
        >
          <div
            onClick={() => setPopUp2faAuth(false)}
            className='flex justify-end w-[100%]'
          >
            <BsXLg />
          </div>
          <div className='h-[auto] flex flex-col justify-center items-center'>
            <p className=' mt-[30px] leading-6 text-[#141115]'>
              Enter your password to continue with authentication setup
            </p>
            <input
              id='overideBorder'
              type='password'
              className='mt-[30px] rounded lg:w-[388px] w-[300px] h-[40px] bg-[#FCFCFC] p-[10px]'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={passwordCheck}
              className='w-[177px] h-[52px] p-[20px] rounded mt-[30px] flex items-center justify-center bg-[#0559FD] text-[#FCFCFC] text-[17px]'
            >
              {btnMsg}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default DoubleFactorAuthPrompt
