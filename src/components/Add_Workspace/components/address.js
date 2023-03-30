import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import CreateWorkspaceAddress from '../auto_complete'

const validate = Yup.object().shape({
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
})

const Address = (props) => {
  const { t } = useTranslation()
  const [address, setAddress] = useState('')

  const handleBack = (values) => {
    props.prev()
  }

  useEffect(() => {
    localStorage.setItem('address', JSON.stringify(address))
  }, [address])

  return (
    <main
      className='lg:p-10 lg:h-screen lg:grid lg:content-center lg:m-auto lg:items-center lg:py-0 md:px-10
    md:grid md:content-center md:h-screen md:m-auto md:py-0 sm:px-5 sm:py-10'
    >
      <h1 className='text-[20px] font-normal py-1'>
        {t('Where is your space located')}
      </h1>
      <p className='font-semibold text-[20px] '> 3/11 </p>

      <Formik
        initialValues={props.data}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          try {
            props.next(values)
            setSubmitting(true)
            setTimeout(() => {
              setSubmitting(false)
            }, 500)
          } catch (error) {}
        }}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form className='text-left lg:py-10'>
            <div className='relative my-5'>
              <label htmlFor='city' className='font-semibold'>
                {t('Address')}
              </label>
              <CreateWorkspaceAddress
                setAddressPicked={setAddress}
                noAbsoulte={'absolute'}
                placeholder={'Enter your address'}
              />
            </div>

            <div className='lg:grid lg:grid-cols-3 md:grid md:grid-cols-3'>
              <div
                className='lg:flex lg:flex-col lg:gap-3 lg:py-0 md:py-0 md:flex md:flex-col md:gap-3 
                sm:flex sm:flex-col sm:gap-3 sm:py-1'
              >
                <label htmlFor='city' className='font-semibold'>
                  {t('City')}
                </label>
                <input
                  type='text'
                  name='city'
                  value={values.city}
                  onChange={handleChange}
                  placeholder='City'
                  className='border-2 border-[#F6F6F6] outline-none indent-3
                  lg:w-full lg:h-[56px] lg:py-0 rounded text-left flex flex-col
                  focus:border-[#0559FD] md:w-full md:h-[50px] sm:w-full sm:h-[50px]
                  sm:py-3'
                />
                {errors.city && touched.city ? (
                  <div className='error pt-1 text-[#DA3D2A] '>
                    {errors.city}
                  </div>
                ) : null}
              </div>

              <div
                className='lg:flex lg:flex-col lg:gap-3 lg:px-3 lg:py-0 md:py-0 md:flex md:flex-col md:px-3 
                md:gap-3 sm:flex sm:flex-col sm:gap-3 sm:py-1'
              >
                <label htmlFor='state' className='font-semibold'>
                  {t('State')}
                </label>
                <Field
                  as='select'
                  name='state'
                  className='border-2 border-[#F6F6F6] outline-none
                  cursor-pointer lg:w-full lg:h-[56px] lg:py-0 rounded text-left
                  focus:border-[#0559FD] md:w-full md:h-[50px] sm:w-full sm:h-[50px]
                  sm:py-3'
                >
                  <option value='State'> -- </option>
                  <option value='Lagos'> Lagos </option>
                </Field>
                {errors.state && touched.state ? (
                  <div className='error pt-1 text-[#DA3D2A] '>
                    {errors.state}
                  </div>
                ) : null}
              </div>

              <div
                className='lg:flex lg:flex-col lg:gap-3 lg:py-0 md:py-0 md:flex md:flex-col md:gap-3 sm:flex 
                sm:flex-col sm:gap-3 sm:py-1'
              >
                <label htmlFor='country' className='font-semibold'>
                  {'Country'}
                </label>
                <Field
                  as='select'
                  name='country'
                  className='border-2 border-[#F6F6F6] outline-none
                  cursor-pointer lg:w-full lg:h-[56px] lg:py-0 rounded text-left
                  focus:border-[#0559FD] md:w-full md:h-[50px] sm:w-full sm:h-[50px]
                  sm:py-3'
                >
                  <option value='Country'> -- </option>
                  <option value='Nigeria'> Nigeria </option>
                </Field>
                {errors.country && touched.country ? (
                  <div className='error pt-1 text-[#DA3D2A] '>
                    {errors.country}
                  </div>
                ) : null}
              </div>
            </div>

            <button
              type='submit'
              className='border-0 rounded hover:bg-[#0559FD] bg-[#D4D4D4] text-white w-[80px] h-[52px] lg:mt-5
              md:mt-20 sm:mt-5 text-center'
            >
              Next
            </button>

            <section
              className='progressbar lg:flex lg:item-center lg:justify-center lg:gap-4 lg:pt-10 md:pt-24
              md:flex md:justify-between md:items-center md:gap-4 sm:flex sm:justify-between 
              sm:items-center sm:gap-4 sm:pt-10 '
            >
              <div className=' lg:w-[90%] border-b-2 border-[#F2F2F2] relative top-0 md:w-[90%] sm:w-[90%] '>
                <div className='w-[20%] border-b-2 border-blue-500 absolute'></div>
              </div>

              <div className='btns flex space-x-4'>
                <button
                  type='button'
                  onClick={() => handleBack(values)}
                  className='bg-[#969191a9] rounded lg:p-1 md:p-3 sm:p-1 shadow-2fl hover:bg-[#0559FD] cursor-pointer '
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10.9756 16.0248L7.37559 12.4248C7.31971 12.3691 7.27538 12.3029 7.24513 12.23C7.21489 12.1571 7.19932 12.0789 7.19932 12C7.19932 11.9211 7.21489 11.8429 7.24513 11.77C7.27538 11.6971 7.31971 11.6309 7.37559 11.5752L10.9756 7.9752C11.0314 7.91942 11.0976 7.87516 11.1705 7.84497C11.2434 7.81478 11.3215 7.79924 11.4004 7.79924C11.4793 7.79924 11.5574 7.81478 11.6303 7.84497C11.7032 7.87516 11.7694 7.91942 11.8252 7.9752C11.881 8.03099 11.9252 8.09721 11.9554 8.1701C11.9856 8.24299 12.0011 8.32111 12.0011 8.4C12.0011 8.47889 11.9856 8.55701 11.9554 8.6299C11.9252 8.70279 11.881 8.76902 11.8252 8.8248L9.24879 11.4H16.2004C16.3595 11.4 16.5121 11.4632 16.6247 11.5757C16.7372 11.6883 16.8004 11.8409 16.8004 12C16.8004 12.1591 16.7372 12.3117 16.6247 12.4243C16.5121 12.5368 16.3595 12.6 16.2004 12.6H9.24879L11.8252 15.1752C11.9379 15.2879 12.0011 15.4407 12.0011 15.6C12.0011 15.7593 11.9379 15.9121 11.8252 16.0248C11.7125 16.1375 11.5597 16.2008 11.4004 16.2008C11.2411 16.2008 11.0883 16.1375 10.9756 16.0248ZM2.40039 12C2.40039 14.5461 3.41182 16.9879 5.21217 18.7882C7.01251 20.5886 9.45431 21.6 12.0004 21.6C14.5465 21.6 16.9883 20.5886 18.7886 18.7882C20.589 16.9879 21.6004 14.5461 21.6004 12C21.6004 9.45392 20.589 7.01213 18.7886 5.21178C16.9883 3.41143 14.5465 2.4 12.0004 2.4C9.45431 2.4 7.01251 3.41143 5.21217 5.21178C3.41182 7.01213 2.40039 9.45392 2.40039 12ZM12.0004 20.4C10.8973 20.4 9.80498 20.1827 8.78585 19.7606C7.76671 19.3384 6.84071 18.7197 6.06069 17.9397C5.28068 17.1597 4.66194 16.2337 4.2398 15.2145C3.81766 14.1954 3.60039 13.1031 3.60039 12C3.60039 10.8969 3.81766 9.8046 4.2398 8.78546C4.66194 7.76633 5.28068 6.84032 6.06069 6.0603C6.84071 5.28029 7.76671 4.66155 8.78585 4.23941C9.80498 3.81727 10.8973 3.6 12.0004 3.6C14.2282 3.6 16.3648 4.485 17.9401 6.0603C19.5154 7.63561 20.4004 9.77218 20.4004 12C20.4004 14.2278 19.5154 16.3644 17.9401 17.9397C16.3648 19.515 14.2282 20.4 12.0004 20.4Z'
                      fill='#FFFFFF'
                    />
                  </svg>
                </button>

                <button
                  type='submit'
                  className='rounded lg:p-1 md:p-3 cursor-pointer sm:p-1 shadow-2fl bg-[#0559FD] '
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13.0252 16.0248L16.6252 12.4248C16.6811 12.3691 16.7254 12.3029 16.7556 12.23C16.7859 12.1571 16.8015 12.0789 16.8015 12C16.8015 11.9211 16.7859 11.8429 16.7556 11.77C16.7254 11.6971 16.6811 11.6309 16.6252 11.5752L13.0252 7.9752C12.9125 7.86254 12.7597 7.79924 12.6004 7.79924C12.4411 7.79924 12.2883 7.86254 12.1756 7.9752C12.0629 8.08786 11.9996 8.24067 11.9996 8.4C11.9996 8.55933 12.0629 8.71214 12.1756 8.8248L14.752 11.4H7.80039C7.64126 11.4 7.48865 11.4632 7.37613 11.5757C7.2636 11.6883 7.20039 11.8409 7.20039 12C7.20039 12.1591 7.2636 12.3117 7.37613 12.4243C7.48865 12.5368 7.64126 12.6 7.80039 12.6H14.752L12.1756 15.1752C12.0629 15.2879 11.9996 15.4407 11.9996 15.6C11.9996 15.7593 12.0629 15.9121 12.1756 16.0248C12.2883 16.1375 12.4411 16.2008 12.6004 16.2008C12.7597 16.2008 12.9125 16.1375 13.0252 16.0248ZM21.6004 12C21.6004 14.5461 20.589 16.9879 18.7886 18.7882C16.9883 20.5886 14.5465 21.6 12.0004 21.6C9.45431 21.6 7.01251 20.5886 5.21217 18.7882C3.41182 16.9879 2.40039 14.5461 2.40039 12C2.40039 9.45392 3.41182 7.01213 5.21217 5.21178C7.01251 3.41143 9.45431 2.4 12.0004 2.4C14.5465 2.4 16.9883 3.41143 18.7886 5.21178C20.589 7.01213 21.6004 9.45392 21.6004 12ZM12.0004 20.4C13.1035 20.4 14.1958 20.1827 15.2149 19.7606C16.2341 19.3384 17.1601 18.7197 17.9401 17.9397C18.7201 17.1597 19.3388 16.2337 19.761 15.2145C20.1831 14.1954 20.4004 13.1031 20.4004 12C20.4004 10.8969 20.1831 9.8046 19.761 8.78546C19.3388 7.76633 18.7201 6.84032 17.9401 6.0603C17.1601 5.28029 16.2341 4.66155 15.2149 4.23941C14.1958 3.81727 13.1035 3.6 12.0004 3.6C9.77257 3.6 7.636 4.485 6.06069 6.0603C4.48539 7.63561 3.60039 9.77218 3.60039 12C3.60039 14.2278 4.48539 16.3644 6.06069 17.9397C7.636 19.515 9.77257 20.4 12.0004 20.4Z'
                      fill='#FFFFFF'
                    />
                  </svg>
                </button>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default Address
