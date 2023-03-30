import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import CustomAlert from '../../CustomComponents/CustomAlert'
import AddSmsAuth from './AddSmsAuth'
import DoubleFactorAuthPrompt from './DoubleFactorAuthPrompt'
import InitVerifyCodePhoneNumber from './InitVerifyCodePhoneNumber'

const DoubleFactorAuth = ({ id, user_settings, setDspType, userData }) => {
  const smsRef = useRef()
  const qrCodeRef = useRef()
  const validateScanRef = useRef()
  const authRef = useRef()

  // phone_number
  const cookies = new Cookies()
  const [popUp2faAuth, setPopUp2faAuth] = useState(null)
  const [popUpSms, setPopUpSms] = useState(null)
  const [mobile_number, setMobile_number] = useState(null)
  const [isValidated, setIsValidated] = useState(false)
  const [popUpVerifyPhoneNumber, setPopUpVerifyPhoneNumber] = useState(null)
  const [qrCode, setQrCode] = useState(null)
  const [accessable, setAccessable] = useState(false)
  const [alertWatcher, setAlertWatcher] = useState({
    statement: '',
    value: false,
  })

  useEffect(() => {
    if (user_settings?.sms) {
      smsRef.current.checked = true
      return
    }
    if (user_settings?.twofa) {
      qrCodeRef.current.checked = true
      return
    }
  }, [])

  const initSms2fa = async () => {
    const token = cookies.get('user_token')
    if (!token) {
      alert('Not authenticated!!!')
      return
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/settings`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token,
          sms: true,
          twofa: false,
        }),
      })
      const data = await res.json()

      if (data?.status !== true) {
        setAlertWatcher({
          statement: data?.errors?.message,
          value: true,
        })
        return
      }
      toast.success('Sms for 2FA is set up successfully.')
    } catch (error) {}
  }

  const initQrCode2fa = async () => {
    const token = cookies.get('user_token')
    if (!token) {
      alert('Not authenticated!!!')
      return
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/settings`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token,
          sms: false,
          twofa: true,
        }),
      })
      const data = await res.json()

      if (data?.status !== true) {
        setAlertWatcher({
          statement: data?.errors?.message,
          value: true,
        })
        return
      }
      toast.success('QrCode for 2FA is set up successfully.')
    } catch (error) {}
  }

  const handleChangeCheck = async (e, current) => {
    if (current === 'validate') {
      const checked = e.target.checked
      if (checked) {
        const result = await initQrCode2fa()
        // validateScanRef.current.checked = false;
      }

      return
    }
    if (current === 'auth') {
      const checked = e.target.checked
      if (checked) {
        smsRef.current.checked = false
        setPopUp2faAuth(true)
      }
    }
    if (current === 'sms') {
      const checked = e.target.checked
      if (checked) {
        qrCodeRef.current.checked = false
        if (!userData?.phone_number) {
          toast.error(
            'Please add a phone number in profile tab before you continue.'
          )
          setPopUpSms(true)
          return
        }
        const result = await initSms2fa()
      }
    }
  }

  useEffect(() => {
    isValidated && initSms2fa()
  }, [isValidated])

  const getQR_Code = async () => {
    const token = cookies.get('user_token')
    if (!token) {
      alert('Not authenticated!!!')
      return
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/${id}/activate-2fa`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token,
          }),
        }
      )
      const data = await res.json()

      if (data?.status !== true) {
        // alert('Something went wrong here')
        return
      }
      setQrCode(data?.data?.qr)
      setAlertWatcher({
        statement: `Qr Code generated. Scan the code with an authenticator app.`,
        value: true,
      })
      setAccessable(true)
      setPopUp2faAuth(false)
    } catch (e) {
      toast.error('There was an error generating code.')
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (popUp2faAuth && ref.current && !ref.current.contains(e.target)) {
        setPopUp2faAuth(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [popUp2faAuth])

  return (
    <>
      {alertWatcher?.value && (
        <CustomAlert watcher={alertWatcher} setWatcher={setAlertWatcher} />
      )}
      {popUp2faAuth && (
        <DoubleFactorAuthPrompt
          id={id}
          setPopUp2faAuth={setPopUp2faAuth}
          setAccessable={setAccessable}
          getQR_Code={getQR_Code}
          initQrCode2fa={initQrCode2fa}
        />
      )}
      {popUpSms && (
        <AddSmsAuth
          id={id}
          setPopUpSms={setPopUpSms}
          setPopUpVerifyPhoneNumber={setPopUpVerifyPhoneNumber}
          email={userData?.email}
          setMobile_number={setMobile_number}
        />
      )}
      {!isValidated && popUpVerifyPhoneNumber && (
        <InitVerifyCodePhoneNumber
          init2FA={{ type: 'sms', popup: true }}
          emailbackup={userData?.email}
          preventNavigate={true}
          setIsValidated={setIsValidated}
          width={'100%'}
          mobile_number={mobile_number}
        />
      )}

      <div className='h-[100px] w-[100%] bg-[#F2F2F2] rounded flex items-center gap-5'>
        <div className='flex justify-center items-center h-[100%] w-[10%]'>
          <input
            ref={smsRef}
            type='radio'
            onChange={(e) => handleChangeCheck(e, 'sms')}
          />
        </div>
        <div className='flex justify-center items-center h-[100%] w-[10%]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='44'
            height='44'
            viewBox='0 0 24 24'
          >
            <path d='M20 2c0-1.105-.896-2-2-2h-12c-1.105 0-2 .896-2 2v20c0 1.104.895 2 2 2h12c1.104 0 2-.896 2-2v-20zm-9.501 0h3.001c.276 0 .5.224.5.5s-.224.5-.5.5h-3.001c-.275 0-.499-.224-.499-.5s.224-.5.499-.5zm1.501 20c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm6-3h-12v-14.024h12v14.024z' />
          </svg>
        </div>
        <div className='flex flex-col justify-center h-[100%] w-[80%]'>
          <p className='text-[#141115] text-[16px] font-semibold'>
            SMS Text Message
          </p>
          <p className='text-[#141115]'>
            Receive a text message to your device when signing in.
          </p>
        </div>
      </div>

      <div className='h-[auto] w-[100%] bg-[#F2F2F2] pt-5 pb-5 rounded flex items-center gap-5 mt-[50px] mb-[20px]'>
        <div className='flex justify-center items-center h-[100%] w-[10%]'>
          <input
            ref={qrCodeRef}
            type='radio'
            onChange={(e) => handleChangeCheck(e, 'auth')}
          />
        </div>
        <div className='flex justify-center items-center h-[100%] w-[10%]'>
          {accessable && qrCode && (
            <img src={`data:image/png;base64,${qrCode}`} alt={''} />
          )}
        </div>
        <div className='flex flex-col justify-center h-[100%] w-[80%]'>
          <p className='text-[#141115] text-[16px] font-semibold'>
            Authentication App (coming soon)
          </p>
          <p className='text-[#141115]'>
            Retrieve code from an authentication app on your device, like Google
            Authenticator, or Microsoft Authenticator. The installation and use
            of third-party app is subjected to the terms and privacy policy of
            the third-party app provider.
          </p>
        </div>
      </div>

      {accessable && (
        <div className='flex justify-center items-center h-[100%] w-[90%] gap-5'>
          <input
            ref={validateScanRef}
            type='radio'
            onChange={(e) => handleChangeCheck(e, 'validate')}
          />
          <p>Have you scanned this qr code successfully?</p>
        </div>
      )}
      <button
        className='w-[60px] h-[38px] p-[10px] rounded mt-[30px] flex items-center justify-center'
        id='overideBtnPasswordChange'
      >
        Next
      </button>
    </>
  )
}

export default DoubleFactorAuth
