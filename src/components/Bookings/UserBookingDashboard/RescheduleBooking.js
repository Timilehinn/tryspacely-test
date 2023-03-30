import React, { useState } from 'react'
import { DatePicker, Space } from 'antd'
import moment from 'moment'
import './Addon.css'
import { toast } from 'react-toastify'

const RescheduleBooking = ({
  scheduleToggle,
  setScheduleToggle,
  bookingId,
  token,
  locationId,
}) => {
  const [pickedDate, setPickedDate] = useState()
  const [schedule, setSchedule] = useState(false)
  const [schSuccess, setSchSuccess] = useState(false)
  const [schErr, setSchErr] = useState(false)

  const range = (start, end) => {
    const result = []

    for (let i = start; i < end; i++) {
      result.push(i)
    }

    return result
  }

  const disabledDateTime = () => ({
    // disabledHours: () => range(0, 24).splice(4, 20),
    // disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  })

  const onChange = (date, dateString) => {
    setPickedDate(dateString, 'picked date')
  }

  //rescheduling function
  const rescheduleBookings = async (userBookingId) => {
    if (!pickedDate) {
      toast.warning('Select date and time, before scheduling.')
      return
    }
    setSchedule(true)
    setSchErr(false)
    setSchSuccess(false)
    try {
      //   console.log('trying')
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/bookings/${userBookingId}/reschedule`,
        {
          method: 'POST',
          body: JSON.stringify({
            reschedule_date: pickedDate,
          }),
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()

      if (data?.status === true) {
        setSchedule(false)
        const wait = await new Promise((resolve) => {
          toast.success('Schedule Successful!!!')
          resolve()
        })
        setTimeout(() => {
          window.location.reload()
        }, 3000)

        return
      }

      if (data?.status === false) {
        setSchedule(false)
        toast.error(data?.errors[0])
        setScheduleToggle(false)
        return
      }
    } catch (err) {
      setSchedule(false)
      toast.error(err)
    }
  }

  return (
    <div className='w-screen h-screen bg-[black] opacity-[0.9] flex justify-end'>
      <div className='w-[50%] h-[100%] bg-[#ffffff] opacity-[1.0] z-[20] p-[10px]'>
        <div className='flex justify-between items-center p-[10px] mr-[20px] bg-[#ffffff] z-[50] border-black border-b-2'>
          <span className='font-400 font-[Plus Jakarta Display] text-[18px] text-[#141115]'>
            Reschedule Bookings
          </span>
          <div
            onClick={() => setScheduleToggle(!scheduleToggle)}
            className='p-[5px] rounded-full flex justify-center items-center border border-black cursor-pointer'
          >
            <svg
              width='24'
              height='24'
              clip-rule='evenodd'
              fill-rule='evenodd'
              stroke-linejoin='round'
              stroke-miterlimit='2'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z'
                stroke='#141115'
              />
            </svg>
          </div>
        </div>
        <div className='flex justify-center w-full h-[100%]'>
          <div className='relative md:w-1/2 md:h-[50%] sm:w-[100%] sm:h-[100%] rounded bg-[#ffffff] mt-[10%]'>
            <div className='absolute flex flex-col justify-between w-[70%] h-[50%] my-[25%] mx-[15%] bg-[#ffffff] p-[10px] rounded border download'>
              {!pickedDate && (
                <Space
                  direction='vertical'
                  size={12}
                  className='bg-[primary] text-[black]'
                >
                  <DatePicker
                    format='YYYY-MM-DD HH:mm:ss'
                    // disabledDate={disabledDate}
                    // disabledTime={disabledDateTime}
                    showTime={{
                      defaultValue: moment('00:00:00', 'HH:mm:ss'),
                    }}
                    onChange={onChange}
                  />
                </Space>
              )}
              <div className='text-[black] text-[14px]'>
                New Schedule Date/Time: {pickedDate}
              </div>
              <div className='flex justify-end items-center space-x-2 mt-[20px]'>
                <div
                  onClick={() => setPickedDate(null)}
                  className='flex justify-center items-center bg-[#ffffff] font-500 font-[Plus Jakarta Display] w-[87px] h-[30px] cursor-pointer rounded border text-[10px] text-[#727073]'
                >
                  Cancel
                </div>
                <div
                  onClick={() => rescheduleBookings(bookingId ?? locationId)}
                  className='flex justify-center items-center bg-[#0559FD] font-500 font-[Plus Jakarta Display] w-[87px] h-[30px] cursor-pointer rounded border-none text-[10px] text-[#FCFCFC]'
                >
                  {!schedule && 'Schedule'}
                  {schedule && 'Scheduling...'}
                  {schSuccess && 'Schedule Successful!!!'}
                  {schErr && 'Schedule Error!!!'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RescheduleBooking
