import React from 'react'
import { Helmet } from 'react-helmet'
import Cookies from 'universal-cookie'
import checkForAuthentication from '../../utils/checkForAuthentication'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { setSignupEmail } from '../../slices/authRelated'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { TextField } from '../Login/TextField'
import { useDispatch } from 'react-redux'
import HowItWorksHeader from './HowItWorksUI/HowItWorksHeader'
import { toast } from 'react-toastify'

const HowItWorks = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const [authenticated, setAuthenticated] = useState('loading')

  useEffect(async () => {
    if (authenticated !== 'loading') return
    const { error, success, proccessing_auth } = await checkForAuthentication()
    if (success) {
      setAuthenticated(true)
      return
    }
    setAuthenticated(false)
  }, [authenticated])

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
        }),
      }
    )
    const data = await response.json()
    if (data.status === true) {
      dispatch(setSignupEmail(email))
      nextStep(value)
      return {
        status: true,
        message: 'Successful',
      }
    }

    let message = data?.errors?.email[0]
    toast.error(data?.errors?.email[0])
    return {
      status: false,
      message: 'email already exist',
    }
  }

  const validate = Yup.object().shape({
    email: Yup.string()
      .email('Your email is incorrect. Check and re-enter a correct email.')
      .required('Email address is required'),
  })

  return (
    <div className='overflow-x-hidden'>
      <Helmet>
        <title>How It Works</title>

        <meta
          name='description'
          content='Share your space and unlock new experiences and network while you make money'
        />
        <meta
          name='keywords'
          content='Monetize Your space, Ready to start making money?, Earn Money, Get Sspace Bookings '
        />
      </Helmet>
      <HowItWorksHeader />
      <>
        <div
          className='h-bg absolute top-0  h-bg bg-gradient-to-b from-[#0559FD] to-[#E034E8] '
          style={{
            backgroundImage:
              'url(https://trybookings-assets.s3.eu-west-2.amazonaws.com/howitworks.jpeg)',
          }}
        ></div>

        <div className='flex flex-col relative z-40 justify-center items-center mt-44 w-full'>
          <h1 className='lg:text-5xl md:text-2xl sm:text-2xl font-bold pb-4 text-white text-center'>
            {t('Monetize Your Space')}
          </h1>
          <p className='text-lg pb-4 text-white text-center'>
            {t(
              'Share your space and unlock new experiences and network while you make money'
            )}
          </p>

          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              checkIfCanContinueWithEmail(values?.email, props.next, values)
              // props.next(values);
            }}
          >
            {({ values, handleChange }) => {
              return (
                <Form className='relative style={{ zIndex: 1000 }} px-3'>
                  <TextField
                    label='Email Address'
                    name='email'
                    type='email'
                    onChange={handleChange}
                    value={values.email}
                    placeholder='Email Address'
                    maxLength='96'
                    className='hep lg:w-[60rem] lg:h-[4rem] md:w-[44rem] md:h-[4rem] sm:w-[22rem] sm:h-[4rem] bg-white rounded indent-4 placeholder:text-lg outline-0 placeholder:font-light drop-shadow-xl border-none'
                  />
                  <button
                    className='absolute z-30 xl:right-5 xl:top-4 sm:right-16 sm:top-10 md:right-20 md:top-10 py-2 px-5 rounded-lg hover:bg-green-500 bg-[#0559FD] text-lg text-white font-light'
                    type='submit'
                  >
                    {t('Get started')}
                  </button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </>

      <div className='lg:flex lg:flex-col lg:gap-4 lg:justify-center lg:items-center lg:py-20 lg:px-10 md:flex md:flex-col md:gap-5 md:justify-center md:items-center md:py-20 md:px-5 sm:flex sm:flex-col sm:gap-5 sm:justify-center sm:items-center sm:py-20 sm:px-5 text-center '>
        <section className='flex flex-col justify-center items-center gap-3'>
          <h1 className='text-2xl font-semibold'>{t('How It Works?')}</h1>
          <p className='text-xl text-[#2C292C]'>
            {t('It takes a few steps to get your space to make money for you')}
          </p>
        </section>

        <section className='lg:grid lg:grid-cols-3 lg:content-center lg:gap-10 lg:py-10 md:grid md:grid-cols-1 md:content-center md:gap-10 md:py-10 sm:grid sm:grid-cols-1 sm:gap-10 sm:py-10'>
          <div className='text-center flex flex-col justify-center items-center gap-4'>
            <div className='bg-[#CDDEFF] w-[100px] h-[80px] rounded-md flex justify-center items-center '>
              <img
                className='w-10'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/location1.png'
                alt='location'
              />
            </div>
            <h2 className='text-[#2C292C] text-2xl font-semibold'>
              {t('List your space')}
            </h2>
            <p className='text-xl px-5 text-[#2C292C]'>
              {t(
                'Set up your TryBookings profile within few minutes. List your space with high quality photos and amenities you own'
              )}
            </p>
          </div>

          <div className='text-center flex flex-col justify-center items-center gap-4'>
            <div className='bg-[#FCC7FF] w-[100px] h-[80px] rounded-md flex justify-center items-center '>
              <img
                className='-[#E034E8]'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/people.svg'
                alt='people'
              />
            </div>
            <h2 className='text-[#2C292C] text-2xl font-semibold'>
              {t('Get space bookings')}
            </h2>
            <p className='text-xl px-5 text-[#2C292C]'>
              {t(
                'once we publish your space online, it will be exposed to TryBookings marketplace.You start getting bookings requests.'
              )}
            </p>
          </div>

          <div className='text-center flex flex-col justify-center items-center gap-4'>
            <div className='bg-[#FEF8DE] w-[100px] h-[80px] rounded-md flex justify-center items-center '>
              {' '}
              <img
                className='w-10 '
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/dollar.jpg'
                alt='dollar'
              />
            </div>

            <h2 className='text-[#2C292C] text-2xl font-semibold'>
              {t('Earn Money')}
            </h2>
            <p className='text-xl px-5 text-[#2C292C]'>
              {t(
                'Your space listing attracts more users, which in turn generates more income for you'
              )}{' '}
            </p>
          </div>
        </section>
      </div>

      <>
        <div
          className='flex justify-center mx-auto bg-gradient-to-b from-[#F9DC5C] to-[#E034E8] lg:py-5 height  lg:w-11/12 md:w-[44rem]  sm:w-[23rem]
      text-white rounded-lg items-center  lg:px-10 shadow-2xl lg:-mt-24 md:mt-0 sm:mt-0 md:mb-4 sm:pt-4 sm:pl-4 md'
        >
          <div className='flex flex-col space-y-4 justify-center w-full lg:pr-96'>
            <h1 className='text-3xl font-semibold text-white'>
              {' '}
              {t('Ready to start making money?')}{' '}
            </h1>
            <p className='font-light text-2xl'>
              {t('It takes just 3 minutes to get started')}
            </p>
            <Link to='/Search'>
              <button
                className='rounded-md text-2xl text-white
          px-5 py-4 bg-[#0559FD] w-52 mt-6 font-light hover:bg-indigo-800'
              >
                {t('List spaces')}
              </button>
            </Link>
          </div>

          <div className='lg:ml-auto '>
            <img
              className='rounded-lg  w-64 h-44  -rotate-45  md:mr-10 hidden md:block sm:invisible lg:visible'
              src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/dashbord.png'
              alt='dashboard'
            />
          </div>
        </div>
      </>

      <div className='bg-[#011936]'>
        <div
          className='lg:flex lg:flex-row lg:justify-between lg:items-baseline mt-14 text-white lg:gap-6
      lg:px-10 lg:py-14 md:flex md:justify-center md:flex-col md:px-10 md:py-10 sm:px-10 sm:py-10'
        >
          <div>
            <Link to='/' className='w-1/6 '>
              <h1 className='text-white lg:text-4xl font-bold md:font-bold md:text-2xl sm:text-2xl'>
                TrySpacely
              </h1>
            </Link>
          </div>

          <section
            className='lg:grid lg:grid-cols-3 lg:space-y-0 gap-5 w-4/6 lg:-mt-1 md:grid md:grid-cols-2 md:py-5 md:space-y-5
        sm:space-y-5 sm:py-5'
          >
            <div>
              <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
                {t('Search')}
              </h1>
              <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
                <Link to='/booking'> {t('Search spaces')} </Link>
                <Link to='/booking'> {t('Search by City')} </Link>
                <Link to='/booking'> {t('Hottest Coding Space Nearby')} </Link>
                <Link to='/booking'> {t('Search by mentorship Opening')} </Link>
              </div>
            </div>

            <div className='lg:-ml-0 md:ml-20'>
              <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
                {t('Space Owners')}
              </h1>
              <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base '>
                <Link to='/booking'> {t('List spaces')} </Link>
                <Link to='/signup'> {t('Sign Up')} </Link>
                <Link to='/login'> {t('Login')} </Link>
              </div>
            </div>

            <div>
              <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
                {t('Reviews')}
              </h1>
              <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
                {/*<Link to='/viewallreviews'> {t("view all Reviews")} </Link>*/}
                {/*<Link to='/mostreviewed'> {t("Most Reviewed Spaces")} </Link>*/}
                <Link to='/howitworks'>{t('How It Works')}</Link>
              </div>
            </div>

            <div className='lg:-ml-0 md:ml-20'>
              <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
                {t('Company')}
              </h1>
              <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
                <Link to='/about'> {t('About Us')} </Link>
                <Link to='/blog'> {t('Blog')} </Link>
                {/*<Link to='/support'> {t("Support")} </Link>*/}
              </div>
            </div>

            <div>
              <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
                {t('Support')}
              </h1>
              <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col lg:text-base sm:flex sm:flex-col lg:font-light md:text-base sm:text-base'>
                <Link to='/helpcenter'> {t('Help Center')} </Link>
                <Link to='/contact-us'> {t('Contact Us')} </Link>
                {/*<Link to='/cancel'> {t("Cancellation Option")} </Link>*/}
              </div>
            </div>
          </section>
        </div>
      </div>

      <section
        className='bg-[#000710] text-white lg:flex lg:flex-row lg:justify-between
    lg:px-10 lg:py-4 lg:items-center lg:mx-0 md:flex md:flex-col
    md:px-10 md:mx-auto md:justify-center md:items-center sm:flex sm:flex-col
    sm:justify-center sm:items-center sm:mx-auto sm:px-5 sm:py-4'
      >
        <div
          className='lg:flex lg:flex-row lg:gap-5 md:flex md:flex-col
      md:items-center md:justify-center sm:flex sm:flex-col sm:justify-center
      sm:items-center'
        >
          <p>
            <i className='far fa-copyright'></i> 2022, TrySpacely, Inc
          </p>
          <div className='lg:flex lg:gap-4 lg:px-5 lg:py-0 md:py-2 sm:py-2'>
            {/*<Link to='/privacy' className='lg:px-2 md:px-2 sm:px-2'> {t("Privacy")} </Link>*/}
            <Link to='/tandc' className='lg:px-2 md:px-2 sm:px-2'>
              {' '}
              {t('Terms & Condition')}{' '}
            </Link>
            <Link to='/sitemap' className='lg:px-2 md:px-2 sm:px-2'>
              {' '}
              {t('Site Map')}{' '}
            </Link>
          </div>
        </div>

        <div className='flex gap-4 items-center sm:mr-2 sm:mt-2 text-white'>
          <a href='/linkedin'>
            {' '}
            <i className='fa-brands fa-linkedin-square fa-2x'></i>
          </a>

          <a href='https://twitter.com/trybookinz' target={'_blank'}>
            {' '}
            <i className='fa-brands fa-twitter-square fa-2x'></i>
          </a>

          <a href='https://facebook.com/tryspacely' target={'_blank'}>
            {' '}
            <i className='fa-brands fa-facebook-square fa-2x'></i>
          </a>

          <a href='https://instagram.com/tryspacely' target={'_blank'}>
            {' '}
            <i className='fa-brands fa-instagram-square fa-2x'></i>
          </a>
        </div>
      </section>
    </div>
  )
}
export default HowItWorks
