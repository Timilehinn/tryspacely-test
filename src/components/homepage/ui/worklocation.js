import React from 'react'
import { useTranslation } from 'react-i18next'

const WorkLocation = () => {
  const { t } = useTranslation()

  return (
    <main className='flex flex-col lg:gap-5 md:px-10 md:gap-6 sm:gap-3 sm:px-5'>
      <p className='lg:w-96 lg:text-[28px] md:text-[20px] md:w-60 sm:w-60 sm:text-[20px]  text-[#0447CA]'>
        {t('More than a workspace. An experience')}
      </p>
      <p className='xl:w-[50%] lg:w-[50%] md:text-xl md:w-[100%] sm:w-[100%] text-[#434144]'>
        {t(
          'We are creating an experience for every user. No need to worry about where. Select from our wide range of space listings and grow your network. Stay inspired, productive, and focused.'
        )}
      </p>

      <div className='flex lg:flex-row lg:gap-10 md:flex-row md:gap-8 sm:flex-col sm:gap-7 '>
        <div className='flex flex-col gap-2 justify-start items-start'>
          <h1 className='font-bold text-[ #011936] lg:text-2xl md:text-2xl sm:text-2xl'>
            {' '}
            200,000+{' '}
          </h1>
          <p className='lg:text-lg text-[#5B585B] text-xl md:text-xl sm:text-xl'>
            {t('Workspace Users')}
          </p>
        </div>

        <div className='flex flex-col gap-2 justify-start items-start'>
          <h1 className='font-bold text-[ #011936] lg:text-2xl md:text-2xl sm:text-2xl'>
            {' '}
            200,000+{' '}
          </h1>
          <p className='lg:text-lg text-[#5B585B] md:text-xl sm:text-xl'>
            {' '}
            {t('Workspace')}{' '}
          </p>
        </div>

        <div className='flex flex-col gap-2 justify-start items-start'>
          <h1 className='font-bold text-[ #011936] lg:text-2xl md:text-2xl sm:text-2xl'>
            {' '}
            1,000+{' '}
          </h1>
          <p className='lg:text-lg text-[#5B585B] md:text-xl  sm:text-xl'>
            {t('Workspace Owners')}
          </p>
        </div>
      </div>
    </main>
  )
}

export default WorkLocation
