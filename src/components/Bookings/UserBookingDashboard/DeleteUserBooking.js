import React from 'react'
import OverviewSidebar from '../../Overview/OverviewUI/OverviewSidebar'
import { useTranslation } from "react-i18next";

const DeleteUserBooking = () => {
  const { t } = useTranslation()
  return (
    <div className="flex overflow-hidden w-full">
      <OverviewSidebar />  
      <div className="w-full h-screen flex justify-center items-center bg-[#ffffff]">
          <div className="w-[40%] p-[10px] bg-[#ffffff]">
              <div className="w-full">
                  <img src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/Delete.svg" alt="cancel-icon" />
              </div>
              <div className="font-500 text-[14px] font-[Plus Jakarta Display] text-[#141115]">{t("Cancel your Booking?")}</div>
              <div className="font-400 text-[10px] font-[Plus Jakarta Display] text-[#2C292C]">{t("You are about to cancel your booking. You would not be refunded.")}</div>
              <div className="flex justify-end mt-[20px] items-center w-full space-x-2">
                    <div className="py-[10px] px-[20px] flex justify-center items-center border-[2px] rounded-md cursor-pointer text-[#727073] font-500 text-[10px] font-[Plus Jakarta Display bg-[#fcfcfc]">{t("Cancel")}</div>
                    <div className="py-[10px] px-[20px] flex justify-center items-center border rounded-md cursor-pointer text-[#ffffff] font-500 text-[10px] font-[Plus Jakarta Display] bg-[#DA3D2A]">{t("Cancel")}</div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default DeleteUserBooking