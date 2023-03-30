import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

import GitHubLogin from 'react-github-login'
import LoginGithub from 'react-login-github'
import {
  getChangedPlatform,
  getEmailBackup,
  getIdBackup,
  getInit2FA,
  setEmailBackup,
  setInit2FA,
  setToken,
} from '../../slices/authRelated'

import { Design } from '../Signup/ui/SignupAside'
import { OrStyling } from '../Signup/ui/or'
import Header from '../homepage/ui/header'
import { TextField } from './TextField'
import LoginHooks from './LoginHooks'

import GitHubIcon from '../../assets/icons/Github.svg'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'
import useGithubAuth from '../../hooks/useGithubAuth'
import AccountActivator from './AccountActivator'
import { setAccountRestoreObject } from '../../slices/accountRestorer'
import { Helmet } from 'react-helmet'
import InitVerifyCodePhoneNumber from '../Settings/Prompts/InitVerifyCodePhoneNumber'
import checkForAuthentication from '../../utils/checkForAuthentication'

const Login = () => {
  const cookies = new Cookies()
  const emailbackup = useSelector(getEmailBackup)
  const idBackup = useSelector(getIdBackup)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const changedPlatform = useSelector(getChangedPlatform)
  const init2FA = useSelector(getInit2FA)
  const [passwordShown, setPasswordShown] = useState(false)
  const [btnMsg, setBtnMsg] = useState('Log in')
  const [message, setMessage] = useState()
  const [toast, setToast] = useState({ message: '', color: 'black' })
  const [code, setCode] = useState(null)
  const { t } = useTranslation()
  const [accountActivatorPopOver, setAccountActivatorPopOver] = useState(false)
  const [isTraditional, setIstraditional] = useState(false)
  const { token } = useGithubAuth(
    code,
    process.env.GITHUB_SECRET_KEY,
    'signin',
    setToast,
    setAccountActivatorPopOver
  )

  const [authenticated, setAuthenticated] = useState(null)

  useEffect(async () => {
    const { success } = await checkForAuthentication()
    if (success) {
      setAuthenticated(true)
      return navigate('/dashboard')
    }
    checkForAuthentication()
  }, [])

  // ?brb
  const onSuccess = (response, token) => {
    dispatch(setToken(token))
    if (document.getElementById('rememberMe').checked) {
      cookies.set('user_token', token, {
        path: '/',
        maxAge: 2600000,
        sameSite: 'none',
        secure: true,
      })
    } else {
      cookies.set('user_token', token)
    }
    setTimeout(() => {
      const isToRedirect = cookies.get('redirect_back_val')
      if (isToRedirect) {
        navigate(isToRedirect)
        cookies.remove('redirect_back_val')
        return
      }
      navigate('/dashboard')
    }, 2000)
  }

  const onSuccessGit = async (response, token) => {
    // ?brb
    try {
      setCode(response?.code)
    } catch (error) {}
  }

  const onFailureGit = (response) =>
    console.log(response, 'as signin falure response from git')

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  const validate = Yup.object().shape({
    email: Yup.string()
      .email('Your email is incorrect. Check and re-enter a correct email.')
      .required('Email address is required'),
    password: Yup.string().required(
      'Your password is incorrect. Check and re-enter a correct password.'
    ),
  })

  const sendLoginRequest = async (
    email,
    password,
    setSubmitting,
    resetForm
  ) => {
    setMessage('')
    setBtnMsg('Loggin in....please wait...')
    try {
      setSubmitting(true)
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = await res.json()
      if (data?.status === false) {
        setSubmitting(false)
        // const firstMessage = Object.values(data?.errors)[0];
        if (data?.data?.reactivate) {
          // user account is disabled;
          let restoreObject = {
            authBy: 'EmailPassword',
            email,
            password,
          }
          dispatch(setAccountRestoreObject(restoreObject))
          setAccountActivatorPopOver(true)
          return
        }
        if (data?.data?.otp == 'sms') {
          setIstraditional(true)
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
          setIstraditional(true)
          dispatch(setEmailBackup(email))
          dispatch(
            setInit2FA({
              type: 'auth_code',
              popup: true,
            })
          )
          return
        }
        setMessage(data?.errors?.message)
        setBtnMsg('Error! Try Log in again.')
        resetForm()
        return
      }
      setSubmitting(false)
      setBtnMsg('Success!')
      onSuccess('', data?.data?.token)
      return
    } catch (error) {
      setSubmitting(false)
      setBtnMsg('Error occured!')
      resetForm()
    }
  }

  return (
    <>
      {init2FA?.type === 'sms' && init2FA?.popup === true && (
        <InitVerifyCodePhoneNumber
          init2FA={init2FA}
          emailbackup={emailbackup}
          idBackup={idBackup}
          isTraditional={isTraditional}
        />
      )}
      {init2FA?.type === 'auth_code' && init2FA?.popup === true && (
        <InitVerifyCodePhoneNumber
          init2FA={init2FA}
          emailbackup={emailbackup}
          idBackup={idBackup}
          isTraditional={isTraditional}
        />
      )}
      {/* {
      init2FA?.type === '2fa' && init2FA?.popup === true && <InitVerifyCodePhoneNumber init2FA={init2FA} emailbackup={emailbackup} />
    } */}
      {accountActivatorPopOver && (
        <AccountActivator
          setAccountActivatorPopOver={setAccountActivatorPopOver}
          onSuccess={onSuccess}
        />
      )}
      <main className='md:h-screen lg:h-screen xl:h-screen '>
        <Helmet>
          <title>TrySpacely | Login</title>
          <meta name='description' content='' />
          <meta
            name='keywords'
            content='Login to have access to amazing workspace around'
          />
        </Helmet>
        <Header
        // errorAuth={errorAuth}
        // success={success}
        // loadingfinished={loadingfinished}
        />
        <main className=' sm:grid sm:grid-cols-1 md:grid-cols-1 lg:flex '>
          <Design />

          <section
            className='sm:px-10 sm:py-10 md:py-10 md:px-10 lg:grid lg:grid-cols-1 lg:content-center 
        lg:h-screen lg:w-[60%] lg:px-24 relative'
          >
            <h1 className='font-semibold text-2xl'> {t('Welcome back!')} </h1>
            <p className='text-lg text-[#34475E]'>
              {t('A place to connect and work close to home')}
            </p>

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validate}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                sendLoginRequest(
                  values.email,
                  values.password,
                  setSubmitting,
                  resetForm
                )
              }}
            >
              {({ isSubmitting, values, handleChange }) => (
                <Form className='py-4'>
                  <div>
                    <TextField
                      label='Email Address'
                      name='email'
                      type='email'
                      value={values.email}
                      onChange={handleChange}
                      placeholder='mail@company.com'
                    />
                  </div>

                  <div className='relative'>
                    <TextField
                      label='Password'
                      name='password'
                      type={passwordShown ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange}
                      placeholder='******'
                    />
                    <span
                      onClick={togglePasswordVisiblity}
                      className='absolute top-[50px] right-4 cursor-pointer'
                    >
                      <img
                        src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/eye.svg'
                        alt=''
                        className='w-5 h-5'
                      />
                    </span>
                  </div>

                  <div className='remember flex justify-between justify-items-center my-4'>
                    <div className='check gap-2 flow-root'>
                      <input
                        type='checkbox'
                        name='rememberMe'
                        id='rememberMe'
                      />{' '}
                      Remember me
                    </div>
                    <Link
                      to='/ForgetPassword'
                      className='underline hover:underline hover:text-black'
                    >
                      {t('Forget your password')}
                    </Link>
                  </div>
                  {message && (
                    <div
                      style={{
                        width: '100%',
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {message}
                    </div>
                  )}
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='border-0 py-2
                  rounded hover:bg-[#0559FD]
                  w-full bg-[#AAAAAA] text-white'
                  >
                    {' '}
                    {btnMsg}{' '}
                  </button>
                </Form>
              )}
            </Formik>

            <OrStyling />

            <div
              className='grid grid-cols-1 
            align-middle justify-center gap-2 my-4 '
            >
              <LoginHooks
                setToast={setToast}
                setAccountActivatorPopOver={setAccountActivatorPopOver}
              />
              {toast && (
                <div
                  style={{
                    width: '100%',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: toast?.color,
                  }}
                >
                  {toast?.message}
                </div>
              )}

              <button
                className='border-2 border-[#D4D4D4] w-full py-2
              bg-transparent rounded shadow-none lg:flex lg:justify-center 
              lg:items-center lg:gap-4 md:gap-4 md:flex md:justify-center 
              md:items-center sm:flex sm:justify-center sm:items-center sm:gap-4 '
              >
                <GitHubIcon />
                <LoginGithub
                  redirectUri={`${process.env.WEBSITE_URL_LIVE}/login`}
                  // redirectUri='http://localhost:8080/login'
                  clientId={process.env.GITHUB_CLIENT_ID}
                  onSuccess={onSuccessGit}
                  onFailure={onFailureGit}
                  buttonText='Login with Github'
                />
              </button>
            </div>

            <p className='text-center py-2 text-base'>
              {t("Don't have an account?")}
              <Link to='/signup' className='text-[#0559FD]'>
                {t('Signup')}
              </Link>
            </p>

            {/*<ChatButton />*/}
          </section>
        </main>
      </main>
    </>
  )
}

export default Login
