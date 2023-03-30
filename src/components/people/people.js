import React, { useEffect, useState } from 'react'
import useCookieHandler from '../../hooks/useCookieHandler'
import useLimitedRoute from '../../hooks/useLimitedRoute'
import { Helmet } from 'react-helmet'

import People_Pagination from './peopleUI/pagination'
import People_Body from './peopleUI/people_body'
import DashboardHeader from '../Layout/Header'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'

const People = () => {
  const navigate = useNavigate()
  const { token } = useCookieHandler('user_token')
  const { success, errorAuth, loadingfinished } = useLimitedRoute('Owner')
  const [currentPagination, setCurrentPagination] = useState(1)
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState('')
  const [isSuccess, setisSuccess] = useState(false)
  const [failure, setFailure] = useState(false)

  // Pagination
  const PER_PAGE = 50
  const offset = currentPagination * PER_PAGE
  const currentPageList = people.data?.slice(offset, offset + PER_PAGE)
  const pageCount = Math.ceil(people?.total / PER_PAGE)

  const fetchPeopleData = async (index) => {
    if (!token) return
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/people?page=${index}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      setPeople(data.data)
      setLoading(false)
      setisSuccess(true)
      setFailure(false)

      if (data?.status !== true) {
        setisSuccess(false)
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
      setisSuccess(false)
      setFailure(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPeopleData(currentPagination)
  }, [token, currentPagination])

  // Handle page click function
  const handlePageClick = (selected) => {
    setCurrentPagination(selected)
  }

  return (
    <main className='lg:w-full lg:h-full lg:flex lg:flex-row'>
      <Helmet>
        <title>People</title>
        <meta name='description' content='' />
        <meta name='keywords' content=' ' />
      </Helmet>

      <Loader
        failure={failure}
        isLoading={loading}
        successful={isSuccess}
        errorAuth={errorAuth}
        success={success}
        loadingfinished={loadingfinished}
      />
      <div className='xl:w-[87%] lg:w-[84%] md:w-[100%] sm:w-[100%] ml-auto'>
        <DashboardHeader
          icon={
            'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Workspacesblue.svg'
          }
          title='People'
        />
        <People_Body people={people} />
        <People_Pagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
          currentPageList={currentPageList}
          pageRangeDisplay='5'
        />
      </div>
    </main>
  )
}

export default People
