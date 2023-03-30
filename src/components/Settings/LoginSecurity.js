import React, { useState, useEffect } from 'react'
import { Field } from 'formik'
import Toggle from 'react-toggle'
import './addOn.scss'
import { useTranslation } from 'react-i18next'
import { BsCheck } from 'react-icons/bs'
import Cookies from 'universal-cookie'
import useLimitedRoute from '../../hooks/useLimitedRoute'
import DeactivatePrompt from './Prompts/DeactivatePrompt'
import PasswordChange from './Prompts/PasswordChange'
import DoubleFactorAuth from './Prompts/DoubleFactorAuth'
import DoubleFactorAuthPrompt from './Prompts/DoubleFactorAuthPrompt'
import AddSmsAuth from './Prompts/AddSmsAuth'
import CustomAlert from '../CustomComponents/CustomAlert'
import { toast } from 'react-toastify'
import { useGoogleLogin } from 'react-google-login'
import { refreshTokenSetup } from '../../utils/refreshToken'
import LoginGithub from 'react-login-github'
import { useRef } from 'react'
import { confirmAlert } from 'react-confirm-alert' // Import

const LoginSecurity = ({
  settingStatus,
  setTriggerRecall,
  id,
  userData,
  setDspType,
  user_settings,
}) => {
  const { t } = useTranslation()
  const clientId = `${process.env.GOOGLE_CLIENT_ID}`
  const cookies = new Cookies()
  const [displayFullName, setDisplayFullName] = useState(
    settingStatus?.full_name
  )
  const [displayEmail, setDisplayEmail] = useState(settingStatus?.email)
  const [displayDOB, setDisplayDOB] = useState(settingStatus?.date_of_birth)
  const [toUpdate, setToUpdate] = useState(false)
  const [toUpdatePassword, setToUpdatePassword] = useState(false)
  const [disablingAccount, setDisablingAccount] = useState(false)
  const [displaySearchEnginesInclusion, setDisplaySearchEnginesInclusion] =
    useState(settingStatus?.seo)
  const [alertWatcher, setAlertWatcher] = useState({
    statement: '',
    value: false,
  })
  const autoRef = useRef(null)

  const clickGithubConnect = async () => {
    autoRef?.current?.click()
  }

  const testingEndpoint = async (type, value) => {
    try {
      const token = cookies.get('user_token')

      if (!token) {
        setAlertWatcher({
          statement: `Not authenticated!!!`,
          value: true,
        })
        return
      }

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/settings`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token,
          full_name: type == 'full_name' ? value : displayFullName,
          seo: type == 'seo' ? value : displaySearchEnginesInclusion,
          date_of_birth: type == 'dob' ? value : displayDOB,
          email: type == 'email' ? value : displayEmail,
        }),
      })
      const data = await res.json()
      if (data?.status !== true) {
        setAlertWatcher({
          statement: `something went wrong. Seems you are not authenticated`,
          value: true,
        })
        return
      }
      if (type == 'full_name') {
        setDisplayFullName(value)
      }
      if (type == 'email') {
        setDisplayEmail(value)
      }
      if (type == 'dob') {
        setDisplayDOB(value)
      }
      if (type == 'seo') {
        setDisplaySearchEnginesInclusion(value)
      }
      setTriggerRecall((prev) => prev + 1)
    } catch (error) {}
  }

  const socialDisconnection = async (provider) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: `Are you sure you want to proceed with Disconnecting your ${provider}`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const token = cookies.get('user_token')

              if (!token) {
                setAlertWatcher({
                  statement: `Not authenticated!!!`,
                  value: true,
                })
                return
              }

              const res = await fetch(
                `${process.env.REACT_APP_BASE_URL}/users/${id}/deactivate/social-login`,
                {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    provider: provider,
                  }),
                }
              )
              const data = await res.json()
              if (!data?.status) {
                toast.error('Not able to disconnect. Try again.')
                return
              }
              toast.success(provider + ' disconnected successfully')
              setTimeout(() => {
                location.reload()
              }, 3000)
            } catch (error) {
              toast.error(
                'Not able to disconnect.Try Checking your network connection.'
              )
              return
            }
          },
        },
        {
          label: 'No',
          onClick: () => null,
        },
      ],
    })
  }

  const onSuccess = (res) => {
    socialConnectionActivate(
      'google',
      res.profileObj.googleId,
      userData?.email,
      res.profileObj?.email
    )
    refreshTokenSetup(res)
  }

  const onFailure = (res) => {
    toast.error('Something went wrong.')
  }

  const onSuccessGit = async (response, token) => {
    // ?brb
    try {
      let access_token = await getAccessToken(response?.code)
      let userId = await getUser(access_token)
      socialConnectionActivate('github', userId?.id, userData?.email)
    } catch (error) {}
  }

  const onFailureGit = (response) => {}

  const getUser = async (accessToken) => {
    try {
      const res = await fetch(`https://api.github.com/user`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const data = await res.json()
      if (data) {
        return {
          id: data?.id,
        }
      }
    } catch (error) {
      return null
    }
  }

  const getAccessToken = async (code) => {
    if (!code) {
      return
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/oauth/users`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          code,
        }),
      })
      const data = await res.json()
      if (data.data.length) {
        let str = data.data[0]
        let mySubString = str.split(/[=&]/)
        return mySubString[1]
      }
      return null
    } catch (error) {
      return null
    }
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    accessType: 'offline',
  })

  const socialConnectionActivate = async (provider, provider_id, email) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: `Are you sure you want to proceed with connecting your ${provider}`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const token = cookies.get('user_token')

              if (!token) {
                setAlertWatcher({
                  statement: `Not authenticated!!!`,
                  value: true,
                })
                return
              }

              const res = await fetch(
                `${process.env.REACT_APP_BASE_URL}/users/${id}/activate/social-login`,
                {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    provider: provider,
                    provider_id: provider_id,
                    email: email,
                  }),
                }
              )
              const data = await res.json()
              if (!data?.status) {
                toast.error('Not able to connect. Try again.')
                return
              }
              toast.success(provider + ' connected successfully')
              setTimeout(() => {
                location.reload()
              }, 3000)
            } catch (error) {
              toast.error(
                'Not able to disconnect.Try Checking your network connection.'
              )
              return
            }
          },
        },
        {
          label: 'No',
          onClick: () => null,
        },
      ],
    })
  }

  return (
    <div className='xl:px-10 md:px-5 sm:px-3 xl:block sm:flex sm:justify-center sm:items-center sm:flex-col overflow-x-hidden'>
      {alertWatcher?.value && (
        <CustomAlert watcher={alertWatcher} setWatcher={setAlertWatcher} />
      )}
      <form
        className='shadow-2fl md:w-[45rem] sm:w-[23rem] xxs:w-[15rem] py-3 space-y-4 bg-[white] h-[auto] rounded p-5 my-4'
        // style={{ boxShadow: '1px 1px 2px #f0f0f0d3, -1px -1px 2px #f0f0f0d3' }}
      >
        <h2 className='text-[#141115]  text-xl font-medium'>{t('Login')}</h2>
        <div className='h-[auto] py-3'>
          <div className='flex justify-between w-[100%]'>
            <p>Email</p>
            <p
              onClick={() => setToUpdate(!toUpdate)}
              className='text-[#0559FD] cursor-pointer'
            >
              {toUpdate ? 'Cancel' : 'Update'}
            </p>
          </div>
          <label htmlFor='name'>{t(userData?.email)}</label>
          <hr
            className='mt-[5px] mb-[20px]'
            style={{ borderColor: '#D4D4D4' }}
          />
        </div>

        <div className='h-[auto]'>
          <div className='flex justify-between w-[100%]'>
            <p>Password</p>
            <p
              onClick={() => setToUpdatePassword(!toUpdatePassword)}
              className='text-[#0559FD] cursor-pointer'
            >
              {toUpdatePassword ? 'Cancel' : 'Update'}
            </p>
          </div>
          {!toUpdatePassword && <label htmlFor='name'>{t('******')}</label>}
          {toUpdatePassword && <PasswordChange id={id} />}
          <hr
            className='mt-[5px] mb-[20px]'
            style={{ borderColor: '#D4D4D4' }}
          />
        </div>
      </form>

      <div
        className='space-y-4 bg-[white] md:w-[45rem] sm:w-[23rem] xxs:w-[15rem] h-[auto] rounded shadow-2fl p-5 my-4'
        // style={{ boxShadow: '1px 1px 2px #adadad' }}
      >
        <h2 className='text-[#141115]  text-xl font-medium'>
          {t('Social Account')}
        </h2>
        <div className='h-[auto]'>
          <div className='flex justify-between w-[100%]'>
            <p>Github</p>
            <p
              onClick={() =>
                (userData?.provider == 'github' ||
                  userData?.social_account?.provider == 'github') &&
                socialDisconnection('github')
              }
              className='text-[#0559FD] cursor-pointer'
            >
              {userData?.provider == 'github' ||
              userData?.social_account?.provider == 'github' ? (
                'Diconnect'
              ) : (
                <LoginGithub
                  redirectUri={`${process.env.WEBSITE_URL_DEV}/login`}
                  clientId={`${process.env.GITHUB_CLIENT_ID}`}
                  onSuccess={onSuccessGit}
                  onFailure={onFailureGit}
                  buttonText='Connect'
                />
              )}
            </p>
          </div>
          <label htmlFor='name'>
            {t(
              userData?.provider == 'github' ||
                userData?.social_account?.provider == 'github'
                ? 'Connected'
                : 'Not Connected'
            )}
          </label>
          <hr
            className='mt-[5px] mb-[20px]'
            style={{ borderColor: '#D4D4D4' }}
          />
        </div>

        <div className='h-[auto]'>
          <div className='flex justify-between w-[100%]'>
            <p>Google</p>
            <p
              onClick={() =>
                userData?.provider == 'google' ||
                userData?.social_account?.provider == 'google'
                  ? socialDisconnection('google')
                  : signIn()
              }
              className='text-[#0559FD] cursor-pointer'
            >
              {userData?.provider == 'google' ||
              userData?.social_account?.provider == 'google'
                ? 'Disconnect'
                : 'Connect'}
            </p>
          </div>
          <label htmlFor='name'>
            {t(
              userData?.provider == 'google' ||
                userData?.social_account?.provider == 'google'
                ? 'Connected'
                : 'Not Connected'
            )}
          </label>
          <hr
            className='mt-[5px] mb-[20px]'
            style={{ borderColor: '#D4D4D4' }}
          />
        </div>
      </div>

      <form
        className='space-y-4 bg-[white] md:w-[45rem] sm:w-[23rem] xxs:w-[15rem] h-[auto] rounded shadow-2fl p-5 my-4'
        // style={{ boxShadow: '1px 1px 2px #adadad' }}
      >
        <h2 className='text-[#141115]  text-xl font-medium'>
          {t('Deactivate Account')}
        </h2>
        <div className='h-[auto]'>
          <div className='flex justify-between w-[100%]'>
            <p>
              If you no longer need your account on TrySpacely, you can
              deactivate it
            </p>
            <p
              onClick={() => setDisablingAccount(!disablingAccount)}
              className='text-[#DA3D2A] cursor-pointer'
            >
              Deactivate
            </p>
          </div>
          <label htmlFor='name'>
            {t(
              'Note: Don’t Deactivate if you just want to change your email address'
            )}
          </label>
          <hr
            className='mt-[5px] mb-[20px]'
            style={{ borderColor: '#D4D4D4' }}
          />
        </div>
      </form>
      {disablingAccount && (
        <DeactivatePrompt
          setDisablingAccount={setDisablingAccount}
          id={id}
          has_password={userData?.has_password}
        />
      )}

      <form
        className='space-y-4 bg-[white] md:w-[45rem]  sm:w-[23rem] xxs:w-[15rem] h-[auto] rounded shadow-2fl p-5 my-4'
        // style={{ boxShadow: '1px 1px 2px #adadad' }}
      >
        <h2 className='text-[#141115]  text-xl font-medium'>
          {t('Two-Factor Authentication')}
        </h2>
        <div className='h-[auto]'>
          <div className='flex justify-between w-[100%]'>
            <p>Two-Factor Authentication</p>
            <p className='text-[#0559FD] cursor-pointer'>Setup</p>
          </div>
          <label htmlFor='name'>{t('Inactivate')}</label>
          <hr
            className='mt-[5px] mb-[20px]'
            style={{ borderColor: '#D4D4D4' }}
          />
          {/* Will return here later... */}
          <DoubleFactorAuth
            id={id}
            setDspType={setDspType}
            user_settings={user_settings}
            userData={userData}
          />
        </div>
      </form>
    </div>
  )
}
export default LoginSecurity
