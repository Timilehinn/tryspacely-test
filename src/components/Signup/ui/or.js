import React from "react";

export const OrStyling = () => {
  return (
    <p
      className="or text-center text-lg
        sm:relative sm:before:absolute sm:before:w-28 sm:before:border-b-2
        sm:before:border-borderColor sm:before:left-0 sm:before:top-3 
        sm:after:absolute sm:after:w-28 sm:after:border-b-2 
        sm:after:border-borderColor sm:after:right-0 sm:after:top-3
        md:after:w-80 md:before:w-80 lg:after:w-40 lg:before:w-40 xl:after:w-2/5 xl:before:w-2/5 "
    >

      {("or")}
    </p>
  );
};
