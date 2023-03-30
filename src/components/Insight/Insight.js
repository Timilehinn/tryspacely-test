import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

import useCookieHandler from '../../hooks/useCookieHandler'
import {
  setTransactionDetails,
  setTotalAmount,
  setChartData,
} from '../../slices/insightSlice'
import Loader from '../Loader/Loader'
import Chart from './Chart'

import './extra-styles.css'
import DashboardHeader from '../Layout/Header'

const Insight = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const url = window.location.href
  const dispatch = useDispatch()
  const [active, setActive] = useState('text-[#0559FD]')
  const [inActive, setInActive] = useState('text-[#434144]')

  const { token } = useCookieHandler('user_token')
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [successLoad, setSuccessLoad] = useState(false)
  const [failure, setFailure] = useState(false)
  const [blockStateChange, setBlockStateChange] = useState(false)
  const [chosenData, setChosenData] = useState([])
  const [accountType, setAccountType] = useState(null)

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

      setAccountType(data?.data?.account_type[0]?.user_type.type)
    } catch (error) {}
  }

  useEffect(() => {
    exchangeTokenForId()
  }, [token])

  const getUserDetails = async () => {
    if (accountType === 'Admin') {
      return
    }
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/transactions`,
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
        setSuccessLoad(true)
        setFailure(false)
        dispatch(setTransactionDetails(data))
      }
    } catch (err) {
      setLoading(false)
      setSuccessLoad(false)
      setFailure(true)
    }
  }

  //fetch chart data function
  const getChartDetails = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/insights`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()

      if (data?.status === true) {
        dispatch(setChartData(data?.data))
        return
      }

      if (res.status === 500) {
        navigate('/500')
      } else if (res.status === 400) {
        navigate('/400')
      }
    } catch (err) {}
  }

  useEffect(() => {
    if (!token) return
    getUserDetails()
    getChartDetails()
  }, [token])

  //selector for datas in redux
  const transactions = useSelector(
    (state) => state?.insight?.transactionsDetails
  )
  const totalAmount = useSelector((state) => state?.insight?.totalAmount)

  const chartHistory = useSelector((state) => state.insight.chartData)

  let date = new Date()

  const currentYear = moment(date).format('YYYY')
  const currentMonth = moment(date).format('MMM')

  if (!blockStateChange && chartHistory?.length > 0) {
    setChosenData(chartHistory?.filter((h) => h.year === Number(currentYear)))
    setBlockStateChange(true)
  }

  const amountPaid = transactions?.data?.data?.map((t, i) =>
    Math.round(t?.amount_paid)
  )
  if (amountPaid?.length > 0) {
    let money = amountPaid?.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue
    })

    dispatch(setTotalAmount(money))
  }

  const chosenHandler = (y) => {
    setChosenData(chartHistory?.filter((h) => h.year === Number(y)))
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
      <Helmet>
        <title>Insight</title>
        {/*<meta name="description" content="Share your workspace and unlock new experiences and network while you make money"/>*/}
        {/*<meta name="keywords" content="Monetize Your Workspace, Ready to start making money?, Earn Money, Get Workspace Bookings "/>*/}
      </Helmet>
      <Loader
        failure={failure} //if your api or state fails and page should not show
        successful={successLoad} // if the api or state is successful
        isLoading={loading} // if your api or state is still fetching
        redirectTo={
          accountType === 'Owner' ? '/dashboard/revenue' : '/dashboard/expenses'
        }
      />

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
        <div className='w-full h-auto p-[20px] bg-[#FCFCFC]'>
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
              <div className='flex sm:w-fit md:w-[25%] flex-col sm:px-[10px] sm:py-[15px] md:px-[20px] md:py-[30px] bg-[#fff] rounded download'>
                {accountType === 'User' && (
                  <div className='font-500 md:text-[14px] sm:text-[12px] font-[Plus Jarkarta Display] text-[#727073]'>
                    Total Expenses
                  </div>
                )}

                {accountType === 'Owner' && (
                  <div className='font-500 md:text-[14px] sm:text-[12px] font-[Plus Jarkarta Display] text-[#727073]'>
                    Total Revenue
                  </div>
                )}

                <div className='flex space-x-2 md:mt-[10px] sm:mt-[5px]'>
                  <span className='text-[#727073] md:text-[32px] sm:text-[20px]'>
                    &#8358;
                  </span>
                  <span className='text-[#141115] font-700 md:text-[32px] sm:text-[20px] font-[Plus Jarkarta Display]'>
                    {totalAmount}
                  </span>
                </div>
              </div>
              <div className='sm:w-[100%] bg-[#fff] rounded md:p-[10px] sm:p-[5px] md:mt-[20px] sm:mt-[10px] download'>
                <div className='flex justify-end items-center'>
                  <div className='download md:p-[10px] sm:p-[5px] cursor-pointer'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M4 17V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V17'
                        stroke='#141115'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M7 11L12 16L17 11'
                        stroke='#141115'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M12 4V16'
                        stroke='#141115'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>
                {chosenData?.length >= 1 && (
                  <div className='max-w-full max-h-[400px] md:mt-[10px] sm:mt-[5px]'>
                    <div className='max-w-[100%] max-h-[400px] box-border'>
                      <Chart
                        chosenData={chosenData}
                        setChosenData={setChosenData}
                        currentMonth={currentMonth}
                        chartHistory={chartHistory}
                      />
                    </div>
                  </div>
                )}
                {chosenData?.length < 1 && (
                  <div className='w-full h-[400px] mt-[10px] z-10'>
                    <div className='w-full h-[100%] flex flex-col justify-center items-center'>
                      <div>
                        <svg
                          className='analytics'
                          width='200'
                          height='135'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M16.125 13.125L20.25 9'
                            stroke='#141115'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M10.875 10.125L13.875 13.125'
                            stroke='#141115'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M3.75 15L8.625 10.125'
                            stroke='#141115'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M21.375 9C21.9963 9 22.5 8.49632 22.5 7.875C22.5 7.25368 21.9963 6.75 21.375 6.75C20.7537 6.75 20.25 7.25368 20.25 7.875C20.25 8.49632 20.7537 9 21.375 9Z'
                            stroke='#141115'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M15 15.375C15.6213 15.375 16.125 14.8713 16.125 14.25C16.125 13.6287 15.6213 13.125 15 13.125C14.3787 13.125 13.875 13.6287 13.875 14.25C13.875 14.8713 14.3787 15.375 15 15.375Z'
                            stroke='#141115'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M9.75 10.125C10.3713 10.125 10.875 9.62132 10.875 9C10.875 8.37868 10.3713 7.875 9.75 7.875C9.12868 7.875 8.625 8.37868 8.625 9C8.625 9.62132 9.12868 10.125 9.75 10.125Z'
                            stroke='#141115'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M2.625 17.25C3.24632 17.25 3.75 16.7463 3.75 16.125C3.75 15.5037 3.24632 15 2.625 15C2.00368 15 1.5 15.5037 1.5 16.125C1.5 16.7463 2.00368 17.25 2.625 17.25Z'
                            stroke='#141115'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </div>
                      <div className='font-500 md:text-[18px] sm:text-[14px] md:mt-[10px] sm:mt-[5px] font-[Plus Jarkarta Display] text-[#2C292C] text-center'>
                        No Expenses During Selected Date Range
                      </div>
                      <div className='font-300 md:text-[16px] sm:text-[12px] md:mt-[10px] sm:mt-[5px] font-[Plus Jarkarta Display] text-[#434144] text-center'>
                        Please search for a different data range
                      </div>
                    </div>
                  </div>
                )}
                <div className='flex justify-between items-center md:mt-[20px] sm:mt-[10px]'>
                  <div className='flex space-x-3 items-center justify-start'>
                    <svg
                      onClick={() => chosenHandler(2021)}
                      className='w-[20px] h-[20px] cursor-pointer'
                      width='24'
                      height='24'
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
                    <span className=' text-[#141115] md:text-[14px] sm:text-[12px] font-400 font-[Plus Jarkarta Display]'>
                      2021
                    </span>
                  </div>
                  <span
                    onClick={() => chosenHandler(2022)}
                    className=' text-[#141115] md:text-[14px] sm:text-[12px] font-400 font-[Plus Jarkarta Display] cursor-pointer'
                  >
                    2022
                  </span>
                  <div className='flex space-x-3 items-center justify-start'>
                    <span className=' text-[#141115] md:text-[14px] sm;text-[12px] font-400 font-[Plus Jarkarta Display]'>
                      2023
                    </span>
                    <svg
                      onClick={() => chosenHandler(2023)}
                      className='w-[20px] h-[20px] cursor-pointer'
                      width='24'
                      height='24'
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-[30px] w-fit'>
            {accountType === 'Owner' && (
              <Link to={'/dashboard/revenue/transaction'}>
                <span className='font-400 text-[18px] font-[Plus Jarkarta Display] text-[#0559FD] cursor-pointer pl-[10px] mb-[0]'>
                  View Transactions History
                </span>
              </Link>
            )}

            {accountType === 'User' && (
              <Link to={'/dashboard/expenses/transaction'}>
                <span className='font-400 text-[18px] font-[Plus Jarkarta Display] text-[#0559FD] cursor-pointer pl-[10px] mb-[0]'>
                  View Transactions History
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Insight
