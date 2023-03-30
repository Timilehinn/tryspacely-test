import React from "react";
import { RemoteIcon } from "../../assets/shared/RemoteIcon";
import BookingAutoComplete from "../search/auto_complete_places";

const SimpleSearchInput = ({
  type,
  value,
  noIcon,
  onChange,
  maxLength,
  placeholder,
  isAutoComplete,
  other,
}) => (
  <div
    className={`min-w-[280px] flex items-center justify-between px-2 rounded-lg ${
      isAutoComplete ? "h-[45px] mt-2" : "h-[40px]"
    } relative bg-[#fff] border-[.5px] border-[#dbdada73] hover:shadow-1fl `}
  >
    {!noIcon && (
      <RemoteIcon
        name={"Search-icon"}
        localStyles={"h-7 w-7 border border-[#fff]"}
      />
    )}
    {isAutoComplete ? (
      <div className="h-full flex-grow -mt-[30px] ">
        <BookingAutoComplete
          // noBorder
          contentBoxStyle={{ border: "solid red" }}
          styles={{
            margin: 0,
            width: "100%",
            textIndent: 0,
            border: "none",
            borderRadius: "0px",
          }}
          noAbsoulte
          placeholder={placeholder || " search auto complete"}
        />
      </div>
    ) : (
      <input
        value={value}
        onChange={onChange}
        type={type || "text"}
        maxLength={maxLength || "44"}
        placeholder={placeholder || "search..."}
        className="bg-[#fff0] h-full flex-grow placeholder:text-xs outline-none placeholder:text-[#aaaaaac9] indent-1"
        {...other}
      />
    )}
  </div>
);

export default SimpleSearchInput;
