import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const SettingsHero = ({ dspType, setDspType }) => {
  const { t } = useTranslation()
  const [active, setActive] = useState(
    'text-[#0559FD] py-3 border-b-2 border-[#0559fd]'
  )
  const [inActive, setInActive] = useState('text-[#434144] py-3')

  return (
    <div className=' grid xl:grid-cols-7 lg:grid-cols-6  xl:px-10 lg:px-5 md:px-5 md:grid-cols-4 sm:px-4 cursor-pointer content-center gap-4 mt-8'>
      <p
        onClick={() => setDspType('personal info')}
        className={dspType === 'personal info' ? active : inActive}
      >
        {t('Personal Info')}
      </p>
      <p
        onClick={() => setDspType('profile')}
        className={dspType === 'profile' ? active : inActive}
      >
        {t('Profile')}
      </p>
      <p
        onClick={() => setDspType('login & security')}
        className={dspType === 'login & security' ? active : inActive}
      >
        {t('Login & Security')}
      </p>
      {/* <p onClick={() => setDspType('payment')} className={dspType === 'payment' ? active : inActive}>{t("Payments")}</p> */}
      <p
        onClick={() => setDspType('privacy & sharing')}
        className={dspType === 'privacy & sharing' ? active : inActive}
      >
        {t('Privacy & Sharing')}
      </p>
      <p
        onClick={() => setDspType('notification')}
        className={dspType === 'notification' ? active : inActive}
      >
        {t('Notification')}
      </p>
      <p
        onClick={() => setDspType('activities')}
        className={dspType === 'activities' ? active : inActive}
      >
        {t('Activities')}
      </p>
    </div>
  )
}
export default SettingsHero
