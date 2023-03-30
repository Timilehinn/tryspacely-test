import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'

import DashboardHeader from '../Layout/Header'
import { useCookieHandler } from '../../hooks'
import Users from './users'
import {
  setAllPeople,
  setError,
  setFilterToggle,
  setTotalPeople,
} from '../../slices/admin_user'
import Loader from '../Loader/Loader'
import WorkspacePagination from '../Bookings/BookingsUI/workspacePagination'

const AdminUsers = () => {
  const ref = useRef()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)
  const [isSuccess, setIsSucess] = useState(false)
  const [filterType, setFilterType] = useState('')
  const [currentPagination, setCurrentPagination] = useState(1)

  const account_type = ['Select account type', 'Owner', 'User']

  const { token } = useCookieHandler('user_token')

  const filterToggle = useSelector((state) => state.adminPeople.filterToggle)
  const allUsers = useSelector((state) => state.adminPeople.allPeople)

  const fetchAdminPeople = async (index) => {
    if (!token) {
      return
    }
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/people/all?page=${index}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token} `,
          },
        }
      )
      const data = await res.json()
      dispatch(setAllPeople(data?.data))
      dispatch(setTotalPeople(data?.data.total))
      setIsSucess(true)
      setIsFailure(false)
      setLoading(false)

      if (data?.status !== true) {
        setIsSucess(false)
        setIsFailure(true)
        setLoading(false)
        dispatch(setError(data?.errors))
      }
    } catch (error) {
      setIsSucess(false)
      setIsFailure(true)
      setLoading(false)
    }
  }

  const filterPeopleByTypes = async () => {
    if (!token) {
      return
    }
    setLoading(true)
    // setFilterOptions(false)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/people/all?type=${filterType}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      dispatch(setAllPeople(data?.data))
      dispatch(setTotalPeople(data?.data.total))
      setIsSucess(true)
      setIsFailure(false)
      setLoading(false)

      if (data?.status !== true) {
        setIsSucess(false)
        setIsFailure(true)
        setLoading(false)
        dispatch(setError(data?.errors))
      }
    } catch (err) {
      setIsSucess(false)
      setIsFailure(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminPeople(currentPagination)
  }, [token, currentPagination])

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (filterToggle && ref.current && !ref.current.contains(e.target)) {
        dispatch(setFilterToggle(false))
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [filterToggle])

  const PER_PAGE = 50
  const offset = currentPagination * PER_PAGE
  const currentPageList = allUsers?.data?.slice(offset, offset + PER_PAGE)
  const pageCount = Math.ceil(allUsers.total / PER_PAGE)

  const handlePageClick = (selected) => {
    setCurrentPagination(selected)
  }

  return (
    <>
      <Loader
        failure={isFailure} //if your api or state fails and page should not show
        successful={isSuccess} //if the api or state is successful
        isLoading={loading} //if your api or state is still fetching
      />

      <section className='xl:w-[87%] lg:w-[84%] md:w-[100%] sm:w-[100%] ml-auto'>
        <DashboardHeader
          icon={
            'https://trybookings-assets.s3.eu-west-2.amazonaws.com/People.svg'
          }
          title='Users'
        />
        <Users />

        <WorkspacePagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
          currentPageList={currentPageList}
          pageRangeDisplay='5'
        />

        {filterToggle === true && (
          <>
            <div className='overlay lg:block md:hidden sm:hidden'></div>
            <article
              ref={ref}
              className='h-screen shadow-2fl lg:w-[400px] absolute lg:top-0 lg:right-0 lg:fixed md:w-[100%] md:top-0 md:right-0 md:absolute md:p-5 sm:w-[100%] 
              sm:top-0 sm:right-0 sm:p-5 sm:absolute flex flex-col gap-4 lg:p-3 z-10 bg-white '
            >
              <Formik>
                <Form className='mt-5 flex flex-col w-full'>
                  <label htmlFor='type' className='font-bold'>
                    {' '}
                    Account Type:{' '}
                  </label>
                  <Field
                    as='select'
                    name='type'
                    onChange={(e) => setFilterType(e.target.value)}
                    className='w-[100%] h-[40px] border-0 border-gray-300  border-b-2 my-2 outline-none '
                  >
                    {account_type.map((data, index) => {
                      return (
                        <option key={index} value={data}>
                          {' '}
                          {data}{' '}
                        </option>
                      )
                    })}
                  </Field>
                </Form>
              </Formik>

              <button
                onClick={filterPeopleByTypes}
                className='bg-[#0559FD] w-full rounded-md h-[35px] hover:bg-black text-white my-2 '
              >
                {' '}
                Apply{' '}
              </button>
            </article>
          </>
        )}
      </section>
    </>
  )
}

export default AdminUsers
