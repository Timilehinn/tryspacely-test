import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getSignUpBody, signUpWorkspace } from '../../slices/authRelated'
import { useSelector, useDispatch } from 'react-redux'

const Account_Setup = (props) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(0)
  const dispatch = useDispatch()

  const selectedTab = (index) => {
    setSelected(index)
    dispatch(signUpWorkspace(index))
  }

  return (
    <main
      className='account_setup lg:grid lg:content-center lg:h-screen 
    lg:justify-center lg:py-24 md:px-10 md:py-14 sm:px-10 sm:py-14 text-center '
    >
      <h1 className='text-3xl font-semibold'> {t('Select Acount Type')} </h1>
      <p className='text-lg '> {t('Please select one account type')} </p>

      <section className='py-5 lg:flex lg:flex-row md:flex-col md:gap-5 md:py-10 '>
        <div
          onClick={() => selectedTab(1)}
          className={`lg:h-[350px] lg:w-[303px] lg:py-10 md:h-[400px] md:py-14 
          sm:py-10 rounded-lg shadow-2fl cursor-pointer relative 
            ${selected === 1 ? 'selected active_select' : 'selected_tabs'}`}
        >
          <div
            className='lg:w-[150px] lg:h-[150px] md:w-[170px] sm:w-[120px] bg-gradient-to-t
                    from-[#74A0F6] to-[#8AB1FE00] rounded-full mb-10
                    mx-auto fill-[#0447CA]'
          >
            <svg
              viewBox='0 0 24 24'
              fill='#0447CA'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z'
                stroke='#0447CA'
                strokeWidth='0'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21'
                stroke='#0447CA'
                strokeWidth='0'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>

          <h1 className='lg:text-xl font-semibold md:text-4xl sm:text-3xl'>
            {t('Space Owner')}
          </h1>
          <p className='py-2 lg:text-lg md:text-2xl sm:text-lg'>
            {t('List space and find mentees')}
          </p>

          <div
            className={`absolute lg:left-[140px] lg:bottom-[-15px] lg:w-[35px]
            md:w-[70px] md:left-[350px] md:bottom-[-30px] sm:left-[140px] sm:bottom-[-30px]
            sm:w-[60px] ${
              selected === 1 ? 'check_btn active_btn' : 'check_btn'
            }`}
          >
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
                fill='#FCFCFC'
                stroke='#0559FD'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M9 12L11 14L15 10'
                stroke='#0559FD'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>

        <div
          onClick={() => selectedTab(2)}
          className={`lg:h-[350px] lg:w-[303px] lg:py-10 lg:ml-14 lg:mt-0 md:h-[400px] md:py-14 
          md:mt-14 sm:mt-14 sm:py-10 rounded-lg shadow-2fl cursor-pointer relative 
            ${selected === 2 ? 'selected active_select' : 'selected_tabs'}`}
        >
          <div
            className='lg:w-[150px] lg:h-[150px] md:w-[170px] sm:w-[120px] bg-gradient-to-t
                    from-[#FA8AFF] to-[#FA8AFF0F] rounded-full mb-10
                    mx-auto '
          >
            <svg
              viewBox='0 0 24 24'
              fill='#E034E8'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z'
                stroke='#0447CA'
                strokeWidth='0'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21'
                stroke='#0447CA'
                strokeWidth='0'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <h1 className='lg:text-xl font-semibold md:text-4xl sm:text-3xl'>
            {t('Space User')}
          </h1>
          <p className='py-2 lg:text-lg md:text-2xl sm:text-lg'>
            {t('List space and find mentors')}
          </p>

          <div
            className={`absolute lg:left-[140px] lg:bottom-[-15px] lg:w-[35px]
            md:w-[70px] md:left-[350px] md:bottom-[-30px] sm:w-[60px] sm:left-[140px]
            sm:bottom-[-30px] ${
              selected === 2 ? 'check_btn active_btn' : 'check_btn'
            }`}
          >
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z'
                fill='#FCFCFC'
                stroke='#0559FD'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M9 12L11 14L15 10'
                stroke='#0559FD'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </section>

      <hr className='border-[#D4D4D4] w-full lg:mt-14 md:mt-14 sm:mt-10' />

      <div className='lg:flex lg:ml-auto lg:gap-4 md:ml-[550px] md:gap-4 sm:ml-[200px] sm:gap-4 py-4'>
        <button
          type='button'
          onClick={() => props.prev(values)}
          className='bg-[#F6F6F6] rounded lg:p-1 md:p-3 sm:p-3 shadow-2fl hover:bg-[#0559FD] '
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.9756 16.0248L7.37559 12.4248C7.31971 12.3691 7.27538 12.3029 7.24513 12.23C7.21489 12.1571 7.19932 12.0789 7.19932 12C7.19932 11.9211 7.21489 11.8429 7.24513 11.77C7.27538 11.6971 7.31971 11.6309 7.37559 11.5752L10.9756 7.9752C11.0314 7.91942 11.0976 7.87516 11.1705 7.84497C11.2434 7.81478 11.3215 7.79924 11.4004 7.79924C11.4793 7.79924 11.5574 7.81478 11.6303 7.84497C11.7032 7.87516 11.7694 7.91942 11.8252 7.9752C11.881 8.03099 11.9252 8.09721 11.9554 8.1701C11.9856 8.24299 12.0011 8.32111 12.0011 8.4C12.0011 8.47889 11.9856 8.55701 11.9554 8.6299C11.9252 8.70279 11.881 8.76902 11.8252 8.8248L9.24879 11.4H16.2004C16.3595 11.4 16.5121 11.4632 16.6247 11.5757C16.7372 11.6883 16.8004 11.8409 16.8004 12C16.8004 12.1591 16.7372 12.3117 16.6247 12.4243C16.5121 12.5368 16.3595 12.6 16.2004 12.6H9.24879L11.8252 15.1752C11.9379 15.2879 12.0011 15.4407 12.0011 15.6C12.0011 15.7593 11.9379 15.9121 11.8252 16.0248C11.7125 16.1375 11.5597 16.2008 11.4004 16.2008C11.2411 16.2008 11.0883 16.1375 10.9756 16.0248ZM2.40039 12C2.40039 14.5461 3.41182 16.9879 5.21217 18.7882C7.01251 20.5886 9.45431 21.6 12.0004 21.6C14.5465 21.6 16.9883 20.5886 18.7886 18.7882C20.589 16.9879 21.6004 14.5461 21.6004 12C21.6004 9.45392 20.589 7.01213 18.7886 5.21178C16.9883 3.41143 14.5465 2.4 12.0004 2.4C9.45431 2.4 7.01251 3.41143 5.21217 5.21178C3.41182 7.01213 2.40039 9.45392 2.40039 12ZM12.0004 20.4C10.8973 20.4 9.80498 20.1827 8.78585 19.7606C7.76671 19.3384 6.84071 18.7197 6.06069 17.9397C5.28068 17.1597 4.66194 16.2337 4.2398 15.2145C3.81766 14.1954 3.60039 13.1031 3.60039 12C3.60039 10.8969 3.81766 9.8046 4.2398 8.78546C4.66194 7.76633 5.28068 6.84032 6.06069 6.0603C6.84071 5.28029 7.76671 4.66155 8.78585 4.23941C9.80498 3.81727 10.8973 3.6 12.0004 3.6C14.2282 3.6 16.3648 4.485 17.9401 6.0603C19.5154 7.63561 20.4004 9.77218 20.4004 12C20.4004 14.2278 19.5154 16.3644 17.9401 17.9397C16.3648 19.515 14.2282 20.4 12.0004 20.4Z'
              fill='#FFFFFF'
            />
          </svg>
        </button>

        <button
          type='submit'
          onClick={() => props.next(selected)}
          className='bg-[#0559FD] rounded lg:ml-0 lg:p-1 md:p-3 md:ml-10 sm:p-3 sm:ml-5 '
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M13.0252 16.0248L16.6252 12.4248C16.6811 12.3691 16.7254 12.3029 16.7556 12.23C16.7859 12.1571 16.8015 12.0789 16.8015 12C16.8015 11.9211 16.7859 11.8429 16.7556 11.77C16.7254 11.6971 16.6811 11.6309 16.6252 11.5752L13.0252 7.9752C12.9125 7.86254 12.7597 7.79924 12.6004 7.79924C12.4411 7.79924 12.2883 7.86254 12.1756 7.9752C12.0629 8.08786 11.9996 8.24067 11.9996 8.4C11.9996 8.55933 12.0629 8.71214 12.1756 8.8248L14.752 11.4H7.80039C7.64126 11.4 7.48865 11.4632 7.37613 11.5757C7.2636 11.6883 7.20039 11.8409 7.20039 12C7.20039 12.1591 7.2636 12.3117 7.37613 12.4243C7.48865 12.5368 7.64126 12.6 7.80039 12.6H14.752L12.1756 15.1752C12.0629 15.2879 11.9996 15.4407 11.9996 15.6C11.9996 15.7593 12.0629 15.9121 12.1756 16.0248C12.2883 16.1375 12.4411 16.2008 12.6004 16.2008C12.7597 16.2008 12.9125 16.1375 13.0252 16.0248ZM21.6004 12C21.6004 14.5461 20.589 16.9879 18.7886 18.7882C16.9883 20.5886 14.5465 21.6 12.0004 21.6C9.45431 21.6 7.01251 20.5886 5.21217 18.7882C3.41182 16.9879 2.40039 14.5461 2.40039 12C2.40039 9.45392 3.41182 7.01213 5.21217 5.21178C7.01251 3.41143 9.45431 2.4 12.0004 2.4C14.5465 2.4 16.9883 3.41143 18.7886 5.21178C20.589 7.01213 21.6004 9.45392 21.6004 12ZM12.0004 20.4C13.1035 20.4 14.1958 20.1827 15.2149 19.7606C16.2341 19.3384 17.1601 18.7197 17.9401 17.9397C18.7201 17.1597 19.3388 16.2337 19.761 15.2145C20.1831 14.1954 20.4004 13.1031 20.4004 12C20.4004 10.8969 20.1831 9.8046 19.761 8.78546C19.3388 7.76633 18.7201 6.84032 17.9401 6.0603C17.1601 5.28029 16.2341 4.66155 15.2149 4.23941C14.1958 3.81727 13.1035 3.6 12.0004 3.6C9.77257 3.6 7.636 4.485 6.06069 6.0603C4.48539 7.63561 3.60039 9.77218 3.60039 12C3.60039 14.2278 4.48539 16.3644 6.06069 17.9397C7.636 19.515 9.77257 20.4 12.0004 20.4Z'
              fill='#FFFFFF'
            />
          </svg>
        </button>
      </div>
    </main>
  )
}

export default Account_Setup
