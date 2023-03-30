import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import AutoCompletePlaces from './auto_complete_places'
import {
  getCoordinatesLatLng,
  setDateFilterPicked,
} from '../../../slices/filterOptions'
import makeApiCallFunction from '../../../functions/makeApiCall'
import CAMCDatePicker from '../../datepicker'

import './hero.scss'

const Hero = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const coordinates = useSelector(getCoordinatesLatLng)
  const [startDate, setStartDate] = useState()

  useEffect(async () => {
    const response = await makeApiCallFunction(
      'POST',
      `${process.env.REACT_APP_BASE_URL}/users/retrieve-token`
    )
  }, [])

  const handleSearch = () => {
    if (!coordinates) return
    navigate('/booking')
  }

  const datePickedChange = (date) => {
    try {
      setStartDate(date)
      const year = date.getUTCFullYear()
      const month = date.getUTCMonth() + 1
      const reFormattedMonth =
        month.toString().length > 1 ? month : `0${month.toString()}`
      const day =
        date.getUTCDate().toString().length > 1
          ? date.getUTCDate()
          : `0${date.getUTCDate().toString()}`
      const dateString = `${year}-${reFormattedMonth}-${day}`
      dispatch(setDateFilterPicked(dateString))
    } catch (error) {}
  }

  return (
    <>
      <section className='lg:grid lg:grid-cols-1 lg:p-10 md:p-10 sm:p-5 relative'>
        <div className=' md:py-7 md:leading-10'>
          <h1 className='lg:text-8xl md:text-5xl sm:text-4xl text-[#2C292C] py-4 font-medium'>
            {' '}
            {t('Discover')}{' '}
          </h1>
          <div className='lg:text-4xl md:text-3xl sm:text-xl font-normal text-[#0555FD] mb-12'>
            {t('Your')}
            <span
              className='font-normal lg:relative pl-2 text-[#141115] border-[#0555FD] skew-y-12 lg:border-b-2 md:border-b-2
              md:relative sm:border-b-2'
            >
              {t('Workspace')}
            </span>
          </div>
        </div>

        <form
          className='lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-10 lg:w-[757px] lg:h-[80px] lg:px-3 lg:py-0
          md:flex-col md:flex md:justify-start md:items-start md:gap-5 md:w-full md:h-[270px] md:px-5 md:py-4 md:divide-x-0
          sm:flex sm:flex-col sm:divide-x-0 sm:justify-start sm:items-start sm:gap-5 sm:w-full sm:h-[270px] sm:px-5 sm:py-2
          bg-white shadow-2fl rounded-lg'
          style={{ zIndex: 1000 }}
        >
          <section
            className='lg:flex lg:flex-row lg:justify-between lg:gap-4 lg:w-full lg:space-y-0 lg:divide-x md:flex md:flex-col md:justify-start
            md:items-start md:gap-4 md:space-y-8 sm:flex sm:flex-col sm:justify-start sm:revert sm:gap-4 sm:space-y-7 sm:w-full'
          >
            <div className='flex flex-col gap-2 relative'>
              <label htmlFor='' className='font-semibold'>
                {t('Location')}
              </label>

              <AutoCompletePlaces
                placeholder={'Hey! Where will you like to work?'}
              />
            </div>

            <div
              className='lg:flex lg:flex-col lg:ml-0 lg:gap-0
            sm:flex sm:flex-col sm:gap-4 sm:ml-0 font-[Plus Jarkarta Display] relative lg:right-[50px] md:right-[0px] sm:right-[0px] cursor-pointer'
            >
              <label
                htmlFor=''
                className='lg:ml-3 font-semibold sm:mt-3 xl:mt-0 lg:mt-0 md:mt-0 '
              >
                {t('Date')}
              </label>

              <div className='sm:-ml-[5px] md:-ml-[5px] lg:-ml-[0px]'>
                <CAMCDatePicker
                  onChange={datePickedChange}
                  fromFilter={true}
                  placeholderText={'Pick A Date'}
                  fromHomepage={true}
                  datePickedChange={datePickedChange}
                />
              </div>
            </div>
          </section>

          <div className='xl:pt-1 lg:pt-1'>
            <button
              onClick={handleSearch}
              className='border-0 bg-[#0555FD] lg:text-xl
          rounded-lg text-white lg:px-5 lg:py-4 lg:w-[150px] md:mt-4
          md:px-10 sm:px-4 sm:w-full sm:py-4 sm:my-5 sm:mt-0 font-[Plus Jarkarta Display]'
            >
              {t('Search')}
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Hero
