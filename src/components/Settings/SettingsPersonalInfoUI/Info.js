import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { getTextState, setTextState } from '../../../slices/profileUpdateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { DatePicker } from 'antd'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import '../addOn.scss'

const Info = ({ user, setUser }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const textState = useSelector(getTextState)
  const [first_nameDisabled, setFirst_nameDisabled] = useState(true)
  const [last_nameDisabled, setLast_nameDisabled] = useState(true)
  const [genderDisabled, setGenderDisabled] = useState(true)
  const [date_of_birthDisabled, setDate_of_birthDisabled] = useState(true)
  const [languageDisabled, setLanguageDisabled] = useState(true)
  const [interestDisabled, setInterestDisabled] = useState(true)
  const [file, setFile] = useState()

  // mapping gender into the select option instead
  const gender = ['Select gender', 'Male', 'Female']

  const onImageChange = (e) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(e.target.files[0])

    fileReader.onload = (e) => {
      localStorage.setItem('photo', e.target.result.toLocaleString())
    }

    fileReader.onloadend = (e) => {
      user.photo = localStorage.getItem('photo')
    }
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  const handleEdit = (incomingType) => {
    if (incomingType === 'last_name') {
      // setNameDisabled(false)
      setLast_nameDisabled(false)
    }
    if (incomingType === 'first_name') {
      // setNameDisabled(false)
      setFirst_nameDisabled(false)
    }
    if (incomingType === 'date_of_birth') {
      setDate_of_birthDisabled(false)
    }
    if (incomingType === 'gender') {
      setGenderDisabled(false)
    }

    if (incomingType === 'language') {
      setLanguageDisabled(false)
    }
    if (incomingType === 'interest') {
      setInterestDisabled(false)
    }
  }

  const handleProfileUpdate = (e, incomingType) => {
    if (incomingType === 'first_name') {
      // dispatch in favour of first_name
      setUser({ ...user, first_name: e.target.value })
      const newdata = { ...textState, first_name: e.target.value }
      dispatch(setTextState(newdata))
      return
    }

    if (incomingType === 'last_name') {
      setUser({ ...user, last_name: e.target.value })
      const newdata = { ...textState, last_name: e.target.value }
      dispatch(setTextState(newdata))
      return
    }

    if (incomingType === 'gender') {
      setUser({ ...user, gender: e.target.value })
      const newdata = { ...textState, gender: e.target.value }
      dispatch(setTextState(newdata))
      return
    }

    if (incomingType === 'date_of_birth') {
      setUser({ ...user, date_of_birth: e })
      const newdata = { ...textState, date_of_birth: e }
      dispatch(setTextState(newdata))
      return
    }

    if (incomingType === 'language') {
      setUser({ ...user, language: e.target.value })
      const newdata = { ...textState, language: e.target.value }
      dispatch(setTextState(newdata))
    }

    if (incomingType === 'interest') {
      setUser({ ...user, interest: e.target.value })
      const newdata = { ...textState, interest: e.target.value }
      dispatch(setTextState(newdata))
    }
  }

  const onChange = (date, dateString) => {
    try {
      const presentDate = new Date().getFullYear()
      const pickedDate = new Date(dateString).getFullYear()
      const operationDate = presentDate - pickedDate
      if (operationDate < 14) {
        toast.error('Only 14 years and above is eligible.')
        return
      }

      setUser({ ...user, date_of_birth: dateString })
      const newdata = { ...textState, date_of_birth: dateString }
      dispatch(setTextState(newdata))
    } catch (error) {}
  }

  return (
    <div className='xl:px-10 my-8 md:px-5 sm:px-3 lenz'>
      <div className='drop-shadow-2xl p-5 xl:w-[71rem] lg:w-[45rem] md:w-[45rem] sm:w-[23rem] py-5 bg-white rounded'>
        <div className=''>
          <h2 className='text-[#141115] text-xl font-medium'>
            {t('Basic Info')}
          </h2>
          <p>
            {t('Some of this info will be visible to people using TryBookings')}
          </p>

          <div className='pt-2'>
            {!user.photo ? (
              <img
                src={'/avatar.png'}
                className='w-20 h-20 bg-center bg-cover rounded-full '
                alt={' profile photo'}
                title={' profile photo'}
              />
            ) : (
              <img
                src={file || user?.photo}
                className='w-20 h-20 bg-center bg-cover rounded-full '
                alt={user.first_name + ' ' + user.last_name + ' profile photo'}
                title={
                  user.first_name + ' ' + user.last_name + ' profile photo'
                }
              />
            )}

            <br />

            <input
              type='file'
              onChange={onImageChange}
              className='cursor-pointer'
            />
            <br />
          </div>
        </div>

        <Formik>
          <Form className='py-4 space-y-4'>
            <div className='flex'>
              <div className='form-group flex flex-col'>
                <label htmlFor='name'>{t('First Name')}</label>
                <Field
                  type='name'
                  name='name'
                  placeholder='Eleanor Pena'
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3'
                  disabled={first_nameDisabled}
                  value={user?.first_name}
                  onChange={(e) => handleProfileUpdate(e, 'first_name')}
                />
              </div>
              <div
                className='text-[#0559FD] cursor-pointer'
                onClick={() => handleEdit('first_name')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group flex flex-col'>
                <label htmlFor='username'>{'Last Name'}</label>
                <Field
                  type='text'
                  name='username'
                  placeholder='EI'
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3'
                  disabled={last_nameDisabled}
                  value={user?.last_name}
                  onChange={(e) => handleProfileUpdate(e, 'last_name')}
                />
              </div>
              <div
                className='pr-3 text-[#0559FD] cursor-pointer'
                onClick={() => handleEdit('last_name')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group flex flex-col'>
                <label htmlFor='gender'>{'Gender'}</label>
                <Field
                  as='select'
                  name='gender'
                  value={user?.gender}
                  onChange={(e) => handleProfileUpdate(e, 'gender')}
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3'
                >
                  {gender.map((data, key) => {
                    return (
                      <option key={key} value={data}>
                        {' '}
                        {data}{' '}
                      </option>
                    )
                  })}
                </Field>
              </div>
              <div
                className='text-[#0559FD] cursor-pointer'
                id=''
                onClick={() => handleEdit('gender')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group flex flex-col'>
                <label htmlFor='date of birth'>{t('Date of Birth')}</label>

                <DatePicker
                  onChange={onChange}
                  className='form-control xl:w-[65rem] md:w-[40rem] bg-[#CDDEFF] sm:w-[18rem] h-12 p-3'
                  // defaultValue={user?.date_of_birth}
                  value={
                    user?.date_of_birth
                      ? moment(user?.date_of_birth)
                      : moment(new Date())
                  }
                />
              </div>
              {/* <div
                className='text-[#0559FD] cursor-pointer'
                onClick={() => handleEdit('date_of_birth')}
              >
                Edit
              </div> */}
            </div>

            <div className='flex'>
              <div className='form-group flex flex-col'>
                <label htmlFor='language spoken'>{t('Languages Spoken')}</label>
                <Field
                  type='text'
                  name='language'
                  placeholder='English, Spanish, French, Igbo'
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3'
                  disabled={languageDisabled}
                  value={user?.language}
                  onChange={(e) => handleProfileUpdate(e, 'language')}
                />
              </div>
              <div
                className='text-[#0559FD] cursor-pointer'
                onClick={() => handleEdit('language')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group flex flex-col'>
                <label htmlFor='interest'>{t('Interest')}</label>
                <Field
                  type='text'
                  name='interest'
                  placeholder='Football, Dancing'
                  disabled={interestDisabled}
                  value={user?.interest}
                  onChange={(e) => handleProfileUpdate(e, 'interest')}
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3 placeholder:font-light
                  placeholder:bg-none outline-none border-none border-b-2'
                />
              </div>
              <div
                className='text-[#0559FD] cursor-pointer'
                onClick={() => handleEdit('interest')}
              >
                Edit
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
export default Info
