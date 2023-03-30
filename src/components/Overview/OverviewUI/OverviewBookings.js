import React from "react";
import moment from "moment/moment";

import useRandomColor from "../../../hooks/randomColor";
import { useTranslation } from "react-i18next";

const OverviewBookings = ({ bookings }) => {
  const colors = useRandomColor();
  const { t } = useTranslation();

  return (
    <div className=" flex flex-col gap-3 lg:p-4 lg:my-4 lg:h-auto md:my-2 md:p-4 md:h-[370px] sm:h-[350px] sm:my-2 sm:p-4 shadow-2fl rounded-md">
      <p className="font-medium text-2xl"> {t("Bookings")} </p>
      {bookings?.length !== 0 ? (
        bookings
          ?.filter((x) => {
            const currentDate = new Date(x.bookings[0]?.start_date);
            return new Date(x.bookings[0]?.start_date) - new Date() > 1;
          })
          .slice(0, 4)
          .map((data, index) => (
            <div
              className="flex justify-between items-start h-[70px] shadow-2fl rounded-md mx-1 p-2 border-l-4 border-{color}"
              style={{ borderColor: colors[index] }}
              key={data.id}
            >
              <div className="flex flex-col">
                <span className="font-medium text-[16px]">
                  {" "}
                  {data.bookings[0]?.workspace?.name}
                </span>
                <span className="text-[13px]">
                  {" "}
                  {moment(data.bookings[0]?.start_date).format("L")} -{" "}
                  {moment(data.bookings[0]?.end_date).format("L")}{" "}
                </span>
              </div>

              <span className="text-[16px]">
                {" "}
                {moment(data.bookings[0]?.start_date).fromNow()}{" "}
              </span>
            </div>
          ))
      ) : (
        <div className="text-center lg:h-auto md:h-[270px] sm:h-[220px]">
          <img
            className="w-14 mx-auto"
            src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/Inbox1.svg"
            alt="inbox"
          />
          <p className="text-[20px] font-medium"> {t("No Bookings Yet!")} </p>
          <p> {t("Your bookings will be displayed here")} </p>
        </div>
      )}
    </div>
  );
};
export default OverviewBookings;
