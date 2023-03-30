import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import UserBookingExcerpt from './UserBookingsExcerpt'

import './Addon.css'

const UserBookings = ({ bookings, deleteBookings }) => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const [sort, setSort] = useState('none')
  const [layout, setLayout] = useState(true)

  // SORT WORKSPACE
  const sortMethod = {
    none: { method: (a, b) => null },
    lowestToHighest: { method: (a, b) => (b > a ? 1 : -1) },
    highestToLowest: { method: (a, b) => (a > b ? -1 : 1) },
  }

  const BookedWorkspace = bookings
    ?.filter((workspace) =>
      workspace.bookings[0]?.workspace?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .sort(sortMethod[sort].method)
    .map((data) => (
      <UserBookingExcerpt
        key={data.id}
        data={data}
        layout={layout}
        deleteBookings={deleteBookings}
      />
    ))

  return (
    <main className='w-full py-5'>
      <div className='bg-white shadow-2fl rounded-t-lg py-5 my-4 lg:px-2 lg:mx-5 md:px-4 sm:px-4 '>
        <div
          className='lg:flex lg:justify-between lg:items-center md:flex md:justify-between md:items-center sm:flex sm:justify-between
            sm:items-center '
        >
          <div className='flex justify-center items-center gap-2'>
            <span className='text-[#0559FD] text-[25px] font-small'>
              {' '}
              {bookings?.length}
            </span>
            <p className='text-[18px] font-small'>{t('Bookings')}</p>
          </div>

          <Link
            to='/booking'
            className='flex justify-center items-center gap-2 lg:w-[140px] lg:h-[48px] md:w-[120px] md:h-[40px] sm:w-[120px] sm:h-[40px] rounded bg-[#0559FD] 
            text-white hover:text-white'
          >
            Book a Space
          </Link>
        </div>

        <div
          className='flex lg:flex-row lg:justify-between lg:items-center md:flex-row md:justify-between md:items-center sm:flex-row 
          sm:justify-between sm:my-3 '
        >
          <div className='lg:flex lg:flex-row lg:gap-4 sm:gap-2 md:flex-row sm:flex-col'>
            <div className='relative'>
              <input
                type='text'
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search a booking'
                maxLength='44'
                className='bg-[#FCFCFC] border-none outline-none rounded-md placeholder:text-[#AAAAAA] lg:h-[40px] lg:w-[252px]
                md:w-[200px] md:h-[40px] sm:w-full sm:h-[40px] indent-6 '
              />
              <img
                className='absolute w-[16px] h-[16px] top-3 lg:block md:block sm:hidden'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Search-icon.svg'
                alt='search'
              />
            </div>

            <div className='flex items-center '>
              <p className='lg:text-[13px]'> Sort by: </p>
              <select
                onChange={(e) => setSort(e.target.value)}
                defaultValue={'none'}
                className='lg:flex lg:justify-center lg:items-center lg:gap-2 lg:h-[36px] lg:w-[146px] rounded bg-[#FCFCFC] outline-0'
              >
                <option value='none' disabled className='lg:my-2'>
                  {t('None')}
                </option>

                <option value='lowestToHighest' className='lg:my-2'>
                  {t('Lowest To Highest')}
                </option>

                <option value='highestToLowest' className='lg:my-2'>
                  {t('Highest To Lowest')}
                </option>
              </select>
            </div>
          </div>

          <div className='flex items-center py-2 lg:relative '>
            <div className='lg:flex lg:flex-row lg:items-center lg:gap-2 md:flex-row sm:flex-col '>
              <button type='button' onClick={() => setLayout(true)}>
                <img
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/List.svg'
                  alt='list'
                />
              </button>

              <button type='button' onClick={() => setLayout(false)}>
                <img
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Grid.svg'
                  alt='grid'
                />
              </button>
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center xl:gap-5 lg:gap-5 md:gap-5 sm:gap-5 w-full '>
          <p className=' xl:w-[25%] lg:w-[25%] md:w-[25%] sm:w-[50%]'>
            {' '}
            {t('Space Name')}
          </p>
          <p className='xl:w-[25%] lg:w-[25%] md:w-[25%] lg:flex md:flex sm:w-[20%]'>
            {' '}
            {t('Date')}{' '}
          </p>

          <p className='xl:w-[10%] lg:w-[10%] md:w-[10%] lg:flex md:hidden sm:hidden'>
            {' '}
            {t('Status')}{' '}
          </p>
          <p className='xl:w-[10%] lg:w-[10%] md:w-[10%] sm:w-[15%]'>
            {' '}
            {t('Price')}{' '}
          </p>
          <span className='xl:w-[5%] lg:w-[5%] md:w-[5%] sm:w-[7%]'></span>
        </div>
      </div>

      {layout ? (
        <section className='flex flex-col gap-2 lg:mx-5 md:mx-2 sm:mx-2'>
          {BookedWorkspace}
        </section>
      ) : (
        <section className='grid lg:grid-cols-3 gap-5 lg:mx-5 md:grid-cols-2 md:mx-5 sm:grid-cols-1 sm:mx-5 '>
          {BookedWorkspace}
        </section>
      )}
    </main>
  )
}

export default UserBookings
