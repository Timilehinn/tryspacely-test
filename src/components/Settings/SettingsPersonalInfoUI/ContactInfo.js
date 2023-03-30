import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { getTextState, setTextState } from '../../../slices/profileUpdateSlice'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const ContactInfo = ({ setUser, user, updateProfile, errorMsg }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const textState = useSelector(getTextState)
  const [emailDisabled, setEmailDisabled] = useState(true)
  const [phone_numberDisabled, setPhone_numberDisabled] = useState(true)
  const [addressDisabled, setAddressDisabled] = useState(true)
  const [cityDisabled, setCityDisabled] = useState(true)
  const [countryDisabled, setCountryDisabled] = useState(true)
  const [phValue, setPhValue] = useState(null)
  const [timezoneDisabled, setTimezoneDisabled] = useState(true)

  const timezone = [
    'Select timezone',
    'Africa/Lagos',
    'Africa/Accra',
    'America/New_York',
  ]

  useEffect(() => {}, [phValue])

  const handleEdit = (incomingType) => {
    if (incomingType === 'email') {
      setEmailDisabled(false)
    }

    if (incomingType === 'phone_number') {
      setPhone_numberDisabled(false)
    }
    if (incomingType === 'address') {
      setAddressDisabled(false)
    }
    if (incomingType === 'city') {
      setCityDisabled(false)
    }
    if (incomingType === 'country') {
      setCountryDisabled(false)
    }
    if (incomingType === 'timezone') {
      setTimezoneDisabled(false)
    }
  }

  const handleProfileUpdate = (e, incomingType) => {
    if (incomingType === 'email') {
      // dispatch in favour of email
      setUser({ ...user, email: e.target.value })
      const newdata = { ...textState, email: e.target.value }
      dispatch(setTextState(newdata))
      return
    }
    if (incomingType === 'phone_number') {
      setUser({ ...user, phone_number: e })
      const newdata = { ...textState, Phone_number: <em></em> }
      dispatch(setTextState(newdata))
      return
    }
    if (incomingType === 'address') {
      setUser({ ...user, address: e.target.value })
      const newdata = { ...textState, address: e.target.value }
      dispatch(setTextState(newdata))
      return
    }
    if (incomingType === 'city') {
      setUser({ ...user, city: e.target.value })
      const newdata = { ...textState, city: e.target.value }
      dispatch(setTextState(newdata))
      return
    }
    if (incomingType === 'country') {
      setUser({ ...user, country: e.target.value })
      const newdata = { ...textState, country: e.target.value }
      dispatch(setTextState(newdata))
    }
    if (incomingType === 'timezone') {
      setUser({ ...user, timezone: e.target.value })
      const newdata = { ...textState, timezone: e.target.value }
      dispatch(setTextState(newdata))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile()
  }

  return (
    <div className='xl:px-10 my-6 md:px-5 sm:px-3  lenz'>
      <div className='drop-shadow-2xl p-5 xl:w-[71rem]  lg:w-[45rem] md:w-[45rem] sm:w-[23rem] py-5 bg-white rounded'>
        <div>
          <h2 className='text-[#141115] text-xl font-medium'>
            {t('Contact Info')}
          </h2>
          <p>
            {t('Some of this info will be visible to people using TryBookings')}
          </p>
        </div>

        <Formik>
          <Form className='py-4 space-y-4' onSubmit={handleSubmit}>
            <div className='flex'>
              <div className='form-group  flex flex-col'>
                <label htmlFor='email'>{t('Email')}</label>
                <Field
                  type='email'
                  name='email'
                  placeholder='sara.cruz@examples.com'
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3 outline-none'
                  disabled={emailDisabled}
                  value={user?.email}
                  onChange={(e) => handleProfileUpdate(e, 'email')}
                />
              </div>
              <div
                className='text-[#0559FD] cursor-pointer'
                onClick={() => handleEdit('email')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group  flex flex-col'>
                <label htmlFor='PhoneNumber '>{t('Phone Number')}</label>

                <PhoneInput
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3 outline-none'
                  country='NG'
                  defaultCountry='NG'
                  placeholder='Enter phone number'
                  value={phValue || user?.phone_number}
                  onChange={(e) => handleProfileUpdate(e, 'phone_number')}
                />
              </div>
              <div
                className='text-[#0559FD] cursor-pointer'
                onClick={() => handleEdit('phone_number')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group  flex flex-col'>
                <label htmlFor='Address'>{t('Address')}</label>
                <Field
                  type='text'
                  name='address'
                  placeholder='2118 Thornridge Cir.sy'
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3 outline-none'
                  disabled={addressDisabled}
                  value={user?.address}
                  onChange={(e) => handleProfileUpdate(e, 'address')}
                />
              </div>
              <div
                className='text-[#0559FD] cursor-pointer'
                onClick={() => handleEdit('address')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group  flex flex-col'>
                <label htmlFor='city'>{t('City')}</label>
                <Field
                  type='text'
                  name='city'
                  placeholder='Connecticut'
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3 outline-none'
                  disabled={cityDisabled}
                  value={user?.city}
                  onChange={(e) => handleProfileUpdate(e, 'city')}
                />
              </div>
              <div
                className='text-[#0559FD] cursor-pointer'
                onClick={() => handleEdit('city')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group  flex flex-col'>
                <label htmlFor='country'>{t('Country')}</label>
                <Field
                  type='text'
                  name='country'
                  placeholder='Nigeria'
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3 outline-none'
                  disabled={countryDisabled}
                  value={user?.country}
                  onChange={(e) => handleProfileUpdate(e, 'country')}
                />
              </div>
              <div
                className='text-[#0559FD] cursor-pointer'
                onClick={() => handleEdit('country')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group  flex flex-col'>
                <label htmlFor='timezone'>{t('Timezone')}</label>
                <Field
                  as='select'
                  name='timezone'
                  placeholder='Timezone'
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3 outline-none'
                  disabled={timezoneDisabled}
                  value={user?.timezone}
                  onChange={(e) => handleProfileUpdate(e, 'timezone')}
                >
                  {timezone.map((country, key) => {
                    return (
                      <option value={country} key={key}>
                        {' '}
                        {country}{' '}
                      </option>
                    )
                  })}
                </Field>
              </div>
              <div
                className='text-[#0559FD] cursor-pointer'
                onClick={() => handleEdit('timezone')}
              >
                Edit
              </div>
            </div>

            {!errorMsg.length === 0 &&
              Object.entries(errorMsg).map((err, key) => {
                return (
                  <ul className='px-5 pb-2'>
                    <li className='text-red-500 font-medium'>
                      {' '}
                      {err[0]}: {err[1]}{' '}
                    </li>
                  </ul>
                )
              })}

            <div>
              <button
                className='px-3 py-2 my-4 rounded bg-blue-600 text-white'
                type='submit'
              >
                {t('Update')}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
export default ContactInfo
