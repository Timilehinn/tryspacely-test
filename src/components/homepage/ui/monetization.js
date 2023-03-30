import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Monetization = () => {
  const { t } = useTranslation()

  return (
    <main
      className='lg:grid lg:grid-cols-2 lg:h-[355px] lg:px-10 lg:m-10 bg-gradient-to-b from-[#011233] lg:p-8
    md:m-10 md:p-10 sm:m-5 sm:p-5 text-white rounded-lg shadow-2fl relative -z-40  '
    >
      <div className='flex flex-col justify-start gap-5 py-5 items-start'>
        <h1 className='text-3xl font-semibold text-white'>
          {'Monetize your space'}
        </h1>
        <p className='font-normal text-2xl lg:w-[95%] '>
          {t('Share your workspace and unlock new experience and network')}
        </p>
        <Link
          to='/booking'
          className='rounded-md text-2xl text-white bg-[#0559FD] w-[184px] h-[65px] flex justify-center items-center 
          hover:text-white'
        >
          {t('List Workspace')}
        </Link>
      </div>
    </main>
  )
}

export default Monetization
