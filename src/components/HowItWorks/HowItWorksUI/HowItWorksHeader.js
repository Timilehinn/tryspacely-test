import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import checkForAuthentication from '../../../utils/checkForAuthentication'
import { useCookieHandler } from '../../../hooks'
import { setAccountType } from '../../../slices/admin_user'

const HowItWorksHeader = () => {
  const { t } = useTranslation()
  const cookies = new Cookies()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useCookieHandler('user_token')
  const [authenticated, setAuthenticated] = useState('loading')
  const [modalOpen, setModalStatus] = React.useState(false)
  const [hamBurgerOpen] = React.useState(true)

  const accountType = useSelector((state) => state.adminPeople.accountType)

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
        account_type: data?.data?.account_type[0]?.user_type?.type,
        github: data?.data?.github,
        profile_url: data?.data?.profile_url,
        gender: data?.data?.gender,
        booked_workspaces: data?.data?.booked_workspaces,
      }

      dispatch(setAccountType(data?.data?.account_type[0]?.user_type.type))

      if (res.status === 500) {
        navigate('/500')
      } else if (res.status === 400) {
        navigate('/400')
      }
    } catch (error) {}
  }

  useEffect(() => {
    exchangeTokenForId()
  }, [token])

  useEffect(async () => {
    if (authenticated !== 'loading') return
    const { success } = await checkForAuthentication()
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
      className='navbar lg:flex lg:justify-between lg:justify-items-center
      lg:content-center lg:items-center lg:h-14 lg:w-full lg:py-3 lg:px-8 bg-gradient-to-b from-[#141115] to-[#141115]
      relative z-40 md:py-3.5 md:px-10 sm:px-5 sm:py-4 opacity-80  w-full'
    >
      <div className='camc-logo md:flex md:items-center sm:flex sm:items-center sm:px-0 relative '>
        <Link to='/' className='flex justify-center items-center'>
          {' '}
          <img
            className='xl:w-12 lg:w-12 md:w-12 sm:w-12'
            src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/blue_logo.svg'
            alt='svg'
          />{' '}
          <h1 className='text-xl font-light py-2 capitalize px-2 text-white'>
            TrySpacely
          </h1>
        </Link>
        {hamBurgerOpen === true && (
          <span
            onClick={HamBurger}
            className='lg:hidden md:grid md:content-end justify-end md:ml-auto
            sm:grid sm:content-end sm:justify-end sm:ml-auto cursor-pointer text-white'
          >
            <img
              className='bg-[#FCFCFC]'
              src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Icons/Align+Left.svg'
              alt='hamburger-icon'
            />
          </span>
        )}
      </div>

      <div className='flex gap-5 text-white space-x-4 space-y-3 lg:block md:hidden sm:hidden'>
        <Link to='/booking'>{t('Find Workspace')}</Link>
        <Link to='/booking'>{'List Space'}</Link>
        <Link to='/howitworks'>{t('How It Works')}</Link>
      </div>

      <div className='flex space-x-4 md:hidden sm:hidden lg:block'>
        <div className='flex space-x-2'>
          {authenticated !== 'loading' && authenticated && (
            <Link
              to={'/dashboard'}
              className='bg-[#fcfcfc] border
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
              // to=''
              className='bg-[#0559FD] cursor-pointer outline-none
          rounded-lg text-sm px-4 py-2 text-white'
            >
              {t('Logout')}
            </div>
          )}
        </div>
        {authenticated !== 'loading' && !authenticated && (
          <Link to='/login'>
            <button
              className='bg-transparent border
            border-white
            font-light rounded-lg text-sm px-4 text-white hover:bg-[#00008b]
            py-2'
            >
              {t('Log In')}
            </button>
          </Link>
        )}

        {authenticated !== 'loading' && !authenticated && (
          <Link to='/signup'>
            <button
              className='bg-[#0559FD] font-light outline-none
          rounded-lg text-sm px-4 py-2 text-white hover:bg-[#00008b]'
            >
              {'Sign up'}
            </button>
          </Link>
        )}
      </div>

      {modalOpen === true && (
        <section
          className='flex  flex-col md:w-full sm:w-ful justify-center
        bg-black drop-shadow-2xl w-screen h-72 py-10 absolute z-20 top-2
        right-0 lg:hidden md:block'
        >
          <div
            onClick={ModalDialog}
            className=' md:ml-auto md:pl-5 sm:pl-10 sm:-pt-4 '
          >
            <i className='fa fa-close fa-2x text-white'></i>
          </div>

          <div className='flex flex-col  justify-center items-center  space-y-3 text-white text-xl font-sm'>
            <Link to='Find Workspace'>{t('Find Workspace')}</Link>
            <Link to='List Workspace'>{t('List Workspace')}</Link>
          </div>

          <div className='flex flex-col justify-center items-center mt-3 space-y-3'>
            <Link to='/booking'>{t('Find Workspace')}</Link>
            <Link to='/booking'>{t('List Workspace')}</Link>
            <Link to='/login'>
              <button
                className='bg-[#FFFFFF] border
                  border-gray-800 outline-none
                 font-medium rounded-lg text-sm px-4 text-[#141115]
                   py-2'
              >
                {t('Log In')}
              </button>
            </Link>

            <Link to='/signup'>
              <button className='bg-[#0559FD] font-medium outline-none rounded-lg text-sm px-4 py-2 text-white'>
                {t('Sign up')}
              </button>
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}

export default HowItWorksHeader
