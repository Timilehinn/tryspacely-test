import React from 'react'
import { useTranslation } from "react-i18next";

const WorkLocation = () => {
  const { t } = useTranslation()
  return (
    <main
      className='flex lg:py-8
       md:mt-10  md:leading-6 sm:pb-10 relative z-50'
    >
      <section
        className='flex flex-col
      md:ml-14 sm:bg-white md:drop-shadow-none lg:drop-shadow-none
      sm:drop-shadow-lg sm:pl-4'
      >
        <h1
          className='lg:w-96 lg:text-3xl lg:font-light text-[#0447CA]
        md:text-4xl md:mb-10 sm:mb-4 sm:text-4xl sm:mt-4'
        >
          {t("More than a workspace.")} <br /> {t("An experience")}
        </h1>
        <p className='lg:w-9/12 lg:mt-2 text-sm md:text-xl text-[#434144] md:mb-8 sm:text-xl sm:mb-4'>
          {t("We are creating an experience for every user. No need to worry about where. select from our wide range of space listings and grow your network. Stay inspired, productive, and focused.")}
        </p>

        <div
          className='lg:flex lg:content-center
        md:flex md:mt-4 md:text-2xl md:space-x-5 md:leading-5 sm:text-3xl
        sm:pb-2 sm:leading-6 sm:mb-3'
        >
          <div className='count sm:pb-6 sm:leading-7'>
            <h1 className='font-bold lg:text-4xl md:text-3xl sm:text-2xl md:mb-2'> 200,000+ </h1>
            <p className='lg:py-2 lg:text-lg text-[#5B585B] text-xl  md:text-xl sm:text-xl'>

              {t("Workspace Users")}
            </p>
          </div>
          <div className='count sm:leading-7 sm:pb-3'>
            <h1 className='font-bold lg:text-4xl md:text-3xl sm:text-2xl md:mb-2'> 200,000+ </h1>
            <p className='lg:py-2 lg:text-lg text-[#5B585B]  md:text-xl sm:text-xl'> {t("Workspace")} </p>
          </div>
          <div className='count sm:leading-7'>
            <h1 className='font-bold lg:text-4xl md:text-3xl text-2xl md:mb-2'> 1,000+ </h1>
            <p className='lg:py-2 lg:text-lg text-[#5B585B] md:text-xl  sm:text-xl'>

              {t("Workspace Owners")}
            </p>
          </div>
        </div>
      </section>

      <section className=''>
        <img className='lg:block md:hidden sm:hidden svg_img' src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/svg_world.svg' alt='world-svg' />
      </section>
    </main>
  )
}

export default WorkLocation
