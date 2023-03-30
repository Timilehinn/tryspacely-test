import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";
import GitHubLogin from "react-github-login";
import LoginGithub from "react-login-github";
import { useTranslation } from "react-i18next";

// SVG Icons
import Github from "../../../assets/icons/Github.svg";
import Cookies from "universal-cookie";
import Gmail from "../../../assets/icons/Gmail.svg";
import useGithubAuth from "../../../hooks/useGithubAuth";
import { refreshTokenSetup } from "../../../utils/refreshToken";

const clientId = `${process.env.GOOGLE_CLIENT_ID}`;

export const SocialLogin = ({ isOauthSigned, setIsOauthSigned, setToast }) => {
  const [code, setCode] = useState(null);
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('Signup with Gmail');
  const cookies = new Cookies();
  const [accountActivatorPopOver, setAccountActivatorPopOver] = useState(false);
  const { token } = useGithubAuth(
    code,
    process.env.GITHUB_SECRET_KEY,
    "signup",
    setToast,
    setAccountActivatorPopOver
  );
  const { t } = useTranslation()

  useEffect(() => { }, [isOauthSigned]);

  const onSuccessGit = (response) => {
    console.log(response, "as response")
    try {
      setCode(response?.code);
    } catch (error) {
    }
  };
  
  const onFailureGit = (response) => {
    console.log(response, "as response from failure of git signin")
  };

  const sendGoogleSignupRequest = async (
    first_name,
    last_name,
    email,
    providerId,
    provider
  ) => {
    
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/signup/oauth`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            providerId,
            provider,
          }),
        }
      );
      const data = await res.json();
      if (data?.status === false) {
        setButtonText('Signup with Gmail')
        let message = data?.errors?.email ?? "Unable to signup at this time.";
        setToast(message);
        return;
      }
      setButtonText('Signup Success!')
      setToast("Signup successful. We wil redirect you to the app now.");
      console.log(data?.token, "as token gotten 3")
      cookies.set("user_token", data?.data?.token, {
        path: "/",
        maxAge: 2600000,
        sameSite: "none",
        secure: true,
      });
      setTimeout(() => {
        const isToRedirect = cookies.get('redirect_back_val');
        if (isToRedirect) {
          navigate(`/${isToRedirect}`)
          cookies.remove('redirect_back_val')
          return;
        }
        navigate('/dashboard');
      }, 3000);
    } catch (error) { setButtonText('Signup with Gmail') }
  };

  const onSuccess = (res) => {
    setButtonText('Processing....')
    sendGoogleSignupRequest(
      res.profileObj?.givenName,
      res.profileObj?.familyName,
      res.profileObj?.email,
      res.profileObj?.googleId,
      "google"
    );
    setIsOauthSigned({
      email: res.profileObj?.email,
      provider: "google",
      providerId: res.profileObj?.googleId,
      usingSocial: true,
      firstName: res.profileObj?.givenName,
      lastName: res.profileObj?.familyName,
    });
    // navigate('/signupdetails')
    refreshTokenSetup(res);
  }

  // const onFailure = (res) => {
  //   alert(`Failed to login. Enter using your email`);
  // };

  const { signIn } = useGoogleLogin({
    onSuccess,
    // onFailure,
    clientId,
    isSignedIn: false,
    accessType: "offline",
  });

  return (
    <div className="grid grid-cols-1 align-middle justify-center gap-3 lg:py-10 md:py-5 sm:py-5 ">
      <button
        onClick={signIn}
        className="border-2 border-[#D4D4D4] w-full py-2 lg:h-[64px]
        bg-transparent rounded shadow-none lg:flex lg:justify-center 
        lg:items-center lg:gap-4 md:gap-4 md:flex md:justify-center md:h-[60px]
        md:items-center sm:flex sm:justify-center sm:items-center sm:gap-4 "
      >
        <Gmail />
        {t(buttonText)}
      </button>

      <button
        className="border-2 border-[#D4D4D4] w-full py-2 lg:h-[64px]
        bg-transparent rounded shadow-none lg:flex lg:justify-center 
        lg:items-center lg:gap-4 md:gap-4 md:flex md:justify-center md:h-[60px]
        md:items-center sm:flex sm:justify-center sm:items-center sm:gap-4 "
      >
        <Github />
        <LoginGithub
          redirectUri={`${process.env.WEBSITE_URL_DEV}/login`}
          clientId={process.env.GITHUB_CLIENT_ID}
          onSuccess={onSuccessGit}
          onFailure={onFailureGit}
          buttonText="Signup with Github"
        />
      </button>
    </div>
  )
}
