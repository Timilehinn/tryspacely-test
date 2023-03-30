import React from 'react'
import OverviewSidebar from '../../Overview/OverviewUI/OverviewSidebar'
import UserBookingsHeader from './UserBookingsHeader'
import './Addon.css'
import { useTranslation } from 'react-i18next'

const EmptyBooking = () => {
  const { t } = useTranslation()

  return (
    <div className='w-full flex overflow-hidden'>
      <OverviewSidebar />
      <div className='w-full overflow-hidden'>
        <UserBookingsHeader />
        <div className='w-full flex justify-center items-center h-screen bg-[#ffffff]'>
          <div>
            <div>
              <svg
                className='illustration'
                width='200'
                height='134'
                viewBox='0 0 200 134'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clip-path='url(#clip0_348_17626)'>
                  <path d='M0 0H200V133.333H0V0Z' fill='white' />
                  <path
                    d='M81.9829 16.4751V31.5211V16.4751ZM122.106 16.4751V31.5211V16.4751ZM59.4143 52.0331H144.675H59.4143ZM147.182 49.0747V91.7051C147.182 106.751 139.659 116.782 122.106 116.782H81.9829C64.4294 116.782 56.9062 106.751 56.9062 91.7051V49.0747C56.9062 34.0287 64.4294 23.998 81.9829 23.998H122.106C139.659 23.998 147.182 34.0287 147.182 49.0747V49.0747Z'
                    stroke='#EEEEEE'
                    stroke-width='5.35186'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M83.459 90.2016H83.5039M120.574 75.1556H120.619H120.574ZM120.574 90.2016H120.619H120.574ZM102.021 75.1556H102.067H102.021ZM102.021 90.2016H102.067H102.021ZM83.459 75.1556H83.5039H83.459Z'
                    stroke='#EEEEEE'
                    stroke-width='10.7037'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M53.1147 32.1458L40.4258 36.9176C37.5015 38.0147 35.1113 41.4849 35.1113 44.6233V63.582C35.1113 66.5931 37.0949 70.548 39.5104 72.3598L50.4447 80.5504C54.0302 83.2553 59.9296 83.2553 63.5149 80.5504L74.4491 72.3598C76.8649 70.548 78.8482 66.5931 78.8482 63.582V44.6233C78.8482 41.4849 76.458 38.0147 73.5338 36.9176L60.8449 32.1458C58.6835 31.3549 55.2253 31.3549 53.1147 32.1458Z'
                    fill='#CDDEFF'
                  />
                  <path
                    d='M56.9475 66.8553C50.774 66.8553 45.7695 61.8507 45.7695 55.6773C45.7695 49.5038 50.774 44.4993 56.9475 44.4993C63.1209 44.4993 68.1255 49.5038 68.1255 55.6773C68.1255 61.8507 63.1209 66.8553 56.9475 66.8553Z'
                    stroke='white'
                    stroke-width='2.45294'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M56.248 52.1842V54.7831C56.248 55.7611 56.7512 56.6833 57.6174 57.1864L59.7412 58.4718'
                    stroke='white'
                    stroke-width='2.45294'
                    stroke-miterlimit='10'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M49.4737 26.7506C53.0204 28.51 57.728 26.2477 57.728 26.2477C57.728 26.2477 56.6817 21.1342 53.1331 19.3773C49.5864 17.618 44.8809 19.8775 44.8809 19.8775C44.8809 19.8775 45.9271 24.9913 49.4737 26.7506Z'
                    fill='url(#paint0_linear_348_17626)'
                  />
                  <path
                    d='M46.639 99.9244C48.0522 99.9244 49.1979 101.07 49.1979 102.483C49.1979 103.897 48.0522 105.042 46.639 105.042C45.2257 105.042 44.0801 103.897 44.0801 102.483C44.0801 101.07 45.2257 99.9244 46.639 99.9244Z'
                    fill='#CDDEFF'
                  />
                  <path
                    d='M148.521 16.3947C150.696 16.3947 152.459 18.1575 152.459 20.332C152.459 22.5065 150.696 24.2693 148.521 24.2693C146.347 24.2693 144.584 22.5065 144.584 20.332C144.584 18.1575 146.347 16.3947 148.521 16.3947Z'
                    fill='#CDDEFF'
                  />
                  <path
                    d='M159.65 55.2347C161.062 55.2347 162.207 54.0895 162.207 52.6769C162.207 51.2643 161.062 50.1191 159.65 50.1191C158.237 50.1191 157.092 51.2643 157.092 52.6769C157.092 54.0895 158.237 55.2347 159.65 55.2347Z'
                    fill='#CDDEFF'
                  />
                  <path
                    d='M164.882 77.632C164.882 79.567 163.314 81.1356 161.379 81.1356C159.444 81.1356 157.875 79.567 157.875 77.632C157.875 75.697 159.444 74.1284 161.379 74.1284C163.314 74.1284 164.882 75.697 164.882 77.632Z'
                    fill='#E1E4E5'
                    stroke='#EEEEEE'
                    stroke-width='0.222994'
                  />
                  <path
                    d='M157.659 109.979C157.659 111.647 156.307 112.999 154.639 112.999C152.971 112.999 151.619 111.647 151.619 109.979C151.619 108.312 152.971 106.96 154.639 106.96C156.307 106.96 157.659 108.312 157.659 109.979Z'
                    fill='#E1E4E5'
                    stroke='#EEEEEE'
                    stroke-width='0.222994'
                  />
                  <path
                    d='M45.7577 86.0773C45.7577 86.8599 44.9789 87.5292 43.9707 87.5292C42.9626 87.5292 42.1838 86.8599 42.1838 86.0773C42.1838 85.2948 42.9626 84.6255 43.9707 84.6255C44.9789 84.6255 45.7577 85.2948 45.7577 86.0773Z'
                    fill='#E1E4E5'
                    stroke='#EEEEEE'
                    stroke-width='0.222994'
                  />
                  <path
                    d='M54.7999 121.03C53.628 121.03 52.678 120.081 52.678 118.909C52.678 117.737 53.628 116.787 54.7999 116.787C55.9717 116.787 56.9217 117.737 56.9217 118.909C56.9217 120.081 55.9717 121.03 54.7999 121.03Z'
                    fill='#E1E4E5'
                    stroke='#EEEEEE'
                    stroke-width='0.222994'
                  />
                </g>
                <defs>
                  <linearGradient
                    id='paint0_linear_348_17626'
                    x1='63.0935'
                    y1='32.2384'
                    x2='33.8402'
                    y2='9.09909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stop-color='white' />
                    <stop offset='1' stop-color='#EEEEEE' />
                  </linearGradient>
                  <clipPath id='clip0_348_17626'>
                    <rect width='200' height='133.333' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className='font-500 font-[Plus Jakarta Display] text-center text-[20px] text-[#141115] mt-[20px]'>
              {t('No Booking Yet')}
            </div>
            <div className='font-300 font-[Plus Jakarta Display] text-center text-[16px] text-[#2C292C]'>
              {
                'Looks like you have no bookings yet. When you schedule a booking,'
              }
            </div>
            <div className='font-300 font-[Plus Jakarta Display] text-center text-[16px] text-[#2C292C]'>
              {t('It will appear here.')}
            </div>
            <div className='flex justify-center items-center'>
              <div className='font-500 cursor-pointer w-fit font-[Plus Jakarta Display] flex justify-center items-center text-[14px] bg-[#0559FD] text-[#fcfcfc] rounded px-[20px] py-[10px] mt-[20px]'>
                {t('Book A Workspace')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyBooking
