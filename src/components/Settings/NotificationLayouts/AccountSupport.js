import React, { useEffect, useState } from 'react'
import Toggle from 'react-toggle'
import Cookies from 'universal-cookie'

const AccountSupport = ({ t, accountSupportTextObj }) => {
  const cookies = new Cookies()
  const [textMessageState, setTextMessageState] = useState(
    accountSupportTextObj?.text
  )
  const [emailState, setEmailState] = useState(accountSupportTextObj?.email)
  const [pushNotificationState, setPushNotificationState] = useState(
    accountSupportTextObj?.browser
  )

  useEffect(() => {
    setEmailState(accountSupportTextObj?.email)
    setTextMessageState(accountSupportTextObj?.text)
    setPushNotificationState(accountSupportTextObj?.browser)
  }, [
    accountSupportTextObj?.email,
    accountSupportTextObj?.text,
    accountSupportTextObj?.browser,
  ])

  const mergeChange = async (
    initial = 'AccountSupport',
    type = 'AccountSupport',
    value
  ) => {
    const finalUrl = accountSupportTextObj?.id
      ? `messages/notification?id=${accountSupportTextObj?.id}`
      : `messages/notification`
    try {
      const token = cookies.get('user_token')
      if (!token) {
        alert('Not authenticated!!!')
        return
      }
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/${finalUrl}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token,
          type: initial,
          text: type == 'textMessageState' ? value : textMessageState,
          email: type == 'emailState' ? value : emailState,
          browser:
            type == 'pushNotificationState' ? value : pushNotificationState,
        }),
      })
      const data = await res.json()

      if (data?.status !== true) {
        // alert('something went wrong. Seems you are not authenticated');
        return
      }
      if (type == 'textMessageState') {
        setTextMessageState(value)
      }
      if (type == 'emailState') {
        setEmailState(value)
      }
      if (type == 'pushNotificationState') {
        setPushNotificationState(value)
      }
      // setTriggerRecall(prev => prev + 1);
    } catch (error) {}
  }

  return (
    <form className='drop-shadow-2xl md:w-[45rem] sm:w-[25rem] xxs:w-[15rem] py-4 space-y-4 bg-[white] h-[auto] rounded p-5 my-4'>
      {/* <form className='md:w-[45rem] sm:w-[25rem] xxs:w-[15rem] py-2 space-y-4 bg-[white] sm:h-[auto] rounded mx-3 p-[20px] pt-[20px] pb-[20px] shadow-xl mt-[20px] drop-shadow-2xl mb-[20px]'> */}
      <h2 className='text-[#141115] mb-[10px] text-xl font-medium'>
        {t('Account Support')}
      </h2>
      <p
        style={{ marginTop: '-2px' }}
        className='text-[#141115] text-sm sm:text-[13px]'
      >
        {t(
          'Receive messages about your account, your trips, legal notifications, security and privacy matters, and customer support requests. For your security, you cannot disable email notifications and we may contact you by phone or other means if needed.'
        )}
      </p>
      <div className='h-[auto]'>
        {/* <label htmlFor="name">{t("Text Messages")}</label> */}
        <div className='flex justify-between w-[100%] '>
          <p>Text Messages</p>
          {(accountSupportTextObj?.text === true ||
            accountSupportTextObj?.text === false) && (
            <Toggle
              defaultChecked={accountSupportTextObj?.text}
              icons={false}
              onChange={() =>
                mergeChange(
                  'AccountSupport',
                  'textMessageState',
                  !textMessageState
                )
              }
            />
          )}
        </div>
        <hr className='mt-[5px] mb-[20px]' style={{ borderColor: '#D4D4D4' }} />
      </div>

      <div className='h-[auto]'>
        {/* <label htmlFor="name">Email</label> */}
        <div className='flex justify-between w-[100%] '>
          <p className='opacity-50'>Email</p>
          {
            <Toggle
              defaultChecked={true}
              disabled={true}
              icons={false}
              // onChange={() => mergeChange('AccountSupport', 'emailState', !emailState)}
            />
          }
        </div>
        <hr className='mt-[5px] mb-[20px]' style={{ borderColor: '#D4D4D4' }} />
      </div>

      <div className='h-[auto]'>
        <label htmlFor='name'>Browser Notifications</label>
        <div className='flex justify-between w-[100%] '>
          <p className='sm:text-[13px]'>
            Receive notifications outside of your browser on either desktop or
            mobile web
          </p>
          {(accountSupportTextObj?.browser === true ||
            accountSupportTextObj?.browser === false) && (
            <Toggle
              defaultChecked={accountSupportTextObj?.browser}
              icons={false}
              onChange={() =>
                mergeChange(
                  'AccountSupport',
                  'pushNotificationState',
                  !pushNotificationState
                )
              }
            />
          )}
        </div>
        <hr className='mt-[5px] mb-[20px]' style={{ borderColor: '#D4D4D4' }} />
      </div>
    </form>
  )
}

export default AccountSupport
