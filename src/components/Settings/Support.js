import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookieHandler } from '../../hooks'
import { setActivites } from '../../slices/accountActivitiesSlice'
import WorkspacePagination from '../Bookings/BookingsUI/workspacePagination'
import dataJson from './activity.json'

const AccountActivities = () => {
  const dispatch = useDispatch()
  const { token } = useCookieHandler('user_token')
  const [loadings, setLoadings] = useState(true)
  const [failure, setFailure] = useState(false)
  const [onSuccess, setOnSuccess] = useState(false)
  const [currentPagination, setCurrentPagination] = useState(1)

  const data = useSelector((state) => state.activity.activities)

  const getActivities = async (index) => {
    if (!token) {
      return
    }
    setLoadings(true)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/login/activities?page=${index}`,
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
        dispatch(setActivites(data?.data))
        setLoadings(false)
        setFailure(false)
        setOnSuccess(true)
      }

      if (data?.status === false) {
        setLoadings(false)
        setFailure(true)
        setOnSuccess(false)
      }
    } catch (error) {
      setLoadings(false)
      setFailure(false)
      setOnSuccess(true)
    }
  }

  useEffect(() => {
    getActivities(currentPagination)
  }, [token, currentPagination])

  const PER_PAGE = 50
  const offset = currentPagination * PER_PAGE
  const currentPageList = data?.data?.slice(offset, offset + PER_PAGE)
  const pageCount = Math.ceil(data.total / PER_PAGE)

  const handlePageClick = (selected) => {
    setCurrentPagination(selected)
  }

  return (
    <main className='xl:px-10 lg:w-[100%] md:w-[100%] md:px-5 sm:w-[100%] sm:px-5 my-8 '>
      <section className='flex flex-row justify-between items-start py-3 px-5 lg:gap-5 '>
        <span className='lg:w-[10%] md:w-[10%] sm:w-[30%] font-bold '>
          {' '}
          Device{' '}
        </span>
        <span className='lg:w-[10%] lg:flex md:w-[10%] md:hidden sm:hidden font-bold'>
          {' '}
          Browser{' '}
        </span>
        <span className='lg:w-[25%] lg:flex md:w-[25%] md:flex sm:hidden font-bold'>
          {' '}
          Date & Time{' '}
        </span>
        <span className='lg:w-[10%] lg:flex md:w-[10%] md:hidden sm:hidden font-bold'>
          {' '}
          Platform{' '}
        </span>
        <span className='lg:w-[10%] md:w-[10%] sm:w-[30%] font-bold'>
          {' '}
          Ip address{' '}
        </span>
        <span className='lg:w-[25%] md:w-[25%] sm:w-[30%] font-bold'>
          {' '}
          User Activity{' '}
        </span>
      </section>

      <section className='flex flex-col justify-start items-start lg:gap-2 w-full '>
        {data.data?.map((activity, index) => {
          return (
            <div className='flex flex-row justify-between items-center shadow-2fl rounded-md lg:gap-5 p-5 w-[100%]  '>
              <span className='lg:w-[10%] md:w-[10%] sm:w-[30%]'>
                {' '}
                {activity.device}{' '}
              </span>
              <span className='lg:w-[10%] lg:flex md:w-[10%] md:hidden sm:hidden sm:w-[30%]'>
                {' '}
                {activity.browser}{' '}
              </span>
              <span className='lg:w-[25%] lg:flex md:w-[25%] md:flex sm:hidden sm:w-[30%]'>
                {' '}
                {moment(activity.created_at).format('LLL')}{' '}
              </span>
              <span className='lg:w-[10%] lg:flex md:w-[10%] md:hidden sm:hidden sm:w-[30%]'>
                {' '}
                {activity.platform}{' '}
              </span>
              <span className='lg:w-[10%] md:w-[10%] sm:w-[30%]'>
                {' '}
                {activity.ip_address}{' '}
              </span>
              <span className='lg:w-[25%] md:w-[25%] sm:w-[30%]'>
                {' '}
                {activity.user_activity}{' '}
              </span>
            </div>
          )
        })}
      </section>
      {/* <table className='table-fixed lg:w-[100%] md:w-[100%] sm:w-[100%]'>
        <thead className=' '>
          <tr className='text-left'>
            <th className='lg:px-6 lg:py-3 md:px-4 md:py-3 sm:px-3 sm:py-3'>
              {' '}
              Device{' '}
            </th>
            <th className='lg:px-6 lg:py-3 lg:flex lg:flex-row  md:px-4 md:py-3  sm:px-3 sm:py-3 sm:hidden'>
              {' '}
              Browser{' '}
            </th>
            <th className='lg:px-6 lg:py-3 lg:flex lg:flex-row  md:px-4 md:py-3  sm:px-3 sm:py-3 sm:hidden'>
              {' '}
              Date & Time{' '}
            </th>
            <th className='lg:px-6 lg:py-3 lg:flex lg:flex-row  md:px-4 md:py-3  sm:px-3 sm:py-3 sm:hidden'>
              {' '}
              Platform{' '}
            </th>
            <th className='lg:px-6 lg:py-3 md:px-4 md:py-3 sm:px-3 sm:py-3'>
              {' '}
              Ip address{' '}
            </th>
            <th className='lg:px-6 lg:py-3 md:px-4 md:py-3 sm:px-3 sm:py-3'>
              {' '}
              User activity{' '}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data?.map((activity, index) => {
            return (
              <tr key={activity.id} className='shadow-2fl rounded-lg my-3 px-2'>
                <td className='lg:px-6 lg:py-3 md:px-4 md:py-3 sm:px-3 sm:py-3 '>
                  {' '}
                  {activity.device}{' '}
                </td>
                <td className='lg:px-6 lg:py-3  md:px-4 md:py-3  sm:px-3 sm:py-3 sm:hidden '>
                  {' '}
                  {activity.browser}{' '}
                </td>
                <td className='lg:px-6 lg:py-3  md:px-4 md:py-3  sm:px-3 sm:py-3 sm:hidden '>
                  {' '}
                  {moment(activity.created_at).format('LLL')}{' '}
                </td>
                <td className='lg:px-6 lg:py-3  md:px-4 md:py-3  sm:px-3 sm:py-3 sm:hidden '>
                  {' '}
                  {activity.platform}{' '}
                </td>
                <td className='lg:px-6 lg:py-3 md:px-4 md:py-3 sm:px-3 sm:py-3 '>
                  {' '}
                  {activity.ip_address}{' '}
                </td>
                <td className='lg:px-6 lg:py-3 md:px-4 md:py-3 sm:px-3 sm:py-3 '>
                  {' '}
                  {activity.user_activity}{' '}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table> */}

      <WorkspacePagination
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        currentPageList={currentPageList}
        pageRangeDisplay='5'
      />
    </main>
  )
}

export default AccountActivities
