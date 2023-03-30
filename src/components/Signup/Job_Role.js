import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TextField } from '../Login/TextField'
import {
  getSignupEmail,
  getSignUpWorkspace,
  getSignUpBody,
  setSignupJob,
  getSignupJob,
  getSignupAddress,
  getIsOauthObj,
} from '../../slices/authRelated'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'

const Job_Role = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const signUpBody = useSelector(getSignUpBody)
  const signupEmail = useSelector(getSignupEmail)
  const isOauthObj = useSelector(getIsOauthObj)
  const signUpWorkspace = useSelector(getSignUpWorkspace)
  const signupAddress = useSelector(getSignupAddress)
  const signupJob = useSelector(getSignupJob)
  const [readyForSubmission, setReadyForSubmission] = useState(false)
  const [btnMsg, setBtnMsg] = useState('Complete')
  const cookies = new Cookies()
  const [address, setAddress] = useState('null')

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('address'))
    if (items) {
      setAddress(items)
    }
  }, [])

  const submitFormForReg = async (e) => {
    let body
    body = {
      first_name: signUpBody?.firstName,
      last_name: signUpBody?.lastName,
      email: signupEmail,
      password: signUpBody?.password,

      address: address,
      city: signupAddress?.city,
      state: 'Lagos', //signupAddress?.state,
      country: 'Nigeria', //signupAddress?.country,
      position: signupJob?.position,
      company: signupJob?.company,
      stacks: signupJob?.checked,
      account_type: signUpWorkspace == 1 ? 'Owner' : 'User',
    }
    setBtnMsg('Registering...')
    // compute all changes
    let token = cookies.get('user_token')
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (data?.status === false) {
      setBtnMsg(data.errors.email[0])
      return
    }
    setBtnMsg('Success...')
    cookies.set('user_token', data?.data?.token, {
      path: '/',
      maxAge: 2600000,
      sameSite: 'none',
      secure: true,
    })
    setTimeout(() => {
      const isToRedirect = cookies.get('redirect_back_val')
      if (isToRedirect) {
        navigate(`/${isToRedirect}`)
        cookies('redirect_back_val')
        return
      }
      navigate('/dashboard')
    }, 2000)
    return
  }

  useEffect(() => {
    if (readyForSubmission) {
      submitFormForReg()
    }
    setReadyForSubmission(false)
  }, [readyForSubmission])

  const jobRolesCheck = [
    {
      id: 1,
      name: 'Select your stacks',
      roles: [
        { checkbox: 'PHP' },
        { checkbox: 'Python' },
        { checkbox: 'JavaScript' },
        { checkbox: 'Flutter' },
        { checkbox: 'React' },
        { checkbox: 'Django' },
        { checkbox: 'NodeJS' },
        { checkbox: 'Vue' },
      ],
    },
  ]

  return (
    <main
      className='lg:grid lg:content-center lg:justify-center lg:h-screen
      text-center lg:mx-auto md:px-10 md:py-14 sm:px-10 sm:py-14'
    >
      <h1 className='text-2xl font-semibold '> {t('Job Role')} </h1>
      <p className='text-lg'> {t('Enter your postion and stacks')} </p>

      <Formik
        initialValues={{
          checked: [],
        }}
        onSubmit={async (values) => {
          dispatch(setSignupJob(values))
          setReadyForSubmission(true)
        }}
      >
        {({ values, handleChange }) => (
          <Form className='text-left lg:py-10 lg:w-[480px] sm:py-10'>
            <div className='py-0'>
              <TextField
                label='Position'
                type='text'
                name='position'
                placeholder='Enter your position'
                onChange={handleChange}
                value={values.position}
                className='border-2 border-[#F6F6F6] 
                rounded w-full indent-2 lg:py-3 lg:my-1 outline-none 
                shadow-none focus:border-[#0559FD] md:py-4 md:my-2 sm:my-2 sm:py-3 '
              />
            </div>

            <div className='py-1'>
              <TextField
                label='Company'
                type='text'
                name='company'
                placeholder='Enter your company'
                onChange={handleChange}
                value={values.company}
                className='border-2 border-[#F6F6F6] 
                rounded w-full indent-2 lg:py-3 lg:my-1 outline-none 
                shadow-none focus:border-[#0559FD] md:py-4 md:my-2 sm:my-2 sm:py-3 '
              />
            </div>

            <div className='stack_wrap'>
              <h1 className='text-lg'> {t('Select your stacks')} </h1>
              <div className='grid grid-cols-2 items-center py-3'>
                {jobRolesCheck.map((post, index) => {
                  return post.roles?.map((check, checkIndex) => {
                    return (
                      <label className='flex items-center gap-4'>
                        <Field
                          type='checkbox'
                          key={checkIndex}
                          name='checked'
                          value={check?.checkbox}
                        />
                        {check?.checkbox}
                      </label>
                    )
                  })
                })}
              </div>
            </div>

            <hr className='border-[#D4D4D4] w-full lg:mt-10 md:mt-20 sm:mt-20' />
            <div className='flex justify-end item-end ml-auto py-4 '>
              <button
                type='submit'
                className='bg-[#D4D4D4] rounded py-3 px-5 text-white hover:bg-[#0559FD]'
              >
                {btnMsg}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default Job_Role
