import React, { useState, useEffect } from 'react'
import { Field } from 'formik'
import Toggle from 'react-toggle'
import '../addOn.scss'
import { useTranslation } from 'react-i18next'
import { BsCheck, BsXLg } from 'react-icons/bs'
import Cookies from 'universal-cookie'
import useLimitedRoute from '../../../hooks/useLimitedRoute'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const DeactivatePrompt = ({
  settingStatus,
  setTriggerRecall,
  setDisablingAccount,
  id,
  has_password,
}) => {
  // alert(has_password, "has_password")
  const cookies = new Cookies()
  const navigate = useNavigate()
  const [password, setPassword] = useState(null)
  const [displayFullName, setDisplayFullName] = useState(
    settingStatus?.full_name
  )
  const [displayEmail, setDisplayEmail] = useState(settingStatus?.email)
  const [displayDOB, setDisplayDOB] = useState(settingStatus?.date_of_birth)
  const [loading, setLoading] = useState(false)
  const [btnMsg, setBtnMsg] = useState('Deactivate Account')
  const [displaySearchEnginesInclusion, setDisplaySearchEnginesInclusion] =
    useState(settingStatus?.seo)
  const { t } = useTranslation()

  const DeactivateReq = async (e) => {
    e.preventDefault()
    if (!password) {
      toast.error('Please input your password.')
      return
    }
    const token = cookies.get('user_token')
    if (!token) {
      alert('Not authenticated!!!')
      return
    }
    try {
      if (!id) {
        alert('No Id')
        return
      }
      setBtnMsg('Deativating...')
      setLoading(true)
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/${id}/deactivate-account`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password,
          }),
        }
      )
      const data = await res.json()

      if (data?.status !== true) {
        setBtnMsg('Deativate Account')
        setLoading(false)
        toast.error(Object.values(data?.errors)[0])
        return
      }
      setBtnMsg('Deativated')
      // account deactivation successful;
      toast.success(
        'Your account is deactivated successfully. We are sad to see you go.'
      )
      setTimeout(() => {
        navigate('/')
      }, 5000)
      return
    } catch (e) {
      setBtnMsg('Deativate Account')
      setLoading(false)
    }
  }
  const navigateFunction = () => {
    cookies.set('redirect_back_val', 'settings', { path: '/', maxAge: 700 })
    cookies.set('current_settings_tab_after_redirect', 'LoginSecurity', {
      path: '/',
      maxAge: 700,
    })
    navigate(`/ForgetPassword`)
  }

  const noPasswordAlert = (
    <form
      className='py-2 space-y-4 bg-[white] w-[620px] h-[316px] rounded ml-[10px] p-[20px] pt-[20px] pb-[20px] shadow-xl mt-[20px]'
      style={{ boxShadow: '1px 1px 2px #adadad' }}
    >
      <div
        onClick={() => setDisablingAccount(false)}
        className='flex justify-end w-[100%]'
      >
        <BsXLg />
      </div>
      <div className='h-[auto] flex flex-col justify-center items-center'>
        <p className=' mt-[30px] leading-6 text-[#141115]'>
          You seem not to have any password tied to your account. Please click
          the button below to reset your password before you can deactivate
          account. This is for security reason. We will redirect you back here
          to continue after successful password reset.
        </p>
        <button
          disabled={loading}
          onClick={navigateFunction}
          className='w-[177px] h-[52px] p-[20px] rounded mt-[30px] flex items-center justify-center'
          id='overideBtnDeactivate'
        >
          {'Reset Password'}
        </button>
      </div>
    </form>
  )

  return (
    <>
      <div
        className='h-full w-[100%] bg-[#f3f3f3da] fixed inset-0 flex justify-center items-center '
        style={{ zIndex: 10000 }}
      >
        {!has_password ? (
          noPasswordAlert
        ) : (
          <form
            className='py-2 space-y-4 bg-[white] w-[620px] h-[316px] rounded ml-[10px] p-[20px] pt-[20px] pb-[20px] shadow-xl mt-[20px]'
            style={{ boxShadow: '1px 1px 2px #adadad' }}
          >
            <div
              onClick={() => setDisablingAccount(false)}
              className='flex justify-end w-[100%]'
            >
              <BsXLg />
            </div>
            <div className='h-[auto] flex flex-col justify-center items-center'>
              <p className=' mt-[30px] leading-6 text-[#141115]'>
                Enter your password to confirm account deactivation
              </p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id='overideBorder'
                type='password'
                className='mt-[30px] rounded w-[388px] h-[40px] bg-violet-100 p-[10px]'
              />
              <button
                disabled={loading}
                onClick={DeactivateReq}
                className='w-[177px] h-[52px] p-[20px] rounded mt-[30px] flex items-center justify-center'
                id='overideBtnDeactivate'
              >
                {btnMsg}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default DeactivatePrompt
