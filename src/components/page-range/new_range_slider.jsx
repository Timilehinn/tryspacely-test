import React, { useState } from "react";
import { Range } from "react-range";
import EmptyStar from "../../svgs/Star-empty.svg";
import FullStar from "../../svgs/full-star.svg";
import Rating from "react-rating";

const RangeSlider = ({
  min,
  max,
  step,
  values,
  setValues,
  title = "Title",
  subTitle,
  isRating,
  setTriggerPriceFilter,
  setTriggerDistanceFilter,
  focusPoint,
}) => {
  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={values}
      onChange={(value) => {
        title === "Price Range" && setTriggerPriceFilter(true);
        title === "Distance Proximity" && setTriggerDistanceFilter(true);
        setValues(value);
      }}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            marginTop: "130px",
            marginBottom: "90px",
            height: "6px",
            width: "80%",
            marginLeft: "2%",
            backgroundColor: "#ccc",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-90px",
              width: "100%",
              marginLeft: "-3%",
            }}
          >
            <p className="text-md font-light py-3">{title}</p>
            {subTitle && <p className="text-md italic">{subTitle}</p>}
            {isRating && (
              <Rating
                readonly
                initialRating={values[0]}
                emptySymbol={<EmptyStar className="space-x-6 w-4" />}
                fullSymbol={<FullStar />}
              />
            )}
            {!isRating && (
              <div
                style={{
                  position: "relative",
                  top: "",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p className="text-[15px] font-bold">{values[0]}</p>

                <p className="text-[15px] font-bold">{values[1]}</p>
              </div>
            )}
          </div>

          {children}
        </div>
      )}
      renderThumb={({ props }) => {
        return (
          <div
            {...props}
            style={{
              ...props.style,
              height: "15px",
              width: "15px",
              backgroundColor: "#1f1f1f",
            }}
          />
        );
      }}
    />
  );
};

export default RangeSlider;
