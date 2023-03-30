import React from 'react'
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex flex-col justify-center items-center pb-10 relative">
      <h1 className="text-[#ED254E] text-3xl font-bold absolute z-40 lg:top-44 md:top-20 sm:top-14">ERROR 404</h1>
      <img className="w-10/12 pt-10" src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/404.svg" alt="404" />
      <h1 className="text-[#141115] text-2xl font-bold pt-5">Page Not Found</h1>
      <p className="text-lg text-[#5B585B] text-center w-[30rem] lg:px-0 md:px-0 sm:px-10">Oops! Looks like you followed
        a bad link. If you think this is a problem with us, please tell us.</p>

      <Link to="/" className="px-10 py-3 text-white bg-[#0559FD] mt-5 rounded">
        <button>Go Home</button>
      </Link>
    </div>
  )
}
export default Error404;