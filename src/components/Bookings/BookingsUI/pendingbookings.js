import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { enGB } from 'date-fns/locale'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import 'react-nice-dates/build/style.css'

import useCookieHandler from '../../../hooks/useCookieHandler'

const PendingBookings = ({ data, bookings }) => {
  const { t } = useTranslation()
  const { token } = useCookieHandler('user_token')
  const [confirmReject, setConfirmReject] = useState('')
  const [confirmAccept, setConfirmAccept] = useState('')
  const [acceptBtn, setAcceptBtn] = useState('Accept')

  // Accept bookings
  const acceptBooking = async (id) => {
    setAcceptBtn('Accepting...')
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/bookings/${id}/accept`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()
      setAcceptBtn('Accepted')
      toast.success('Booking Accepted')
      bookings()
    } catch (error) {}
  }

  // Reject bookings
  const rejectBooking = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/bookings/${id}/reject`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await response.json()
      toast.success('Booking Rejected')
      bookings()
    } catch (error) {}
  }

  return (
    <article
      className='lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-4  lg:my-4 lg:px-5 lg:h-[80px]
        md:flex md:flex-row md:justify-between md:items-center md:my-4 md:px-5 md:h-[80px] md:gap-4 sm:flex sm:flex-col
        sm:justify-center sm:items-start sm:my-4 sm:gap-2 sm:px-5 sm:py-4 sm:h-[150px] relative bg-white shadow-2fl rounded-md '
    >
      <div
        className='lg:flex lg:flex-row lg:justify-center lg:items-center lg:gap-6 md:flex md:flex-row md:justify-between md:items-center
        sm:flex sm:flex-row sm:justify-center sm:items-center sm:gap-1'
      >
        <div
          className='lg:flex lg:flex-initial lg:items-center lg:w-[13rem] lg:gap-4 md:flex md:items-center md:flex-initial md:gap-4
            md:w-[13rem] sm:flex sm:flex-initial sm:items-center sm:gap-2 sm:w-[10rem]'
        >
          {data.user?.gender === null && (
            <img
              src={
                data.user?.profile_url !== null
                  ? data.user?.profile_url
                  : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
              }
              alt={data.user?.first_name}
              className='w-[60px] h-[60px] rounded-full '
            />
          )}

          {data.user?.gender === 'Male' && (
            <img
              src={
                data.user?.profile_url !== null
                  ? data.user?.profile_url
                  : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
              }
              alt={data.user?.first_name}
              className='w-[60px] h-[60px] rounded-full '
            />
          )}

          {data.user?.gender === 'Female' && (
            <img
              src={
                data.user?.profile_url !== null
                  ? data.user?.profile_url
                  : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl_light.png'
              }
              alt={data.user?.first_name}
              className='w-[60px] h-[60px] rounded-full '
            />
          )}

          <div>
            <p className='font-medium text-[14px]'>
              {' '}
              {data.user?.first_name} {data.user?.last_name}{' '}
            </p>

            {/* <span> {data.workspace.mentorship} </span> */}
          </div>
        </div>

        <span className='lg:flex lg:flex-initial lg:w-[10rem] text-[12px] md:flex md:flex-initial md:w-[10rem] sm:flex sm:flex-initial sm:w-[10rem]'>
          {' '}
          {format(new Date(data.bookings[0]?.start_date), 'dd MMM yyyy', {
            locale: enGB,
          })}{' '}
          -{' '}
          {format(new Date(data.bookings[0]?.end_date), 'dd MMM yyyy', {
            locale: enGB,
          })}{' '}
        </span>
      </div>

      <div
        className='lg:flex lg:gap-3 lg:justify-start lg:items-center md:flex md:justify-start md:items-center md:gap-3 sm:flex sm:justify-end
        sm:items-center sm:gap-3 sm:ml-auto'
      >
        <button
          onClick={() => setConfirmAccept(data.id)}
          className='w-[88px] h-[38px] bg-[#0559FD] rounded-md text-white '
        >
          {acceptBtn}
        </button>

        <button
          onClick={() => setConfirmReject(data.id)}
          className='w-[88px] h-[38px] bg-transparent rounded-md text-black border-[2px] border-gray-300 '
        >
          {/* <svg
            x='0px'
            y='0px'
            viewBox='0 0 512.021 512.021'
            fill='#5B585B'
            className='w-[14px] h-[14px]'
          >
            <g>
              <path
                d='M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z'
                fill='#5B585B'
              />
            </g>
          </svg> */}
          Cancel
        </button>

        {confirmReject === data.id && (
          <>
            <div
              className='overlay'
              onClick={() => setConfirmReject(false)}
            ></div>
            <div
              className='lg:top-[300px] lg:left-[250px] lg:w-[500px] lg:h-[170px] md:top-[500px] md:left-[250px]
                        sm:left-6 sm:top-[350px] sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-5 bg-white fixed
                        z-20 rounded-md shadow-2fl p-5'
            >
              <p className='text-[19px] font-semibold'>
                {' '}
                Are you want to reject this booking?{' '}
              </p>

              <div className='flex justify-end items-end gap-4 py-4 '>
                <button
                  type='button'
                  className='bg-[#0559FD] w-[80px] h-[40px] rounded-lg text-white '
                  onClick={() => rejectBooking(data.id)}
                >
                  {' '}
                  Confirm{' '}
                </button>

                <button
                  type='button'
                  className='bg-transparent border-2 w-[80px] h-[40px] rounded-lg '
                  onClick={() => setConfirmReject(false)}
                >
                  {' '}
                  Cancel{' '}
                </button>
              </div>
            </div>
          </>
        )}

        {confirmAccept === data.id && (
          <>
            <div
              className='overlay'
              onClick={() => setConfirmAccept(false)}
            ></div>
            <div
              className='lg:top-[300px] lg:left-[250px] lg:w-[500px] lg:h-[170px] md:top-[500px] md:left-[250px]
                        sm:left-6 sm:top-[350px] sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-5 bg-white fixed
                        z-20 rounded-md shadow-2fl p-5'
            >
              <p className='text-[19px] font-semibold'>
                {' '}
                {t('Are you want to accept this booking?')}{' '}
              </p>

              <div className='flex justify-end items-end gap-4 '>
                <button
                  type='button'
                  className='bg-[#0559FD] w-[80px] h-[40px] rounded-lg text-white '
                  onClick={() => acceptBooking(data.id)}
                >
                  {' '}
                  {t('Confirm')}{' '}
                </button>

                <button
                  type='button'
                  className='bg-transparent border-2 w-[80px] h-[40px] rounded-lg '
                  onClick={() => setConfirmAccept(false)}
                >
                  {' '}
                  {t('Cancel')}{' '}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  )
}

export default PendingBookings
