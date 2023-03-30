import React from "react";
import { ErrorMessage, useField } from "formik";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="my-2">
      <label htmlFor={field.name} className="font-semibold">
        {label}
      </label>
      <input
        className={`placeholder:italic form-control border-2 border-[#D4D4D4] 
          rounded w-full indent-3 h-[56px] p-0 outline-none 
          shadow-none focus:border-[#0559FD] my-2
          ${meta.touched && meta.error && "is-invalid"}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="span"
        name={field.name}
        className="error my-2 text-[#DA3D2A] "
      />
    </div>
  );
};
