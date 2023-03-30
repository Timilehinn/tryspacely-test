import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation()
  return (
    <main
      className='lg:flex lg:flex-row lg:justify-between lg:items-baseline lg:gap-6
      lg:px-10 lg:py-20 md:flex md:justify-start md:flex-col md:py-10 sm:py-10 sm:px-10
      sm:flex sm:flex-col sm:justify-start'
    >
      <div>
        <Link to='/' className='w-1/6'>
          <p className='text-[#011936] lg:text-4xl font-bold md:font-bold md:text-2xl sm:text-xl'>
           TrySpacely
          </p>
        </Link>
      </div>

      <section className='lg:grid lg:grid-cols-3 lg:gap-5 lg:w-4/6 lg:py-10 md:grid md:grid-cols-2 md:gap-4
      md:py-10 sm:grid sm:grid-cols-1 sm:gap-4 sm:py-10'>
        <div>
          <p className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-medium sm:font-medium'>
            {t("Search")}
          </p>
          <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
            <Link to='/workspaces'> {t("Search Workspaces")} </Link>
            <Link to='/workspaces'> {t("Search by City")} </Link>
            <Link to='/workspaces'> {t("Hottest Coding Space Nearby")} </Link>
            <Link to='/workspaces'> {t("Search by mentorship Opening")} </Link>
          </div>
        </div>

        <div className='lg:-ml-0 md:ml-20'>
          <p className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-medium sm:font-medium'>
            {t("Workspace Owners")}
          </p>
          <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base '>
            <Link to='/booking'> {t("List Workspace")} </Link>
            <Link to='/Signup'> {t("Sign Up")} </Link>
            <Link to='/Login'> {t("Login")} </Link>
          </div>
        </div>

        <div>
          <p className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-medium sm:font-medium'>

            {t("Reviews")}
          </p>
          <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
            {/*<Link to='/viewallreviews'> {t("view all Reviews")} </Link>*/}
            <Link to='/howitworks'> {t("How It Works")}</Link>
          </div>
        </div>

        <div className='lg:-ml-0 md:ml-20'>
          <p className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-medium sm:font-medium'>
            {t("Company")}
          </p>
          <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
            <Link to='/about'> {t("About Us")} </Link>
            <Link to='/blog'> {t("Blog")} </Link>

          </div>
        </div>

        <div>
          <p className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-medium sm:font-medium'>
            {t("Support")}
          </p>
          <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col lg:text-base sm:flex sm:flex-col lg:font-light md:text-base sm:text-base'>
            <Link to='/helpcenter'> {t("Help Center")} </Link>
            {/*<Link to='/contact'> {t("Contact Us")} </Link>*/}
            {/*<Link to='/cancel'> {t("Cancellation Option")} </Link>*/}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Footer
