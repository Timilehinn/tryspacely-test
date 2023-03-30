import React from "react";
import SearchIcon from "../../svgs/Search.svg";
// import AutoCompletePlaces from "../homepage/ui/auto_complete_places";
import BookingAutoComplete from "./auto_complete_places";

const SearchField = ({
  value,
  name,
  onChange = (e) => {},
  onBlur = () => {},
  placeholder,
  width = 285,
  style,
}) => {
  return (
    <div
      className="input bg-white relative my-5"
      // style={{ width: `${width}px`, display: "flex" }}
    >
      <SearchIcon className=" cursor-pointer absolute left-[6px] top-[5px] z-10" />
      {/* <input
        type="search"
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="p-3 border-hidden focus-within:outline-none input__search"
      /> */}
      <div style={style}>
        <BookingAutoComplete
          noAbsoulte={true}
          placeholder="Enter location, eg Lagos"
        />
      </div>
    </div>
  );
};

export default SearchField;
