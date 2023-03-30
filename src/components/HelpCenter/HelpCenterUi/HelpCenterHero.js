import React from "react";
import { useTranslation } from "react-i18next";


const HelpCenterHero = () => {
  const { t } = useTranslation()

  return (
    <div className="bg-gradient-to-b from-[#CDDEFF] to-[#F2F2F2] w-full overflow-hidden">
      <section className="lg:flex lg:justify-center lg:items-center lg:flex-col pt-16 mb-4
      md:flex md:justify-center md:items-center md:flex-col sm:flex sm:justify-center sm:items-center sm:flex-col"
      >
        <h1 className="text-3xl font-semibold text-[#141115] pb-5">{t("Hello, how can we help you?")}</h1>
        <div className="relative ">

          <input className="lg:w-[60rem]  lg:h-[4rem] md:w-[44rem] md:h-[4rem] sm:w-[24rem] sm:h-[4rem] pl-4 bg-white rounded  placeholder:text-lg
           outline-0 placeholder:font-light drop-shadow-xl  border-none" type="text" placeholder="Ask a question..." maxLength="60"/>
          <button className="absolute z-30 right-4 top-3 py-2 px-5 rounded-lg bg-[#0559FD] text-lg text-white">{t("Search")}
          </button>
        </div>
      </section>

      <section className="pet lg:flex lg:flex-col lg:justify-center lg:items-center mt-8 pb-4 w-full
      md:flex md:flex-col md:justify-center md:items-center sm:flex md:flex-col sm:justify-center sm:items-center sm:flex-col">
        <p className="text-xl text-[#727073] font-light sm:text-center sm:px-8">{t("or quickly choose a category to find the help you need")}</p>
        <div className="det lg:flex md:grid  lg:w-full md:grid-cols-2 md:gap-4 md:justify-center
        md:items-center lg:space-x-6 md:space-x-0 lg:pt-8 md:pt-4 sm:pt-4  lg:gap-0 lg:space-y-0 md:space-y-0 sm:space-y-4"
        >

          <div className="nxt jeg drop-shadow-2xl bg-white lg:w-[22rem] lg:h-[12rem] md:h-[12rem] sm:h-[12rem] md:w-[22rem] sm:w-[22rem] rounded-lg
          flex flex-col justify-center items-center">
            <img className="h-[10rem]" src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl-chilling.svg" alt="chilling-girl"/>

            <p className="pb-3 hex">{t("Getting Started")}</p>
          </div>

          <div className="jeg drop-shadow-xl bg-white lg:w-[22rem] md:w-[22rem] sm:w-[22rem] rounded-lg flex flex-col justify-center items-center">
            <img className="h-[10rem]" src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/remote-work.svg" alt="remote"/>
            <p className="pb-3 hex">{t("User Guidelines")}</p>
          </div>
          <div className="jeg drop-shadow-2xl bg-white  lg:w-[22rem] md:w-[22rem] sm:w-[22rem] rounded-lg flex flex-col justify-center items-center">
            <img className="h-[10rem] w-[6rem] hed" src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/super-hero.svg" alt="super-hero"/>
            <p className="pb-3 hex">{t("Legal")}</p>
          </div>
          <div className="asx jeg  drop-shadow-2xl bg-white lg:w-[22rem] md:w-[22rem] sm:w-[22rem] rounded-lg flex flex-col justify-center items-center">
            <img className="h-[10rem]" src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl-chatting-with-friends.svg" alt="chatting-girl"/>

            <p className="text-center pb-3 hex">{t("Assistance")}</p>
          </div>
        </div>
      </section>


    </div>
  )
};
export default HelpCenterHero;