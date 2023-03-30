import React from 'react'
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation()
  return (
    <main
      className='lg:flex lg:flex-row lg:justify-between lg:items-baseline lg:gap-6 md:mt-5
      lg:px-10 lg:py-20 md:flex md:justify-center md:flex-col md:px-0 sm:px-4 sm:ml-4 sm:mt-8'
    >
      <div>
        <Link to='/' className='w-1/6 '>
          <h1 className='text-[#011936] lg:text-4xl font-bold md:font-bold md:text-5xl md:mb-5 md:ml-10 sm:text-2xl'>
            TRYBOOKINZ
          </h1>
        </Link>
      </div>

      <section className='lg:grid lg:grid-cols-3 gap-5 w-4/6 lg:-mt-1 md:grid md:grid-cols-2 md:ml-10 sm:mt-4'>
        <div className="lg:py-0 md:py-4 sm:py-4">
          <h1 className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-medium sm:font-medium'>

            {t("Search")}
          </h1>
          <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col
              lg:text-base lg:font-light md:text-base sm:text-base'>
            <Link to='/searchworkspace'> {t("Search Workspaces")} </Link>
            <Link to='/searchbycity'> {t("Search by City")} </Link>
            <Link to='/hottest'> {t("Hottest Coding Space Nearby")} </Link>
            <Link to='/searchmentorship'> {t("Search by mentorship Opening")} </Link>
          </div>
        </div>

        <div className='lg:-ml-0 md:ml-20 lg:py-0 md:py-4 sm:py-4'>
          <h1 className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-medium sm:font-medium'>

            {t("Workspace Owners")}
          </h1>
          <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base '>
            <Link to='/listworkspace'> {t("List Workspace")} </Link>
            <Link to='/signup'> {t("Sign Up")} </Link>
            <Link to='/login'> {t("Login")} </Link>
          </div>
        </div>

        <div className="lg:py-0 md:py-4 sm:py-4">
          <h1 className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-medium sm:font-medium'>

            {t("Reviews")}
          </h1>
          <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
            <Link to='/viewallreviews'> {t("view all Reviews")} </Link>
            <Link to='/mostreviewed'> {t("Most Reviewed Spaces")} </Link>
            <Link to='/howitworks'> {t("How It Works")} </Link>
          </div>
        </div>

        <div className='lg:-ml-0 md:ml-20 lg:py-0 md:py-4 sm:py-4'>
          <h1 className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-medium sm:font-medium'>
            {' '}
            Company{' '}
          </h1>
          <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
            <Link to='/about'> About Us </Link>
            <Link to='/blog'> Blog </Link>
            <Link to='/support'> Support </Link>
          </div>
        </div>

        <div className="lg:py-0 md:py-4 sm:py-4">
          <h1 className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-medium sm:font-medium'>
            {' '}
            Support{' '}
          </h1>
          <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col lg:text-base sm:flex sm:flex-col lg:font-light md:text-base sm:text-base'>
            <Link to='/helpcenter'> Help Center </Link>
            <Link to='/contact'> Contact Us </Link>
            <Link to='/cancel'> Cancellation Option </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Footer
