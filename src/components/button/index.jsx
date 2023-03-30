import React from 'react';
import clsx from "clsx";
import Spacer from '../spacer';

const Button = ({
  label,
  handleClick = e => null,
  type = "button",
  icon,
  height,
  isActive = false,
  disabled = false,
  variant,
  width,
  extraClass,
  size
}) => (
  <button
    onClick={handleClick}
    type={type}
    style={{ width: size === "full" ? "100%": `${width}px`, height: `${height}px` }}
    // disabled={disabled}
    className={clsx({
      [`flex gap-x-2 px-3 btn ${extraClass}`]: true,
      ["btn__primary"]: isActive,
      ["primary"]: variant === "primary",
      ["outline"]: variant === "outline",
      ["tertiary"]: variant === "tertiary"
    })}
  >
    {icon !== null && icon } 
    {label}
  </button>
);

export default Button;
