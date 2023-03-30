import React, { useState } from 'react'
import Toggle from 'react-toggle'
import './addOn.scss'
import { useTranslation } from 'react-i18next'
import Cookies from 'universal-cookie'
import CustomAlert from '../CustomComponents/CustomAlert'
import moment from 'moment'

const PrivacyAndSecurity = ({ settingStatus, setTriggerRecall, userData }) => {
  const { t } = useTranslation()
  const cookies = new Cookies()
  const [displayFullName, setDisplayFullName] = useState(
    settingStatus?.full_name
  )
  const [displayEmail, setDisplayEmail] = useState(settingStatus?.email)
  const [displayDOB, setDisplayDOB] = useState(settingStatus?.date_of_birth)
  const [displaySearchEnginesInclusion, setDisplaySearchEnginesInclusion] =
    useState(settingStatus?.seo)
  const [alertWatcher, setAlertWatcher] = useState({
    statement: '',
    value: false,
  })

  const testingEndpoint = async (type, value) => {
    try {
      const token = cookies.get('user_token')
      if (!token) {
        setAlertWatcher({
          statement: `Not authenticated!!!`,
          value: true,
        })
        return
      }
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/settings`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token,
          full_name: type == 'full_name' ? value : displayFullName,
          seo: type == 'seo' ? value : displaySearchEnginesInclusion,
          date_of_birth: type == 'dob' ? value : displayDOB,
          email: type == 'email' ? value : displayEmail,
        }),
      })
      const data = await res.json()
      if (data?.status !== true) {
        setAlertWatcher({
          statement: data?.errors?.message,
          value: true,
        })
        return
      }
      if (type == 'full_name') {
        setDisplayFullName(value)
      }
      if (type == 'email') {
        setDisplayEmail(value)
      }
      if (type == 'dob') {
        setDisplayDOB(value)
      }
      if (type == 'seo') {
        setDisplaySearchEnginesInclusion(value)
      }
      setTriggerRecall((prev) => prev + 1)
    } catch (error) {}
  }

  return (
    <div className='xl:px-10 md:px-5 sm:px-3 xl:block sm:flex sm:justify-center sm:items-center sm:flex-col overflow-x-hidden'>
      {alertWatcher?.value && (
        <CustomAlert watcher={alertWatcher} setWatcher={setAlertWatcher} />
      )}

      <form className='shadow-2fl md:w-[45rem] sm:w-[25rem] xxs:w-[15rem] py-8 space-y-4 bg-[white] h-[auto] rounded p-5 my-4'>
        <h2 className='text-[#141115]  text-xl font-medium'>
          {t('Personal Info')}
        </h2>
        <p style={{ marginTop: '-2px' }} className='text-[#141115] text-sm'>
          {t(
            'Manage your personal info and control who can see it on your profile.'
          )}
        </p>

        <div className='h-[auto]'>
          <label htmlFor='name'>{t('Full Name')}</label>
          <div className='flex justify-between w-[100%] '>
            <p>
              {userData?.first_name} {userData?.last_name}
            </p>
            <Toggle
              defaultChecked={displayFullName}
              icons={false}
              onChange={() => testingEndpoint('full_name', !displayFullName)}
            />
          </div>
          <hr
            className='mt-[5px] mb-[20px]'
            style={{ borderColor: '#D4D4D4' }}
          />
        </div>

        <div className='h-[auto]'>
          <label htmlFor='name'>Email</label>
          <div className='flex justify-between w-[100%] '>
            <p>{userData?.email}</p>
            <Toggle
              defaultChecked={displayEmail}
              icons={false}
              onChange={() => testingEndpoint('email', !displayEmail)}
            />
          </div>
          <hr
            className='mt-[5px] mb-[20px]'
            style={{ borderColor: '#D4D4D4' }}
          />
        </div>

        <div className='h-[auto]'>
          <label htmlFor='name'>Date of Birth</label>
          <div className='flex justify-between w-[100%] '>
            <p>{moment(userData?.date_of_birth).format('L')}</p>
            <Toggle
              defaultChecked={displayDOB}
              icons={false}
              onChange={() => testingEndpoint('dob', !displayDOB)}
            />
          </div>
          <hr
            className='mt-[5px] mb-[20px]'
            style={{ borderColor: '#D4D4D4' }}
          />
        </div>
      </form>

      <form className='shadow-2fl md:w-[45rem] sm:w-[25rem] xxs:w-[15rem] py-0 space-y-4 bg-[white] h-[auto] rounded p-5 my-4'>
        <h2 className='text-[#141115]  text-xl font-medium'>
          {t('Activities')}
        </h2>
        <p style={{ marginTop: '-2px' }} className='text-[#141115] text-sm'>
          {t(
            'Manage your personal info and control wh can see it on your profile.'
          )}
        </p>
        {/* 
        <div className="h-[auto]">
          <div className='flex justify-between w-[100%] '>
            <p>Include my profile and listing in search engines </p>
            <Toggle
              defaultChecked={true}
              icons={false}
              onChange={() => null} />
          </div>
          <hr className='mt-[5px] mb-[20px]' style={{ borderColor: '#D4D4D4' }} />
        </div> */}

        <div className='h-[auto]'>
          <div className='flex justify-between w-[100%] '>
            <p>
              {t('Display my profile and listing in search engines result')}{' '}
            </p>
            <Toggle
              defaultChecked={displaySearchEnginesInclusion}
              icons={false}
              onChange={() =>
                testingEndpoint('seo', !displaySearchEnginesInclusion)
              }
            />
          </div>
          <hr
            className='mt-[5px] mb-[20px]'
            style={{ borderColor: '#D4D4D4' }}
          />
        </div>
      </form>
    </div>
  )
}

export default PrivacyAndSecurity
