import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import useCookieHandler from '../../hooks/useCookieHandler'
import { setMostVisited } from '../../slices/insightSlice'

import OptionComp from './OptionComp'
import InsightPagination from './InsightPagination'
import Loader from '../Loader/Loader'
import RescheduleBooking from '../Bookings/UserBookingDashboard/RescheduleBooking'
import DashboardHeader from '../Layout/Header'

import './extra-styles.css'

const MstVstdPLc = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const url = window.location.href
  const dispatch = useDispatch()
  const { token, error, errorMessage } = useCookieHandler('user_token')
  const [active, setActive] = useState('text-[#0559FD]')
  const [inActive, setInActive] = useState('text-[#434144]')

  const [currentPagination, setCurrentPagination] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [locationId, setLocationId] = useState()
  const [scheduleToggle, setScheduleToggle] = useState(false)
  const [accountType, setAccountType] = useState(null)

  // Getting the user
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
        account_type: data?.data?.account_type.toString(),
        github: data?.data?.github,
      }
      // setUserData(userToFIll);
      setAccountType(data?.data?.account_type[0]?.user_type.type)
    } catch (error) {}
  }

  useEffect(() => {
    exchangeTokenForId()
  }, [token])

  const getLocationDetails = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/workspaces/most-visited`,
        {
          method: 'GET',
          // body: JSON.stringify({
          //   token
          // }),
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()

      if (data?.status === true) {
        setLoading(false)
        setFailure(false)
        setSuccess(true)
        dispatch(setMostVisited(data))
      }

      if (res.status === 500) {
        navigate('/500')
      } else if (res.status === 400) {
        navigate('/400')
      }
      // dispatch(setTotalReviews(data.data.data))
    } catch (err) {
      setLoading(false)
      setSuccess(false)
      setFailure(true)
    }
  }
  const visitedLocations = useSelector(
    (state) => state.insight.mostVisited.data?.data
  )

  const visitedLocationsDatas = useSelector(
    (state) => state.insight.mostVisited
  )

  useEffect(() => {
    if (!token) return
    if (visitedLocations) return
    getLocationDetails()
  }, [token])

  const indexOfLastPage = currentPagination * perPage
  const indexOfFirstPage = indexOfLastPage - perPage
  const currentPageList = visitedLocations?.slice(
    indexOfFirstPage,
    indexOfLastPage
  )
  let totalPaginatePage = Math.ceil(
    visitedLocationsDatas?.data?.total / perPage
  )

  // Handle page click function
  const handlePageClick = (selected) => {
    setCurrentPagination(selected)
  }

  const headerLinkJson = [
    {
      title: 'Revenue',
      path: '/dashboard/revenue',
    },
    {
      title: 'Transactions',
      path: '/dashboard/revenue/transaction',
    },
    {
      title: 'Reviews',
      path: '/dashboard/revenue/reviews',
    },
  ]

  const headerLinkJsonUser = [
    {
      title: 'Expenses',
      path: '/dashboard/expenses',
    },
    {
      title: 'Transactions',
      path: '/dashboard/expenses/transaction',
    },
    {
      title: 'Most Visited Locations',
      path: '/dashboard/expenses/visited-location',
    },
    {
      title: 'Reviews',
      path: '/dashboard/expenses/reviews',
    },
  ]

  return (
    <div className='w-full flex overflow-hidden'>
      <Loader
        failure={failure} //if your api or state fails and page should not show
        successful={success} //if the api or state is successful
        isLoading={loading} //if your api or state is still fetching
        redirectTo={
          accountType === 'Owner'
            ? '/dashboard/revenue/transaction'
            : '/dashboard/expenses/transaction'
        }
      />
      {/* <OverviewSidebar /> */}
      <div className='flex flex-col xl:w-[87%] lg:w-[84%] lg:ml-auto'>
        <DashboardHeader
          icon={
            'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Workspacesblue.svg'
          }
          title='Insight'
          linkJson={
            accountType === 'Owner' ? headerLinkJson : headerLinkJsonUser
          }
        />

        <div className='w-full h-auto md:p-[20px] sm:p-[10px] bg-[#FCFCFC]'>
          <div className='md:w-[100%] sm:w-[100%] h-[auto]'>
            <div className='xl:hidden lg:hidden md:hidden sm:flex sm:flex-row sm:items-center sm:gap-4 sm:my-2 '>
              {accountType === 'User' && (
                <Link to={'/dashboard/expenses'}>
                  <h1 className={url.includes('/expenses') ? active : inActive}>
                    {t('Expenses')}
                  </h1>
                </Link>
              )}

              {accountType === 'Owner' && (
                <Link to={'/dashboard/revenue'}>
                  <h1 className={url.includes('/revenue') ? active : inActive}>
                    {t('Revenue')}
                  </h1>
                </Link>
              )}

              {accountType === 'Owner' && (
                <Link to={'/dashboard/revenue/transaction'}>
                  <p
                    className={url.includes('/transaction') ? active : inActive}
                  >
                    {t('Transactions')}
                  </p>
                </Link>
              )}

              {accountType === 'User' && (
                <Link to={'/dashboard/expenses/transaction'}>
                  <p
                    className={url.includes('/transaction') ? active : inActive}
                  >
                    {t('Transactions')}
                  </p>
                </Link>
              )}

              {accountType === 'User' && (
                <Link to={'/dashboard/expenses/visited-location'}>
                  <p
                    className={
                      url.includes('/visited-location') ? active : inActive
                    }
                  >
                    {t('Most Visited Locations')}
                  </p>
                </Link>
              )}

              {accountType === 'Owner' && (
                <Link to={'/dashboard/revenue/reviews'}>
                  <p className={url.includes('/reviews') ? active : inActive}>
                    {t('Reviews')}
                  </p>
                </Link>
              )}

              {accountType === 'User' && (
                <Link to={'/dashboard/expenses/reviews'}>
                  <p className={url.includes('/reviews') ? active : inActive}>
                    {t('Reviews')}
                  </p>
                </Link>
              )}
            </div>

            <div className='w-full'>
              <div className='font-400 font-[Plus Jakarta Display] sm:text-[20px] md:text-[24px] text-[#141115] md:mb-[20px] sm:mb-[10px]'>
                Most Visited Location
              </div>

              {visitedLocations?.length < 1 && (
                <div className='w-full bg-[#fff] md:p-[20px] sm:p-[10px] rounded download md:mt-[20px] sm:mt-[10px] '>
                  <div className='font-500 font-[Plus Jakarta Display] md:text-[18px] sm:text-[16px] text-[#2C292C]'>
                    No Visited space During Selected Date Range
                  </div>
                  <div className='mt[10px] font-300 font-[Plus Jakarta Display] md:text-[16px] sm:text-[14px] text-[#434144]'>
                    No Visited space During Selected Date Range
                  </div>
                </div>
              )}
              {visitedLocations?.length > 0 &&
                currentPageList
                  ?.reverse()
                  .map((visitOpt) => (
                    <OptionComp
                      {...visitOpt}
                      setScheduleToggle={setScheduleToggle}
                      setLocationId={setLocationId}
                    />
                  ))}
              <div className='w-full bg-[#fff] md:p-[10px] sm:p-[5px] md:mt-[10px] sm:mt-[5px] flex justify-end items-center'>
                <div>
                  <InsightPagination
                    pageCount={currentPagination}
                    currentPageList={currentPageList}
                    // pageRangeDisplay='5'
                    currentPagination={currentPagination}
                    setCurrentPagination={setCurrentPagination}
                    totalPaginatePage={totalPaginatePage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {scheduleToggle && (
        <div className='fixed top-[0]'>
          <RescheduleBooking
            scheduleToggle={scheduleToggle}
            setScheduleToggle={setScheduleToggle}
            locationId={locationId}
            token={token}
          />
        </div>
      )}
    </div>
  )
}

export default MstVstdPLc
