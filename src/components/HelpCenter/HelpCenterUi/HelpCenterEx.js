import React from 'react';
import { useTranslation } from "react-i18next";

const HelpCenterEx = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-col justify-center items-start px-10 md:flex md:justify-start
      md:items-start md:text-left md:py-10 sm:py-10">

        <p className="text-2xl text-[#2C292C] font-semibold">{t("Recommended Articles")}</p>

        <div className="ted lg:grid lg:grid-cols-4 lg:gap-10 lg:divide-y-0 lg:justify-start md:space-y-0
        lg:content-start lg:space-y-0 md:divide-y-0 lg:px-0 md:grid md:grid-cols-2 md:gap-10 md:py-10 
        sm:divide-y sm:divide-btnColor sm:py-10 sm:space-y-10"
        >
          <div className="lg:space-y-3 md:space-y-3 sm:space-y-3">
            <p className="text-xl text-[#2C292C] font-semibold">{t("How do I check my reservation status as a quest?")}</p>
            <p className="text-base font-light">{t("You can visit bookings in your dashboard to check the status of your reservation")}</p>
            <button className="text-[#0559FD]" type="button">{t("Learn More")}</button>
          </div>

          <div className="lg:space-y-3 md:space-y-3 sm:space-y-3">
            <p className="text-xl text-[#2C292C] font-semibold">{t("How do I check my reservation status as a quest?")}</p>
            <p className="text-base font-light">{t("You can visit bookings in your dashboard to check the status of your reservation")}</p>
            <button className="text-[#0559FD]" type="button">{t("Learn More")}</button>
          </div>

          <div className="lg:space-y-3 md:space-y-3 sm:space-y-3">
            <p className="text-xl text-[#2C292C] font-semibold">{t("How do I check my reservation status as a quest?")}</p>
            <p className="text-base font-light">{t("You can visit bookings in your dashboard to check the status of your reservation")}</p>
            <button className="text-[#0559FD]" type="button">{t("Learn More")}</button>
          </div>

          <div className="lg:space-y-3 md:space-y-3 sm:space-y-3">
            <p className="text-xl text-[#2C292C] font-semibold">{t("How do I check my reservation status as a quest?")}</p>
            <p className="text-base font-light">{t("You can visit bookings in your dashboard to check the status of your reservation")}</p>
            <button className="text-[#0559FD]" type="button">{t("Learn More")}</button>
          </div>

          <div className="lg:space-y-3 md:space-y-3 sm:space-y-3">
            <p className="text-xl text-[#2C292C] font-semibold">{t("How do I check my reservation status as a quest?")}</p>
            <p className="text-base font-light">{t("You can visit bookings in your dashboard to check the status of your reservation")}</p>
            <button className="text-[#0559FD]" type="button">{t("Learn More")}</button>
          </div>

          <div className="lg:space-y-3 md:space-y-3 sm:space-y-3">
            <p className="text-xl text-[#2C292C] font-semibold">{t("How do I check my reservation status as a quest?")}</p>
            <p className="text-base font-light">{t("You can visit bookings in your dashboard to check the status of your reservation")}</p>
            <button className="text-[#0559FD]" type="button">{t("Learn More")}</button>
          </div>

          <div className="lg:space-y-3 md:space-y-3 sm:space-y-3">
            <p className="text-xl text-[#2C292C] font-semibold">{t("How do I check my reservation status as a quest?")}</p>
            <p className="text-base font-light">{t("You can visit bookings in your dashboard to check the status of your reservation")}</p>
            <button className="text-[#0559FD]" type="button">{t("Learn More")}</button>
          </div>

          <div className="lg:space-y-3 md:space-y-3 sm:space-y-3">
            <p className="text-xl text-[#2C292C] font-semibold">{t("How do I check my reservation status as a quest?")}</p>
            <p className="text-base font-light">{t("You can visit bookings in your dashboard to check the status of your reservation")}</p>
            <button className="text-[#0559FD]" type="button">{t("Learn More")}</button>
          </div>
        </div>

      </div>
      <div className=" text-[#D4D4D4]"><hr /></div>
    </>


  )
};
export default HelpCenterEx