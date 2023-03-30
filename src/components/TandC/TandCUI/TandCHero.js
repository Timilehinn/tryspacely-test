import React from 'react'
import { useTranslation } from "react-i18next";


const TandCHero = () => {
  const { t } = useTranslation()
  return (
    <div className="flex xl:space-x-4 sm:space-x-3 sm:px-2 items-center lg:px-10 md:px-10 xl:px-20 mt-10">
      <div className="font-semibold text-lg">{t("Help Center")}</div>
       <div><i className="fas fa-angle-right"></i></div>
      <div className="font-light">{t("User Guidelines")}</div>
      <div><i className="fas fa-angle-right"></i></div>
      <div className="font-light">{t("Community Guidelines")}</div>

    </div>

  )
}
export default TandCHero