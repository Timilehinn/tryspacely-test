import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import useCookieHandler from '../../hooks/useCookieHandler'

import checkForAuthentication from '../../utils/checkForAuthentication'
import { UserSidebar } from '../Layout/UserSidebar'
import FixedNofitication from './FixedNofitication'

const NotificationHeader = () => {
  const { t } = useTranslation()
  const ref = useRef()
  const { token } = useCookieHandler('user_token')
  const navigate = useNavigate()
  const cookies = new Cookies()
  const [modalOpen, setModalStatus] = useState(false)
  const [hamBurgerOpen] = React.useState(true)
  const [openNotification, setOpenNotification] = useState(false)
  const [authenticated, setAuthenticated] = useState('loading')
  const [toggleHeaderIcon, setToggleHeaderIcon] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [isUnreadPresent, setIsUnreadPresent] = useState(0)

  const [accountType, setAccountType] = useState(null)
  const [user, setUser] = useState([])

  const exchangeTokenForId = async () => {
    if (!token) {
      return
    }
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

      if (data?.status !== true) {
        alert('something went wrong. Seems you are not authenticated')
        return
      }

      let myStacks = []
      const findStack = data?.data?.stacks?.map((item) => {
        myStacks = [...myStacks, item?.stacks]
      })
      let userToFIll = {
        first_name: data?.data?.first_name,
        last_name: data?.data?.last_name,
        email: data?.data?.email,
        stacks: myStacks?.toString(),
        role: data?.data?.role?.position,
        company: data?.data?.role?.company,
        position: data?.data?.role?.position,
        provider: data?.data?.provider,
        address: data?.data?.address,
        phone_number: data?.data?.phone_number,
        profile_url: data?.data?.profile_url,
        gender: data?.data?.gender,
        account_type: data?.data?.account_type.toString(),
      }

      setUser(userToFIll)
      setAccountType(data?.data?.account_type[0]?.user_type.type)
    } catch (error) {}
  }

  const fetchNotifications = async () => {
    try {
      const token = cookies.get('user_token')
      if (!token) {
        alert('Not authenticated!!!')
        return
      }
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/notifications`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res?.json()
      if (data?.status !== true) {
        toast.error('Error fetching notifications')
        return
      }
      setNotifications(data?.data?.data)
      const isUnread = data?.data?.data?.filter((x) => x?.seen === false)
      setIsUnreadPresent(isUnread?.length)
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    exchangeTokenForId()
  }, [token])

  useEffect(() => {
    fetchNotifications()
  }, [])

  useEffect(async () => {
    if (authenticated != 'loading') return
    const { error, success, proccessing_auth } = await checkForAuthentication()
    if (success) {
      setAuthenticated(true)
      return
    }
    setAuthenticated(false)
  }, [authenticated])

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (toggleHeaderIcon && ref.current && !ref.current.contains(e.target)) {
        setToggleHeaderIcon(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [toggleHeaderIcon])

  const logout = async () => {
    cookies.remove('user_token', { path: '/' })
    setTimeout(() => {
      setAuthenticated('loading')
      navigate('/login')
    }, 1500)
  }

  const ModalDialog = () => {
    setModalStatus(false)
  }

  const HamBurger = () => {
    setModalStatus(true)
  }

  return (
    <>
      <div
        className='lg:h-[60px] md:h-[60px] sm:h-[60px] px-5 bg-white flex justify-between items-center shadow-1fl 
        sm:w-full cursor-pointer'
      >
        <div className='flex justify-center items-center gap-2 '>
          {hamBurgerOpen === true && (
            <img
              onClick={HamBurger}
              className='xl:hidden lg:hidden'
              src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Align-Left.svg'
              alt='hamburger'
            />
          )}
        </div>

        <div className='lg:flex lg:flex-row lg:gap-4 md:flex md:flex-row md:gap-4 sm:flex sm:flex-row sm:gap-3'>
          <Link
            to='/dashboard/fav-space'
            className='rounded-full bg-white shadow-2fl flex items-center justify-center w-[40px] h-[40px]'
          >
            <img
              src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/love-icon.svg'
              alt='love-icon'
            />
          </Link>

          {accountType === 'Owner' && (
            <Link
              to='/dashboard/bookings'
              className='rounded-full bg-white shadow-2fl flex items-center justify-center w-[40px] h-[40px] '
            >
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Bookings.svg'
                alt='bookings'
              />
            </Link>
          )}

          {accountType === 'User' && (
            <Link
              to='/user/bookings'
              className='rounded-full bg-white shadow-2fl flex items-center justify-center w-[40px] h-[40px] '
            >
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Bookings.svg'
                alt='bookings'
              />
            </Link>
          )}

          <div
            onClick={() => setOpenNotification(!openNotification)}
            className='rounded-full bg-white shadow-2fl flex items-center justify-center w-[40px] h-[40px] relative'
          >
            <img
              src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Notification-icon.svg'
              alt='notification'
            />
            {isUnreadPresent > 0 && (
              <div className='text-[white] absolute top-0 left-7 bg-[#DA3D2A] rounded-full h-[15px] w-[15px] flex justify-center items-center text-[10px]'>
                {isUnreadPresent > 99 ? '99+' : isUnreadPresent}
              </div>
            )}
            {/* <span className="text-[#DA3D2A] absolute top-0 left-7"><i className="fa fa-circle"></i></span> */}
          </div>
          {openNotification && (
            <FixedNofitication setOpenNotification={setOpenNotification} />
          )}

          <div className='flex gap-3 justify-center items-center'>
            {user.gender === 'Male' && (
              <img
                className='w-[40px] h-[40px] shadow-2fl bg-white rounded-full p-1'
                src={
                  user.profile_url !== null
                    ? user.profile_url
                    : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                }
                alt='profile'
              />
            )}

            {user.gender === null && (
              <img
                className='w-[40px] h-[40px] shadow-2fl bg-white rounded-full p-1'
                src={
                  user.profile_url !== null
                    ? user.profile_url
                    : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                }
                alt='profile'
              />
            )}

            {user.gender === 'Female' && (
              <img
                className='w-[40px] h-[40px] shadow-2fl bg-white rounded-full p-1'
                src={
                  user.profile_url !== null
                    ? user.profile_url
                    : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl_light.png'
                }
                alt='profile'
              />
            )}

            <button
              onClick={() => setToggleHeaderIcon(true)}
              className='cursor-pointer lg:relative'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='hover:fill-transparent'
              >
                <path
                  d='M6 9L12 15L18 9'
                  stroke='#141115'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              {toggleHeaderIcon && (
                <>
                  <div
                    ref={ref}
                    className='lg:w-[300px] lg:py-8 px-3 absolute lg:gap-0 lg:top-10 lg:right-1 md:top-12 md:right-5 md:w-[250px]
                  md:py-5 md:gap-2 sm:top-12 sm:right-5 sm:w-[250px] sm:py-5 sm:gap-2 flex flex-col justify-start items-start h-auto bg-white shadow-2fl z-10 rounded-md '
                  >
                    <div className='flex flex-row gap-4 justify-center items-center mb-3'>
                      {user.gender === 'male' && (
                        <img
                          src={
                            user.profile_url !== null
                              ? user.profile_url
                              : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                          }
                          alt={user.first_name}
                          className='h-[50px] w-[50px] shadow-2fl bg-white  rounded-full '
                        />
                      )}

                      {user.gender === null && (
                        <img
                          src={
                            user.profile_url !== null
                              ? user.profile_url
                              : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                          }
                          alt={user.first_name}
                          className='h-[50px] w-[50px] shadow-2fl bg-white  rounded-full '
                        />
                      )}

                      {user.gender === 'Female' && (
                        <img
                          src={
                            user.profile_url !== null
                              ? user.profile_url
                              : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl_light.png'
                          }
                          alt={user.first_name}
                          className='h-[50px] w-[50px] shadow-2fl bg-white  rounded-full '
                        />
                      )}
                      <div className='flex flex-col justify-start items-start'>
                        <span className='text-[#141115] font-medium'>
                          {' '}
                          {user.first_name} {user.last_name}{' '}
                        </span>
                        <Link to='/dashboard' className='text-[#434144]'>
                          {' '}
                          {t('Go to dashboard')}{' '}
                        </Link>
                      </div>
                    </div>
                    <hr />
                    <Link
                      to='/settings'
                      className='lg:h-[40px] w-full px-2 hover:bg-[#4342435b] flex justify-start items-center rounded-md '
                    >
                      {t('Profile')}
                    </Link>
                    {authenticated != 'loading' && authenticated && (
                      <span
                        onClick={logout}
                        className='lg:h-[40px] w-full px-2 hover:bg-[#4342435b] flex justify-start items-center
                      rounded-md '
                      >
                        {t('Logout')}
                      </span>
                    )}
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {accountType === 'Owner' && modalOpen === true && (
        <div className='bg-[#0559FD] w-full xl:visible lg:hidden md:block absolute top-0 z-50 h-screen px-8 py-5'>
          <div className='bg-[#0559FD] flex justify-between items-center gap-4'>
            <Link to='/' className='flex justify-center items-center'>
              {' '}
              <img
                className='w-[40px] h-[40px]'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/trybbokinz.logo.black.svg'
                alt='svg'
              />{' '}
              <h1 className='text-2xl text-white font-bold py-2 capitalize px-2'>
                {' '}
                {t('TryBookings')}{' '}
              </h1>
            </Link>

            <div onClick={ModalDialog}>
              <i className='fa fa-close fa-2x text-white'></i>
            </div>
          </div>

          <Link
            to='/dashboard'
            className='sidebar flex items-center gap-3 h-[55px] lg:w-full hover:bg-white hover:text-[#0559fd]
           lg:p text-white mt-10'
          >
            <svg className='w-[25px] h-[25px] fill-white hover:fill-[#0559fd]'>
              <use
                xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#home-svgrepo-com'
                className='home'
              ></use>
            </svg>
            {t('Overview')}
          </Link>

          <Link
            to='/workspaces'
            className='sidebar flex items-center gap-3 h-[55px] lg:w-full hover:bg-white hover:text-[#0559fd]
           lg:p text-white'
          >
            <svg className='w-[25px] h-[25px] fill-white hover:fill-[#0559fd]'>
              <use
                xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#workspace-svgrepo-com'
                className='workspace'
              ></use>
            </svg>
            {t('Workspaces')}
          </Link>

          <Link
            to='/bookings'
            className='sidebar flex items-center gap-3 h-[55px] lg:w-full hover:bg-white hover:text-[#0559fd]
           lg:p text-white'
          >
            <svg className='w-[25px] h-[25px] fill-white hover:fill-[#0559fd]'>
              <use
                xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#calendar-svgrepo-com'
                className='calendar'
              ></use>
            </svg>
            {t('Bookings')}
          </Link>

          <Link
            to='/people'
            className='sidebar flex items-center gap-3 h-[55px] lg:w-full hover:bg-white hover:text-[#0559fd]
           lg:p text-white'
          >
            <svg className='w-[25px] h-[25px] fill-white hover:fill-[#0559fd]'>
              <use
                xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#people-svgrepo-com'
                className='people'
              ></use>
            </svg>
            {t('People')}
          </Link>

          <Link
            to='/revenue'
            className='sidebar flex items-center gap-3 h-[55px] lg:w-full hover:bg-white hover:text-[#0559fd]
           lg:px-8 text-white'
          >
            <svg className='w-[25px] h-[25px] fill-white hover:fill-[#0559fd]'>
              <use
                xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#port-svgrepo-com'
                className='barchart'
              ></use>
            </svg>
            {t('Insight')}
          </Link>

          <Link
            to='/settings'
            className='sidebar flex items-center gap-3 h-[55px] lg:w-full hover:bg-white hover:text-[#0559fd]
           lg:px-8 text-white'
          >
            <svg className='w-[25px] h-[25px] fill-white hover:fill-[#0559fd]'>
              <use
                xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#settings-svgrepo-com'
                className='settings'
              ></use>
            </svg>
            {t('Settings')}
          </Link>
        </div>
      )}

      {accountType === 'User' && modalOpen === true && (
        <div className='bg-[#0559FD] w-full xl:visible lg:hidden md:block absolute top-0 z-50 h-screen md:px-10 sm:px-5 py-8'>
          <div className='bg-[#0559FD] flex justify-between items-center gap-4'>
            <Link to='/' className='flex justify-center items-center'>
              {' '}
              <img
                className='w-[40px] h-[40px]'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/trybbokinz.logo.black.svg'
                alt='svg'
              />{' '}
              <h1 className='text-2xl text-white font-bold py-2 capitalize px-2'>
                TryBookings
              </h1>
            </Link>

            <div onClick={ModalDialog}>
              <i className='fa fa-close fa-2x text-white'></i>
            </div>
          </div>

          <div className='md:mt-8'>
            {UserSidebar.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  id={item.id}
                  className={({ isActive }) =>
                    isActive
                      ? 'sidebar_active flex flex-row justify-start items-center gap-3 h-[55px] w-full text-blue-500 px-2 bg-white my-3 '
                      : 'sidebar_normal w-full h-[55px] flex flex-row gap-3 justify-start items-center px-2 text-white hover:bg-white  '
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </NavLink>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
export default NotificationHeader
