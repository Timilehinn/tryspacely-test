import React, { useState, useEffect } from 'react'
import { Field } from 'formik'
import Toggle from 'react-toggle'
import '../addOn.scss'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { BsCheck, BsXLg } from 'react-icons/bs'
import Cookies from 'universal-cookie'
import useLimitedRoute from '../../../hooks/useLimitedRoute'
import { toast } from 'react-toastify'
import { tuple } from 'antd/lib/_util/type'

const PasswordChange = ({ settingStatus, setTriggerRecall, id }) => {
  const cookies = new Cookies()

  const [displayFullName, setDisplayFullName] = useState(
    settingStatus?.full_name
  )
  const [displayEmail, setDisplayEmail] = useState(settingStatus?.email)
  const [displayDOB, setDisplayDOB] = useState(settingStatus?.date_of_birth)
  const [displaySearchEnginesInclusion, setDisplaySearchEnginesInclusion] =
    useState(settingStatus?.seo)
  const [old_password, setOld_password] = useState('')
  const [new_password, setNew_password] = useState('')
  const [confirm_password, setConfirm_password] = useState('')
  const [updateBtn, setUpdateBtn] = useState('Update Password')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const refreshPage = () => {
    if (reload) window.location.reload()
    return
  }

  const checks = async () => {
    setLoading(true)
    setUpdateBtn('Updating....')
    if (!new_password || !old_password || !confirm_password) {
      toast.error('Missing Inputs.')
      setLoading(false)
      setUpdateBtn('Update Password')
      return false
    }
    if (new_password !== confirm_password) {
      toast.error('Password does not match!!!')
      setLoading(false)
      setUpdateBtn('Update Password')
      return false
    }
    const upperCaseWords = await new_password.match(/[A-Z]/g)
    const isNumberPresent = await new_password.match(/[0-9]/g)
    const lowerCaseWords = await new_password.match(/[a-z]/g)
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const isSpecialChar = specialChars.test(new_password)

    if (!upperCaseWords) {
      setLoading(false)
      setUpdateBtn('Update Password')
      toast.error('Passwords must have at least one Uppercase letter.')
      return false
    }

    if (!lowerCaseWords) {
      setLoading(false)
      setUpdateBtn('Update Password')
      toast.error('Passwords must have at least one Lowercase letter.')
      return false
    }

    if (!isNumberPresent) {
      setLoading(false)
      setUpdateBtn('Update Password')
      toast.error('Passwords must have at least one number.')
      return false
    }

    if (!isSpecialChar) {
      setLoading(false)
      setUpdateBtn('Update Password')
      toast.error('Passwords must have at least one Symbol.')
      return
    }
    return true
  }

  const callApiForUpdatePassword = async (e) => {
    e.preventDefault()
    // check here
    const result = checks()
    const token = cookies.get('user_token')
    if (!result) {
      return
    }
    // sending api
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${id}/password-reset`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password,
          new_password,
        }),
      }
    )
    const data = await res.json()
    if (data?.status === true) {
      toast.success('Password successfully updated')
      setUpdateBtn('Updated')
      setTimeout(() => {
        refreshPage()
      }, 1000)
    }

    if (data?.status !== true) {
      toast.error(data?.errors)
      setUpdateBtn('Try again')
    }
  }

  return (
    <>
      <form className='py-2 space-y-4 bg-[white] w-[100%] h-[auto] rounded ml-[10px] pt-[20px] pb-[20px] shadow-xl'>
        <div className='h-[auto] flex flex-col justify-center'>
          <p className='leading-6 text-[#141115]'>Current Password</p>
          <input
            id='overideBorder'
            value={old_password}
            onChange={(e) => setOld_password(e.target.value)}
            type='password'
            className='mt-[20px] rounded w-[388px] h-[40px] bg-violet-100 p-[10px]'
          />
          <Link
            to='/ForgetPassword'
            className='underline hover:underline hover:text-black'
          >
            {/* {t("Forget your password")} */}
            <p className='leading-6 text-[#0559FD] text-xs'>
              {t('Forgot your password?')}
            </p>
          </Link>
        </div>
        <div className='h-[auto] flex flex-col justify-center'>
          <p className='leading-6 text-[#141115]'>New Password</p>
          <input
            value={new_password}
            onChange={(e) => setNew_password(e.target.value)}
            id='overideBorder'
            type='password'
            className='mt-[20px] rounded w-[388px] h-[40px] bg-violet-100 p-[10px]'
          />
        </div>
        <div className='h-[auto] flex flex-col justify-center'>
          <p className='leading-6 text-[#141115]'>Confirm New Password</p>
          <input
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
            id='overideBorder'
            type='password'
            className='mt-[20px] rounded w-[388px] h-[40px] bg-violet-100 p-[10px]'
          />
          <button
            disabled={loading}
            onClick={callApiForUpdatePassword}
            className='w-[116px] h-[38px] p-[10px] rounded mt-[30px] flex items-center justify-center'
            id='overideBtnPasswordChange'
          >
            {updateBtn}
          </button>
        </div>
      </form>
    </>
  )
}

export default PasswordChange
