import React from "react";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";

const Spacesearch = () => {
  const { t } = useTranslation()
  return (
    <div className="xl:flex lg:flex md:flex sm:grid sm:grid-col-1 py-10 gap-10 justify-center lg:px-5 md:px-5 sm:px-5  w-full">
      <div className=" lg:border lg:border-[#D4D4D4] md:border sm:border sm:border-[#D4D4D4] xl:w-[30rem] xl:h-[18rem] sm:mb-4  rounded-lg drop-shadow-lg md:w-2/4
      px-3 md:h-[20rem] sm:w-96 sm:h-64 sm:space-y-2"
      >
        < div className="lg:pt-0 md:mb-6 sm:space-y-2 sm:mt-4">
          <h1
            className="lg:pt-4 lg:font-medium lg:text-xl  md:font-bold md:text-2xl
             md:w-72 sm:w-72 md:mb-4 xl:mb-1 sm:text-2xl sm:font-bold md:pt-0 sm:pt-3">{t("Looking for a workspace? Start here")}</h1>
          <p className="lg:pt-4  lg:font-light md:mb-4 lg:mb-1 md:text-xl sm:text-base sm:pb-3">{t("Get access to top notch space setup, receive mentorship and grow your network.")}</p>
          <Link to="/booking">
            <button
              className="bg-[#0559FD] text-white xl:px-6 lg:py-3.5 rounded hover:bg-[#1E48AA] xl:mt-2 md:mt-2 lg:mt-5 md:px-7 md:py-5 sm:py-4 sm:px-3"
              type="button">{t("Find Workspace")}
            </button>
          </Link>
        </div>
      </div>


      <div className="lg:border md:border lg:border-[#D4D4D4]  rounded-lg drop-shadow-lg sm:border sm:border-[#D4D4D4] xl:w-[30rem] xl:h-[18rem] md:w-2/4
       px-3 sm:w-96 md:h-[20rem] sm:h-64  sm:space-y-2"
      >
        <div className="lg:pt-0  md:mb-6 space-y-2 sm:mt-4">
          <h1 className="lg:pt-4 lg:font-medium lg:text-xl  md:font-bold md:text-2xl
          md:w-72 sm:w-72 md:mb-4 xl:mb-1  sm:font-bold sm:text-2xl sm:pt-3 md:pt-0">{t("Got space to share? Share workspace")}</h1>
          <p className="lg:pt-4  lg:font-light md:mb-4 xl:mb-1 md:text-xl sm:text-base sm:pb-3">{t("Make money while you share your space. Increase your income and grow your network.")}</p>
          <Link to="/booking">
            <button
              className="bg-[#0559FD] text-white xl:px-6 lg:py-3.5 rounded hover:bg-[#1E48AA] xl:mt-2 md:mt-2 md:px-7 md:py-5 sm:py-4 sm:px-3"
              type="button">{t("Find Workspace")}
            </button>
          </Link>
        </div>
      </div>
    </div>


)


};


export default Spacesearch;