import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import useCookieHandler from '../../hooks/useCookieHandler'
import { setUserBookings } from '../../slices/userBookingsSlice'
import InsightPagination from '../Insight/InsightPagination'
import Loader from '../Loader/Loader'
import useLimitedRoute from '../../hooks/useLimitedRoute'
import CustomAlert from '../CustomComponents/CustomAlert'
import UserBookings from './UserBookingDashboard/ListFormBookings'
import { toast } from 'react-toastify'
import DashboardHeader from '../Layout/Header'
import { useNavigate } from 'react-router-dom'

const UserBookingDashboard = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { token } = useCookieHandler('user_token')
  const { success, errorAuth, loadingfinished } = useLimitedRoute('User')
  const [currentPagination, setCurrentPagination] = useState(1)
  const [perPage, setPerPage] = useState(50)
  const [loading, setLoading] = useState(false)
  const [successLoad, setSuccessLoad] = useState(false)
  const [failure, setFailure] = useState(false)
  const [blocker, setBlocker] = useState(false)
  const [allDatas, setAllDatas] = useState(null)
  const [alertWatcher, setAlertWatcher] = useState({
    statement: '',
    value: false,
  })

  //funtion to get user bookings
  const getUserBookings = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/bookings`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()

      if (data?.status === true) {
        dispatch(setUserBookings(data))
        setLoading(false)
        setSuccessLoad(true)
        setFailure(false)
      }

      if (res.status === 500) {
        navigate('/500')
      } else if (res.status === 400) {
        navigate('/400')
      }
    } catch (err) {
      setLoading(false)
      setSuccessLoad(false)
      setFailure(true)
    }
  }

  useEffect(() => {
    if (!token) return
    getUserBookings()
  }, [token])

  //function for cancelling boooking
  const deleteBookings = async (id) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/bookings/${id}/reject`,
        {
          method: 'POST',

          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      console.log(data, 'deleting booking info')
      toast.success('Your booking has been cancelled successfully')
      setTimeout(() => window.location.reload(), 250)
      // if (data?.status === true) {
      //   setDel(false)
      //   setDelSuccess(true)
      // }

      if (data?.status === false) {
        toast.error(data?.errors.message)
      }
    } catch (err) {}
  }

  const userBookings = useSelector(
    (state) => state.userBookings.userBookings.data?.data
  )

  const userBookingsData = useSelector(
    (state) => state.userBookings.userBookings
  )

  if (!blocker && userBookings?.length > 0) {
    setAllDatas(userBookings)
    setBlocker(true)
  }

  const indexOfLastPage = currentPagination * perPage
  const indexOfFirstPage = indexOfLastPage - perPage
  const currentPageList = allDatas?.slice(indexOfFirstPage, indexOfLastPage)
  let totalPaginatePage = Math.ceil(userBookingsData?.data?.total / perPage)

  return (
    <>
      {alertWatcher?.value && (
        <CustomAlert watcher={alertWatcher} setWatcher={setAlertWatcher} />
      )}
      <div className='flex '>
        <Loader
          errorAuth={errorAuth}
          success={success}
          loadingfinished={loadingfinished}
          failure={failure} //if your api or state fails and page should not show
          successful={successLoad} // if the api or state is successful
          isLoading={loading} // if your api or state is still fetching
          redirectTo={'/dashboard/user/bookings'}
        />
        <div className='flex flex-col xl:w-[87%] lg:w-[84%] md:w-[100%] sm:w-[100%] ml-auto'>
          <DashboardHeader
            icon={
              'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Bookings.svg'
            }
            title='Bookings'
          />
          <div className='flex flex-col'>
            <UserBookings
              bookings={userBookings}
              deleteBookings={deleteBookings}
            />
            <InsightPagination
              pageCount={currentPagination}
              // handlePageClick={handlePageClick}
              currentPageList={currentPageList}
              // pageRangeDisplay='5'
              currentPagination={currentPagination}
              setCurrentPagination={setCurrentPagination}
              totalPaginatePage={totalPaginatePage}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBookingDashboard
