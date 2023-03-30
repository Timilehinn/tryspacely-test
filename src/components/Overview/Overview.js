import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import Prices from './OverviewUI/Prices'
import OverviewFeedbacks from './OverviewUI/OverviewFeedbacks'
import OverviewBookings from './OverviewUI/OverviewBookings'
import OverviewGraph from './OverviewUI/OverviewGraph'
import useCookieHandler from '../../hooks/useCookieHandler'
import DashboardHeader from '../Layout/Header'
import useProtectedRoute from '../../hooks/useProtectedRoute'
import Loader from '../Loader/Loader'
import { setTotalAmount } from '../../slices/insightSlice'

const Overview = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useCookieHandler('user_token')
  const { success, errorAuth, loadingfinished } = useProtectedRoute(
    'user_token',
    true
  )

  const [accountType, setAccountType] = useState(null)
  const [user, setUser] = useState([])
  const [dashboard, setDashboard] = useState([])
  const [insight, setInsight] = useState([])
  const [bookings, setBookings] = useState([])
  const [workspace, setWorkspace] = useState([])
  const [loading, setLoading] = useState(false)
  const [failure, setFailure] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [blockStateChange, setBlockStateChange] = useState(false)
  const [chosenData, setChosenData] = useState([])

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

      setAccountType(data?.data?.account_type[0]?.user_type.type)
      setUser(userToFIll)
    } catch (error) {}
  }

  const fetchDashboard = async () => {
    if (!token) return
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user-dashboard`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      setDashboard(data.data)
      setLoading(false)
      setIsSuccess(true)
      setFailure(false)

      if (data?.status !== true) {
        setIsSuccess(false)
        setFailure(true)
        setLoading(false)
        return
      }

      if (response.status === 500) {
        navigate('/500')
      } else if (response.status === 400) {
        navigate('/400')
      }
    } catch (error) {
      setIsError(error.errors)
    }
  }

  const fetchBookings = async () => {
    if (!token) return
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/bookings`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      setLoading(false)
      setBookings(data.data.data)

      if (data?.status !== 400) {
        throw Error('There is an error fethcing bookings')
      }
    } catch (err) {}
  }

  const fetchWorkspace = async () => {
    if (!token) {
      return
    }
    if (!accountType) {
      return
    }
    if (accountType === 'Owner') {
      return
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/workspaces/most-visited`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      setLoading(false)
      setWorkspace(data.data.data)
    } catch (error) {}
  }

  useEffect(() => {
    if (accountType && accountType === 'Sales') return
    exchangeTokenForId()
  }, [token, accountType])

  useEffect(() => {
    if (accountType && accountType !== 'Admin') {
      fetchBookings()
      fetchDashboard()
      fetchWorkspace()
    }
  }, [token, accountType])

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

  return (
    <>
      <Helmet>
        <title>Dashboard Overview</title>
        <meta
          name='description'
          content="Contain activities and logs of user's transactions and bookings"
        />
        <meta
          name='keywords'
          content='Bookings, Total Revenue, Total Workspace, Total Bookings, Total Reviews, Recent Activities, Inbox, Revenue'
        />
      </Helmet>

      <div className='flex h-auto'>
        <Loader
          isLoading={loading}
          failure={failure}
          errorAuth={errorAuth}
          successful={isSuccess}
          success={success}
          loadingfinished={loadingfinished}
        />

        <div className='flex flex-col xl:w-[87%] lg:w-[84%] md:w-[100%] sm:w-[100%] ml-auto'>
          <DashboardHeader
            icon={
              'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Home-icon.svg'
            }
            title='Dashboard'
          />
          <div className='flex flex-col w-full py-4'>
            <Prices dashboard={dashboard} accountType={accountType} />
            <div
              className='lg:grid lg:grid-cols-3 lg:gap-3 lg:content-center lg:mx-5 md:grid md:grid-cols-1 md:gap-3 md:mx-5
          md:content-center sm:grid sm:grid-cols-1 sm:gap-3 sm:content-center sm:mx-5 '
            >
              <OverviewGraph
                insight={insight}
                accountType={accountType}
                chosenData={chosenData}
                setChosenData={setChosenData}
                currentMonth={currentMonth}
                chartHistory={chartHistory}
                chosenHandler={chosenHandler}
                dashboard={dashboard}
              />
              <OverviewBookings bookings={bookings} />
            </div>
            <div
              className='lg:grid lg:grid-cols-1 lg:gap-3 lg:content-center lg:mx-5 md:grid md:grid-cols-1 md:content-center
          md:mx-5 md:gap-2 sm:grid sm:grid-cols-1 sm:content-center sm:mx-5 sm:gap-2 '
            >
              <OverviewFeedbacks
                user={user}
                workspace={workspace}
                accountType={accountType}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Overview
