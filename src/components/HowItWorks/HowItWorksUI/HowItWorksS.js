// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { useTranslation } from "react-i18next";
// import Header from "../homepage/ui/header";
// import { Design } from "./ui/SignupAside";
// import { ChatButton } from "./ui/ChatButton";
// import { TextField } from "../Login/TextField";
// import {
//   setSignupEmail,
//   getSignupEmail,
//   setSignUpBody,
//   getIsOauthObj,
// } from "../../slices/authRelated";
// import { useSelector, useDispatch } from "react-redux";
//
//
// const initialValues = {
//   firstName: "",
//   lastName: "",
//   username: "",
//   password: "",
//   confirmPassword: "",
// };
//
// export const HowItWorksS = (props) => {
//   const dispatch = useDispatch();
//   const signupEmail = useSelector(getSignupEmail);
//   const isOauthObj = useSelector(getIsOauthObj);
//   const [message, setMessage] = useState("");
//
//   const validate =
//     isOauthObj?.usingSocial === false
//       ? Yup.object().shape({
//         firstName: Yup.string()
//           .max(15, "Must be 15 characters or less")
//           .required("Firstname is required"),
//         lastName: Yup.string()
//           .max(20, "Must be 20 characters or less")
//           .required("Lastname is required"),
//         username: Yup.string()
//           .max(15, "Must be 15 characters or less")
//           .required("Username is required"),
//         password: Yup.string().required(
//           "Your password is incorrect. Check and re-enter a correct password."
//         ),
//         confirmPassword: Yup.string().when("password", {
//           is: (val) => (val && val.length > 0 ? true : false),
//           then: Yup.string().oneOf(
//             [Yup.ref("password")],
//             "Password does not match"
//           ),
//         }),
//       })
//       : null;
//
//   const checks = async (values, next, setSubmitting, resetForm) => {
//     setMessage("");
//     const upperCaseWords = await values?.password.match(/[A-Z]/g);
//     const isNumberPresent = await values?.password.match(/[0-9]/g);
//     const lowerCaseWords = await values?.password.match(/[a-z]/g);
//     const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//     const isSpecialChar = specialChars.test(values?.password);
//
//     if (!upperCaseWords) {
//       setMessage("Passwords must have at least one Uppercase letter.");
//       return;
//     }
//
//     if (!lowerCaseWords) {
//       setMessage("Passwords must have at least one Lowercase letter.");
//       return;
//     }
//
//     if (!isNumberPresent) {
//       setMessage("Passwords must have at least one number.");
//       return;
//     }
//
//     if (!isSpecialChar) {
//       setMessage("Passwords must have at least one Symbol.");
//       return;
//     }
//
//     if (values?.password.length < 8) {
//       setMessage("Passwords must be at least 8 characters long.");
//       return;
//     }
//     const result = await checkIfCanContinueWithPassword(values?.password);
//     if(result.status === true){
//       dispatch(setSignUpBody(values));
//       next(values);
//       setSubmitting(true);
//       setTimeout(() => {
//         resetForm();
//         setSubmitting(false);
//       }, 500);
//     }
//   };
//
//   const checkIfCanContinueWithPassword = async(password, nextStep, value) => {
//     const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/signup/validatepassword`,  {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({
//         password,
//       }),
//     });
//     const data = await response.json();
//     if(data.status === true){
//       // dispatch(setSignupEmail(email));
//       // nextStep(value)
//       return {
//         status: true,
//         message:''
//       }
//     }
//
//     let message = data?.errors?.password[0]
//     setMessage(data?.errors?.password[0])
//     return {
//       status: false,
//       message:''
//     }
//   }
//   const { t } = useTranslation()
//   return (
//     <div className="lg:h-screen ">
//       <Header />
//       <main className="sm:grid sm:grid-cols-1 md:grid md:grid-cols-1 lg:flex">
//         <Design />
//
//         <section
//           className=" sm:px-10 sm:py-10 md:px-10 md:py-10 lg:grid lg:grid-cols-1 lg:content-center
//         lg:h-screen lg:w-[60%] lg:px-24  relative"
//         >
//           <h1 className="text-black capitalize text-lg font-semibold lg:text-left ">
//             {" "}
//             create new account{" "}
//           </h1>
//
//           <p className="text-base my-0 text-[#34475E] ">
//
//             {t("A place to connect and work close to home")}
//           </p>
//
//           <div className="email_wrapper flex flex-col my-5">
//             <span className="text-btnColor text-base"> {("Email Address")} </span>
//             <span className="text-base font-semibold">
//               {" "}
//               {signupEmail && signupEmail}
//             </span>
//           </div>
//
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validate}
//             onSubmit={(values, { setSubmitting, resetForm }) => {
//               if (isOauthObj?.usingSocial === true) {
//                 dispatch(setSignUpBody(values));
//                 props.next(values);
//                 setSubmitting(true);
//                 setTimeout(() => {
//                   resetForm();
//                   setSubmitting(false);
//                 }, 500);
//                 return;
//               }
//               checks(values, props.next, setSubmitting, resetForm);
//             }}
//           >
//             {({ values, handleChange }) => {
//               return (
//                 <Form className="w-full">
//                   <div className="names grid grid-cols-2 content-center my-2 gap-3">
//                     <div className="firstName">
//                       <TextField
//                         label="First Name"
//                         name="firstName"
//                         type="text"
//                         onChange={handleChange}
//                         value={values.firstName}
//                         placeholder="Enter your first name"
//                       />
//                     </div>
//
//                     <div className="lastName">
//                       <TextField
//                         label="Last Name"
//                         name="lastName"
//                         type="text"
//                         onChange={handleChange}
//                         value={values.lastName}
//                         placeholder="Enter your last name"
//                       />
//                     </div>
//                   </div>
//
//                   <div className="username">
//                     <TextField
//                       label="User Name"
//                       name="username"
//                       type="text"
//                       onChange={handleChange}
//                       value={values.username}
//                       placeholder="Enter your username"
//                     />
//                   </div>
//
//                   {isOauthObj?.usingSocial === false && (
//                     <div className="password">
//                       <TextField
//                         label="Password"
//                         type="password"
//                         name="password"
//                         onChange={handleChange}
//                         value={values.password}
//                         placeholder="*******"
//                       />
//                     </div>
//                   )}
//
//                   {isOauthObj?.usingSocial === false && (
//                     <div className="password">
//                       <TextField
//                         label="Password"
//                         type="password"
//                         name="confirmPassword"
//                         onChange={handleChange}
//                         value={values.confirmPassword}
//                         placeholder="*******"
//                       />
//                     </div>
//                   )}
//
//                   <ul className="text-sm list-disc ml-5 text-btnColor">
//                     <li>
//
//                       {t("Password should contain a uppercase letter, numer or special character")}
//                     </li>
//                     <li> {t("Password must be at least 8 characters long")} </li>
//                   </ul>
//                   {message && (
//                     <div
//                       style={{
//                         width: "100%",
//                         height: "40px",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         color: "red",
//                       }}
//                     >
//                       {message}
//                     </div>
//                   )}
//                   <button
//                     type="submit"
//                     className="rounded bg-gray-500 py-2
//                 bg-btnColor my-3 text-white hover:bg-blue-500
//                 w-full outline-none"
//                   >
//                     {t("Continue")}
//                   </button>
//
//                   <p className="my-4 text-center font-semibold mt-4 ">
//                     {t("Already have an account?")}
//                     <Link to="/login" className="text-blue-500">
//                       {t("(Login")}
//                     </Link>
//                   </p>
//                 </Form>
//               );
//             }}
//           </Formik>
//
//           <ChatButton />
//         </section>
//       </main>
//     </div>
//   );
// };
