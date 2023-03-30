import React from 'react'
import { useTranslation } from 'react-i18next'

const DetailAmenities = ({ amenities }) => {
  const { t } = useTranslation()

  return (
    <>
      <h1 className='font-[400] text-[20px] text-[#141115]'>{t('Amenities')}</h1>
      <div className='lg:grid lg:grid-cols-3 lg:py-3 md:grid md:grid-cols-2 sm:grid sm:grid-cols-1 sm:gap-4 rounded-lg'>
        {amenities?.map((amentys) => {
          return (
            <>
              {[amentys?.amenities_item].map((items) => {
                return (
                  <section className='lg:flex lg:flex-row gap-1'>
                    {/* {[items?.amenitygroups].map((group) => {
                      return (
                        <span className='font-700 text-[16px] text-[#141115]'>
                          {' '}
                          {group.name}{' '}
                        </span>
                      )
                    })} */}

                    <div className='flex items-center gap-2'>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z'
                          fill='#0559FD'
                          stroke='white'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M7.5 10.0007L9.16667 11.6673L12.5 8.33398'
                          stroke='white'
                          stroke-width='1.5'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                      </svg>
                      <span className='font-300 text-[14px] text-[#141115]'>
                        {' '}
                        {items.name}{' '}
                      </span>
                    </div>
                  </section>
                )
              })}
            </>
          )
        })}
      </div>
    </>
  )
}

export default DetailAmenities
