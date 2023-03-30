import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import checkForAuthentication from "../../../utils/checkForAuthentication";

const Header = () => {

  const cookies = new Cookies()
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState('loading')
  const [modalOpen, setModalStatus] = React.useState(false)
  const [hamBurgerOpen] = React.useState(true)
  const { t } = useTranslation()

  useEffect(async () => {
    if (authenticated !== 'loading') return
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
      className="navbar lg:flex lg:justify-between lg:justify-items-center
      lg:content-center lg:items-center lg:h-20 lg:w-full lg:py-3 lg:px-8
      bg-[#CDDEFF] shadow-1fl md:py-2 md:h-24 md:px-10 sm:h-24 sm:px-5 sm:py-4"
    >
      <div
        className="camc-logo md:flex md:items-center sm:flex sm:items-center sm:px-0 relative "
      >
        <Link to='/' className='flex justify-center items-center'>
          {' '}
          <img
            className='xl:w-12 lg:w-12 md:w-12 sm:w-12'
            src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/trybbokinz.logo.black.svg'
            alt='svg'
          /> <h1 className='text-2xl font-bold py-2 capitalize px-2'>TrySpacely</h1>
        </Link>
        {hamBurgerOpen === true && (
          <span
            onClick={HamBurger}
            className="lg:hidden md:grid md:content-end justify-end md:ml-auto 
            sm:grid sm:content-end sm:justify-end sm:ml-auto cursor-pointer"
          >
            <i className="fas fa-align-justify fa-3x"></i>
          </span>
        )}
      </div>

      <div className="lg:flex lg:space-x-5 lg:visible text-lg md:invisible sm:invisible font-light text-[#141115]">
        <Link to="/findworkspace">{t("Find Workspace")}</Link>
        <Link to="/listworkspace">{t("List Workspace")}</Link>
        <Link to='/howitworks_signup'>{t('How It Works')}</Link>
      </div>



      <div className="flex space-x-4 hidden lg:block">
        <div className="flex space-x-2">
          {authenticated !== 'loading' && authenticated && (
            <Link
              to='/dashboard'
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
          <Link to="/login">
            <button
              className="bg-transparent border
            border-white
            font-light rounded-lg text-sm px-4 text-white hover:bg-[#00008b]
            py-2"
            >
              {t("Log In")}
            </button>
          </Link>
        )}

        {authenticated !== 'loading' && !authenticated && (
          <Link to="/signup">
            <button
              className="bg-[#0559FD] font-light outline-none
          rounded-lg text-sm px-4 py-2 text-white hover:bg-[#00008b]"
            >
              {("Sign up")}
            </button>
          </Link>
        )}

      </div>
      {modalOpen === true && (
        <section
          className="flex flex-col md:w-full sm:w-ful justify-center 
        bg-black drop-shadow-2xl w-screen h-72 py-10 absolute z-50 top-0
        right-0 lg:hidden md:block"
        >
          <div
            onClick={ModalDialog}
            className=" md:ml-auto md:pl-5 sm:pl-10 sm:-pt-4 "
          >
            <i className="fa fa-close fa-2x text-white"></i>
          </div>

          <div className="flex flex-col justify-center items-center  space-y-3 text-white text-xl font-sm">
            <Link to="Find Workspace">{t("Find Workspace")}</Link>
            <Link to="List Workspace">{t("List Workspace")}</Link>
          </div>

          <div className="flex flex-col justify-center items-center mt-3 space-y-3">
            <Link to="/login"
              className="bg-[#FFFFFF] border
            border-gray-800 outline-none
            font-medium rounded-lg text-sm px-4 text-[#141115]
            py-2">
              {t("Log In")}
            </Link>

            <Link to="/signup" className="bg-[#0559FD] font-medium outline-none
          rounded-lg text-sm px-4 py-2 text-white">
              {t("Sign up")}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default Header;
