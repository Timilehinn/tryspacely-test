import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import { format } from 'date-fns'

import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

import BookingCalendar from './BookingsUI/bookingcalendar'
import useLimitedRoute from '../../hooks/useLimitedRoute'
import DashboardHeader from '../Layout/Header'
import useFetch from '../../hooks/useFetch'
import {
  getSearchResults,
  getSearchToggle,
  setSearchToggle,
} from '../../slices/search_bookin'

const BookingsDashboard = () => {
  const {
    data: bookings,
    isPending,
    isSuccess,
    failure,
  } = useFetch('GET', 'bookings')

  const dispatch = useDispatch()
  const ref = useRef()
  // !check_back == chenge user to owner
  const { success, errorAuth, loadingFinished } = useLimitedRoute('Owner')
  const [displayData, setDisplayData] = useState([])

  const searchResults = useSelector(getSearchResults)
  const searchModal = useSelector(getSearchToggle)

  useEffect(() => {
    const calendarData = bookings?.data
      // ?.filter((booking) => booking?.data?.bookings[0]?.status === 'Approved')
      ?.filter((booking) => booking?.data?.bookings[0]?.status !== 'Deleted')
      .map((data) => {
        return setDisplayData((prevState) => [...prevState, data])
      })
  }, [bookings])

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (searchModal && ref.current && !ref.current.contains(e.target)) {
        dispatch(setSearchToggle(false))
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [searchModal])

  return (
    <>
      <main className='lg:flex lg:flex-row '>
        <Loader
          failure={failure}
          isLoading={isPending}
          successful={isSuccess}
          errorAuth={errorAuth}
          success={success}
          loadingfinished={loadingFinished}
        />
        <section className='flex flex-col gap-4 xl:w-[87%] lg:w-[84%] md:w-[100%] sm:w-[100%] ml-auto'>
          <DashboardHeader
            icon={
              'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Bookings.svg'
            }
            title='Bookings'
          />
          <main className=''>
            <BookingCalendar key={displayData.id} data={displayData} />
          </main>
        </section>

        {searchModal === true && (
          <>
            <div className='overlay'></div>
            <main
              ref={ref}
              className=' shadow-2fl z-10 absolute top-0 right-0 bg-white p-5 lg:w-[500px] lg:h-screen md:h-screen md:w-[100%] sm:w-[100%] sm:h-full '
            >
              <button
                onClick={() => dispatch(setSearchToggle(false))}
                className='flex justify-end items-end ml-auto text-2xl font-bold'
              >
                {' '}
                X{' '}
              </button>
              <div className='flex lg:items-center lg:flex-row lg:gap-3 md:flex-row md:gap-3 md:items-center sm:items-start sm:flex-col sm:gap-3 mt-5'>
                {searchResults?.user.gender === 'Male' && (
                  <img
                    className='lg:w-[80px] lg:h-[80px] lg:border-[1px] md:w-[80px] md:h-[80x] sm:w-[80px] sm:h-[80px] rounded-full '
                    src={
                      searchResults?.user.profile_url !== null
                        ? searchResults?.user.profile_url
                        : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                    }
                    alt={searchResults?.user.last_name}
                  />
                )}

                {searchResults?.user.gender === null && (
                  <img
                    className='lg:w-[80px] lg:h-[80px] lg:border-[1px] md:w-[80px] md:h-[80x] sm:w-[80px] sm:h-[80px] rounded-full '
                    src={
                      searchResults?.user.profile_url !== null
                        ? searchResults?.user.profile_url
                        : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                    }
                    alt={searchResults?.user.last_name}
                  />
                )}

                {searchResults?.user.gender === 'Female' && (
                  <img
                    className='lg:w-[80px] lg:h-[80px] lg:border-[1px] md:w-[80px] md:h-[80x] sm:w-[80px] sm:h-[80px] rounded-full '
                    src={
                      searchResults?.user.profile_url !== null
                        ? searchResults?.user.profile_url
                        : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl_light.png'
                    }
                    alt={searchResults?.user.last_name}
                  />
                )}

                <div className='flex flex-col gap-1'>
                  <p className='lg:text-[16px] md:text-[18px] '>
                    {' '}
                    {searchResults?.user.first_name}{' '}
                    {searchResults?.user.last_name}{' '}
                  </p>

                  <p className='lg:text-[14px] md:text-[18px]  text-gray-500 '>
                    {' '}
                    {searchResults?.user.email}{' '}
                  </p>
                </div>
              </div>

              <div className='grid lg:grid-cols-2 lg:gap-5 md:grid-cols-2 md:gap-5 sm:gap-5 sm:grid-cols-1 items-start mt-8'>
                <p className='flex flex-col gap-1 text-gray-500'>
                  Space name:
                  <span className='text-black'>
                    {' '}
                    {searchResults?.bookings[0]?.workspace.name}{' '}
                  </span>
                </p>

                <p className='flex flex-col gap-1 text-gray-500'>
                  Address:
                  <span className='text-black'>
                    {' '}
                    {searchResults?.user.address}{' '}
                  </span>
                </p>

                <p className='flex flex-col gap-1 text-gray-500'>
                  Phone number:
                  <span className='text-black'>
                    {' '}
                    {searchResults?.user.phone_number}{' '}
                  </span>
                </p>

                <p className='flex flex-col gap-1 text-gray-500'>
                  Amount paid:
                  <span className='text-black'>
                    {' '}
                    {searchResults?.amount_paid}{' '}
                  </span>
                </p>

                <p className='flex flex-col gap-1 text-gray-500'>
                  Payment Status:
                  <span className='text-black'>
                    {' '}
                    {searchResults?.payment_status}{' '}
                  </span>
                </p>

                <p className='flex flex-col gap-1 text-gray-500'>
                  Start date:
                  <span className='text-black'>
                    {' '}
                    {format(
                      new Date(searchResults?.bookings[0]?.start_date),
                      'dd MMM yyyy HH:mm'
                    )}{' '}
                  </span>
                </p>

                <p className='flex flex-col gap-1 text-gray-500'>
                  End date:
                  <span className='text-black'>
                    {' '}
                    {format(
                      new Date(searchResults?.bookings[0]?.end_date),
                      'dd MMM yyyy HH:mm'
                    )}{' '}
                  </span>
                </p>

                <p className='flex flex-col gap-1 text-gray-500'>
                  Open hours:
                  <span className='text-black'>
                    {' '}
                    {searchResults?.bookings[0]?.workspace?.open_hours}{' '}
                  </span>
                </p>

                <p className='flex flex-col gap-1 text-gray-500'>
                  Space Type:
                  <span className='text-black'>
                    {' '}
                    {searchResults?.bookings[0]?.workspace?.type?.type}{' '}
                  </span>
                </p>

                <p className='flex flex-col gap-1 text-gray-500'>
                  Space Category:
                  <span className='text-black'>
                    {' '}
                    {searchResults?.bookings[0]?.workspace?.category?.name}{' '}
                  </span>
                </p>

                <p className='flex flex-col gap-1 text-gray-500'>
                  Available space:
                  <span className='text-black'>
                    {' '}
                    {
                      searchResults?.bookings[0]?.workspace?.available_space
                    }{' '}
                  </span>
                </p>
              </div>
            </main>
          </>
        )}
      </main>
    </>
  )
}

export default BookingsDashboard
