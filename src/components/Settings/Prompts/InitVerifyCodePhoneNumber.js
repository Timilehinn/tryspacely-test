import React, { useState, useEffect } from 'react'
import '../addOn.scss'
import { useTranslation } from 'react-i18next'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setInit2FA, setToken } from '../../../slices/authRelated'

const InitVerifyCodePhoneNumber = ({
  emailbackup,
  init2FA,
  idBackup,
  preventNavigate,
  isTraditional,
  setIsValidated,
  mobile_number,
}) => {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [secret, setSecret] = useState('')
  const [btnMsg, setBtnMsg] = useState('Continue')
  const { t } = useTranslation()

  const confirmAuthAppCode = async () => {
    try {
      const token = cookies.get('user_token')

      let bodyData
      if (isTraditional) {
        bodyData = {
          secret: secret,
          email: emailbackup,
        }
      } else {
        bodyData = {
          secret: secret,
          provider_id: idBackup,
        }
      }
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/verify-secret`,
        {
          method: 'POST',
          body: JSON.stringify(bodyData),
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          },
        }
      )
      const data = await res.json()
      if (!data?.status) {
        toast.error(`Unable to verify code`)
        setBtnMsg('Continue')
        return
      }
      toast.success(`Code Verified`)
      setBtnMsg('Verified')
      dispatch(
        setInit2FA({
          type: 'sms',
          popup: false,
        })
      )
      if (preventNavigate) {
        setIsValidated(true)
        return
      }
      dispatch(setToken(data?.data?.token))
      cookies.set('user_token', data?.data?.token, {
        path: '/',
        maxAge: 2600000,
        sameSite: 'none',
        secure: true,
      })
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
    } catch (error) {}
    y
  }

  const sendSmsReq = async (initialized) => {
    try {
      const token = cookies.get('user_token')

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/send-otp`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: emailbackup,
          }),
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          },
        }
      )
      const data = await res.json()

      if (!data?.status) {
        toast.error(`Not able to sent code.`)
        return
      }
      if (initialized) {
        toast.success(`Code have been sent.`)
        return
      }
      toast.success(`Code resent.`)
    } catch (error) {}
  }
  const verifySmsReq = async (e) => {
    e.preventDefault()
    try {
      const token = cookies.get('user_token')

      if (!secret) {
        toast.error('Please put in the code')
        return
      }
      let dataBody
      if (mobile_number) {
        dataBody = {
          secret,
          email: emailbackup,
          phone_number: mobile_number,
        }
      }
      if (!mobile_number) {
        dataBody = {
          secret,
          email: emailbackup,
        }
      }
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/verify-otp
            `,
        {
          method: 'POST',
          body: JSON.stringify(dataBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()

      if (!data?.status) {
        toast.error(`Unable to verify code`)
        setBtnMsg('Continue')
        return
      }
      toast.success(`Code Verified`)
      setBtnMsg('Verified')
      if (preventNavigate) {
        setIsValidated(true)
        return
      }
      dispatch(setToken(data?.data?.token))
      cookies.set('user_token', data?.data?.token, {
        path: '/',
        maxAge: 2600000,
        sameSite: 'none',
        secure: true,
      })
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
    } catch (error) {}
  }

  useEffect(() => {
    if (preventNavigate) {
      return
    }
    if (init2FA?.type == 'sms') {
      setTimeout(() => {
        sendSmsReq(true)
      }, 1000)
    }
  }, [])

  return (
    <>
      <div
        style={{ zIndex: 100 }}
        className='h-full w-[100%] bg-[#f3f3f3da] fixed inset-0 flex justify-center items-center '
      >
        <div className='w-full py-2 space-y-4 bg-[white] w-[auto] lg:w-[auto] h-[auto] rounded ml-[10px] pt-[20px] pb-[20px] shadow-xl pl-[50px] pr-[50px] drop-shadow-2xl'>
          <div className='h-[auto] flex flex-col justify-center'>
            {init2FA?.type === 'auth_code' && (
              <>
                <p className='font-light'>
                  To keep your account secure, we verify your identity.
                  <br />
                  <br />
                  Enter the code generated by your authenticator app.
                </p>
              </>
            )}
            <p className='leading-6 text-[#141115] lg:text-[18px] text-[15px] font-semibold mt-5'>
              Verification Code
            </p>
            {init2FA?.type === 'sms' && (
              <>
                <p className='leading-6 text-[#141115] lg:text-[16px] text-[13px] mt-[13px]'>
                  One more thing. We sent a code to your phone number.{' '}
                </p>
              </>
            )}
          </div>
          {init2FA?.type === 'sms' && (
            <div className='min-h-[50px] w-[90%] pl-5 rounded bg-[#D6F6DE] flex flex-col justify-center'>
              <p className='leading-6 text-[#30D158] lg:text-[16px] text-[14px]'>
                Please check your phone for the verification code.
              </p>
            </div>
          )}
          <div
            className='lg:w-[512px] w-[250px] min-h-[146px] p-5 flex flex-col justify-center rounded bg-[ #FFFFFF]'
            style={{
              borderStyle: 'solid',
              borderColor: '#D4D4D4',
              borderWidth: 1,
            }}
          >
            <input
              id='overideBorder'
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              type='number'
              className='rounded w-[90%] h-[48px] bg-[#FCFCFC] p-[10px]'
            />
            <button
              onClick={
                init2FA?.type === 'sms' ? verifySmsReq : confirmAuthAppCode
              }
              className='lg:w-[124px] w-[90px] h-[58px] p-[20px] mt-10 rounded flex items-center justify-center bg-[#0559FD] text-[#FCFCFC] text-center'
            >
              {btnMsg}
            </button>
          </div>
          {init2FA?.type === 'sms' && (
            <p className='leading-6 text-[#121212] text-[13px] mb-2 mt-5'>
              Didn’t receive code?{' '}
              <span className='text-[#1E6AFD]' onClick={sendSmsReq}>
                Resend code
              </span>
              .
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default InitVerifyCodePhoneNumber
