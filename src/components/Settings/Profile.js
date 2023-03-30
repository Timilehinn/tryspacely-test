import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useState, useEffect, useLayoutEffect } from 'react'
import Cookies from 'universal-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { setTextState, getTextState } from '../../slices/profileUpdateSlice'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const Profile = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const textState = useSelector(getTextState)
  const [id, setId] = useState('')
  const cookies = new Cookies()
  const [first_nameDisabled, setFirst_nameDisabled] = useState(true)
  const [last_nameDisabled, setLast_nameDisabled] = useState(true)
  const [emailDisabled, setEmailDisabled] = useState(true)
  const [reload, setReload] = useState(false)
  const [stacksDisabled, setStacksDisabled] = useState(true)
  const [companyDisabled, setCompanyDisabled] = useState(true)
  const [positionDisabled, setPositionDisabled] = useState(true)
  const [account_typeDisabled, setAccount_typeDisabled] = useState(true)
  const [user, setUser] = useState({
    stacks: '',
    role: '',
    first_name: '',
    last_name: '',
    github: '',
    company: '',
    account_type: '',
    position: '',
  })
  const [userData, setUserData] = useState()
  const accountType = ['User', 'Owner', 'Sales']
  const accountTypeUsers = ['User', 'Owner']

  const refreshPage = () => {
    if (reload) window.location.reload()
    return
  }

  const handleEdit = (incomingType) => {
    if (incomingType === 'last_name') {
      setLast_nameDisabled(false)
    }
    if (incomingType === 'first_name') {
      setFirst_nameDisabled(false)
    }

    if (incomingType === 'email') {
      setEmailDisabled(false)
    }

    if (incomingType === 'stacks') {
      setStacksDisabled(false)
    }

    if (incomingType === 'company') {
      setCompanyDisabled(false)
    }

    if (incomingType === 'position') {
      setPositionDisabled(false)
    }

    if (incomingType === 'account_type') {
      setAccount_typeDisabled(false)
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

    if (incomingType === 'email') {
      // dispatch in favour of email
      setUser({ ...user, email: e.target.value })
      const newdata = { ...textState, email: e.target.value }
      dispatch(setTextState(newdata))
      return
    }

    if (incomingType === 'account_type') {
      // dispatch in favour of email
      if (user.account_type !== e.target.value) setReload(true)
      setUser({ ...user, account_type: e.target.value })
      const newdata = { ...textState, account_type: e.target.value }
      dispatch(setTextState(newdata))
      return
    }
    if (incomingType === 'role') {
      setUser({ ...user, role: e.target.value })
      const newdata = { ...textState, role: e.target.value }
      dispatch(setTextState(newdata))
      return
    }
    if (incomingType === 'position') {
      setUser({ ...user, position: e.target.value })
      const newdata = { ...textState, position: e.target.value }
      dispatch(setTextState(newdata))
      return
    }
    if (incomingType === 'stacks') {
      setUser({ ...user, stacks: e.target.value })
      const newdata = { ...textState, stacks: e.target.value }
      dispatch(setTextState(newdata))
      return
    }
    if (incomingType === 'github') {
      setUser({ ...user, github: e.target.value })
      const newdata = { ...textState, github: e.target.value }
      dispatch(setTextState(newdata))
    }

    if (incomingType === 'company') {
      setUser({ ...user, company: e.target.value })
      const newdata = { ...textState, company: e.target.value }
      dispatch(setTextState(newdata))
    }
  }

  useEffect(() => {}, [userData])

  const exchangeTokenForId = async () => {
    const token = cookies.get('user_token')
    if (!token) {
      alert('Not authenticated!!!')
      return
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/retrieve-token`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token,
          }),
        }
      )
      const data = await res.json()

      if (data?.status !== true) {
        alert('something went wrong. Seems you are not authenticated')
        return
      }
      setId(data?.data?.id)
      let myStacks = []
      const findStack = data?.data?.stacks?.map((item) => {
        myStacks = [...myStacks, item?.stacks]
      })
      let userToFIll = {
        first_name: data?.data?.first_name,
        last_name: data?.data?.last_name,
        email: data?.data?.email,
        stacks: myStacks?.toString(),
        // role: data?.data?.role?.position,
        company: data?.data?.role?.company,
        position: data?.data?.role?.position,
        account_type: data?.data?.account_type[0]?.user_type?.type,
      }
      setUserData(userToFIll)
      setUser(userToFIll)
    } catch (error) {}
  }

  useLayoutEffect(() => {
    exchangeTokenForId()
  }, [])

  useLayoutEffect(() => {}, [user])

  const updateProfile = async () => {
    const sendingData = {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      stacks: user?.stacks,
      role: user?.role,
      company: user?.company,
      position: user?.position,
      account_type: user?.account_type,
    }

    try {
      const token = cookies.get('user_token')
      if (!token) {
        alert('Not authenticated!!!')
        return
      }
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/${id}/update`,
        {
          method: 'POST',
          body: JSON.stringify(sendingData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      toast.success('Updated Successfully')
      setTimeout(() => {
        refreshPage()
      }, 1000)
      // return
    } catch (error) {}
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile()
  }

  return (
    <div className='xl:px-10 my-8 md:px-5 sm:px-3 lenz'>
      <div className='drop-shadow-2xl p-5 xl:w-[71rem] lg:w-[45rem] md:w-[45rem] sm:w-[23rem] py-5 bg-white rounded'>
        <div className='py-4 leading-6'>
          <h2 className='text-[#141115] text-xl font-medium'>{t('Profile')}</h2>
          <p>
            {t('Some of this info will be visible to people using TryBookings')}
          </p>
        </div>

        <Formik>
          <Form className='py-2 space-y-4' onSubmit={handleSubmit}>
            <div className='flex'>
              <div className='form-group flex flex-col'>
                <label htmlFor='name'>{t('First Name')}</label>
                <Field
                  // ref={nameRef}
                  type='name'
                  name='name'
                  placeholder='Eleanor Pena'
                  className='form-control  xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3'
                  disabled={first_nameDisabled}
                  value={user?.first_name}
                  onChange={(e) => handleProfileUpdate(e, 'first_name')}
                />
              </div>

              <div
                className='text-[#0559FD] cursor-pointer  edet'
                onClick={() => handleEdit('first_name')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group flex flex-col'>
                <label htmlFor='username'>{t('Last Name')}</label>
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
                className='pr-3 text-[#0559FD] cursor-pointer edet'
                onClick={() => handleEdit('last_name')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group  flex flex-col'>
                <label htmlFor='email'>{t('Email')}</label>
                <Field
                  type='email'
                  name='email'
                  placeholder='sara.cruz@examples.com'
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3'
                  disabled={emailDisabled}
                  value={user?.email}
                  // validate={validateEmail}
                  onChange={(e) => handleProfileUpdate(e, 'email')}
                />
              </div>
              <div
                className='text-[#0559FD] cursor-pointer edet'
                onClick={() => handleEdit('email')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group  flex flex-col'>
                <label htmlFor=''>{t('Stacks')}</label>
                <Field
                  type='text'
                  name='stacks'
                  value={user?.stacks}
                  placeholder='JS, PHP'
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem]  h-12 p-3'
                  disabled={stacksDisabled}
                  onChange={(e) => handleProfileUpdate(e, 'stacks')}
                />
              </div>
              <div
                className='text-[#0559FD] cursor-pointer edet'
                onClick={() => handleEdit('stacks')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group  flex flex-col'>
                <label htmlFor=' '>{t('Company')}</label>
                <Field
                  type='text'
                  name='company'
                  placeholder='Cowrywise'
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3'
                  disabled={companyDisabled}
                  value={user?.company}
                  onChange={(e) => handleProfileUpdate(e, 'company')}
                />
              </div>
              <div
                className='text-[#0559FD] cursor-pointer edet'
                onClick={() => handleEdit('company')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='form-group  flex flex-col'>
                <label htmlFor=''>Position</label>
                <Field
                  type='text'
                  name='position'
                  placeholder='instructor'
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem]  h-12 p-3'
                  disabled={positionDisabled}
                  value={user?.position}
                  onChange={(e) => handleProfileUpdate(e, 'position')}
                />
              </div>
              <div
                className='text-[#0559FD] cursor-pointer edet'
                onClick={() => handleEdit('position')}
              >
                Edit
              </div>
            </div>

            <div className='flex'>
              <div className='flex flex-col py-2'>
                <label className='font-medium'>{t('Account Type')} </label>
                <Field
                  as='select'
                  name='checked'
                  value={user?.account_type}
                  disabled={account_typeDisabled}
                  onChange={(e) => handleProfileUpdate(e, 'account_type')}
                  className='form-control xl:w-[65rem] md:w-[40rem] sm:w-[18rem] h-12 p-3'
                >
                  {user?.account_type === 'Sales'
                    ? accountType.map((type, key) => {
                        return (
                          <option value={type} key={key}>
                            {' '}
                            {type}{' '}
                          </option>
                        )
                      })
                    : accountTypeUsers.map((type, key) => {
                        return (
                          <option value={type} key={key}>
                            {' '}
                            {type}{' '}
                          </option>
                        )
                      })}
                </Field>
              </div>

              <div
                className='text-[#0559FD] cursor-pointer edet'
                onClick={() => handleEdit('account_type')}
              >
                Edit
              </div>
            </div>

            <button
              className='px-3 py-2 rounded bg-[#011936] text-white'
              type='submit'
            >
              Update
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
export default Profile
