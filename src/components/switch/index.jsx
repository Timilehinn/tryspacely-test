import React from 'react'
import { useTranslation } from 'react-i18next'

const Switch = () => {
  const { t } = useTranslation()

  return (
    <div className='flex justify-center'>
      <div className='form-check form-switch'>
        <label
          className='form-check-label inline-block text-gray-800'
          htmlFor='flexSwitchCheckDefault'
        >
          {t('Search as I move the map')}
        </label>
        <input
          className='form-check-input appearance-none w-9 mr-6 ml-4 rounded-full float-right h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm'
          type='checkbox'
          role='switch'
          id='flexSwitchCheckDefault'
        />
      </div>
    </div>
  )
}

export default Switch
