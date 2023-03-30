import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import useCookieHandler from '../../../hooks/useCookieHandler'
import { useSelector } from 'react-redux'

const Workspace_Review = ({ data, publish, publishBtn, prev }) => {
  const { t } = useTranslation()
  const { token } = useCookieHandler('user_token')
  const [user, setUser] = useState([])
  const [address, setAddress] = useState([])

  const errors = useSelector((state) => state.createWorkspace.error)
  const status = useSelector((state) => state.createWorkspace.status)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('address'))
    if (items) {
      setAddress(items)
    }
  }, [])

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
        account_type: data?.data?.account_type.toString(),
        github: data?.data?.github,
        profile_url: data?.data?.profile_url,
      }

      setUser(userToFIll)
    } catch (error) {}
  }

  useEffect(() => {
    exchangeTokenForId()
  }, [token])

  const result = []
  Object.values(errors).forEach((err) => {
    result.push(err[0])
  })

  return (
    <main className='lg:py-10 lg:px-10 lg:h-auto lg:w-[550px] md:py-10 md:px-10 md:h-auto md:w-full sm:w-full sm:py-5 sm:px-5 sm:h-auto'>
      <section className='shadow-2fl bg-white rounded-2xl space-y-2'>
        <img
          src={data.photos[0]}
          alt='Cover photo'
          placeholder='Cover photo'
          className='rounded-t-md w-full h-[220px]'
        />

        <div className='px-5 pb-5'>
          <div className='flex flex-col gap-2 py-1'>
            <span className='text-2xl capitalize font-medium'>
              {' '}
              {data.name}{' '}
            </span>

            <span className='text-[14px] text-[#AAAAAA] '>
              {' '}
              Workspace name | Created {format(new Date(), 'dd/MM/yyyy')}
            </span>
          </div>

          <hr />

          <div
            className='lg:flex lg:flex-row lg:justify-between lg:items-center md:flex md:flex-row md:justify-between md:items-center sm:flex sm:flex-col 
          sm:justify-start py-2'
          >
            <div className='lg:flex lg:gap-4 lg:items-center lg:justify-start md:flex md:gap-3 md:items-center sm:flex sm:gap-4 sm:items-center'>
              <img
                src={
                  user.profile_url !== null ? user.profile_url : 'men_dark.png'
                }
                alt='Profile photo'
                className='w-[40px] h-[40px] rounded-full'
              />
              <div className='flex flex-col'>
                <span className='text-1xl'>
                  {' '}
                  {user.first_name} {user.last_name}{' '}
                </span>
                <span className='text-[#AAAAAA]'> {t('Workspace Owner')} </span>
              </div>
            </div>

            <span className='lg:py-0 md:py-0 sm:py-4 text-[18px]'>
              {' '}
              ₦ {data.price}/hour{' '}
            </span>
          </div>

          <hr />

          <div
            className='lg:flex lg:flex-row lg:justify-between lg:gap-4 md:flex md:flex-row md:justify-between sm:flex sm:flex-row sm:justify-between 
          sm:items-center py-3'
          >
            <span className='flex flex-row justify-start gap-2'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                className='fill-[#0559FD]'
              >
                <path
                  d='M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z'
                  stroke='#0559FD'
                  strokeWidth='0'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='fill-[#0559FD]'
                />
                <path
                  d='M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21'
                  stroke='#0559FD'
                  strokeWidth='0'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              {data.available_space} user
            </span>

            <span className='flex flex-row justify-start gap-2 text-[18px]'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
                  stroke='#141115'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 7V12L15 15'
                  stroke='#141115'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              2hrs
            </span>
          </div>

          <hr />

          <div className='w-full flex flex-col gap-2 py-1'>
            <span className='flex flex-row item-center gap-2 text-[18px]'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M17.657 16.657L13.414 20.9C13.039 21.2746 12.5306 21.4851 12.0005 21.4851C11.4704 21.4851 10.962 21.2746 10.587 20.9L6.343 16.657C5.22422 15.5382 4.46234 14.1127 4.15369 12.5609C3.84504 11.009 4.00349 9.40051 4.60901 7.93873C5.21452 6.47694 6.2399 5.22754 7.55548 4.3485C8.87107 3.46947 10.4178 3.00029 12 3.00029C13.5822 3.00029 15.1289 3.46947 16.4445 4.3485C17.7601 5.22754 18.7855 6.47694 19.391 7.93873C19.9965 9.40051 20.155 11.009 19.8463 12.5609C19.5377 14.1127 18.7758 15.5382 17.657 16.657V16.657Z'
                  stroke='#ED254E'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z'
                  stroke='#ED254E'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              Location
            </span>

            <span> {address} </span>
          </div>
        </div>
      </section>

      {status === false &&
        result.map((err, index) => {
          return (
            <ul key={index} className='px-10 py-1 list-disc'>
              <li className='text-sm font-normal text-red-500'> {err} </li>
            </ul>
          )
        })}

      <footer className='flex justify-between items-center lg:pt-8 md:pt-8 sm:pt-5'>
        <button className='bg-transparent border-0' onClick={() => prev(data)}>
          {t('Back')}
        </button>

        <button
          onClick={() => publish()}
          className='h-[56px] w-[119px] bg-[#0559FD] text-white rounded '
        >
          {t('Publish')}
        </button>
      </footer>
    </main>
  )
}

export default Workspace_Review
