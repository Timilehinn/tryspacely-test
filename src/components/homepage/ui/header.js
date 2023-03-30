import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Cookies from 'universal-cookie'

import checkForAuthentication from '../../../utils/checkForAuthentication'

const Header = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const cookies = new Cookies()
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState('loading')
  const [modalOpen, setModalStatus] = React.useState(false)
  const [hamBurgerOpen] = React.useState(true)

  useEffect(async () => {
    if (authenticated != 'loading') return
    const { error, success, proccessing_auth } = await checkForAuthentication()
    if (success) {
      setAuthenticated(true)
      return
    }
    setAuthenticated(false)
  }, [authenticated])

  const ModalDialog = () => {
    setModalStatus(false)
  }
  const HamBurger = () => {
    setModalStatus(true)
  }

  const logout = async () => {
    cookies.remove('user_token', { path: '/' })
    setTimeout(() => {
      setAuthenticated('loading')
      navigate('/login')
    }, 10)
  }

  return (
    <div
      className='lg:flex lg:justify-between lg:justify-items-center lg:content-center lg:items-center lg:h-20 lg:w-full lg:py-3 lg:px-8
      bg-white shadow-2fl border-b-2 md:py-2 md:h-24 md:px-10 sm:h-20 sm:px-5 sm:py-4'
    >
      <div className='camc-logo md:flex md:items-center sm:flex sm:items-center sm:px-0 relative '>
        <Link rel='preload' to='/' className='flex justify-center items-center'>
          {' '}
          <LazyLoadImage
            src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/blue_logo.svg'
            alt='TrySpacely'
            width={40}
            height={40}
          />
          <h1 className='text-[1.2rem] font-light py-2 capitalize px-2'>
            {t('TrySpacely')}
          </h1>
        </Link>

        {hamBurgerOpen === true && (
          <span
            onClick={HamBurger}
            className='lg:hidden md:grid md:content-end justify-end md:ml-auto 
            sm:grid sm:content-end sm:justify-end sm:ml-auto cursor-pointer'
          >
            <img
              src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Icons/Align+Left.svg'
              alt='hamburger-icon'
              className='w-[35px] h-[35px]'
              loading='lazy'
            />
          </span>
        )}
      </div>

      <div className='lg:flex lg:space-x-5 lg:visible text-lg md:invisible sm:invisible font-light text-[#141115]'>
        <Link rel='preload' to='/booking'>
          {t('Find Workspace')}
        </Link>
        <Link rel='preload' to='/booking'>
          {t('List Workspace')}
        </Link>
        <Link rel='preload' to='/howitworks'>
          {t('How It Works')}
        </Link>
      </div>

      <div className='lg:flex lg:space-x-4 lg:visible md:invisible sm:invisible'>
        {authenticated !== 'loading' && authenticated && (
          <Link
            to={'/dashboard'}
            className='bg-[#FFFFFF] border
              border-gray-800 outline-none
              rounded-lg text-sm px-4 text-[#141115]
              py-2'
          >
            {t('Dashboard')}
          </Link>
        )}
        {authenticated !== 'loading' && authenticated && (
          <div
            onClick={logout}
            className='bg-[#0559FD] cursor-pointer outline-none
          rounded-lg text-sm px-4 py-2 text-white'
          >
            {t('Logout')}
          </div>
        )}

        {authenticated !== 'loading' && !authenticated && (
          <Link
            to='/login'
            className={`l-${
              location.pathname === '/login'
                ? ' bg-[#0559FD] font-medium outline-none rounded-lg text-sm px-4 py-2 text-white hover:text-white'
                : 'bg-[#FFFFFF] border border-gray-800 outline-none rounded-lg text-sm px-4 text-[#141115] py-2 hover:text-black'
            }`}
          >
            {t('Log In')}
          </Link>
        )}

        {authenticated !== 'loading' && !authenticated && (
          <Link
            to='/signup'
            className={`l-${
              location.pathname === '/signup'
                ? ' bg-[#0559FD] font-medium outline-none rounded-lg text-sm px-4 py-2 text-white hover:text-white'
                : 'bg-[#FFFFFF] border border-gray-800 outline-none rounded-lg text-sm px-4 text-[#141115] py-2 hover:text-black'
            }`}
          >
            {t('Sign up')}
          </Link>
        )}
      </div>

      {modalOpen === true && (
        <section
          className='md:block md:p-10 sm:block sm:p-5 flex flex-col justify-start w-screen h-screen
          items-start gap-8 bg-[#000000de] absolute z-10 top-0 left-0 text-white text-[20px]'
        >
          <span
            onClick={ModalDialog}
            loading='lazy'
            className='absolute md:top-8 md:right-10 sm:top-2 sm:right-6 z-10 text-white font-bold '
          >
            {' '}
            X{' '}
          </span>

          <div className='flex flex-col justify-center items-center  space-y-3 text-white text-xl font-sm'>
            <Link rel='preload' to='/booking'>
              {t('Find Workspace')}
            </Link>
            <Link rel='preload' to='/booking'>
              {t('List Workspace')}
            </Link>

            {authenticated !== 'loading' && !authenticated && (
              <Link rel='preload' to='/login'>
                {t('Login')}
              </Link>
            )}

            {authenticated !== 'loading' && authenticated && (
              <Link rel='preload' onClick={logout}>
                {t('Logout')}
              </Link>
            )}

            {authenticated !== 'loading' && !authenticated && (
              <Link rel='preload' to='/signup'>
                {t('Signup')}
              </Link>
            )}

            {authenticated !== 'loading' && authenticated && (
              <Link
                rel='preload'
                to='/dashboard'
                className='space-y-3 text-white text-xl font-sm'
              >
                {t('Dashboard')}
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

export default Header
