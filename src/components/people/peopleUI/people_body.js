import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const People_Body = ({ people }) => {
  const ref = useRef()
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [layout, setLayout] = useState(true)
  const [contextMenu, setContextMenu] = useState(false)
  const [sort, setSort] = useState('none')

  // SORT WORKSPACE
  const sortMethod = {
    none: { method: (a, b) => null },
    lowestToHighest: { method: (a, b) => (b > a ? 1 : -1) },
    highestToLowest: { method: (a, b) => (a > b ? -1 : 1) },
  }

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
    <main className='lg:px-5 lg:py-2 lg:bg-white md:bg-white sm:bg-transparent shadow-2fl lg:m-5 rounded-lg md:m-5 md:px-5 md:py-5 sm:m-5'>
      <header
        className='lg:flex lg:justify-between lg:items-center lg:px-0 md:flex md:justify-between md:items-center
      sm:flex sm:justify-between sm:items-center'
      >
        <div className='flex items-center gap-2'>
          <span className='font-small text-[#0559FD] text-[30px]'>
            {' '}
            {people.total}{' '}
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
              placeholder='Search Workspace'
              maxLength='44'
              className='bg-[#FCFCFC] border-none outline-none rounded-md placeholder:text-[#AAAAAA] lg:h-[40px] lg:w-[252px]
              md:h-[40px] md:w-[200px] sm:h-[40px] sm:w-full indent-6 '
            />
            <img
              className='absolute w-[16px] h-[16px] lg:top-3 lg:block md:top-[10px] md:block sm:block sm:top-[10px]'
              src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Search-icon.svg'
              alt='search'
            />
          </div>

          <div className='flex items-center gap-4 '>
            <p className='lg:text-[13px]'>{t('Sort by:')}</p>
            <select
              onChange={(e) => setSort(e.target.value)}
              defaultValue={'none'}
              className='lg:flex lg:justify-center lg:items-center lg:gap-2 lg:h-[36px] lg:w-[146px]
                rounded bg-[#FCFCFC] outline-0'
            >
              <option value='none' disabled className='lg:my-2'>
                {t('None')}
              </option>
              <option value='lowestToHighest' className='lg:my-2'>
                {t('Lowest To Highest')}
              </option>
              <option value='highestToLowest' className='lg:my-2'>
                {t('Highest To Lowest')}
              </option>
            </select>
          </div>
        </div>

        <div className='flex items-center py-2 lg:relative ' id='toggleView'>
          <div className='lg:flex lg:items-center lg:gap-2 md:flex-row md:gap-2 sm:gap-3 sm:flex-col '>
            <button type='button' onClick={() => setLayout(false)}>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/List.svg'
                alt='list'
              />
            </button>

            <button type='button' onClick={() => setLayout(true)}>
              <img
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Grid.svg'
                alt='grid'
              />
            </button>
          </div>
        </div>
      </section>

      <section className=''>
        {!layout ? (
          <section className=''>
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

            <div className='lg:flex lg:flex-col lg:gap-2 md:flex md:flex-col md:gap-2 sm:gap-4 sm:flex sm:flex-col'>
              {people.data
                .filter((person) =>
                  person.first_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .sort((a, b) => b.created_at.localeCompare(a.created_at))
                .sort(sortMethod[sort].method)
                .map((person, index) => (
                  <article
                    key={index}
                    className='flex justify-between items-center lg:gap-5 shadow-2fl lg:px-2 
                  md:gap-3 sm:gap-4 sm:px-2 relative rounded-md'
                  >
                    <div
                      className='lg:flex lg:flex-row lg:w-[25%] items-center lg:gap-3 lg:py-1
                    md:flex md:flex-row md:gap-2 md:w-[30%] sm:w-[30%] md:py-1 sm:py-2 sm:gap-3 '
                    >
                      {person.gender === null && (
                        <img
                          src={
                            person.profile_url !== null
                              ? person.profile_url
                              : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                          }
                          alt='profile picture'
                          className='w-[72px] h-[72px] bg-black p-1 rounded-full '
                        />
                      )}

                      {person.gender === 'Male' && (
                        <img
                          src={
                            person.profile_url !== null
                              ? person.profile_url
                              : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                          }
                          alt='profile picture'
                          className='w-[72px] h-[72px] bg-black p-1 rounded-full '
                        />
                      )}

                      {person.gender === 'Female' && (
                        <img
                          src={
                            person.profile_url !== null
                              ? person.profile_url
                              : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl_light.png'
                          }
                          alt='profile picture'
                          className='w-[72px] h-[72px] bg-black p-1 rounded-full '
                        />
                      )}
                      <div className='flex flex-col'>
                        <span className='font-medium text-black lg:text-[16px]'>
                          {' '}
                          {person.first_name} {person.last_name}{' '}
                        </span>
                      </div>
                    </div>

                    <span className='lg:flex lg:justify-start lg:w-[15%] md:hidden md:w-[15%] md:justify-center sm:hidden'>
                      {person.phone_number}
                    </span>
                    <span className='lg:flex lg:justify-start lg:w-[20%] md:flex md:w-[25%] md:justify-start sm:hidden'>
                      {person.email}
                    </span>
                    <span className='lg:flex lg:justify-start lg:w-[20%] md:hidden md:w-[20%] md:justify-center sm:hidden'>
                      {person.city}
                    </span>
                    <button
                      onClick={() => setContextMenu(person.id)}
                      className='lg:flex lg:justify-start lg:w-[5%] md:flex md:w-[5%] 
                      md:justify-start relative'
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

                      {contextMenu === person.id && (
                        <section
                          ref={ref}
                          className='lg:w-[130px] lg:h-[104px] lg:top-5 lg:-right-7 md:w-[150px] md:h-[104px]
                        md:top-5 md:right-5 sm:top-5 sm:right-4 sm:w-[130px] sm:h-[104px] absolute bg-white shadow-2fl
                        rounded-lg flex flex-col justify-center items-center lg:px-2 z-10 '
                        >
                          <Link
                            to={`/dashboard/people/${person.id}`}
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
                ))}
            </div>
          </section>
        ) : (
          <section className='xl:grid-cols-4 xl:gap-5 lg:grid-cols-3 lg:gap-4 lg:py-5 md:grid md:grid-cols-2 md:gap-3 sm:grid sm:grid-cols-1 grid'>
            {people.data
              ?.filter((person) =>
                person.first_name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((person, index) => (
                <div
                  key={index}
                  className='bg-white rounded-lg shadow-2fl flex flex-col justify-center items-center lg:py-3 sm:my-4'
                >
                  <button
                    onClick={() => setContextMenu(person.id)}
                    className='relative lg:top-2 lg:right-4 grid grid-cols-1 content-end ml-auto md:top-5 md:right-4 sm:top-5 sm:right-4 '
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      id='Outline'
                      viewBox='0 0 24 24'
                      width='24'
                      height='24'
                      className='rotate-90'
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

                    {/* Context menu modal */}
                    {contextMenu === person.id && (
                      <section
                        ref={ref}
                        className='lg:w-[130px] lg:h-[104px] lg:top-5 lg:-right-5 md:w-[150px] md:h-[104px] md:top-5 md:right-5 sm:right-4 sm:top-5 
                        sm:w-[150px] sm:h-[104px] absolute bg-white shadow-2fl rounded-lg flex flex-col justify-center items-center lg:px-2 '
                      >
                        <Link
                          to={`${person.id}`}
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

                        <button
                          type='button'
                          className='hover:bg-[#EEEEEE] hover:rounded-md flex gap-3 justify-center items-center w-full h-10 '
                        >
                          <svg
                            id='Layer_1'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                            data-name='Layer 1'
                            fill='#141115'
                            className='w-[18px] h-[18px]'
                          >
                            <path
                              d='m9 12a6 6 0 1 0 -6-6 6.006 6.006 0 0 0 6 6zm0-10a4 4 0 1 1 -4 4 4 4 0 0 1 4-4zm9 17v5h-2v-5a3 3 0 0 0 -3-3h-8a3 3 0 0 0 -3 3v5h-2v-5a5.006 5.006 0 0 1 5-5h8a5.006 5.006 0 0 1 5 5zm3.414-9 2.543 2.543-1.414 1.414-2.543-2.543-2.543 2.543-1.414-1.414 2.543-2.543-2.543-2.543 1.414-1.414 2.543 2.543 2.543-2.543 1.414 1.414z'
                              stroke='#141115'
                              strokeWidth='1'
                              fill='#141115'
                            />
                          </svg>
                          Block
                        </button>
                      </section>
                    )}
                  </button>

                  {person.gender === null && (
                    <img
                      src={
                        person.profile_url !== null
                          ? person.profile_url
                          : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                      }
                      alt='profile picture'
                      className='w-[72px] h-[72px] bg-black p-1 rounded-full '
                    />
                  )}

                  {person.gender === 'Male' && (
                    <img
                      src={
                        person.profile_url !== null
                          ? person.profile_url
                          : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                      }
                      alt='profile picture'
                      className='w-[72px] h-[72px] bg-black p-1 rounded-full '
                    />
                  )}

                  {person.gender === 'Female' && (
                    <img
                      src={
                        person.profile_url !== null
                          ? person.profile_url
                          : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl_light.png'
                      }
                      alt='profile picture'
                      className='w-[72px] h-[72px] bg-black p-1 rounded-full '
                    />
                  )}
                  <span className='font-medium text-black lg:text-[16px] pt-2'>
                    {' '}
                    {person.first_name} {person.last_name}{' '}
                  </span>

                  <div className='grid grid-cols-1 content-start gap-3 w-full p-4 '>
                    <p className='flex flex-col text-black'>
                      <span className='text-[#1E6AFD] text-[13px] '>
                        {' '}
                        {t('Email')}{' '}
                      </span>
                      {person.email}
                    </p>

                    <p className='flex flex-col text-black'>
                      <span className='text-[#1E6AFD] text-[13px] '>
                        {' '}
                        {t('Phone Number')}{' '}
                      </span>
                      {person.phone_number !== null
                        ? person.phone_number
                        : 'Not filled'}
                    </p>

                    <p className='flex flex-col text-black'>
                      <span className='text-[#1E6AFD] text-[13px] '>
                        {' '}
                        {t('Address')}{' '}
                      </span>
                      {person.address !== null ? person.address : 'Not filled'}
                    </p>

                    <p className='flex flex-col text-black'>
                      <span className='text-[#1E6AFD] text-[13px] '>
                        {' '}
                        {t('City')}{' '}
                      </span>
                      {person.city !== null ? person.city : 'Not filled'}
                    </p>
                  </div>
                </div>
              ))}
          </section>
        )}
      </section>
    </main>
  )
}

export default People_Body
