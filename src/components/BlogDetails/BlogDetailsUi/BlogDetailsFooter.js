import React from "react";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";


const BlogDetailsFooter = () => {
  const { t } = useTranslation()
  return(
    <div className="">
      <div className="page-wrapper flex justify-between lg:px-0 md:px-0 sm:px-2 sm:mb-2 lg:mb-0 md:mb-0 md:pt-4 sm:pt-4 lg:mt-5">
        <Link to="/">
          <h1
            className='text-[#011936] lg:pl-20 lg:text-3xl  font-semibold  md:font-bold md:text-5xl md:mb-5 md:pl-3  sm:text-2xl'>
            TryBookinz
          </h1>
        </Link>

        <div className='flex lg:pr-16 md:px-4 lg:px-0 space-x-3.5 sm:mr-2 sm:mt-2'>
          <Link to='/linkedin'>
            {' '}
            <i className='fa-brands fa-linkedin-square fa-2x'></i>
          </Link>
          <Link to='/twitter'>
            {' '}
            <i className='fa-brands fa-twitter-square fa-2x'></i>
          </Link>
          <Link to='/github'>
            {' '}
            <i className='fa-brands fa-github fa-2x'></i>
          </Link>
          <Link to='/instagram'>
            {' '}
            <i className='fa-brands fa-instagram-square fa-2x'></i>
          </Link>
        </div>
      </div>
      <div className="lg:px-20  text-[#D4D4D4] opacity-50"><hr/></div>


      <div className="page-wrapper flex-col flex justify-between  pb-5 md:px-4 sm:px-2 lg:px-0">
        <div className="flex justify-between lg:pt-4 md:pt-4 sm:pt-4 lg:pl-20 lg:pb-0 md:pb-0 sm:pb-4">
          <div className='lg:flex md:flex sm:flex sm:flex-col lg:space-x-5 md:space-x-5 sm:space-x-0  md:flex-row font-semibold text-[#141115] '>
            <Link to="/booking">{t("Find Workspace")}</Link>
            <Link  to="/booking">{t("List Workspace")}</Link>
          </div>

          <div className="flex lg:pr-20 lg:space-x-8 md:space-x-8 sm:space-x-2 font-light">
            <Link to="/about">{t("About Us")}</Link>
            <Link to="/blog">{t("Blog")}</Link>
            {/*<Link to="/support">{t("Support")}</Link>*/}
            {/*<Link to="/contact">{t("Contact Us")}</Link>*/}
          </div>
        </div>

        <div
          className='lg:flex md:flex lg:pt-5 md:pt-3 sm:pt-4 justify-between font-light lg:pl-20 lg:gap-4 md:gap-4 sm:flex  sm:gap-2'>
          <p>
            <i className='far fa-copyright'></i> 2022, TrySpacely, Inc
          </p>
          <div className="lg:pr-20 space-x-3 ">
            <Link to="/tandc" className="underline"> {t("Terms & Condition")} </Link>
            <Link to="/sitemap" className="underline"> {t("Site Map")} </Link>
          </div>
        </div>
      </div>

    </div>
  )
};
export default BlogDetailsFooter;
