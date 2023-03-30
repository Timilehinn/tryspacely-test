
// import React from "react";
// import {Form, Formik} from 'formik'
// import {useTranslation} from "react-i18next";
// import {useState} from "react";
// import {toast} from "react-toastify";
// import {setSignupEmail, setToken} from "../../../slices/authRelated";
// import {TextField} from "../../Login/TextField";
// import {useDispatch} from "react-redux";
// import * as Yup from "yup";
// import {Link, useNavigate} from "react-router-dom";
// import Signup from "../../Signup/Signup";
// import {SignupDetails} from "../../Signup/SignupDetails";
// import Account_Setup from "../../Signup/AccountSetup";
// import Workspace_Address from "../../Signup/Workspace_Address";
// import Job_Role from "../../Signup/Job_Role";
// import {SignupDetailsForm} from "../../Signup/ui/SignupForm";
//
// export default function HowItWorksHero(props) {
//   const [email, setEmail] = useState('')
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {t} = useTranslation()
//   //const [toast, setToast] = useState("");
//
//
//   const sendingEmail = async (email, nextStep, value) => {
//     const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/signup/verifyemail`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//       }),
//     });
//     const data = await response.json();
//     toast.success('Email sent successfully');
//     if (data.status === true) {
//       dispatch(setSignupEmail(email?.value));
//       nextStep(value)
//       return {
//         status: true,
//         message: '',
//
//       }
//
//     }
//
//     let message = data?.errors?.email[0]
//     setToast(data?.errors?.email[0])
//     return {
//       status: false,
//       message: ''
//     }
//
//
//   }
//
//
//
//
//
//   const validate = Yup.object().shape({
//     email: Yup.string()
//       .email("Your email is incorrect. Check and re-enter a correct email.")
//       .required("Email address is required"),
//   });
//
//
//
//   return (
//     <>
//       <div className="h-bg absolute top-0  h-bg bg-gradient-to-b from-[#0559FD] to-[#E034E8] "
//            style={{backgroundImage: "url(https://trybookings-assets.s3.eu-west-2.amazonaws.com/howitworks.jpeg)"}}>
//       </div>
//
//       <div className="flex flex-col relative z-40 justify-center items-center mt-44 w-full">
//         <h1
//           className="lg:text-5xl md:text-2xl sm:text-2xl font-bold pb-4 text-white text-center">{t("Monetize Your Space")}</h1>
//         <p
//           className="text-lg pb-4 text-white text-center">{t("Share your workspace and unlock new experiences and network while you make money")}</p>
//
//
//         <Formik
//           initialValues={{
//             email: "",
//           }}
//           validationSchema={validate}
//           onSubmit={(values) => {
//             // if (
//             //   isOauthSigned?.usingSocial === true &&
//             //   isOauthSigned?.provider === "github"
//             // ) {
//             //   githubSignup(
//             //     values?.email,
//             //     isOauthSigned?.providerId,
//             //     isOauthSigned?.provider
//             //   );
//             //   return;
//             // }
//             sendingEmail(values?.email, props.next, values)
//             // props.next(values);
//           }}
//         >
//           {({values, handleChange}) => {
//             return (
//               <Form className="relative style={{ zIndex: 1000 }}">
//                 <TextField
//                   label="Email Address"
//                   name="email"
//                   type="email"
//                   onChange={handleChange}
//                   value={values.email}
//                   placeholder="Email Address" maxLength="96"
//                   className="hep lg:w-[60rem]  lg:h-[4rem] md:w-[44rem] md:h-[4rem]
//                 sm:w-[20rem] sm:h-[4rem] bg-white rounded indent-4 placeholder:text-lg
//                    outline-0 placeholder:font-light drop-shadow-xl border-none"
//                 />
//
//                 <button
//                   className="absolute z-30 right-3 top-4 py-2 px-5 rounded-lg
//                   hover:bg-green-500 bg-[#0559FD] text-lg text-white font-light">{t("Get started")}
//                 </button>
//
//               </Form>
//
//             );
//           }}
//         </Formik>
//       </div>
//     </>
//   )
// }
