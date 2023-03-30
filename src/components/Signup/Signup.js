import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { setSignupEmail, setIsOauthObj } from '../../slices/authRelated'
import { useTranslation } from 'react-i18next'
import { Design } from './ui/SignupAside'
import Header from '../homepage/ui/header'
import { SocialLogin } from './ui/SocialLogin'
import { OrStyling } from './ui/or'
import { TextField } from '../Login/TextField'
import { useDispatch } from 'react-redux'
import useGithubAuth from '../../hooks/useGithubAuth'
import { Helmet } from 'react-helmet'

const Signup = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [toast, setToast] = useState('')
  const [btnMsg, setBtnMsg] = useState('Create Account')
  const [isOauthSigned, setIsOauthSigned] = useState({
    email: '',
    provider: '',
    providerId: '',
    usingSocial: false,
  })

  const isRegisteringViaSocial = () => {
    if (isOauthSigned?.usingSocial === true) {
      if (isOauthSigned?.provider === 'google') {
        return
      } else if (isOauthSigned?.provider === 'github') {
        dispatch(setIsOauthObj(isOauthSigned))
      }
    }
  }

  useEffect(() => {
    isRegisteringViaSocial()
    if (isOauthSigned?.provider === 'github') {
      setToast(
        "Hi, we still need you to fill up the your email below and continue. Don't worry, you will be able to signin with just github."
      )
    }
  }, [isOauthSigned])

  const validate = Yup.object().shape({
    email: Yup.string()
      .email('Your email is incorrect. Check and re-enter a correct email.')
      .required('Email address is required'),
  })

  const checkIfCanContinueWithEmail = async (email, nextStep, value) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/signup/verifyemail`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          // password,
        }),
      }
    )
    const data = await response.json()
    if (data.status === true) {
      dispatch(setSignupEmail(email))
      nextStep(value)
      return {
        status: true,
        message: '',
      }
    }

    let message = data?.errors?.email[0]
    setToast(data?.errors?.email[0])
    return {
      status: false,
      message: '',
    }
  }

  return (
    <main className='signup_wrapper lg:h-screen xl:h-screen '>
      <Helmet>
        <title>TrySpacely | Sign up</title>
        <meta name='description' content='' />
        <meta name='keywords' content='' />
      </Helmet>

      <Header />
      <section className=' sm:grid sm:grid-cols-1 md:grid-cols-1 lg:flex '>
        <Design />

        <div
          className='sm:px-10 sm:py-10 md:py-10 md:px-10 lg:grid lg:grid-cols-1 lg:content-center 
        lg:h-screen lg:w-[60%] lg:px-24 relative '
        >
          <h1 className='text-black capitalize text-xl font-medium '>
            {t('create new account')}
          </h1>
          <p className='text-lg text-[#34475E] '>
            {t('A place to connect and work close to home')}
          </p>

          <SocialLogin
            setToast={setToast}
            isOauthSigned={isOauthSigned}
            setIsOauthSigned={setIsOauthSigned}
          />
          {toast && (
            <div
              style={{
                width: '100%',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'red',
              }}
            >
              {toast}
            </div>
          )}
          <OrStyling />

          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              if (
                isOauthSigned?.usingSocial === true &&
                isOauthSigned?.provider === 'github'
              ) {
                githubSignup(
                  values?.email,
                  isOauthSigned?.providerId,
                  isOauthSigned?.provider
                )
                return
              }
              checkIfCanContinueWithEmail(values?.email, props.next, values)
              // props.next(values);
            }}
          >
            {({ values, handleChange }) => {
              return (
                <Form className='py-5 flex flex-col'>
                  <TextField
                    label='Email Address'
                    name='email'
                    type='email'
                    onChange={handleChange}
                    value={values.email}
                    placeholder='mail@company.com'
                  />

                  <button
                    type='submit'
                    className='capitalize rounded h-[52px]
                  bg-[#AAAAAA] my-3 text-white hover:bg-[#0559FD]'
                  >
                    {btnMsg}
                  </button>

                  <p className='text-center'>
                    {t('By continuing, you agree to the')}
                    <span className='underline font-semibold'>
                      {t('Terms of use,')}
                    </span>
                    and
                    <span className='underline font-semibold'>
                      {t('Privacy Policy')}
                    </span>
                    {t('of tryspacely.com')}
                  </p>

                  <p className='my-4 text-center font-semibold mt-8 '>
                    {t('Already have an account?')}
                    <Link to='/Login' className='text-[#0559FD] '>
                      {t('Login')}
                    </Link>
                  </p>
                </Form>
              )
            }}
          </Formik>
        </div>
      </section>
    </main>
  )
}

export default Signup
