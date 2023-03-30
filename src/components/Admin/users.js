import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { setFilterToggle } from '../../slices/admin_user'

const Users = () => {
  const ref = useRef()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [layout, setLayout] = useState(true)
  const [contextMenu, setContextMenu] = useState(false)

  const allUsers = useSelector((state) => state.adminPeople.allPeople)
  const total = useSelector((state) => state.adminPeople.totalPeople)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (contextMenu && ref.current && !ref.current.contains(e.target)) {
        setContextMenu(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [contextMenu])

  return (
    <main className='lg:px-5 lg:py-2 lg:bg-white md:bg-white sm:bg-transparent shadow-2fl lg:m-5 rounded-lg md:m-5 md:px-5 md:py-5 sm:m-5 relative'>
      <header
        className='lg:flex lg:justify-between lg:items-center lg:px-0 md:flex md:justify-between md:items-center
        sm:flex sm:justify-between sm:items-center'
      >
        <div className='flex items-center gap-2'>
          <span className='font-small text-[#0559FD] text-[30px]'>
            {' '}
            {total}{' '}
          </span>
          <span className='text-black text-[17px]'> {'People'} </span>
        </div>
      </header>

      <section
        className='lg:flex lg:justify-between lg:items-center lg:px-0 lg:py-0 md:flex md:justify-between md:items-center
      md:py-2 sm:py-2 sm:flex sm:justify-between sm:items-center '
      >
        <div className='lg:flex lg:flex-row lg:gap-4 md:flex md:flex-row md:gap-3 sm:flex sm:flex-col sm:gap-2 '>
          <div className='relative'>
            <input
              id='search'
              type='text'
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search People'
              maxLength='44'
              autoComplete='off'
              className='bg-[#FCFCFC] border-none outline-none rounded-md placeholder:text-[#AAAAAA] lg:h-[40px] lg:w-[252px]
              md:h-[40px] md:w-[200px] sm:h-[40px] sm:w-full indent-6 '
            />
            <img
              className='absolute w-[16px] h-[16px] lg:top-3 lg:block md:top-[10px] md:block sm:block sm:top-[10px]'
              src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Search-icon.svg'
              alt='search'
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <button
            onClick={() => dispatch(setFilterToggle(true))}
            className='flex justify-center items-center bg-[#fff] px-4 m-auto'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http:www.w3.org/2000/svg'
            >
              <path
                d='M5.33301 7.33333V8.07999C5.33426 8.16792 5.3702 8.25178 5.43301 8.31333L10.2863 13.22C10.3491 13.2815 10.3851 13.3654 10.3863 13.4533V18.0467C10.3862 18.1091 10.4037 18.1704 10.4367 18.2234C10.4697 18.2765 10.5169 18.3192 10.573 18.3467L13.2063 19.2867C13.2572 19.3116 13.3136 19.3231 13.3702 19.3202C13.4267 19.3173 13.4816 19.3 13.5297 19.27C13.5777 19.24 13.6173 19.1982 13.6447 19.1486C13.6721 19.0991 13.6865 19.0433 13.6863 18.9867V13.3933C13.6956 13.3032 13.7384 13.2199 13.8063 13.16L18.553 8.32666C18.6158 8.26512 18.6518 8.18125 18.653 8.09333V7.33333H5.33301Z'
                fill='#141115'
              />
            </svg>
            <span className='text-[14px]'>{t('Filter')}</span>
          </button>

          <div className='lg:flex lg:items-center lg:gap-2 md:flex-row md:gap-2 sm:gap-3 sm:flex-col '>
            <button type='button' onClick={() => setLayout(true)}>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/List.svg'
                alt='list'
              />
            </button>

            <button type='button' onClick={() => setLayout(false)}>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Grid.svg'
                alt='grid'
              />
            </button>
          </div>
        </div>
      </section>

      <section className=''>
        {layout === true && (
          <>
            <div
              className='lg:flex lg:flex-row lg:justify-between lg:items-center lg:py-3 lg:px-2 lg:gap-5
            md:flex md:flex-row md:justify-between md:items-center md:py-2 md:px-2 md:gap-3 sm:flex sm:flex-row sm:gap-4
            sm:justify-between sm:items-center sm:py-2 '
            >
              <p className='lg:w-[25%] md:w-[30%] sm:w-[30%] '>
                {' '}
                {t('Basic Info')}{' '}
              </p>

              <p className='lg:w-[15%] lg:flex md:w-[15%] md:hidden sm:hidden'>
                {' '}
                {t('Phone Number')}{' '}
              </p>
              <p className='lg:w-[20%] lg:flex md:w-[25%] md:flex sm:hidden'>
                {' '}
                {t('Email Address')}{' '}
              </p>
              <p className='lg:w-[20%] lg:flex md:w-[20%] md:hidden sm:hidden'>
                {' '}
                {t('Location')}{' '}
              </p>
              <span className='lg:w-[5%] md:w-[5%] sm:w-[5%]'></span>
            </div>

            <article className='lg:flex lg:flex-col lg:gap-2 lg:my-5 md:flex md:flex-col md:gap-2 sm:gap-4 sm:flex sm:flex-col'>
              {allUsers?.data
                ?.filter((data) =>
                  data.first_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((data, key) => {
                  return (
                    <article
                      key={key}
                      className='flex justify-between items-center lg:gap-5 shadow-2fl lg:px-2 md:gap-3 sm:gap-4 sm:px-2 relative rounded-md '
                    >
                      <span
                        className='lg:flex lg:flex-row lg:w-[25%] items-center lg:gap-3 lg:py-1
                    md:flex md:flex-row md:gap-2 md:w-[30%] sm:w-[30%] md:py-1 sm:py-2 sm:gap-3'
                      >
                        {data.gender === null && (
                          <img
                            src={
                              data.profile_url !== null
                                ? data.profile_url
                                : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                            }
                            alt={data.last_name}
                            className='w-[64px] h-[64px] bg-black p-1 rounded-full '
                          />
                        )}{' '}
                        {data.gender === 'Male' && (
                          <img
                            src={
                              data.profile_url !== null
                                ? data.profile_url
                                : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                            }
                            alt={data.last_name}
                            className='w-[64px] h-[64px] bg-black p-1 rounded-full '
                          />
                        )}{' '}
                        {data.gender === 'Female' && (
                          <img
                            src={
                              data.profile_url !== null
                                ? data.profile_url
                                : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl_light.png'
                            }
                            alt={data.last_name}
                            className='w-[64px] h-[64px] bg-black p-1 rounded-full '
                          />
                        )}{' '}
                        <span className='font-medium text-black lg:text-[16px] '>
                          {' '}
                          {data.first_name} {data.last_name}{' '}
                        </span>
                      </span>

                      <span className='lg:flex lg:justify-start lg:w-[15%]  break-words md:hidden md:w-[15%] md:justify-center sm:hidden'>
                        {data.phone_number}
                      </span>

                      <span className='lg:flex lg:justify-start lg:w-[20%] md:flex md:w-[25%] md:justify-start sm:hidden'>
                        {data.email}
                      </span>

                      <span className='lg:flex lg:justify-start lg:w-[20%] md:hidden md:w-[20%] md:justify-center sm:hidden'>
                        {' '}
                        {data.city}{' '}
                      </span>

                      <button
                        onClick={() => setContextMenu(data.id)}
                        className='lg:flex lg:justify-start lg:w-[5%] md:flex md:w-[5%] md:justify-start relative'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          id='Outline'
                          viewBox='0 0 24 24'
                          width='24'
                          height='24'
                        >
                          <circle
                            cx='2'
                            cy='12'
                            r='2'
                            stroke='#434144'
                            fill='#434144'
                          />
                          <circle
                            cx='12'
                            cy='12'
                            r='2'
                            stroke='#434144'
                            fill='#434144'
                          />
                          <circle
                            cx='22'
                            cy='12'
                            r='2'
                            stroke='#434144'
                            fill='#434144'
                          />
                        </svg>

                        {contextMenu === data.id && (
                          <section
                            ref={ref}
                            className='lg:w-[130px] lg:top-5 lg:-right-7 md:w-[150px] md:top-5 md:right-5 sm:top-5 sm:right-4 sm:w-[130px] 
                          absolute bg-white shadow-2fl rounded-lg flex flex-col justify-center items-center lg:px-2 z-10 '
                          >
                            <Link
                              to={`/dashboard/admin/user/${data.id}`}
                              className='hover:bg-[#EEEEEE] hover:rounded-md flex gap-3 justify-center items-center w-full h-10 '
                            >
                              <svg
                                viewBox='0 0 24 24'
                                width='24'
                                height='24'
                                className='w-[18px] h-[18px] '
                              >
                                <g
                                  id='_01_align_center'
                                  data-name='01 align center'
                                >
                                  <path
                                    d='M21,24H19V18.957A2.96,2.96,0,0,0,16.043,16H7.957A2.96,2.96,0,0,0,5,18.957V24H3V18.957A4.963,4.963,0,0,1,7.957,14h8.086A4.963,4.963,0,0,1,21,18.957Z'
                                    stroke='#141115'
                                    strokeWidth='1'
                                    fill='#141115'
                                  />
                                  <path
                                    d='M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12ZM12,2a4,4,0,1,0,4,4A4,4,0,0,0,12,2Z'
                                    stroke='#141115'
                                    strokeWidth='1'
                                    fill='#141115'
                                  />
                                </g>
                              </svg>
                              {t('Detail')}
                            </Link>
                          </section>
                        )}
                      </button>
                    </article>
                  )
                })}
            </article>
          </>
        )}

        {layout === false && (
          <article className='xl:grid-cols-4 xl:gap-5 lg:grid-cols-3 lg:gap-4 lg:py-5 md:grid md:grid-cols-2 md:gap-3 sm:grid sm:grid-cols-1 grid'>
            {allUsers?.data
              ?.filter((data) =>
                data.first_name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((data, key) => {
                return (
                  <article
                    key={key}
                    className='bg-white rounded-lg shadow-2fl flex flex-col justify-center items-center lg:py-3 sm:my-4'
                  >
                    <button
                      onClick={() => setContextMenu(data.id)}
                      className='relative lg:top-2 lg:right-4 grid grid-cols-1 content-end ml-auto md:top-5 md:right-4 sm:top-5 sm:right-4'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        id='Outline'
                        viewBox='0 0 24 24'
                        width='24'
                        height='24'
                      >
                        <circle
                          cx='2'
                          cy='12'
                          r='2'
                          stroke='#434144'
                          fill='#434144'
                        />
                        <circle
                          cx='12'
                          cy='12'
                          r='2'
                          stroke='#434144'
                          fill='#434144'
                        />
                        <circle
                          cx='22'
                          cy='12'
                          r='2'
                          stroke='#434144'
                          fill='#434144'
                        />
                      </svg>

                      {contextMenu === data.id && (
                        <section
                          ref={ref}
                          className='lg:w-[130px] h-auto lg:top-5 lg:-right-7 md:w-[150px] md:top-5 md:right-5 sm:top-5 sm:right-4 sm:w-[130px] 
                          absolute bg-white shadow-2fl rounded-lg flex flex-col justify-center items-center lg:px-2 z-10 '
                        >
                          <Link
                            to={`/dashboard/admin/user/${data.id}`}
                            className='hover:bg-[#EEEEEE] hover:rounded-md flex gap-3 justify-center items-center w-full h-10 '
                          >
                            <svg
                              viewBox='0 0 24 24'
                              width='24'
                              height='24'
                              className='w-[18px] h-[18px] '
                            >
                              <g
                                id='_01_align_center'
                                data-name='01 align center'
                              >
                                <path
                                  d='M21,24H19V18.957A2.96,2.96,0,0,0,16.043,16H7.957A2.96,2.96,0,0,0,5,18.957V24H3V18.957A4.963,4.963,0,0,1,7.957,14h8.086A4.963,4.963,0,0,1,21,18.957Z'
                                  stroke='#141115'
                                  strokeWidth='1'
                                  fill='#141115'
                                />
                                <path
                                  d='M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12ZM12,2a4,4,0,1,0,4,4A4,4,0,0,0,12,2Z'
                                  stroke='#141115'
                                  strokeWidth='1'
                                  fill='#141115'
                                />
                              </g>
                            </svg>
                            {t('Detail')}
                          </Link>
                        </section>
                      )}
                    </button>
                    {data.gender === null && (
                      <img
                        src={
                          data.profile_url !== null
                            ? data.profile_url
                            : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                        }
                        alt={data.last_name}
                        className='w-[64px] h-[64px] bg-black p-1 rounded-full '
                      />
                    )}{' '}
                    {data.gender === 'Male' && (
                      <img
                        src={
                          data.profile_url !== null
                            ? data.profile_url
                            : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                        }
                        alt={data.last_name}
                        className='w-[64px] h-[64px] bg-black p-1 rounded-full '
                      />
                    )}{' '}
                    {data.gender === 'Female' && (
                      <img
                        src={
                          data.profile_url !== null
                            ? data.profile_url
                            : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl_light.png'
                        }
                        alt={data.last_name}
                        className='w-[64px] h-[64px] bg-black p-1 rounded-full '
                      />
                    )}{' '}
                    <span className='font-medium text-black lg:text-[16px] pt-2'>
                      {' '}
                      {data.first_name} {data.last_name}{' '}
                    </span>
                    <div className='grid grid-cols-1 content-start gap-3 w-full p-4 '>
                      <p className='flex flex-col text-black'>
                        <span className='text-[#1E6AFD] text-[13px] '>
                          {' '}
                          {t('Email')}{' '}
                        </span>
                        {data.email}
                      </p>

                      <p className='flex flex-col text-black'>
                        <span className='text-[#1E6AFD] text-[13px] '>
                          {' '}
                          {t('Phone Number')}{' '}
                        </span>
                        {data.phone_number !== null
                          ? data.phone_number
                          : 'Not filled'}
                      </p>

                      <p className='flex flex-col text-black'>
                        <span className='text-[#1E6AFD] text-[13px] '>
                          {' '}
                          {t('Address')}{' '}
                        </span>
                        {data.address !== null ? data.address : 'Not filled'}
                      </p>

                      <p className='flex flex-col text-black'>
                        <span className='text-[#1E6AFD] text-[13px] '>
                          {' '}
                          {t('City')}{' '}
                        </span>
                        {data.city !== null ? data.city : 'Not filled'}
                      </p>
                    </div>
                  </article>
                )
              })}
          </article>
        )}
      </section>
    </main>
  )
}

export default Users
