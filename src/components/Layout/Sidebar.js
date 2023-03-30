import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, Link } from 'react-router-dom'
import Joyride from 'react-joyride'

import useCookieHandler from '../../hooks/useCookieHandler'
import { OwnerSidebar } from './OwnerSidebar'
import { UserSidebar } from './UserSidebar'
import { SalesSidebar } from './SalesSidebar'
import { NullAddressSidebar } from './NullAddressSidebar'
import { AdminSidebar } from './AdminSidebar'

const Sidebar = () => {
  const { token } = useCookieHandler('user_token')
  const [canViewTour, setCanViewTour] = useState(null)
  const [accountType, setAccountType] = useState(null)
  const [provider, setProvider] = useState(null)
  const [address, setAddress] = useState(null)
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
      // setId(data?.data?.id)
      let myStacks = []
      // const findStack = data?.data?.stacks?.map((item) => {
      //   myStacks = [...myStacks, item?.stacks]
      // })
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
        account_type: data?.data?.account_type.toString(),
      }
      // setUserData(userToFIll);
      setUser(userToFIll)
      setAccountType(data?.data?.account_type[0]?.user_type.type)
      setProvider(data?.data?.provider)
      setAddress(data?.data?.address)
    } catch (error) {}
  }

  useEffect(() => {
    exchangeTokenForId()
  }, [token])

  const saveTourView = () => {
    localStorage.setItem('tour_view', true)
  }

  // check if user has viewed before
  useEffect(() => {
    const hasViewed = localStorage.getItem('tour_view')
    if (!hasViewed) {
      setCanViewTour(true)
      setTimeout(() => {
        saveTourView()
      }, 500)
    }
  }, [])

  const steps = [
    {
      target: '#dashboard',
      disableBeacon: true,
      content:
        'Overview dashboard shows your latest bookings, activities, insights and inbox showing so that you can track almost evrrything directly from your dashboard',
    },
    {
      target: '#workspaces',
      content:
        'Click here to check your all your workspace, booked, and unbooked spaces. You can also edit and delete space here.',
    },
    {
      target: '#bookings',
      content:
        'click here to view your bookings, pending bookings, approved bookings, and cancel bookings on your space.',
    },
    {
      target: '#userBookings',
      content:
        'click here to view your user bookings, pending user bookings, approved user bookings, and cancel user bookings on your space.',
    },
    {
      target: '#people',
      content:
        'click here to view the people who has booked your spaces, check their details to get to know them more.',
    },
    {
      target: '#revenue',
      content:
        'Click here to view your insight, transactions, and reviews on your space.',
    },
    {
      target: '#expenses',
      content:
        'Click here to check your space expenses, transaction, and review on your space',
    },
    {
      target: '#settings',
      content:
        'Click here to make changes to your settings. You can edit your profile information, change your account type, add address, security, payment, privacy settings, notification, and support settings.',
    },
  ]

  return (
    <>
      <main>
        {accountType === 'Owner' ? (
          <div
            className='bg-[#0559FD] xl:block xl:w-[13%] lg:w-[16%] lg:h-screen lg:flex lg:flex-col lg:justify-start lg:items-start
            lg:gap-2 md:hidden sm:hidden fixed text-lg cursor-pointer'
          >
            <Link
              to='/'
              className='flex items-center my-8 xl:px-6 lg:px-2 gap-2'
            >
              {' '}
              <img
                className='xl:w-12 lg:w-10 md:w-12 sm:w-12'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/blue_logo.svg'
                alt='svg'
              />{' '}
              <h1 className='text-[1.2rem] font-light py-2 capitalize text-white'>
                TrySpacely
              </h1>
            </Link>

            {OwnerSidebar.map((item, index) => {
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  id={item.id}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? 'onActive flex flex-row justify-start items-center gap-3 h-[55px] w-full text-blue-500 px-8 bg-white my-1 '
                      : 'notActive w-full h-[55px] flex flex-row gap-3 justify-start items-center px-8 text-white hover:bg-white my-1 '
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </NavLink>
              )
            })}

            {canViewTour && (
              <Joyride steps={steps} continuous={true} showSkipButton={true} />
            )}
          </div>
        ) : null}

        {accountType === 'User' ? (
          <div
            className='bg-[#0559FD] xl:block  xl:w-[13%] lg:w-[16%] lg:h-screen lg:flex lg:flex-col lg:justify-start lg:items-start
            lg:gap-2 md:hidden sm:hidden fixed text-lg cursor-pointer'
          >
            <Link
              to='/'
              className='flex items-center lg:my-8 xl:px-6 lg:px-2 gap-2'
            >
              {' '}
              <img
                className='xl:w-12 lg:w-10 md:w-12  sm:w-12'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/blue_logo.svg'
                alt='svg'
              />{' '}
              <h1 className='text-[1.2rem] font-light py-2 capitalize text-white'>
                TrySpacely
              </h1>
            </Link>

            {UserSidebar.map((item, index) => {
              return (
                <>
                  <NavLink
                    key={item.id}
                    to={item.path}
                    id={item.id}
                    end
                    className={({ isActive }) =>
                      isActive
                        ? 'onActive flex flex-row justify-start items-center gap-3 h-[55px] w-full text-blue-500 px-8 bg-white my-1  '
                        : 'notActive w-full h-[55px] flex flex-row gap-3 justify-start items-center px-8 text-white hover:bg-white my-1   '
                    }
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </NavLink>
                </>
              )
            })}
            {canViewTour && (
              <Joyride steps={steps} continuous={true} showSkipButton={true} />
            )}
          </div>
        ) : null}

        {accountType === 'Sales' ? (
          <div
            className='bg-[#0559FD] xl:block  xl:w-[13%] lg:w-[16%] lg:h-screen lg:flex lg:flex-col lg:justify-start lg:items-start
            lg:gap-2 md:hidden sm:hidden fixed text-lg cursor-pointer'
          >
            <Link
              to='/'
              className='flex items-center lg:my-8 xl:px-6 lg:px-2 gap-2'
            >
              {' '}
              <img
                className='xl:w-12 lg:w-10 md:w-12  sm:w-12'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/blue_logo.svg'
                alt='svg'
              />{' '}
              <h1 className='text-[1.2rem] font-light py-2 capitalize text-white'>
                TrySpacely
              </h1>
            </Link>

            {SalesSidebar.map((item, index) => {
              return (
                <>
                  <NavLink
                    key={item.id}
                    to={item.path}
                    id={item.id}
                    end
                    className={({ isActive }) =>
                      isActive
                        ? 'onActive flex flex-row justify-start items-center gap-3 h-[55px] w-full text-blue-500 px-8 bg-white my-1  '
                        : 'notActive w-full h-[55px] flex flex-row gap-3 justify-start items-center px-8 text-white hover:bg-white my-1   '
                    }
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </NavLink>
                </>
              )
            })}
            {canViewTour && (
              <Joyride steps={steps} continuous={true} showSkipButton={true} />
            )}
          </div>
        ) : null}

        {accountType === 'Admin' ? (
          <div
            className='bg-[#0559FD] xl:block xl:w-[13%] lg:w-[16%] lg:h-screen lg:flex lg:flex-col lg:justify-start lg:items-start
            lg:gap-2 md:hidden sm:hidden fixed text-lg cursor-pointer'
          >
            <Link
              to='/'
              className='flex items-center my-8 xl:px-6 lg:px-2 gap-2'
            >
              {' '}
              <img
                className='xl:w-12 lg:w-10 md:w-12 sm:w-12'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/blue_logo.svg'
                alt='svg'
              />{' '}
              <h1 className='text-[1.2rem] font-light py-2 capitalize text-white'>
                TrySpacely
              </h1>
            </Link>

            {AdminSidebar.map((item, index) => {
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  id={item.id}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? 'onActive flex flex-row justify-start items-center gap-3 h-[55px] w-full text-blue-500 px-8 bg-white my-1 '
                      : 'notActive w-full h-[55px] flex flex-row gap-3 justify-start items-center px-8 text-white hover:bg-white my-1 '
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </NavLink>
              )
            })}

            {canViewTour && (
              <Joyride steps={steps} continuous={true} showSkipButton={true} />
            )}
          </div>
        ) : null}
      </main>
    </>
  )
}

export default Sidebar
