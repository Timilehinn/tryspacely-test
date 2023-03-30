import React, { useState, useEffect } from 'react'
import './extra-styles.css'
import useCookieHandler from '../../hooks/useCookieHandler'
import { setTotalReviews } from '../../slices/insightSlice'
import { useSelector, useDispatch } from 'react-redux'
import InsightPagination from './InsightPagination'
import Loader from '../Loader/Loader'
import Review from './Review'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import DashboardHeader from '../Layout/Header'

const Reviews = () => {
  const { t } = useTranslation()
  const url = window.location.href
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [active, setActive] = useState('text-[#0559FD]')
  const [inActive, setInActive] = useState('text-[#434144]')
  const { token } = useCookieHandler('user_token')
  const [accountType, setAccountType] = useState(null)

  const [currentPagination, setCurrentPagination] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)

  const exchangeTokenForId = async () => {
    if (!token) {
      // alert('Not authenticated!!!')
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
        account_type: data?.data?.account_type.toString(),
        github: data?.data?.github,
      }

      setAccountType(data?.data?.account_type[0]?.user_type.type)
    } catch (error) {}
  }

  useEffect(() => {
    exchangeTokenForId()
  }, [token])

  const getUserReviews = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/reviews`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()

      if (data?.status === true) {
        setLoading(false)
        setSuccess(true)
        setFailure(false)
        dispatch(setTotalReviews(data))
      }

      if (res.status === 500) {
        navigate('/500')
      } else if (res.status === 400) {
        navigate('/400')
      }
    } catch (err) {
      setLoading(false)
      setSuccess(false)
      setFailure(true)
    }
  }

  useEffect(() => {
    if (!token) return
    if (allWorkspaces) return
    const getterSub = getUserReviews()
    return () => {
      getterSub
    }
  }, [token])

  const allWorkspaces = useSelector(
    (state) => state.insight.totalReviews.data?.data
  )
  const reviewDatas = useSelector((state) => state.insight.totalReviews)

  // Function for fetching reviews base on star rating
  const getRatingReviews = async (rate) => {
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/reviews?rating=${rate}`,
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
        setLoading(false)
        setSuccess(true)
        setFailure(false)
        dispatch(setTotalReviews(data))
      }
    } catch (err) {
      setLoading(false)
      setSuccess(false)
      setFailure(true)
    }
  }

  const indexOfLastPage = currentPagination * perPage
  const indexOfFirstPage = indexOfLastPage - perPage
  const currentPageList = allWorkspaces?.slice(
    indexOfFirstPage,
    indexOfLastPage
  )
  let totalPaginatePage = Math.ceil(reviewDatas?.data?.total / perPage)

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
      <Helmet>
        <title>Review</title>
        <meta name='description' content='' />
        <meta name='keywords' content=' ' />
      </Helmet>
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

      <div className='xl:w-[87%] lg:w-[84%] lg:ml-auto flex flex-col'>
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
          <div className='md:w-[80%] sm:w-[100%] h-[auto]'>
            <div className='xl:hidden lg:hidden md:hidden sm:flex sm:flex-row sm:items-center sm:gap-4 sm:my-2 '>
              {accountType === 'User' && (
                <Link to={'/expenses'}>
                  <h1 className={url.includes('/expenses') ? active : inActive}>
                    {t('Expenses')}
                  </h1>
                </Link>
              )}

              {accountType === 'Owner' && (
                <Link to={'/revenue'}>
                  <h1 className={url.includes('/revenue') ? active : inActive}>
                    {t('Revenue')}
                  </h1>
                </Link>
              )}

              {accountType === 'Owner' && (
                <Link to={'/revenue/transaction'}>
                  <p
                    className={url.includes('/transaction') ? active : inActive}
                  >
                    {t('Transactions')}
                  </p>
                </Link>
              )}

              {accountType === 'User' && (
                <Link to={'/expenses/transaction'}>
                  <p
                    className={url.includes('/transaction') ? active : inActive}
                  >
                    {t('Transactions')}
                  </p>
                </Link>
              )}

              {accountType === 'User' && (
                <Link to={'/expenses/visited-location'}>
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
                <Link to={'/revenue/reviews'}>
                  <p className={url.includes('/reviews') ? active : inActive}>
                    {t('Reviews')}
                  </p>
                </Link>
              )}

              {accountType === 'User' && (
                <Link to={'/expenses/reviews'}>
                  <p className={url.includes('/reviews') ? active : inActive}>
                    {t('Reviews')}
                  </p>
                </Link>
              )}
            </div>

            <div className='w-full'>
              <div className='flex justify-start items-center rounded bg-[#fff] w-fit'>
                <div
                  onClick={getUserReviews}
                  className='border p-[10px] font-[Plus Jakarta Display] rounded-tl rounded-bl font-400 text-[14px] text-[#2C292C]'
                >
                  All
                </div>
                <div
                  onClick={() => getRatingReviews(5)}
                  className='border p-[10px] font-[Plus Jakarta Display]  font-400 text-[14px] text-[#2C292C] flex justify-center items-center cursor-pointer'
                >
                  5
                  <svg
                    className='rate'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M11.9998 17.75L5.82784 20.995L7.00684 14.122L2.00684 9.255L8.90684 8.255L11.9928 2.002L15.0788 8.255L21.9788 9.255L16.9788 14.122L18.1578 20.995L11.9998 17.75Z'
                      fill='none'
                      stroke='#141115'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div
                  onClick={() => getRatingReviews(4)}
                  className='border p-[10px] font-[Plus Jakarta Display]  font-400 text-[14px] text-[#2C292C] flex justify-center items-center cursor-pointer'
                >
                  4
                  <svg
                    className='rate'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M11.9998 17.75L5.82784 20.995L7.00684 14.122L2.00684 9.255L8.90684 8.255L11.9928 2.002L15.0788 8.255L21.9788 9.255L16.9788 14.122L18.1578 20.995L11.9998 17.75Z'
                      fill='none'
                      stroke='#141115'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div
                  onClick={() => getRatingReviews(3)}
                  className='border p-[10px] font-[Plus Jakarta Display] font-400 text-[14px] text-[#2C292C] flex justify-center items-center cursor-pointer'
                >
                  3
                  <svg
                    className='rate'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M11.9998 17.75L5.82784 20.995L7.00684 14.122L2.00684 9.255L8.90684 8.255L11.9928 2.002L15.0788 8.255L21.9788 9.255L16.9788 14.122L18.1578 20.995L11.9998 17.75Z'
                      fill='none'
                      stroke='#141115'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div
                  onClick={() => getRatingReviews(2)}
                  className='border p-[10px] font-[Plus Jakarta Display]  font-400 text-[14px] text-[#2C292C] flex justify-center items-center cursor-pointer'
                >
                  2
                  <svg
                    className='rate'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M11.9998 17.75L5.82784 20.995L7.00684 14.122L2.00684 9.255L8.90684 8.255L11.9928 2.002L15.0788 8.255L21.9788 9.255L16.9788 14.122L18.1578 20.995L11.9998 17.75Z'
                      fill='none'
                      stroke='#141115'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div
                  onClick={() => getRatingReviews(1)}
                  className='border p-[10px] font-[Plus Jakarta Display] rounded-tr rounded-br font-400 text-[14px] text-[#2C292C] flex justify-center items-center cursor-pointer'
                >
                  1
                  <svg
                    className='rate'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M11.9998 17.75L5.82784 20.995L7.00684 14.122L2.00684 9.255L8.90684 8.255L11.9928 2.002L15.0788 8.255L21.9788 9.255L16.9788 14.122L18.1578 20.995L11.9998 17.75Z'
                      fill='none'
                      stroke='#141115'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </div>

              <div className='flex flex-row justify-start items-center space-x-3 sm:mt-[5px] md:mt-[10px]'>
                <div className='w-[252px] h-[100px] rounded-lg p-2 bg-white shadow-2fl '>
                  <span className='font-500 font-[Plus Jakarta Display] text-[16px] text-[#727073]'>
                    Overall Ratings
                  </span>
                  <div className='flex flex-row justify-start items-center gap-2 my-2'>
                    <svg
                      className='star w-[26.63px] h-[25.32px]'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='#F9DC5C'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M11.9998 17.75L5.82784 20.995L7.00684 14.122L2.00684 9.255L8.90684 8.255L11.9928 2.002L15.0788 8.255L21.9788 9.255L16.9788 14.122L18.1578 20.995L11.9998 17.75Z'
                        stroke='#F9DC5C'
                        fill='#F9DC5C'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <div className='font-700 font-[Plus Jakarta Display] text-[24px] text-[#14115]'>
                      {/* <TotalRating rating={data.reviews} /> */} ---
                    </div>
                  </div>
                </div>

                <div className='download w-[252px] h-[100px] bg-[#fff] flex flex-col p-2 rounded-lg'>
                  <span className='font-500 font-[Plus Jakarta Display] text-[16px] text-[#727073]'>
                    Total Review
                  </span>
                  <div className='flex items-center justify-start gap-2'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4.58 16.59L4 17.17V4H20V16ZM10.5 14H18V12H12.5L10.5 14ZM14.36 8.13C14.56 7.93 14.56 7.62 14.36 7.42L12.59 5.65C12.39 5.45 12.08 5.45 11.88 5.65L6 11.53V14H8.47L14.36 8.13Z'
                        fill='#E034E8'
                        stroke='#E034E8'
                      />
                    </svg>
                    <div className='font-700 font-[Plus Jakarta Display] text-[24px] text-[#14115]'>
                      {!allWorkspaces?.length > 0
                        ? '---'
                        : allWorkspaces?.length}
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full mt-[10px]'>
                {allWorkspaces?.length < 1 && (
                  <div className='w-full bg-[#fff] px-[10px] py-[20px] rounded download font-500 font-[Plus Jakarta Display] text-[18px] text-[#2C292C]'>
                    No Review Yet
                  </div>
                )}
                <div>
                  {currentPageList?.reverse().map((rev, index) => (
                    <Review key={index} {...rev} />
                  ))}
                </div>
              </div>

              <div className='w-full bg-[#fff] md:p-[10px] sm:p-[5px] md:mt-[10px] sm:mt-[5px] flex justify-end items-center'>
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
  )
}

export default Reviews
