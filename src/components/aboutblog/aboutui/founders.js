import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Founders = () => {
  const  { t } = useTranslation()

  return (
    <div
      className="lg:flex lg:flex-col lg:justify-center lg:items-center bg-gradient-to-b from-[#CDDEFF] to-[#F2F2F2] lg:pb-3
      md:flex md:flex-col md:justify-center md:items-center md:pb-10 lg:overflow-hidden md:pt-6 sm:flex
      sm:justify-center sm:items-center sm:flex-col sm:pb-5"
    >
      <h2 className="text-[#434144] lg:font-medium lg:text-xl lg:pt-8 md:text-2xl sm:text-xl sm:pt-6 sm:font-bold">
        {t("Human behind TryBookinz")}
      </h2>

      <p className="text-[#434144] lg:text-lg lg:px-7 lg:w-5/12 lg:font-light lg:text-center
      lg:pt-3 lg:pb-8  md:w-10/12 md:text-center md:text-xl md:pt-4 md:font-light
      sm:text-lg sm:pt-4 sm:px-3 sm:text-center sm:pb-4 sm:font-light">
        {t("TryBookings started with helping developers have a productive and focus worklife. Each day, our team continue to help more work culture.")}
      </p>

      <div className='xl:flex justify-center gap-x-6 lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 sm:flex sm:flex-wrap lg:px-5 md:px-5 sm:justify-center w-full'>
        <div className="p-5 flex justify-center items-center flex-col">
          <LazyLoadImage className="rounded-full h-48 w-48 frame-image" src={'https://trybookings-assets.s3.eu-west-2.amazonaws.com/team/temitope-olotin.jpg'} />
          <div className=" lg:pt-3 md:text-center md:py-2 sm:text-center sm:py-2">
            <h1 className="font-bold">{t("Olotin Temitope")}</h1>
            <p className="font-light">{t("Founder | CTO")}</p>
          </div>
        </div>

        <div className="p-5 flex justify-center items-center flex-col">
          <LazyLoadImage className="rounded-full h-48 w-48 frame-image" src={'https://trybookings-assets.s3.eu-west-2.amazonaws.com/team/damilare-afolabi.jpg'}/>
          <div className=" lg:pt-3 md:text-center md:py-2 sm:text-center sm:py-2">
            <h1 className="font-bold">{t("Afolabi Damilare")}</h1>
            <p className="font-light">{t("Frontend Developer")}</p>
          </div>
        </div>

        <Link to="/https://www.linkedin.com/in/olotin-abiodun-a4a715176" className="p-5 flex justify-center items-center flex-col">
          <LazyLoadImage className="rounded-full h-48 w-48 frame-image" src={'https://trybookings-assets.s3.eu-west-2.amazonaws.com/team/abiodun-olotin.jpg'}/>
          <div className="lg:pt-3 md:text-center md:py-2 sm:text-center sm:py-2">
            <h1 className="font-bold">{t("Olotin Abiodun")}</h1>
            <p className="font-light">{t("Frontend Developer")}</p>
          </div>
        </Link>

        <div className="p-5 flex justify-center items-center flex-col">
          <LazyLoadImage className="rounded-full h-48 w-48 frame-image" src={'https://trybookings-assets.s3.eu-west-2.amazonaws.com/team/collins.jpg'}  alt={''}/>
          <div className=" lg:pt-3 md:text-center md:py-2 sm:text-center sm:py-2">
            <h1 className="font-bold">{t("Rollins Collins")}</h1>
            <p className="font-light">{t("Frontend Developer")}</p>
          </div>
        </div>
        <a href="https://www.linkedin.com/in/olotin-abiodun-a4a715176/" target="_blank">
        <div className="p-5 flex justify-center items-center flex-col">
          <LazyLoadImage className="rounded-full h-48 w-48 frame-image" src={'https://trybookings-assets.s3.eu-west-2.amazonaws.com/team/ibrahim.png'}  alt={''}/>
          <div className=" lg:pt-3 md:text-center md:py-2 sm:text-center sm:py-2">
            <h1 className="font-bold">{t("Tijani Ibrahim")}</h1>
            <p className="font-light">{t("Frontend Developer")}</p>
          </div>
        </div>
        </a>
      </div>
      <button
        className="text-[#0559FD] lg:mb-5 border border-[#0559FD] 
        hover:bg-[#ABD0D6] rounded-xl lg:p-4 lg:my-5 md:p-4 md:my-5 sm:p-4 sm:my-5"
        type="button">{t("Join Our Team")}
      </button>
    </div>
  )
};
export default Founders;