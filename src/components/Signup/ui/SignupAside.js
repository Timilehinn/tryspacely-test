import React from 'react'
import { useTranslation } from "react-i18next";

export const Design = () => {
  const { t } = useTranslation()
  return (
    <div
      className='bg-gradient-to-b from-[#E140E9B5] to-[#0559FD] 
        sm:py-20 sm:text-white sm:text-center sm:w-screen md:py-28 lg:h-screen lg:grid lg:grid-cols-1
        lg:content-center lg:text-left lg:px-8 lg:w-[40%] lg:py-14
        xl:h-screen '
    >
      <h1
        className='sm:text-2xl sm:font-semibold 
        md:text-3xl md:font-semibold lg:text-3xl
        lg:font-medium text-white'
      >

        {t("Discover a Community of Developers & Creatives")}
      </h1>
      <p
        className='sm:my-4 sm:w-full sm:px-5 
        md:w-full md:m-auto md:text-xl md:my-4
        md:px-5 lg:my-4 lg:text-xl lg:px-0 '
      >
        {t("Be part of a community of developers, share their spaces, network and meet mentors and mentees")}
      </p>
    </div>
  )
}
