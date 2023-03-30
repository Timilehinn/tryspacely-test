import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { enGB } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import moment from 'moment'

import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

import useCookieHandler from '../../../hooks/useCookieHandler'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import {
  setError,
  setSearchResults,
  setSearchToggle,
} from '../../../slices/search_bookin'

const localizer = momentLocalizer(moment)

const BookingCalendar = ({ data }) => {
  const dispatch = useDispatch()
  const { token } = useCookieHandler('user_token')
  const [acceptBtn, setAcceptBtn] = useState('Accept')
  const [confirmAccept, setConfirmAccept] = useState(false)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isError, setIsError] = useState(null)
  const [toggleModal, setToggleModal] = useState(false)

  const [selectedData, setSelectedData] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
      if (data?.status != true) {
        toast.error(data?.errors[Object.keys(data?.errors)[0]])
        return
      }
      setAcceptBtn('Accepted')
      toast.success('Booking Accepted')
      setConfirmAccept(false)
    } catch (error) {
      setIsError(error)
      toast.error('Booking Error', error)
    }
  }

  const reFormedDate = () => {
    const newDate = data?.map((item, index) => {
      return {
        ...item,
        start: new Date(item?.bookings[0]?.start_date),
        end: new Date(item?.bookings[0]?.end_date),
        title: [item?.user.first_name, ' - ', item?.bookings[0].workspace.name],
      }
    })
    return newDate
  }

  const reformatDate = (incomingDate) => {
    if (!incomingDate) return
    const getConvertedDate = new Date(incomingDate)
    return getConvertedDate.toISOString()
    // return getConvertedDate.toLocaleDateString();
  }

  // function that trigger the search booking code
  const onSearchTranx = async (searchWord) => {
    if (!token) {
      return
    }
    setLoading(true)
    setSearchQuery(searchWord)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/bookings/search/${searchWord}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()
      if (data?.status === true) {
        dispatch(setSearchResults(data?.data))
        dispatch(setSearchToggle(true))
        setLoading(false)
        setIsFailure(false)
        setIsSuccess(true)
      }

      if (data?.status === false) {
        toast.error('Booking code does not exist')
        dispatch(setError(data?.errors))
        setLoading(false)
        setIsFailure(true)
        setIsSuccess(false)
        return
      }

      if (res.status === 500) {
        navigate('/500')
      } else if (res.status === 400) {
        navigate('/400')
      }
    } catch (err) {
      setLoading(false)
      setIsFailure(true)
      setIsSuccess(false)
    }
  }

  return (
    <main className='w-full p-10'>
      <div className='flex flex-col justify-center items-center mx-auto gap-2 w-full lg:my-5 relative lg:w-[340px] md:w-[100%] sm:w-[100%] md:my-7 sm:my-7 z-10 '>
        <div className='flex flex-row gap-2 '>
          <div className='relative'>
            <input
              id='search'
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search booking...'
              maxLength='44'
              autoComplete='off'
              className='bg-[#FCFCFC] border-[1px] outline-none rounded-md placeholder:text-[#AAAAAA] lg:h-[40px] lg:w-[252px]
              md:h-[40px] md:w-[200px] sm:h-[40px] sm:w-full indent-6 '
            />
            <img
              className='absolute w-[16px] h-[16px] lg:top-3 lg:left-1 lg:block md:top-[10px] md:block md:left-1 sm:block sm:top-[10px]'
              src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Search-icon.svg'
              alt='search'
            />
          </div>

          <button
            onClick={() => onSearchTranx(searchQuery)}
            className='h-[40px] w-[80px] bg-[#0559FD] text-white rounded-lg hover:bg-black '
          >
            {' '}
            Search{' '}
          </button>
        </div>

        <div className='flex flex-col gap-2 w-full absolute top-12 left-0 bg-white shadow-2fl z-20 '>
          {' '}
          {data
            .filter((item) => {
              const searchWord = searchQuery?.toLowerCase()
              const tranxCode = item.booking_code?.toLowerCase()

              return (
                searchWord &&
                tranxCode?.startsWith(searchWord) &&
                tranxCode !== searchWord
              )
            })
            .slice(0, 10)
            .map((booking) => {
              return (
                <span
                  onClick={() => onSearchTranx(booking.booking_code)}
                  key={booking.booking_code}
                  className='text-[16px] cursor-pointer '
                >
                  {' '}
                  {booking.booking_code}{' '}
                </span>
              )
            })}{' '}
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={reFormedDate()}
        startAccessor='start'
        views={['month', 'week', 'day']}
        endAccessor='end'
        style={{ height: 500 }}
        onSelectEvent={(slotInfo) => {
          // reformatDate(slotInfo?.start)
          setToggleModal(true)
          setSelectedData(slotInfo)
        }}
      />

      {toggleModal && (
        <>
          <div className='overlay' onClick={() => setToggleModal(false)}></div>
          <div
            className='absolute bg-white lg:top-[20rem] lg:left-[30rem] md:top-[20rem] md:left-[30rem] sm:top-[20rem] sm:left-[10rem] 
                    z-10 w-[150px] h-[120px] shadow-2fl rounded-md flex flex-col justify-center mx-auto px-2'
          >
            <button
              className='hover:bg-[#EEEEEE] hover:rounded-md flex gap-3 justify-start items-center w-full h-10 px-2'
              onClick={() => setShowDetails(true)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                id='Outline'
                viewBox='0 0 24 24'
                width='20'
                height='20'
                className='w-[18px]'
              >
                <path
                  d='M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,
                                0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,
                                3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z'
                  fill='#141115'
                />
                <circle cx='12' cy='15' r='1.5' fill='#141115' />
                <circle cx='7' cy='15' r='1.5' fill='#141115' />
                <circle cx='17' cy='15' r='1.5' fill='#141115' />
              </svg>
              Details
            </button>

            <button
              className='hover:bg-[#EEEEEE] hover:rounded-md flex gap-3 justify-start items-center w-full h-10 px-2 '
              onClick={() => setToggleModal(false)}
              // onClick={() => setModal(false)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                version='1.1'
                id='Capa_1'
                x='0px'
                y='0px'
                viewBox='0 0 512.021 512.021'
                width='23'
                height='23'
                className='w-[18px]'
              >
                <g>
                  <path
                    d='M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   
                                    L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376
                                    c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387
                                    c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z'
                    className='fill-black'
                  />
                </g>
              </svg>
              Cancel{' '}
            </button>
          </div>
        </>
      )}

      {showDetails === true && (
        <>
          <div className='overlay' onClick={() => setShowDetails(false)}></div>
          <div
            className='lg:p-10 bg-white xl:h-auto lg:h-auto lg:w-[780px] absolute right-0 top-0 shadow-2fl z-10
                    md:w-[90%] md:h-screen md:p-10 sm:w-[100%] sm:px-10 sm:h-auto  '
          >
            <div className='flex justify-between items-center py-2'>
              <h1 className='text-[19px]'> Booking Detail </h1>
              <button
                onClick={() => setShowDetails(false)}
                className='text-[19px] border-0 bg-transparent'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  version='1.1'
                  id='Capa_1'
                  x='0px'
                  y='0px'
                  viewBox='0 0 512.021 512.021'
                  width='23'
                  height='23'
                >
                  <g>
                    <path
                      d='M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   
                                            L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376
                                            c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387
                                            c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z'
                      className='fill-black'
                    />
                  </g>
                </svg>
              </button>
            </div>
            <hr />

            <div
              className='lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-4 lg:py-4 md:flex md:flex-row
                        md:justify-between md:items-center md:gap-4 md:py-5 sm:flex sm:flex-col sm:gap-1 sm:py-3'
            >
              <div className='flex gap-5 items-center'>
                {selectedData?.user.gender === 'Male' && (
                  <img
                    src={
                      selectedData?.user.profile_url !== null
                        ? selectedData?.user.profile_url
                        : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                    }
                    alt={selectedData?.user.first_name}
                    className='lg:w-[116px] lg:h-[116px] md:w-[116px] md:h-[116px] sm:w-[70px] sm:h-[70px] rounded-full '
                  />
                )}

                {selectedData?.user.gender === 'Female' && (
                  <img
                    src={
                      selectedData?.user.profile_url !== null
                        ? selectedData?.user.profile_url
                        : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl_light.png'
                    }
                    alt={selectedData?.user.first_name}
                    className='lg:w-[116px] lg:h-[116px] md:w-[116px] md:h-[116px] sm:w-[70px] sm:h-[70px] rounded-full '
                  />
                )}

                {selectedData?.user.gender === null && (
                  <img
                    src={
                      selectedData?.user.profile_url !== null
                        ? selectedData?.user.profile_url
                        : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                    }
                    alt={selectedData?.user.first_name}
                    className='lg:w-[116px] lg:h-[116px] md:w-[116px] md:h-[116px] sm:w-[70px] sm:h-[70px] rounded-full '
                  />
                )}

                <div className='flex flex-col'>
                  <h1 className='text-2xl font-bold'>
                    {' '}
                    {selectedData?.user.first_name}{' '}
                    {selectedData?.user.last_name}{' '}
                  </h1>
                </div>
              </div>

              {selectedData?.bookings[0]?.workspace.status !== 'Approved' &&
              selectedData?.bookings[0]?.workspace.status !== 'Rejected' ? (
                <div className='flex justify-center items-center gap-4 py-0 md:py-0 sm:py-5'>
                  <button
                    onClick={() => setConfirmAccept(true)}
                    className='w-[124px] h-[52px] bg-[#0559FD] rounded-md text-white '
                  >
                    {' '}
                    Accept{' '}
                  </button>

                  <button
                    onClick={() => setConfirmCancel(true)}
                    className='w-[124px] h-[52px] bg-white rounded-md border-2 relative '
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>

            {confirmAccept && (
              <>
                <div
                  className='overlay'
                  onClick={() => setConfirmAccept(false)}
                ></div>
                <div
                  className='lg:top-[300px] lg:left-[250px] lg:w-[500px] lg:h-[170px] md:top-[500px] md:left-[250px] sm:left-6 sm:top-[350px] sm:flex 
                  sm:flex-col sm:justify-center sm:items-center sm:gap-5 bg-white fixed z-20 rounded-md shadow-2fl p-5'
                >
                  <p className='text-[19px] font-semibold'>
                    {' '}
                    Are you want to accept this booking?{' '}
                  </p>
                  <div className='flex justify-end items-end gap-4 '>
                    <button
                      type='button'
                      className='bg-[#0559FD] w-[80px] h-[40px] rounded-lg text-white '
                      onClick={() => acceptBooking(selectedData?.id)}
                    >
                      {' '}
                      {acceptBtn}{' '}
                    </button>

                    <button
                      type='button'
                      className='bg-transparent border-2 w-[80px] h-[40px] rounded-lg '
                      onClick={() => setConfirmAccept(false)}
                    >
                      {' '}
                      Cancel{' '}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* {confirmCancel === true && (
              <>
                <div
                  className='overlay'
                  onClick={() => setConfirmAccept(false)}
                ></div>
                <div
                  className='lg:top-[300px] lg:left-[250px] lg:w-[500px] lg:h-[170px] md:top-[500px] md:left-[250px] sm:left-6 sm:top-[350px] sm:flex 
                  sm:flex-col sm:justify-center sm:items-center sm:gap-5 bg-white fixed z-20 rounded-md shadow-2fl p-5'
                >
                  <p className='text-[19px] font-semibold'>
                    {' '}
                    Are you want to accept this booking?{' '}
                  </p>
                  <div className='flex justify-end items-end gap-4 '>
                    <button
                      type='button'
                      className='bg-[#0559FD] w-[80px] h-[40px] rounded-lg text-white '
                      onClick={() => rejectBooking(selectedData?.id)}
                    >
                      {' '}
                      {rejectBtn}{' '}
                    </button>

                    <button
                      type='button'
                      className='bg-transparent border-2 w-[80px] h-[40px] rounded-lg '
                      onClick={() => setConfirmCancel(false)}
                    >
                      {' '}
                      Cancel{' '}
                    </button>
                  </div>
                </div>
              </>
            )} */}

            <div className='flex flex-col gap-4 py-5'>
              <div className='flex items-center gap-8'>
                <div className='flex flex-col'>
                  <span className='text-[#434144]'> Job Role </span>
                  <h1 className='text-[18px]'>
                    {selectedData?.bookings[0]?.workspace?.job_role !== null
                      ? selectedData?.bookings[0]?.workspace?.job_role
                      : 'Not filled'}
                  </h1>
                </div>

                <div>
                  <span className='text-[#434144]'> Language </span>
                  <h1 className='text-[18px]'>
                    {selectedData?.bookings[0]?.workspace?.language !== null
                      ? selectedData?.bookings[0]?.workspace?.language
                      : 'Not filled'}
                  </h1>
                </div>
              </div>

              <div className='flex items-center gap-4 py-5'>
                <Link
                  to=''
                  className='flex justify-center items-center bg-white shadow-2fl rounded-full w-[40px] h-[40px] '
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    version='1.1'
                    id='Capa_1'
                    x='0px'
                    y='0px'
                    viewBox='0 0 24 24'
                    width='20'
                    height='20'
                  >
                    <g>
                      <path
                        d='M12,2.162c3.204,0,3.584,0.012,4.849,0.07c1.308,0.06,2.655,0.358,3.608,1.311c0.962,
                                                0.962,1.251,2.296,1.311,3.608   c0.058,1.265,0.07,1.645,0.07,4.849c0,3.204-0.012,3.584-0.07,
                                                4.849c-0.059,1.301-0.364,2.661-1.311,3.608   c-0.962,0.962-2.295,1.251-3.608,1.311c-1.265,0.058-1.645,
                                                0.07-4.849,0.07s-3.584-0.012-4.849-0.07   
                                                c-1.291-0.059-2.669-0.371-3.608-1.311c-0.957-0.957-1.251-2.304-1.311-3.608c-0.058-1.265-0.07-1.645-0.07-4.849
                                                c0-3.204,0.012-3.584,0.07-4.849c0.059-1.296,0.367-2.664,1.311-3.608c0.96-0.96,2.299-1.251,3.608-1.311
                                                C8.416,2.174,8.796,2.162,12,2.162 M12,0C8.741,0,8.332,0.014,7.052,0.072C5.197,0.157,3.355,0.673,2.014,2.014
                                                C0.668,3.36,0.157,5.198,0.072,7.052C0.014,8.332,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.085,
                                                1.853,0.603,3.7,1.942,5.038   c1.345,1.345,3.186,1.857,5.038,1.942C8.332,23.986,8.741,24,12,24c3.259,0,3.668-0.014,4.948-0.072
                                                c1.854-0.085,3.698-0.602,5.038-1.942c1.347-1.347,1.857-3.184,1.942-5.038C23.986,15.668,24,15.259,24,12
                                                c0-3.259-0.014-3.668-0.072-4.948c-0.085-1.855-0.602-3.698-1.942-5.038c-1.343-1.343-3.189-1.858-5.038-1.942
                                                C15.668,0.014,15.259,0,12,0z'
                        className='fill-black'
                      />
                      <path
                        d='M12,5.838c-3.403,0-6.162,2.759-6.162,6.162c0,3.403,2.759,6.162,6.162,6.162s6.162-2.759,6.162-6.162   
                                                 C18.162,8.597,15.403,5.838,12,5.838z M12,16c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S14.209,16,12,16z'
                        className='fill-black'
                      />
                      <circle cx='18.406' cy='5.594' r='1.44' />
                    </g>
                  </svg>
                </Link>

                <Link
                  to=''
                  className='flex justify-center items-center bg-white shadow-2fl rounded-full w-[40px] h-[40px] '
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    version='1.1'
                    id='Capa_1'
                    x='0px'
                    y='0px'
                    viewBox='0 0 24 24'
                    width='20'
                    height='20'
                  >
                    <g>
                      <path
                        id='Path_2525'
                        d='M23.002,21.584h0.227l-0.435-0.658l0,0c0.266,0,0.407-0.169,0.409-0.376c0-0.008,0-0.017-0.001-0.025   
                                                c0-0.282-0.17-0.417-0.519-0.417h-0.564v1.476h0.212v-0.643h0.261L23.002,21.584z M22.577,20.774h-0.246v-0.499h0.312   
                                                c0.161,0,0.345,0.026,0.345,0.237c0,0.242-0.186,0.262-0.412,0.262'
                        className='fill-black'
                      />
                      <path
                        id='Path_2520'
                        d='M17.291,19.073h-3.007v-4.709c0-1.123-0.02-2.568-1.564-2.568c-1.566,0-1.806,1.223-1.806,2.487v4.79H7.908   
                                                V9.389h2.887v1.323h0.04c0.589-1.006,1.683-1.607,2.848-1.564c3.048,0,3.609,2.005,3.609,4.612L17.291,19.073z 
                                                M4.515,8.065   c-0.964,0-1.745-0.781-1.745-1.745c0-0.964,0.781-1.745,1.745-1.745c0.964,0,1.745,0.781,1.745,1.745   
                                                C6.26,7.284,5.479,8.065,4.515,8.065L4.515,8.065 M6.018,19.073h-3.01V9.389h3.01V19.073z M18.79,1.783H1.497   
                                                C0.68,1.774,0.01,2.429,0,3.246V20.61c0.01,0.818,0.68,1.473,1.497,1.464H18.79c0.819,0.01,1.492-0.645,1.503-1.464V3.245
                                                c-0.012-0.819-0.685-1.474-1.503-1.463'
                        className='fill-black'
                      />
                      <path
                        className='fill-black'
                        id='Path_2526'
                        d='M22.603,19.451c-0.764,0.007-1.378,0.633-1.37,1.397c0.007,0.764,0.633,1.378,1.397,1.37   
                                                c0.764-0.007,1.378-0.633,1.37-1.397c-0.007-0.754-0.617-1.363-1.37-1.37H22.603 M22.635,22.059   
                                                c-0.67,0.011-1.254-0.522-1.265-1.192c-0.011-0.67,0.523-1.222,1.193-1.233c0.67-0.011,1.222,0.523,1.233,1.193   
                                                c0,0.007,0,0.013,0,0.02C23.81,21.502,23.29,22.045,22.635,22.059h-0.031'
                      />
                    </g>
                  </svg>
                </Link>

                <Link
                  to=''
                  className='flex justify-center items-center bg-white shadow-2fl rounded-full w-[40px] h-[40px] '
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    version='1.1'
                    id='Capa_1'
                    x='0px'
                    y='0px'
                    viewBox='0 0 24 24'
                    width='20'
                    height='20'
                  >
                    <path
                      id='Logo_00000038394049246713568260000012923108920998390947_'
                      d='M21.543,7.104c0.014,0.211,0.014,0.423,0.014,0.636  
                                            c0,6.507-4.954,14.01-14.01,14.01v-0.004C4.872,21.75,2.252,20.984,0,19.539c0.389,0.047,0.78,0.07,1.172,0.071  
                                            c2.218,0.002,4.372-0.742,6.115-2.112c-2.107-0.04-3.955-1.414-4.6-3.42c0.738,0.142,1.498,0.113,2.223-0.084  
                                            c-2.298-0.464-3.95-2.483-3.95-4.827c0-0.021,0-0.042,0-0.062c0.685,0.382,1.451,0.593,2.235,0.616  
                                            C1.031,8.276,0.363,5.398,1.67,3.148c2.5,3.076,6.189,4.946,10.148,5.145c-0.397-1.71,0.146-3.502,1.424-4.705  
                                            c1.983-1.865,5.102-1.769,6.967,0.214c1.103-0.217,2.16-0.622,3.127-1.195c-0.368,1.14-1.137,2.108-2.165,2.724  
                                            C22.148,5.214,23.101,4.953,24,4.555C23.339,5.544,22.507,6.407,21.543,7.104z'
                      className='fill-black'
                    />
                  </svg>
                </Link>

                <Link
                  to=''
                  className='flex justify-center items-center bg-white shadow-2fl rounded-full w-[40px] h-[40px] '
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    version='1.1'
                    id='Capa_1'
                    x='0px'
                    y='0px'
                    viewBox='0 0 24 24'
                    width='512'
                    height='512'
                  >
                    <g>
                      <path
                        d='M12,0.296c-6.627,0-12,5.372-12,12c0,5.302,3.438,9.8,8.206,11.387   
                                                c0.6,0.111,0.82-0.26,0.82-0.577c0-0.286-0.011-1.231-0.016-2.234c-3.338,0.726-4.043-1.416-4.043-1.416
                                                C4.421,18.069,3.635,17.7,3.635,17.7c-1.089-0.745,0.082-0.729,0.082-0.729c1.205,0.085,1.839,1.237,1.839,1.237
                                                c1.07,1.834,2.807,1.304,3.492,0.997C9.156,18.429,9.467,17.9,9.81,17.6c-2.665-0.303-5.467-1.332-5.467-5.93
                                                c0-1.31,0.469-2.381,1.237-3.221C5.455,8.146,5.044,6.926,5.696,5.273c0,0,1.008-0.322,3.301,1.23
                                                C9.954,6.237,10.98,6.104,12,6.099c1.02,0.005,2.047,0.138,3.006,0.404c2.29-1.553,3.297-1.23,3.297-1.23
                                                c0.653,1.653,0.242,2.873,0.118,3.176c0.769,0.84,1.235,1.911,1.235,3.221c0,4.609-2.807,5.624-5.479,5.921
                                                c0.43,0.372,0.814,1.103,0.814,2.222c0,1.606-0.014,2.898-0.014,3.293c0,0.319,0.216,0.694,0.824,0.576
                                                c4.766-1.589,8.2-6.085,8.2-11.385C24,5.669,18.627,0.296,12,0.296z'
                        className='fill-black'
                      />
                      <path
                        d='M4.545,17.526c-0.026,0.06-0.12,0.078-0.206,0.037c-0.087-0.039-0.136-0.121-0.108-0.18   c0.026-0.061,0.12-0.078,0.207-0.037C4.525,17.384,4.575,17.466,4.545,17.526L4.545,17.526z'
                        className='fill-black'
                      />
                      <path
                        d='M5.031,18.068c-0.057,0.053-0.169,0.028-0.245-0.055c-0.079-0.084-0.093-0.196-0.035-0.249   c0.059-0.053,0.167-0.028,0.246,0.056C5.076,17.903,5.091,18.014,5.031,18.068L5.031,18.068z'
                        className='fill-black'
                      />
                      <path
                        d='M5.504,18.759c-0.074,0.051-0.194,0.003-0.268-0.103c-0.074-0.107-0.074-0.235,0.002-0.286   c0.074-0.051,0.193-0.005,0.268,0.101C5.579,18.579,5.579,18.707,5.504,18.759L5.504,18.759z'
                        className='fill-black'
                      />
                      <path
                        d='M6.152,19.427c-0.066,0.073-0.206,0.053-0.308-0.046c-0.105-0.097-0.134-0.234-0.068-0.307   c0.067-0.073,0.208-0.052,0.311,0.046C6.191,19.217,6.222,19.355,6.152,19.427L6.152,19.427z'
                        className='fill-black'
                      />
                      <path
                        d='M7.047,19.814c-0.029,0.094-0.164,0.137-0.3,0.097C6.611,19.87,6.522,19.76,6.55,19.665   c0.028-0.095,0.164-0.139,0.301-0.096C6.986,19.609,7.075,19.719,7.047,19.814L7.047,19.814z'
                        className='fill-black'
                      />
                      <path
                        d='M8.029,19.886c0.003,0.099-0.112,0.181-0.255,0.183c-0.143,0.003-0.26-0.077-0.261-0.174c0-0.1,0.113-0.181,0.256-0.184   C7.912,19.708,8.029,19.788,8.029,19.886L8.029,19.886z'
                        className='fill-black'
                      />
                      <path
                        d='M8.943,19.731c0.017,0.096-0.082,0.196-0.224,0.222c-0.139,0.026-0.268-0.034-0.286-0.13   c-0.017-0.099,0.084-0.198,0.223-0.224C8.797,19.574,8.925,19.632,8.943,19.731L8.943,19.731z'
                        className='fill-black'
                      />
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
            <hr />

            <div
              className='lg:grid lg:grid-cols-2 lg:gap-6 lg:py-10 md:grid md:grid-cols-2 md:gap-5 md:py-5
                        sm:grid sm:grid-cols-1 sm:gap-4 sm:py-5 '
            >
              <div className='flex flex-col'>
                <span className=''> Email </span>
                <p className='text-[18px] py-2'> {selectedData?.user.email}</p>
              </div>

              <div className='flex flex-col'>
                <span className='text-[#434144]'> Phone Number </span>
                <p className='text-[18px] py-2'>
                  {selectedData?.user?.phone_number !== null
                    ? selectedData?.user?.phone_number
                    : 'Not filled'}
                </p>
              </div>

              <div className='flex flex-col'>
                <span className='text-[#434144]'> Status </span>
                <p className='text-[18px]'>{selectedData?.payment_status}</p>
              </div>

              <div className='flex flex-col'>
                <span className='text-[#434144]'> Address </span>
                <p className='text-[18px] py-2'>
                  {selectedData?.user.address !== null
                    ? selectedData?.user.address
                    : 'Not filled'}
                </p>
              </div>

              <div className='flex flex-col'>
                <span className='text-[#434144]'> Booking </span>
                <p className='text-[18px] py-2'>
                  {moment(selectedData?.bookings[0]?.start_date).format(
                    'MMM DD, YYYY'
                  )}{' '}
                  -{' '}
                  {moment(selectedData?.bookings[0]?.end_date).format(
                    'MMM DD, YYYY'
                  )}
                </p>
              </div>

              <div className='flex flex-col'>
                <span className='text-[#434144]'> Price </span>
                <p className='text-[18px] py-2'>
                  {selectedData?.amount_paid} NGN
                </p>
              </div>

              <div className='flex flex-col'>
                <span className='text-[#434144]'> Date </span>
                <p className='text-[18px] py-2'>
                  {format(
                    new Date(selectedData?.bookings[0].booking_date),
                    'MMM dd, yyyy',
                    { locale: enGB }
                  )}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default BookingCalendar
