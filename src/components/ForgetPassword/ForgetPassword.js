import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Lock from "../../assets/icons/Lock.svg";
import { TextField } from "../Login/TextField";
import useCookieHandler from "../../hooks/useCookieHandler";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function ForgetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", color: "" });
  const { token, error, errorMessage } = useCookieHandler("user_token");

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Your email is incorrect. Check and re-enter a correct email.";
    }
    return error;
  }

  const validate = Yup.object().shape({
    email: Yup.string()
      .email("Your email is incorrect. Check and re-enter a correct email.")
      .required("Email address is required"),
  });

  const requestForgottenPassword = async (email) => {
    if (!email) return;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
      const data = await res.json();
      if (data.status === false) {
        toast.error(data.errors.email[0]);
        setMessage({
          text: data.errors.email[0],
          color: "red",
        });
        return;
      }
      toast.success(
        "Check your email for futher steps to reset your password."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      setMessage({
        text: "Check your email for futher steps to reset your password.",
        color: "green",
      });
      return "success";
    } catch (error) {}
  };

  return (
    <main className="forgetPassword_wrapper h-screen">
      <section
        className="sm:w-full sm:p-5 md:w-5/6 lg:w-3/6 
        grid grid-cols-1 gap-2 content-center text-center justify-center
        justify-items-center h-screen m-auto"
      >
        <div className="bg-[#CDDEFF] rounded-full p-2 ">
          <Lock />
        </div>

        <h1 className="text-2xl font-semibold">
          {" "}
          {t("Forgetten your password?")}{" "}
        </h1>
        <p className="w-3/4">
          {t(
            "Enter your email address. You'll be sent a link to reset your password"
          )}
        </p>

        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validate}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            requestForgottenPassword(values?.email);
          }}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
            errors,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 text-left w-3/4 mt-2"
            >
              <TextField
                // label="Email Address"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="enter your email address e.g mail@company.com"
              />
              <button
                type="submit"
                className="w-full py-2 bg-btnColor text-white rounded bg-[#0559FD] "
              >
                {t("Reset Password")}
              </button>
            </form>
          )}
        </Formik>
        <div className={`text-[${message?.color}]`}>{message?.text}</div>
        <p className="text-lg">
          {t("Remembered your password?")}
          <Link to="/Login" className="text-[#0559FD]">
            {t(" Login")}
          </Link>
        </p>
      </section>
    </main>
  );
}

export default ForgetPassword;
