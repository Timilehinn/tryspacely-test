import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import ContactInfo from './SettingsPersonalInfoUI/ContactInfo'
import Info from './SettingsPersonalInfoUI/Info'
import SettingsHero from './SettingsPersonalInfoUI/settingsHero'
import PrivacyAndSecurity from './PrivacyAndSecurity'
import useProtectedRoute from '../../hooks/useProtectedRoute'
import Profile from './Profile'
import LoginSecurity from './LoginSecurity'

import Notification from './Notification'
import Loader from '../Loader/Loader'
import DashboardHeader from '../Layout/Header'
import AccountActivities from './Support'

const Settings = () => {
  const { success, errorAuth, loadingfinished } = useProtectedRoute(
    'user_token',
    true
  )
  const navigate = useNavigate()
  const [current, setCurrent] = useState(null)
  const [dspType, setDspType] = useState('personal info')
  const [id, setId] = useState('')
  const cookies = new Cookies()
  const [userData, setUserData] = useState()
  const [notificationState, setNotificationState] = useState(null)
  const [settingStatus, setSettingStatus] = useState(null)
  const [user_settings, setUser_settings] = useState(null)
  const [user, setUser] = useState({
    email: '',
    phone_number: '',
    address: '',
    city: '',
    country: '',
    date_of_birth: '',
    first_name: '',
    last_name: '',
    gender: '',
    language: '',
    interest: '',
    photo: null,
    timezone: '',
  })
  const [triggerRecall, setTriggerRecall] = useState(0)
  const [accountType, setAccountType] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])
  const [isSuccess, setisSuccess] = useState(false)
  const [failure, setFailure] = useState(false)

  useEffect(() => {}, [userData])

  const exchangeTokenForId = async () => {
    const token = cookies.get('user_token')
    if (!token) {
      alert('Not authenticated!!!')
      return
    }
    setLoading(true)
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
      setLoading(false)
      setisSuccess(true)
      setFailure(false)

      if (data?.status !== true) {
        setLoading(false)
        setisSuccess(false)
        setFailure(true)
        return
      }

      if (res.status === 500) {
        navigate('/500')
      } else if (res.status === 400) {
        navigate('/400')
      }
      setId(data?.data?.id)
      setNotificationState(data?.data?.notifications)
      setSettingStatus(data?.data?.settings)
      let userToFIll = {
        email: data?.data?.email,
        phone_number: data?.data?.phone_number,
        address: data?.data?.address,
        city: data?.data?.city,
        first_name: data?.data?.first_name,
        last_name: data?.data?.last_name,
        country: data?.data?.country,
        date_of_birth: data?.data?.date_of_birth,
        gender: data?.data?.gender,
        language: data?.data?.language,
        interest: data?.data?.interest,
        photo: data?.data?.profile_url,
        has_password: data?.data?.has_password,
        social_account: data?.data?.social_account,
        provider: data?.data?.provider,
        timezone: data?.data?.timezone,
      }
      setUserData(userToFIll)
      setUser_settings(data?.data?.settings)
      setUser(userToFIll)
      setAccountType(data?.data?.account_type[0]?.user_type.type)
    } catch (error) {
      setLoading(false)
      setisSuccess(false)
      setFailure(true)
    }
  }

  useLayoutEffect(() => {
    exchangeTokenForId()
  }, [triggerRecall])

  const updateProfile = async () => {
    const outGoingData = {
      first_name: user?.first_name,
      last_name: user?.last_name,
      address: user?.address,
      phone_number: user?.phone_number,
      email: user?.email,
      date_of_birth: moment(user?.date_of_birth).format('YYYY-MM-DD'),
      // .toLocaleString(),
      language: user?.language,
      city: user?.city,
      interest: user?.interest,
      gender: user?.gender,
      country: user?.country,
      photo: user.photo,
      timezone: user?.timezone,
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
          body: JSON.stringify(outGoingData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()

      if (data?.status === false) {
        toast.error(data.errors)
        setErrorMsg(data.errors)
      } else {
        toast.success('Updated Successfully')
      }
    } catch (error) {}
  }

  useEffect(() => {
    const currentTab = cookies.get('current_settings_tab_after_redirect')
    if (currentTab == 'LoginSecurity') {
      setDspType('login & security')
      cookies.remove('current_settings_tab_after_redirect')
      return
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Settings</title>
        <meta name='description' content='' />
        <meta name='keywords' content='' />
      </Helmet>
      <Loader
        failure={failure}
        isLoading={loading}
        successful={isSuccess}
        errorAuth={errorAuth}
        success={success}
        loadingfinished={loadingfinished}
      />
      <div className='xl:w-[87%] lg:w-[84%] lg:ml-auto'>
        <DashboardHeader
          icon={
            'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Settings.svg'
          }
          title='Settings'
        />
        <div className=''>
          <div>
            <SettingsHero
              setCurrent={setCurrent}
              dspType={dspType}
              setDspType={setDspType}
            />
            <div className='xl:px-[2.5rem] lg:px-[1.5rem]'>
              <hr />
            </div>
          </div>
          {/* <InitVerifyCodePhoneNumber /> */}
          {/* <VerifyPhoneNumber /> */}
          {/* <LoginSecurity id={id} userData={userData} setDspType={setDspType} user_settings={user_settings} /> */}
          {dspType === 'personal info' && (
            <>
              <div className='mt-5 md:mx-auto'>
                <Info user={user} setUser={setUser} />
              </div>
              <div className='mt-5 pb-5 md:mx-auto'>
                <ContactInfo
                  setUser={setUser}
                  user={user}
                  errorMsg={errorMsg}
                  updateProfile={updateProfile}
                />
              </div>
            </>
          )}
          {dspType === 'privacy & sharing' && (
            <PrivacyAndSecurity
              userData={userData}
              settingStatus={settingStatus}
              setTriggerRecall={setTriggerRecall}
            />
          )}
          {dspType === 'profile' && <Profile />}
          {/* {dspType === 'payment' && <Payment />} */}
          {dspType === 'login & security' && (
            <LoginSecurity
              id={id}
              userData={userData}
              user_settings={user_settings}
              setDspType={setDspType}
            />
          )}
          {dspType === 'notification' && (
            <Notification
              notificationState={notificationState}
              settingStatus={settingStatus}
              setTriggerRecall={setTriggerRecall}
            />
          )}
          {dspType === 'activities' && <AccountActivities />}
        </div>
      </div>
    </>
  )
}
export default Settings
