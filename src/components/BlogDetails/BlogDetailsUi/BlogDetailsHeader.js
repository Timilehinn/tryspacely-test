import React from 'react';
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogDetailsHeader = () => {
  const { t } = useTranslation()
  return (
    <div className="">
      <div className="lg:flex lg:flex-col md:flex md:flex-col lg:w-full sm:w-full md:w-full lg:mb-0 md:mb-3 sm:mb-4">
        <Link to="/">
          <div className="bg-[#011936]">
            <h1 className=" text-white lg:pl-20  lg:py-2 text-base md:pl-14 md:py-2 sm:py-2 sm:pl-5">{t("Back to TryBookings")}</h1>
          </div>
        </Link>
        <div className="lg:flex  lg:justify-between lg:items-center lg:space-x-4
        md:pl-14 md:py-4 lg:pl-20 shadow-1fl text-xl bg-white lg:py-4 md:flex md:justify-between sm:flex
        sm:justify-between sm:pl-5 lg:items-center md:items-center sm:items-center"
        >
          <h1>{t("Blog")}</h1>
          <div className="lg:pr-16 lg:flex lg:space-x-4 font-light sm:flex sm:space-x-2 md:flex md:py-0 md:space-x-3 sm:pr-4 sm:py-3">
            <p>{t("Blog Categories")} <span><i className="fas fa-caret-down"></i></span></p>
            <div><i className="fas fa-search"></i></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogDetailsHeader;