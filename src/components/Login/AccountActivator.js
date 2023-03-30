import React, { useState, useEffect } from 'react'
import { Field } from 'formik'
import Toggle from 'react-toggle'
// import '../addOn.scss';
import { useTranslation } from 'react-i18next'
import { BsCheck, BsXLg } from 'react-icons/bs'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountRestoreObject } from '../../slices/accountRestorer'
import { setEmailBackup, setInit2FA } from '../../slices/authRelated'
const AccountActivator = ({ setAccountActivatorPopOver, onSuccess }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cookies = new Cookies()
  const [loading, setLoading] = useState(false)
  const accountRestoreObject = useSelector(getAccountRestoreObject)
  const [btnMsg, setBtnMsg] = useState('Activate')
  const [message, setMessage] = useState(null)

  const loginViaEmail = async (email, password) => {
    try {
      // setSubmitting(true)
      setLoading(true)
      setMessage(null)
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          reactivate: true,
        }),
      })
      const data = await res.json()
      if (data?.status === false) {
        setLoading(false)
        setBtnMsg('Activate')
        if (data?.data?.otp == 'sms') {
          dispatch(setEmailBackup(email))
          dispatch(
            setInit2FA({
              type: 'sms',
              popup: true,
            })
          )
          return
        }
        if (data?.data?.otp == 'auth_code') {
          dispatch(setEmailBackup(email))
          dispatch(
            setInit2FA({
              type: 'auth_code',
              popup: true,
            })
          )
          return
        }
        setMessage({
          text:
            Object.values(data?.errors)[0] ??
            'There was an error activating this account. Please try again or contact support.',
          color: 'red',
        })
        // setMessage({
        //     text: 'There was an error activating this account. Please try again or contact support.',
        //     color: 'red',
        // })
        return
      }
      setBtnMsg('Success!')
      setMessage({
        text: 'Great! We are glad to have you back!',
        color: 'green',
      })
      onSuccess('', data?.data?.token)
      return
    } catch (error) {
      setLoading(false)
      setBtnMsg('Activate')
      setMessage({
        text: 'There was an error activating this account. Please try again, check your internet connection or contact support.',
        color: 'red',
      })
    }
  }

  const loginViaGoogleSocial = async (provider, providerId) => {
    setMessage(null)
    try {
      setLoading(true)
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/login/oauth`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            provider,
            providerId,
            reactivate: true,
          }),
        }
      )
      const data = await res.json()
      if (data?.status === false) {
        setLoading(false)
        setBtnMsg('Activate')
        if (data?.data?.otp == 'sms') {
          dispatch(setEmailBackup(email))
          dispatch(
            setInit2FA({
              type: 'sms',
              popup: true,
            })
          )
          return
        }
        if (data?.data?.otp == 'auth_code') {
          dispatch(setEmailBackup(email))
          dispatch(
            setInit2FA({
              type: 'auth_code',
              popup: true,
            })
          )
          return
        }
        setMessage({
          text:
            Object.values(data?.errors)[0] ??
            'There was an error activating this account. Please try again or contact support.',
          color: 'red',
        })
        // setMessage({
        //     text: 'There was an error activating this account. Please try again or contact support.',
        //     color: 'red',
        // })
        return
      }
      setBtnMsg('Success!')
      setMessage({
        text: 'Great! We are glad to have you back. Redirecting you now.',
        color: 'green',
      })
      cookies.set('user_token', data?.data?.token, {
        path: '/',
        maxAge: 2600000,
        sameSite: 'none',
        secure: true,
      })
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (error) {
      setLoading(false)
      setBtnMsg('Activate')
      setMessage({
        text: 'There was an error activating this account. Please try again, check your internet connection or contact support.',
        color: 'red',
      })
    }
  }

  const signInGitAcct = async (provider, providerId) => {
    try {
      setLoading(true)
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/login/oauth`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            provider,
            providerId,
            reactivate: true,
          }),
        }
      )
      const data = await res.json()
      if (data?.status === false) {
        setLoading(false)
        setBtnMsg('Activate')
        if (data?.data?.otp == 'sms') {
          dispatch(setEmailBackup(email))
          dispatch(
            setInit2FA({
              type: 'sms',
              popup: true,
            })
          )
          return
        }
        if (data?.data?.otp == 'auth_code') {
          dispatch(setEmailBackup(email))
          dispatch(
            setInit2FA({
              type: 'auth_code',
              popup: true,
            })
          )
          return
        }
        // let message = data?.errors?.email ?? "Unable to login at this time.";
        setMessage({
          text: 'There was an error activating this account. Please try again or contact support.',
          color: 'red',
        })
        // setToast(message);
        return
      }
      setBtnMsg('Success!')
      setMessage({
        text: 'Great! We are glad to have you back. Redirecting you now',
        color: 'green',
      })
      cookies.set('user_token', data?.data?.token, {
        path: '/',
        maxAge: 2600000,
        sameSite: 'none',
        secure: true,
      })
      setTimeout(() => {
        navigate('/dashboard')
      }, 5000)
    } catch (error) {
      setLoading(false)
      setBtnMsg('Activate')
      setMessage({
        text: 'There was an error activating this account. Please try again, check your internet connection or contact support.',
        color: 'red',
      })
    }
  }

  const reactivateAccount = (e) => {
    e.preventDefault()
    try {
      setBtnMsg('Reactivating...')
      if (accountRestoreObject?.authBy === 'Github') {
        signInGitAcct(
          accountRestoreObject?.provider,
          accountRestoreObject?.providerId
        )
        return
      }
      if (accountRestoreObject?.authBy === 'Google') {
        loginViaGoogleSocial(
          accountRestoreObject?.provider,
          accountRestoreObject?.providerId
        )
        return
      }
      if (accountRestoreObject?.authBy === 'EmailPassword') {
        loginViaEmail(
          accountRestoreObject?.email,
          accountRestoreObject?.password
        )
        return
      }
    } catch (error) {}
  }

  return (
    <>
      <div
        style={{ zIndex: 100000 }}
        className='h-full w-[100%] bg-[#f3f3f3da] fixed inset-0 flex justify-center items-center'
      >
        <form
          className='py-2 space-y-4 bg-[white] w-[620px] h-[316px] rounded ml-[10px] p-[20px] pt-[20px] pb-[20px] shadow-xl mt-[20px]'
          style={{ boxShadow: '1px 1px 2px #adadad' }}
        >
          <div
            onClick={() => setAccountActivatorPopOver(false)}
            className='flex justify-end w-[100%]'
          >
            <BsXLg />
          </div>
          <div className='h-[auto] flex flex-col justify-center items-center'>
            <p className=' mt-[30px] leading-6 text-[#141115]'>
              You deactivated your account. Do you wish to restore it?
            </p>
            {/* <input value={password} onChange={(e) => setPassword(e.target.value)} id="overideBorder" type="password" className='mt-[30px] rounded w-[388px] h-[40px] bg-violet-100 p-[10px]' /> */}
            <button
              disabled={loading}
              onClick={reactivateAccount}
              className='min-w-[177px] h-[52px] p-[20px] rounded mt-[30px] flex items-center justify-center bg-[green] text-[white]'
            >
              {btnMsg}
            </button>
            {message && (
              <p className={`text-[${message?.color}] mt-10`}>
                {message?.text}
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default AccountActivator
