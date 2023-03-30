import React from 'react'
import { useTranslation } from "react-i18next"

const TandCAside = () => {
  const list = [
    {items: "scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam"},
    {items: "scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam"},
    {items: "scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam"}
  ];
const { t } = useTranslation()
  return (
    <div
      className="flex justify-center space-x-16 xl:px-10 xl:flex-row sm:flex-col sm:px-5 lg:flex-row md:px-10 md:flex-col lg:px-10 mt-10 ">
      <div className="xl:flex xl:flex-row xl:space-x-10  justify-center lg:flex-col">
        <div className="text-lg sm:pb-6 md:pb-6 lg:pb-6">
          <p>{t("Getting Started")}</p>
          <p className="text-[#0559FD]  border-l-2 border-[#0559FD] pl-2">{t("User Guidelines")}</p>
          <p>{t("About TryBookings")}</p>
          <p>{t("Listing Guidelines")}</p>
          <p>{t("Reservation Guidelines")}</p>
          <p className="font-bold">{t("Legal")}</p>
          <p className="font-bold">{t("Assistance")}</p>
        </div>
        <section className="flex flex-col justify-center space-y-2 ">
          <div>
            <h1 className="text-[#434144 text-3xl font-bold] pb-4">{t("Terms & Conditions")}</h1>
            <p className="text-xl">{t("Effective date: December 19, 2020")}</p>
          </div>
          <div><hr/></div>
          <div className="tandc xl:w-[60rem] lg:w-[40rem] space-y-3">
            <h1 className="text-black font-semibold text-lg">{t("Welcome to TryBookings Community")}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Velit scelerisque in dictum non consectetur a erat. Egestas diam in arcu cursus
              euismod
              quis.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Viverra orci sagittis eu volutpat odio facilisis mauris sit.</p>
            <h1 className="text-[#141115] font-semibold text-lg">{t("Cookies")}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Viverra orci sagittis eu volutpat odio facilisis mauris sit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.</p>
            <h1 className="text-[#141115] font-semibold text-lg">{t("License")}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. In hac habitasse platea dictumst.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.</p>
            <h1 className="text-[#141115] font-semibold text-lg">{t("Hyperlinking to our Content")}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Bibendum at varius vel pharetra vel.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.</p>
            <h1 className="text-[#141115] font-semibold text-lg">{t("Content Liability")}</h1>
            <p>Lorem ipsum dolor sit amet
              , consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi sit
              amet
              mauris commodo.>
            </p>
            <p>LoremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et
              dolore magna aliqua. Amet risus nullam eget felis eget. ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <h1 className="text-[#141115] font-semibold text-lg">{t("iFrames")}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Mi quis hendrerit dolor magna eget est lorem ipsum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.</p>
            <h1 className="text-[#141115] font-semibold text-lg">{t("Your Privacy")}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Amet risus nullam eget felis eget.</p>
            <h1> {t("Reservation of Rights")}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Amet risus nullam eget felis eget.</p>
            <h1 className="text-[#141115] font-semibold text-lg">{t("Removal of Links from our Website")}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Amet risus nullam eget felis eget.</p>
            <h1 className="text-[#141115] font-semibold text-lg">{t("Disclaimer")}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Amet risus nullam eget felis eget.</p>
            <div className="px-4 space-y-2 text-base">
              <ul>
                {list.map((list) => (
                  <li>{list.items}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section className="text-[#428BF9] space-y-3 md:px-0 text-base mt-20 xl:block lg:block hidden">
        <p className="text-black">{t("In this article")}</p>
        <p>{t("Welcome to TryBookings Community")}</p>
        <p>{t("Cookies")}</p>
        <p>{t("License")}</p>
        <p>{t("Hyperlinking to our Content")}</p>
        <p>{t("iFrames")}</p>
        <p>{t("Content Liability")}</p>
        <p>{t("Your Privacy")}</p>
        <p>{t("Reservation of Rights")}</p>
        <p>{t("Removal of links from our website")}</p>
        <p>{t("Disclaimer")}</p>
      </section>
    </div>
  )
}
export default TandCAside