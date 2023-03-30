import React from 'react';
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";


const BlogDetailsHero = () => {
  const { t } = useTranslation()
  return (
    <div className="page-wrapper pb-10 md:px-14 lg:px-0 md:pt-10 lg:pt-0 sm:px-5">
      <div className="lg:flex lg:items-center lg:flex-row  lg:pl-20 lg:pt-12 md:flex-col lg:w-3/6 sm:mb-3 lg:leading-9">

        <div className="  text-lg">
          <p className="text-[#5B585B] font-light text-base lg:pb-4 md:pb-3 sm:pb-3">{t("October 30, 2017 - Community, Engineering")}</p>
          <h1 className="font-bold text-4xl text-[#2C292C]">{t("13 short and scary games plus source to play (or hack) this Hallowen")}</h1>
          <div className="lg:flex lg:items-center md:flex md:items-center sm:flex sm:items-center lg:mt-5 md:mt-4 sm:mt-4">
            <img className=" andrew" src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/image-anousheh-ansari.png" alt="andrew_pics"/>
            <p className="lg:pl-3  md:pl-3 text-[#5B585B]">{t("Andrew Johnson")}</p>
          </div>
        </div>
      </div>

      <div>
        <img className="md:mb-3 lg:mb-0 md:w-44 md:h-72 lg:h-[30rem] md:mt-5 lg:mt-0 lg:px-20 sm:pb-3 lg:pt-6" src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/hallowen.jpg"
             style={{width: "2000px",}} alt="hallowen_pic"/>
        <div className="lg:flex lg:justify-center lg:items-center md:pt-4  lg:space-x-14 lg:mt-6 space-x-2 space-y-2">
          <div className="lg:flex lg:flex-col lg:justify-center lg:items-center leading-6">

              <h1 className="text-[#5B585B] text-lg">{t("Share")}</h1>
              <Link to='/instagram'>
                {' '}
                <i className='fa-brands fa-instagram-square fa-2x text-[#AAAAAA] lg:pb-2 '></i>
              </Link>
              <Link to='/linkedin'>
                {' '}
                <i className='fa-brands fa-linkedin-square fa-2x text-[#AAAAAA] lg:pb-2 '></i>
              </Link>
              <Link to='/twitter'>
                {' '}
                <i className='fa-brands fa-twitter-square fa-2x text-[#AAAAAA]'></i>
              </Link>
          </div>
          <div className="lg:w-4/5 font-light lg:leading-6 md:leading:6 font-light">
            <p className="lg:pb-5 md:pb-4 sm:pb-3">{t("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")}</p>
            <p className="">
              {t("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.")}
            </p>
          </div>
        </div>

      </div>

    </div>

  );
};
export default BlogDetailsHero;