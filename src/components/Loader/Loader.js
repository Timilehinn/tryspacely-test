import React from "react";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import Header from "../homepage/ui/header";
import { useState, CSSProperties } from "react";
import BarLoader from "react-spinners/BarLoader";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const Loader = ({
  successful,
  failure,
  isLoading,
  redirectTo,
  customMessage,
  noAuth,
  redirectBack,
}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { success, errorAuth, loadingfinished } = useProtectedRoute();
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("blue");

  const navigateFunction = () => {
    if (redirectBack) {
      cookies.set("redirect_back_val", redirectBack, {
        path: "/",
        maxAge: 700,
      });
    }
    navigate(`/${redirectTo}`);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "120vh",
          width: "120vw",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "whitesmoke",
          zIndex: 1000,
          paddingRight: "20vw",
        }}
      >
        <BarLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
        />
      </div>
    );
  }
  if (errorAuth && loadingfinished && !noAuth) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "120vh",
          width: "120vw",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "whitesmoke",
          zIndex: 1000,
          paddingRight: "20vw",
        }}
      >
        <h1 className="text-[#dc2626] font-bold text-xl ">
          {customMessage
            ? customMessage
            : "Sorry, you are not authenticated. Go back to login."}
        </h1>
        <button
          onClick={navigateFunction}
          className="bg-blue-600 hover:bg-sky-700 active:opacity-0 pl-5 pr-5 pt-2 pb-2 mt-10 cursor-pointer border-radius-10 rounded text-[white]"
        >
          Go to {`${redirectTo}`}
        </button>
      </div>
    );
  }

  if (failure) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "120vh",
          width: "120vw",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "whitesmoke",
          zIndex: 1000,
          paddingRight: "20vw",
        }}
      >
        <h1 className="text-[#dc2626] font-bold text-xl ">
          {customMessage ? customMessage : "Sorry, something went wrong"}
        </h1>
        <button
          onClick={navigateFunction}
          className="bg-blue-600 hover:bg-sky-700 active:opacity-0 pl-5 pr-5 pt-2 pb-2 mt-10 cursor-pointer border-radius-10 rounded text-[white]"
        >
          Go to {`${redirectTo}`}
        </button>
      </div>
    );
  }

  return <div></div>;
};

export default Loader;

export const DashboardLoader = ({
  isLoading,
  error,
  redirectTo,
  customMessage,
  redirectBack,
}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { success, errorAuth, loadingfinished } = useProtectedRoute();
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("blue");

  const navigateFunction = () => {
    if (redirectBack) {
      cookies.set("redirect_back_val", redirectBack, {
        path: "/",
        maxAge: 700,
      });
    }
    navigate(`/${redirectTo}`);
  };

  if (isLoading) {
    return (
      <div
        //   className="flex items-center justify-center h-[100%] w-[100%] bg-[whitesmoke]"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "whitesmoke",
        }}
      >
        <BarLoader
          color={color}
          loading={loading}
          //   cssOverride={override}
          size={150}
        />
      </div>
    );
  }
  // if(errorAuth && loadingfinished && !noAuth){
  //     return (
  //         <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',  height:'120vh', width:'120vw', position:'fixed', top:0, left:0,bottom:0, right:0,  backgroundColor:'whitesmoke', zIndex:1000, paddingRight:'20vw'  }} >
  //             <h1 className='text-[#dc2626] font-bold text-xl '>
  //                 {customMessage ? customMessage : 'Sorry, you are not authenticated. Go back to login.'}
  //             </h1>
  //             <button onClick={navigateFunction} className='bg-blue-600 hover:bg-sky-700 active:opacity-0 pl-5 pr-5 pt-2 pb-2 mt-10 cursor-pointer border-radius-10 rounded text-[white]'>Go to {`${redirectTo}`}</button>
  //         </div>
  //     )
  // }

  // if(failure){
  //     return (
  //         <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',  height:'120vh', width:'120vw', position:'fixed', top:0, left:0,bottom:0, right:0,  backgroundColor:'whitesmoke', zIndex:1000, paddingRight:'20vw'  }} >
  //             <h1 className='text-[#dc2626] font-bold text-xl '>
  //                 {customMessage ? customMessage : 'Sorry, something went wrong'}
  //             </h1>
  //             <button onClick={navigateFunction} className='bg-blue-600 hover:bg-sky-700 active:opacity-0 pl-5 pr-5 pt-2 pb-2 mt-10 cursor-pointer border-radius-10 rounded text-[white]'>Go to {`${redirectTo}`}</button>
  //         </div>
  //     )
  // }

  return <div></div>;
};
