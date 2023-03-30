import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import parse from 'html-react-parser'
import moment from 'moment'

import DetailAmenities from './UserBookingDashboard/DetailAmenities'
import DetailGallery from './UserBookingDashboard/DetailGallery'
import DetailReviews from './UserBookingDashboard/DetailReviews'
import DetailLocation from './UserBookingDashboard/DetailLocation'
import useCookieHandler from '../../hooks/useCookieHandler'
import { setUserBookingDetails } from '../../slices/userBookingsSlice'
import Loader from '../Loader/Loader'
import CustomAlert from '../CustomComponents/CustomAlert'
import DashboardHeader from '../Layout/Header'

import './UserBookingDashboard/Addon.css'
import useLimitedRoute from '../../hooks/useLimitedRoute'

const UserBookingsDetail = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useCookieHandler('user_token')
  const { success, errorAuth, loadingfinished } = useLimitedRoute('User')
  const [toggleInfo, setToggleInfo] = useState('description')
  const [active, setActive] = useState(
    'lg:w-[100px] lg:h-[45px] md:w-[95px] md:h-[45px] sm:w-[75px] sm:mx-5 sm:px-5 sm:h-[45px] flex justify-center items-center gap-5 md:text-[16px] sm:text-[14px] font-[Plus Jakarta Display] rounded cursor-pointer text-[#ffffff] bg-[#0559FD]'
  )
  const [notActive, setNotActive] = useState(
    'lg:w-[100px] lg:h-[45px] md:w-[95px] md:h-[45px] sm:w-[70px] sm:mx-5 sm:px-5 sm:h-[45px] flex justify-center items-center gap-5 font-[Plus Jakarta Display] text-[141115] md:text-[16px] sm:text-[14px] rounded cursor-pointer'
  )

  const [showImageCarosel, setShowImageCarosel] = useState(false)
  const [cancel, setCancel] = useState(false)
  const [imgNumber, setImgNumber] = useState()
  const [loading, setLoading] = useState(false)
  const [successLoad, setSuccessLoad] = useState(false)
  const [failure, setFailure] = useState(false)
  const [userName, setUserName] = useState({
    firstName: '',
    lastName: '',
  })
  const [userId, setUserId] = useState(null)
  const [user, setUser] = useState(null)

  const [data, setData] = useState(null)
  const [spaceRating, setSpaceRating] = useState()
  const [blocker, setBlocker] = useState(false)

  const [alertWatcher, setAlertWatcher] = useState({
    statement: '',
    value: false,
  })
  const [sendMessageRequested, setSendMessageRequest] = useState(false)

  //function to switch datails
  const changesHandler = (arg) => {
    setToggleInfo(arg)
  }

  //get booked workpace details
  const getWorkspaceDetails = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/bookings/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()

      if (data?.status === true) {
        dispatch(setUserBookingDetails(data?.data))

        setData(data.data)
        setLoading(false)
        setSuccessLoad(true)
        setFailure(false)
      }

      if (data?.status === false) {
        setLoading(false)
        setSuccessLoad(false)
        setFailure(true)
        setAlertWatcher({
          statement: `No result for specified workspace with the id number of ${id}`,
          value: true,
        })
      }
    } catch (err) {
      setLoading(false)
      setSuccessLoad(false)
      setFailure(true)
    }
  }

  //Retrieve User Information function
  const exchangeTokenForId = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/retrieve-token`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        }
      )
      const data = await res.json()

      if (data?.status === true) {
        setUserId(data?.data?.id)
        setUser(data?.data)
        setUserName({
          ...userName,
          firstName: data?.data?.first_name,
          lastName: data?.data?.last_name,
        })
      }
      if (data?.status !== true) {
        setAlertWatcher({
          statement: `something went wrong. Seems you are not authenticated`,
          value: true,
        })
        return
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (!token) return
    exchangeTokenForId()
    getWorkspaceDetails()
  }, [token])

  const bookingDetails = useSelector(
    (state) => state.userBookings.userBookingDetails
  )

  const { photos, reviews } = bookingDetails

  const nextHandler = () => {
    let newLength = photos?.length - 1
    if (imgNumber >= newLength) {
      return setImgNumber(newLength)
    }
    setImgNumber((prev) => prev + 1)
  }

  const prevHandler = () => {
    if (imgNumber <= 0) {
      return setImgNumber(0)
    }
    setImgNumber((prev) => prev - 1)
  }

  let totalRating
  const ratingsArray = data?.bookings[0]?.workspace?.reviews?.map(
    (r, i) => r?.rating
  )

  if (ratingsArray?.length > 0) {
    totalRating = ratingsArray?.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue
    })
  }

  if (!blocker && totalRating) {
    setSpaceRating((totalRating / ratingsArray?.length).toFixed(2))
    setBlocker(true)
  }

  const handleSendMessage = async () => {
    let newConvoInitMe = {
      id: user?.id,
      name: `${user?.first_name} ${user?.last_name}`,
      email: user?.email,
      photoUrl: user?.profile_url,
      welcomeMessage: '',
      role: 'default',
    }
    let otherUserConvoInfo = {
      id: data?.bookings[0]?.workspace?.owner?.id,
      name: `${data?.bookings[0]?.workspace?.owner?.first_name} ${data?.bookings[0]?.workspace?.owner?.last_name}`,
      email: data?.bookings[0]?.workspace?.owner?.email,
      photoUrl: data?.bookings[0]?.workspace?.owner?.profile_url,
      welcomeMessage: '',
      role: '',
    }
    window.localStorage.setItem(
      'newConvoInitMe',
      JSON.stringify(newConvoInitMe)
    )
    window.localStorage.setItem(
      'otherUserConvoInfo',
      JSON.stringify(otherUserConvoInfo)
    )
    setSendMessageRequest(!sendMessageRequested)
    navigate('/dashboard/inbox')
  }

  return (
    <>
      {alertWatcher?.value && (
        <CustomAlert watcher={alertWatcher} setWatcher={setAlertWatcher} />
      )}

      <div className='flex'>
        <Loader
          errorAuth={errorAuth}
          success={success}
          loadingfinished={loadingfinished}
          failure={failure} //if your api or state fails and page should not show
          successful={successLoad} // if the api or state is successful
          isLoading={loading} // if your api or state is still fetching
          redirectTo={'/dashboard/user/bookings'}
        />

        <div className='flex flex-col justify-start xl:w-[87%] lg:w-[84%] md:w-[100%] sm:w-[100%] ml-auto bg-[#E5E5E5]'>
          <DashboardHeader
            icon={
              'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Bookings.svg'
            }
            title='Bookings Details'
          />

          <div className='lg:py-5 lg:px-10 md:px-10 md:py-5 sm:py-5 sm:px-5 w-[full] bg-[#FFFFFF]'>
            <div className='flex flex-row gap-1 justify_start items-center'>
              <Link
                to={'/dashboard/user/bookings'}
                className='text-[#141115] font-[Plus Jakarta Display] font-400 text-[14px]'
              >
                {t('Bookings')}
              </Link>{' '}
              <div className='bg-[#0559FD] h-[5px] w-[5px] rounded-full ml-[10px] mr-3'></div>{' '}
              <div className='text-[#AAAAAA] font-[Plus Jakarta Display] font-400 text-[14px]'>
                {data?.bookings[0]?.workspace?.name}
              </div>
            </div>

            <div className='flex items-center justify-between py-2'>
              <h1 className='font-400 text-[#141115] font-[Plus Jakarta Display] text-[30px]'>
                {data?.bookings[0]?.workspace?.name}
              </h1>
            </div>

            <div className='lg:grid lg:grid-cols-4 lg:gap-4 md:grid md:grid-cols-2 md:gap-4 sm:grid sm:grid-cols-1 sm:gap-5 '>
              <div className='relative bg-[#ffffff] p-[5px] rounded-lg shadow-2fl '>
                <img
                  src={
                    data?.bookings[0]?.workspace?.photos !== 0
                      ? data?.bookings[0]?.workspace?.photos[0].url
                      : 'https://cdn.pixabay.com/photo/2018/03/19/18/20/tea-time-3240766_960_720.jpg'
                  }
                  alt='workspace-image'
                  className='h-full'
                />

                <div className='absolute bottom-4 left-2 lg:w-[130px] lg:h-[40px] bg-[#ffffff88] rounded-md flex justify-start items-center z-20'>
                  <svg
                    className='w-[14px] h-[14px]'
                    width='10'
                    height='10'
                    viewBox='0 0 18 17'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M9.00012 13.313L4.37112 15.7467L5.25537 10.592L1.50537 6.9417L6.68037 6.1917L8.99487 1.50195L11.3094 6.1917L16.4844 6.9417L12.7344 10.592L13.6186 15.7467L9.00012 13.313Z'
                      fill='#F9DC5C'
                      stroke='#F9DC5C'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <span className='ml-[5px] text-[#F9DC5C] font-500 font-[Plus Jakarta Display] text-[14px]'>
                    {spaceRating}
                  </span>
                  <span className='ml-[10px] text-[#FFFFFF] z-[10] font-500 font-[Plus Jakarta Display] text-[14px]'>
                    ({reviews?.length})
                  </span>
                </div>
              </div>

              <div className='bg-[#ffffff] rounded-lg shadow-2fl lg:col-span-2 lg:p-5 md:col-auto md:p-5 sm:col-auto sm:p-5  '>
                <h1 className='font-500 text-[16px] font-[Plus Jakarta Display] text-[#141115] mb-[10px]'>
                  Overview
                </h1>

                <div className='lg:grid lg:grid-cols-3 lg:gap-10 md:grid md:grid-cols-1 md:gap-4 sm:grid sm:grid-cols-1 sm:gap-4 '>
                  <div className='flex flex-col pb-10px border-b pb-3'>
                    <span className='font-400 text-[#727073] text-[10px] font-[Plus Jakarta Display]'>
                      Workspace Name
                    </span>
                    <span className='font-400 text-[13px] font-[Plus Jakarta Display] text-[#141115]'>
                      {data?.bookings[0]?.workspace?.name}
                    </span>
                  </div>

                  <div className='flex flex-col border-b pb-3'>
                    <span className='font-400 text-[#727073] text-[10px] font-[Plus Jakarta Display]'>
                      Mentorship
                    </span>
                    <span className='font-400 text-[13px] font-[Plus Jakarta Display] text-[#141115]'>
                      {data?.bookings[0]?.workspace.mentorship_available ===
                      true
                        ? 'Yes'
                        : 'No'}
                    </span>
                  </div>

                  <div className='flex flex-col border-b pb-3'>
                    <span className='font-400 text-[#727073] text-[10px] font-[Plus Jakarta Display]'>
                      Number of Users
                    </span>
                    <span className='font-400 text-[13px] font-[Plus Jakarta Display] text-[#141115]'>
                      {data?.bookings[0]?.workspace?.available_space}
                    </span>
                  </div>

                  <div className='flex flex-col border-b pb-3'>
                    <span className='font-400 text-[#727073] text-[10px] font-[Plus Jakarta Display]'>
                      Date
                    </span>
                    <span className='font-400 text-[13px] font-[Plus Jakarta Display] text-[#141115]'>
                      {moment(data?.bookings[0]?.start_date).format(
                        'd MMM yyyy HH:mm A'
                      )}{' '}
                      -{' '}
                      {moment(data?.bookings[0]?.end_date).format(
                        'd MMM yyyy HH:mm A'
                      )}{' '}
                    </span>
                  </div>

                  <div className='flex flex-col border-b pb-3'>
                    <span className='font-400 text-[#727073] text-[10px] font-[Plus Jakarta Display]'>
                      Application Date
                    </span>
                    <span className='font-400 text-[13px] font-[Plus Jakarta Display] text-[#141115]'>
                      {moment(data?.bookings[0]?.start_date).format(
                        'd MMM yyyy'
                      )}
                    </span>
                  </div>

                  <div className='flex flex-col border-b pb-3'>
                    <span className='font-400 text-[#727073] text-[10px] font-[Plus Jakarta Display]'>
                      Status
                    </span>

                    <span className='font-400 text-[13px] font-[Plus Jakarta Display] text-[#141115]'>
                      {data?.bookings[0]?.workspace?.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className='lg:col-auto lg:p-5 md:col-span-2 md:p-5 sm:col-auto sm:p-5 rounded-lg shadow-2fl'>
                <div className='font-500 text-[#141115] text-[16px] font-[Plus Jakarta Display]'>
                  {t('Workspace Owner')}
                </div>

                <div className='relative flex justify-start items-center gap-4 py-3'>
                  <div className='relative'>
                    {data?.bookings[0]?.user?.gender === 'Male' && (
                      <img
                        className='w-[60px] h-[60px] rounded-full'
                        src={
                          data?.user?.profile_url !== null
                            ? data?.user?.profile_url
                            : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                        }
                        alt={data?.bookings[0]?.user?.first_name}
                      />
                    )}

                    {data?.bookings[0]?.user?.gender === null && (
                      <img
                        className='w-[60px] h-[60px] rounded-full'
                        src={
                          data?.user.profile_url !== null
                            ? data?.user.profile_url
                            : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                        }
                        alt={data?.bookings[0]?.user?.first_name}
                      />
                    )}

                    {data?.bookings[0]?.user?.gender === 'Female' && (
                      <img
                        className='w-[60px] h-[60px] rounded-full'
                        src={
                          data?.user?.profile_url !== null
                            ? data?.user?.profile_url
                            : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl_light.png'
                        }
                        alt={data?.bookings[0]?.user?.first_name}
                      />
                    )}
                    <div className='absolute bottom-1 right-0 h-[15px] w-[15px] rounded-full bg-[#30D158]'></div>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <h1 className='font-400 lg:text-[14px] md:text-[16px] font-[Plus Jakarta Display] text-[#141115]'>
                      {data?.user?.first_name} {data?.user?.last_name}
                    </h1>

                    <span className='font-400 lg:text-[10px] md:text-[14px] font-[Plus Jakarta Display] text-[#5B585B]'>
                      {data?.bookings[0]?.user?.email}
                    </span>
                  </div>
                </div>

                <div className='font-400 text-[10px] font-[Plus Jakarta Display] text-[#5B585B] py-4'>
                  {t('Socials')}
                </div>

                <div className='flex items-center justify-start space-x-3'>
                  <div className='rounded-full h-[40px] w-[40px] flex justify-center items-center border shadow-[2xl]'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12.0003 8.25093C9.93595 8.25093 8.25127 9.93562 8.25127 12C8.25127 14.0644 9.93595 15.7491 12.0003 15.7491C14.0647 15.7491 15.7494 14.0644 15.7494 12C15.7494 9.93562 14.0647 8.25093 12.0003 8.25093ZM23.2447 12C23.2447 10.4475 23.2588 8.90905 23.1716 7.35937C23.0844 5.55937 22.6738 3.96187 21.3575 2.64562C20.0385 1.32655 18.4438 0.91874 16.6438 0.831553C15.0913 0.744365 13.5528 0.758428 12.0031 0.758428C10.4506 0.758428 8.9122 0.744365 7.36252 0.831553C5.56252 0.91874 3.96502 1.32937 2.64877 2.64562C1.3297 3.96468 0.921891 5.55937 0.834704 7.35937C0.747516 8.91187 0.761579 10.4503 0.761579 12C0.761579 13.5497 0.747516 15.0909 0.834704 16.6406C0.921891 18.4406 1.33252 20.0381 2.64877 21.3544C3.96783 22.6734 5.56252 23.0812 7.36252 23.1684C8.91502 23.2556 10.4535 23.2416 12.0031 23.2416C13.5556 23.2416 15.0941 23.2556 16.6438 23.1684C18.4438 23.0812 20.0413 22.6706 21.3575 21.3544C22.6766 20.0353 23.0844 18.4406 23.1716 16.6406C23.2616 15.0909 23.2447 13.5525 23.2447 12ZM12.0003 17.7684C8.80814 17.7684 6.23189 15.1922 6.23189 12C6.23189 8.8078 8.80814 6.23155 12.0003 6.23155C15.1925 6.23155 17.7688 8.8078 17.7688 12C17.7688 15.1922 15.1925 17.7684 12.0003 17.7684ZM18.005 7.34249C17.2597 7.34249 16.6578 6.74062 16.6578 5.9953C16.6578 5.24999 17.2597 4.64812 18.005 4.64812C18.7503 4.64812 19.3522 5.24999 19.3522 5.9953C19.3524 6.17228 19.3177 6.34756 19.2501 6.51111C19.1825 6.67466 19.0833 6.82326 18.9581 6.9484C18.833 7.07355 18.6844 7.17277 18.5208 7.24039C18.3573 7.30802 18.182 7.34271 18.005 7.34249Z'
                        fill='#141115'
                      />
                    </svg>
                  </div>

                  <div className='rounded-full h-[40px] w-[40px] flex justify-center items-center border shadow-[2xl]'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M20.445 20.4532H16.8953V14.883C16.8953 13.5547 16.8675 11.8477 15.039 11.8477C13.188 11.8477 12.906 13.2885 12.906 14.7847V20.4525H9.35175V8.99925H12.7657V10.5615H12.8115C13.2885 9.65925 14.4487 8.7105 16.1797 8.7105C19.7805 8.7105 20.4487 11.0813 20.4487 14.1638V20.4525L20.445 20.4532ZM5.33625 7.434C5.06496 7.4341 4.79631 7.38068 4.54569 7.27679C4.29508 7.1729 4.06742 7.02059 3.87576 6.82858C3.6841 6.63658 3.53221 6.40864 3.42878 6.15784C3.32534 5.90704 3.27241 5.63829 3.273 5.367C3.27344 4.95866 3.39496 4.55963 3.62217 4.22034C3.84939 3.88106 4.1721 3.61677 4.54951 3.46088C4.92692 3.30499 5.34208 3.26451 5.74249 3.34456C6.14291 3.4246 6.5106 3.62158 6.79907 3.91058C7.08755 4.19958 7.28385 4.56763 7.36317 4.96818C7.44249 5.36874 7.40125 5.78383 7.24468 6.16095C7.08811 6.53808 6.82323 6.86031 6.48354 7.08691C6.14384 7.31351 5.74459 7.4343 5.33625 7.434V7.434ZM7.11675 20.4532H3.555V9H7.11675V20.4532ZM22.227 0H1.77C0.79275 0 0 0.77325 0 1.73025V22.2705C0 23.2275 0.79275 24.0007 1.77 24.0007H22.2233C23.199 24.0007 24 23.2275 24 22.2705V1.73025C24 0.77325 23.199 0 22.2233 0H22.227Z'
                        fill='#141115'
                      />
                    </svg>
                  </div>

                  <div className='rounded-full h-[40px] w-[40px] flex justify-center items-center border shadow-[2xl]'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M20 7.53125C19.4167 7.79167 18.7865 7.96875 18.1094 8.0625C18.8177 7.64583 19.3021 7.03646 19.5625 6.23438C18.8854 6.63021 18.1875 6.89583 17.4688 7.03125C16.8333 6.34375 16.0365 6 15.0781 6C14.1719 6 13.3984 6.32031 12.7578 6.96094C12.1172 7.60156 11.7969 8.375 11.7969 9.28125C11.7969 9.58333 11.8229 9.83333 11.875 10.0312C10.5312 9.95833 9.27083 9.61979 8.09375 9.01562C6.91667 8.41146 5.91667 7.60417 5.09375 6.59375C4.79167 7.11458 4.64062 7.66667 4.64062 8.25C4.64062 9.4375 5.11458 10.349 6.0625 10.9844C5.57292 10.974 5.05208 10.8385 4.5 10.5781V10.6094C4.5 11.3906 4.76042 12.0859 5.28125 12.6953C5.80208 13.3047 6.44271 13.6823 7.20312 13.8281C6.90104 13.9115 6.63542 13.9531 6.40625 13.9531C6.27083 13.9531 6.06771 13.9323 5.79688 13.8906C6.01562 14.5469 6.40365 15.0885 6.96094 15.5156C7.51823 15.9427 8.15104 16.1615 8.85938 16.1719C7.65104 17.1094 6.29167 17.5781 4.78125 17.5781C4.51042 17.5781 4.25 17.5625 4 17.5312C5.54167 18.5104 7.21875 19 9.03125 19C10.1979 19 11.2917 18.8151 12.3125 18.4453C13.3333 18.0755 14.2083 17.5807 14.9375 16.9609C15.6667 16.3411 16.2943 15.6276 16.8203 14.8203C17.3464 14.013 17.737 13.1693 17.9922 12.2891C18.2474 11.4089 18.375 10.5312 18.375 9.65625C18.375 9.46875 18.3698 9.32812 18.3594 9.23438C19.0156 8.76562 19.5625 8.19792 20 7.53125ZM24 4.5V19.5C24 20.7396 23.5599 21.7995 22.6797 22.6797C21.7995 23.5599 20.7396 24 19.5 24H4.5C3.26042 24 2.20052 23.5599 1.32031 22.6797C0.440104 21.7995 0 20.7396 0 19.5V4.5C0 3.26042 0.440104 2.20052 1.32031 1.32031C2.20052 0.440104 3.26042 0 4.5 0H19.5C20.7396 0 21.7995 0.440104 22.6797 1.32031C23.5599 2.20052 24 3.26042 24 4.5Z'
                        fill='#141115'
                      />
                    </svg>
                  </div>

                  <div className='rounded-full h-[40px] w-[40px] flex justify-center items-center border shadow-[2xl]'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M20.88 3.099C20.147 2.366 19.265 2 18.233 2H5.746C4.714 2 3.832 2.366 3.099 3.099C2.366 3.832 2 4.714 2 5.746V18.233C2 19.265 2.366 20.147 3.099 20.88C3.832 21.613 4.714 21.979 5.746 21.979H8.66C8.85 21.979 8.993 21.972 9.089 21.959C9.20069 21.9366 9.30151 21.877 9.375 21.79C9.47 21.69 9.518 21.545 9.518 21.355L9.511 20.47C9.507 19.906 9.505 19.46 9.505 19.13L9.205 19.182C9.015 19.217 8.775 19.232 8.484 19.228C8.18069 19.2224 7.87834 19.192 7.58 19.137C7.2624 19.0784 6.96343 18.9446 6.708 18.747C6.44049 18.5446 6.24097 18.2656 6.136 17.947L6.006 17.647C5.89643 17.4103 5.75877 17.1877 5.596 16.984C5.41 16.741 5.221 16.577 5.03 16.49L4.94 16.425C4.87724 16.3801 4.82016 16.3277 4.77 16.269C4.72209 16.2145 4.68265 16.1532 4.653 16.087C4.627 16.026 4.649 15.976 4.718 15.937C4.788 15.897 4.913 15.878 5.096 15.878L5.356 15.918C5.529 15.952 5.744 16.056 5.999 16.229C6.25706 16.4049 6.47263 16.6362 6.63 16.906C6.83 17.261 7.07 17.532 7.352 17.719C7.634 17.905 7.918 17.999 8.204 17.999C8.49 17.999 8.737 17.977 8.946 17.934C9.14811 17.8922 9.34451 17.8264 9.531 17.738C9.609 17.158 9.821 16.71 10.168 16.398C9.71838 16.3539 9.27276 16.2757 8.835 16.164C8.40779 16.0466 7.99694 15.8763 7.612 15.657C7.20924 15.4377 6.8535 15.1414 6.565 14.785C6.288 14.438 6.06 13.983 5.882 13.42C5.705 12.856 5.616 12.205 5.616 11.468C5.616 10.419 5.958 9.526 6.643 8.788C6.323 8 6.353 7.115 6.734 6.136C6.986 6.057 7.359 6.116 7.853 6.311C8.347 6.506 8.709 6.673 8.939 6.811C9.169 6.951 9.353 7.068 9.492 7.163C10.305 6.93675 11.1451 6.82303 11.989 6.825C12.848 6.825 13.68 6.938 14.487 7.163L14.981 6.851C15.361 6.62285 15.7618 6.43132 16.178 6.279C16.638 6.105 16.988 6.058 17.232 6.136C17.622 7.116 17.656 8 17.335 8.789C18.02 9.526 18.363 10.419 18.363 11.469C18.363 12.206 18.274 12.859 18.096 13.426C17.919 13.994 17.689 14.449 17.407 14.792C17.1134 15.1439 16.7562 15.4373 16.354 15.657C15.934 15.891 15.526 16.06 15.131 16.164C14.6933 16.2761 14.2477 16.3546 13.798 16.399C14.248 16.789 14.474 17.404 14.474 18.245V21.355C14.474 21.502 14.495 21.621 14.539 21.712C14.5592 21.7558 14.5881 21.7952 14.6238 21.8276C14.6595 21.8601 14.7014 21.8851 14.747 21.901C14.843 21.935 14.927 21.957 15.001 21.965C15.075 21.975 15.181 21.978 15.319 21.978H18.233C19.265 21.978 20.147 21.612 20.88 20.879C21.612 20.147 21.979 19.264 21.979 18.232V5.746C21.979 4.714 21.612 3.832 20.879 3.099H20.88Z'
                        fill='#141115'
                      />
                    </svg>
                  </div>
                </div>

                <div
                  onClick={handleSendMessage}
                  className='flex justify-center items-center rounded-lg my-3 border-2 bg-transparent h-[45px] w-full text-[10px] font-[Plus Jakarta Display] text-[#5B585B] hover:text-[#ffffff] hover:bg-[#5B585B]'
                >
                  {t('Send Message')}
                </div>
              </div>
            </div>

            <div className='lg:grid lg:grid-cols-4 lg:gap-5 lg:py-5 md:grid md:grid-col-1 md:py-5 sm:grid sm:grid-cols-1 sm:py-5'>
              <div className='lg:col-span-3 lg:p-5 md:col-auto md:p-5 sm:col-auto sm:p-5 rounded-lg shadow-2fl h-auto '>
                <div
                  className='grid grid-cols-5 content-center gap-5 py-2 lg:space-x-0 lg:overflow-hidden md:overflow-hidden md:space-x-0 
                sm:overflow-auto sm:space-x-6  '
                >
                  <span
                    onClick={() => changesHandler('description')}
                    className={
                      toggleInfo === 'description' ? active : notActive
                    }
                  >
                    Description
                  </span>

                  <span
                    onClick={() => changesHandler('amenities')}
                    className={toggleInfo === 'amenities' ? active : notActive}
                  >
                    Amenities
                  </span>

                  <span
                    onClick={() => changesHandler('gallary')}
                    className={toggleInfo === 'gallary' ? active : notActive}
                  >
                    Gallery
                  </span>

                  <span
                    onClick={() => changesHandler('reviews')}
                    className={toggleInfo === 'reviews' ? active : notActive}
                  >
                    Reviews
                  </span>

                  <span
                    onClick={() => changesHandler('location')}
                    className={toggleInfo === 'location' ? active : notActive}
                  >
                    Location
                  </span>
                </div>

                {/* Description */}
                {toggleInfo === 'description' && (
                  <div className='mt-[20px] pl-[10px] w-full'>
                    <div className='font-400 font-[Plus Jakarta Display] text-[#141115] text-[20px]'>
                      {t('Description')}
                    </div>
                    <div className='font-300 font-[Plus Jakarta Display] text-[#2C292C] mt-[10px]'>
                      {parse(data?.bookings[0]?.workspace?.description + '')}
                    </div>
                  </div>
                )}

                {/* Amenities */}
                {toggleInfo === 'amenities' && (
                  <div className='mt-[20px] pl-[10px] w-full'>
                    <DetailAmenities
                      amenities={data?.bookings[0]?.workspace?.amenities}
                    />
                  </div>
                )}

                {/* Gallery */}
                {toggleInfo === 'gallary' && (
                  <div className='p-5 w-full'>
                    <DetailGallery
                      photos={data?.bookings[0]?.workspace?.photos}
                      showImageCarosel={showImageCarosel}
                      setShowImageCarosel={setShowImageCarosel}
                      imgNumber={imgNumber}
                      setImgNumber={setImgNumber}
                    />
                  </div>
                )}

                {/* Review */}
                {toggleInfo === 'reviews' && (
                  <div className='mt-[20px] pl-[10px] w-full'>
                    <DetailReviews
                      reviews={data?.bookings[0]?.workspace?.reviews}
                      id={id}
                      token={token}
                      callDetails={getWorkspaceDetails}
                      userName={userName}
                      userId={userId}
                    />
                  </div>
                )}

                {/* Location */}
                {toggleInfo === 'location' && (
                  <div className='mt-[20px] pl-[10px] w-full'>
                    <DetailLocation
                      address={data?.bookings[0]?.workspace?.address}
                    />
                  </div>
                )}
              </div>

              <div className='my-5'>
                <div className='w-full h-[50px] flex justify-center items-center rounded-md text-white bg-[#0559FD]'>
                  &#8358; {data?.amount_paid}
                </div>

                <div className='mt-[20px] hidden'>
                  {/* <CAMCDatePicker /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {showImageCarosel && (
          <div className='z-20 fixed top-[0] h-screen lg:w-[80%] md:w-[100%] sm:w-[100%] shadow-2fl bg-[#121111d4] flex items-center'>
            <div className='w-[50%] max-h-[80%] sm:w-full sm:mx-5 bg-[#ffffff] rounded p-5'>
              <div className='flex justify-between items-center'>
                <div className='font-400 font-[Plus Jakarta Display] text-[#141115] z-[50] text-[20px]'>
                  {t('Workspace Images')}
                </div>

                <div
                  onClick={() => setShowImageCarosel(false)}
                  className='rounded-full w-[32px] h-[32px] bg-[#ffffff] z-[50] flex justify-center items-center border cursor-pointer'
                >
                  <svg
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='#141115'
                    stroke='#141115'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M18 6L6 18'
                      stroke='#141115'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M6 6L18 18'
                      stroke='#141115'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </div>

              <div className='flex justify-center items-center gap-4 m-5'>
                <span
                  onClick={prevHandler}
                  className='w-[8px] h-[16px] cursor-pointer'
                >
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M15 6L9 12L15 18'
                      stroke='#141115'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>

                <img
                  className='lg:h-[400px] lg:w-[600px] md:w-full md:h-[350px] md:mx-4 sm:w-full sm:h-[200px] box-border rounded 
                    object-cover'
                  src={data?.bookings[0].workspace.photos[imgNumber]?.url}
                  alt='chosen_pix'
                />

                <span
                  onClick={nextHandler}
                  className='w-[8px] h-[16px] cursor-pointer'
                >
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M9 6L15 12L9 18'
                      stroke='#141115'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>
              </div>

              <div className='text-[#141115] font-[Plus Jakarta Display] font-400 text-[20px] flex justify-end ml-auto py-3'>
                {imgNumber + 1}/{data?.bookings[0]?.workspace.photos?.length}
              </div>
            </div>
          </div>
        )}

        {cancel && (
          <div className='fixed top-[0] w-screen h-screen bg-[black] opacity-[1] flex justify-center items-center z-50'>
            <div className='w-[40%] p-[10px] bg-[#ffffff]'>
              <div className='w-full'>
                <img src='/Delete.svg' alt='cancel-icon' />
              </div>
              <div className='font-500 text-[14px] font-[Plus Jakarta Display] text-[#141115]'>
                {t('Cancel your Booking?')}
              </div>
              <div className='font-400 text-[10px] font-[Plus Jakarta Display] text-[#2C292C]'>
                {t(
                  'You are about to cancel your booking. You would not be refunded.'
                )}
              </div>
              <div className='flex justify-end mt-[20px] items-center w-full space-x-2'>
                <div
                  onClick={() => setCancel(false)}
                  className='py-[10px] px-[20px] flex justify-center items-center border-[2px] rounded-md cursor-pointer text-[#727073] font-500 text-[10px] font-[Plus Jakarta Display bg-[#fcfcfc]'
                >
                  {t('Cancel')}
                </div>
                <div className='py-[10px] px-[20px] flex justify-center items-center border rounded-md cursor-pointer text-[#ffffff] font-500 text-[10px] font-[Plus Jakarta Display] bg-[#DA3D2A]'>
                  {t('Cancel')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UserBookingsDetail
