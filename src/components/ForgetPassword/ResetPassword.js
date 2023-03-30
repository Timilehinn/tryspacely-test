import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Lock from '../../assets/icons/Lock.svg'
import { TextField } from '../Login/TextField'
import useCookieHandler from '../../hooks/useCookieHandler'
import Cookies from 'universal-cookie'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'

function ResetPassword() {
  const cookies = new Cookies()
  const { t } = useTranslation()
  const { token } = useCookieHandler('user_token')
  const navigate = useNavigate()
  const [passwordShown, setPasswordShown] = useState(false)
  const [message, setMessage] = useState()
  const [btnMsg, setBtnMsg] = useState('Reset Password')
  const [msgColor, setMsgColor] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { pathname } = useLocation()
  const activation_code = pathname.match(/%3D(.*)/)[1]

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  const checks = async (password) => {
    setMessage('')
    const upperCaseWords = await password?.match(/[A-Z]/g)
    const isNumberPresent = await password?.match(/[0-9]/g)
    const lowerCaseWords = await password?.match(/[a-z]/g)
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const isSpecialChar = specialChars.test(password)

    if (!upperCaseWords) {
      setMessage('Passwords must have at least one Uppercase letter.')
      setMsgColor('red')
      return
    }

    if (!lowerCaseWords) {
      setMessage('Passwords must have at least one Lowercase letter.')
      setMsgColor('red')
      return
    }

    if (!isNumberPresent) {
      setMessage('Passwords must have at least one number.')
      setMsgColor('red')
      return
    }

    if (!isSpecialChar) {
      setMessage('Passwords must have at least one Symbol.')
      setMsgColor('red')
      return
    }

    if (password.length < 8) {
      setMessage('Passwords must be at least 8 characters long.')
      setMsgColor('red')
      return
    }
    return true
  }

  const resetPassword = async (password) => {
    if (!password) {
      toast.info('Please enter new password')
      return
    }
    if (!activation_code) {
      toast.error('Unathorized, Token not found')
      return
    }

    const result = await checks(password)
    if (!result) {
      return
    }
    try {
      setBtnMsg('Resetting.......')
      setIsLoading(true)
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password,
            activation_code,
          }),
        }
      )
      const data = await res.json()
      console.log(data)
      if (data.status === false) {
        setBtnMsg('Reset Password')
        setIsLoading(false)

        if (data?.errors?.password) {
          setMsgColor('red')
          setMessage(data.errors.password)
          return
        }
        return
      }
      setBtnMsg('Success!!!')
      setMsgColor('green')
      setMessage('Password Reset Successful!')
      setTimeout(() => {
        setIsLoading(false)
        const isToRedirect = cookies.get('redirect_back_val')
        if (isToRedirect) {
          navigate(`/${isToRedirect}`)
          cookies.remove('redirect_back_val')
          return
        }
        navigate('/login')
      }, 2000)
      return 'success'
    } catch (error) {
      setMsgColor('red')
      setBtnMsg('Reset Password')
      setIsLoading(false)
    }
  }

  const validate = Yup.object().shape({
    password: Yup.string().required(
      'Your password is incorrect. Check and re-enter a correct password.'
    ),
    confirmPassword: Yup.string().when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Password does not match'
      ),
    }),
  })

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name='description' content='' />
        <meta name='keywords' content='' />
      </Helmet>
      <main
        className='sm:w-96 sm:mx-10
      grid grid-cols-1 gap-3 content-center 
    justify-items-center h-screen lg:w-2/6 lg:m-auto'
      >
        <div className='bg-[#CDDEFF] rounded-full p-2 '>
          <Lock />
        </div>

        <h1 className='text-2xl font-semibold'>
          {' '}
          {t('Reset your password?')}{' '}
        </h1>
        <p className='sm:w-full lg:w-3/4 text-center'>
          {t('Enter your new password to your account')}
        </p>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validate}
          onSubmit={async (values, actions) => {
            await resetPassword(values.password)
          }}
        >
          {({ values, handleSubmit, handleChange, handleBlur }) => (
            <Form>
              <div className='relative '>
                <TextField
                  name='password'
                  onBlur={handleBlur}
                  label='New Password'
                  placeholder='******'
                  onChange={handleChange}
                  value={values.password}
                  type={passwordShown ? 'text' : 'password'}
                />
                <i
                  className='fa-solid fa-eye absolute top-11 right-4 cursor-pointer'
                  onClick={togglePasswordVisiblity}
                ></i>
              </div>

              <div className='relative '>
                <TextField
                  type='password'
                  onBlur={handleBlur}
                  placeholder='*******'
                  name='confirmPassword'
                  onChange={handleChange}
                  label='Confirm Password'
                  value={values.confirmPassword}
                />
                <i
                  className='fa-solid fa-eye absolute top-11 right-4 cursor-pointer'
                  onClick={togglePasswordVisiblity}
                ></i>
              </div>

              <ul className='error text-sm list-disc ml-5 text-btnColor'>
                <li>
                  {t(
                    'Password should contain a uppercase letter, number or a special character'
                  )}
                </li>
                <li> Password must be at least 8 characters long </li>
              </ul>

              <button
                type='submit'
                disabled={isLoading}
                className='rounded bg-gray-500 py-2 
              bg-btnColor my-3 text-white hover:bg-[#0559FD] w-full disabled:opacity-[0.7]'
              >
                {' '}
                {btnMsg}
              </button>
            </Form>
          )}
        </Formik>
        <div className={`text-[${msgColor}]`}>
          {Array.isArray(message) ? message?.map((m) => <p>{m}</p>) : message}
        </div>
      </main>
    </>
  )
}

export default ResetPassword
