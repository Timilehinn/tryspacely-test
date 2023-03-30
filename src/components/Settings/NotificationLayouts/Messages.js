import React, { useEffect, useState } from 'react'
import Toggle from 'react-toggle'
import Cookies from 'universal-cookie'

const Messages = ({ t, settingStatus, notificationState, messageTextObj }) => {
  const cookies = new Cookies()
  const [textMessageState, setTextMessageState] = useState(messageTextObj?.text)
  const [emailState, setEmailState] = useState(messageTextObj?.email)
  const [pushNotificationState, setPushNotificationState] = useState(
    messageTextObj?.browser
  )

  useEffect(() => {
    setEmailState(messageTextObj?.email)
    setTextMessageState(messageTextObj?.text)
    setPushNotificationState(messageTextObj?.browser)
  }, [messageTextObj?.email, messageTextObj?.text, messageTextObj?.browser])

  const mergeChange = async (
    initial = 'Messages',
    type = 'Messages',
    value
  ) => {
    const finalUrl = messageTextObj?.id
      ? `messages/notification?id=${messageTextObj?.id}`
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
    <form
      id='notificationForm'
      className='drop-shadow-2xl md:w-[45rem] sm:w-[25rem] xxs:w-[15rem] py-5 space-y-4 bg-[white] h-[auto] rounded p-5 my-4'
    >
      {/* <form id='notificationForm' className=' md:w-[45rem] sm:w-[25rem] xxs:w-[15rem] py-2 space-y-4 bg-[white] sm:h-[auto] rounded mx-3 p-[20px] pt-[20px] pb-[20px] shadow-xl mt-[30px] drop-shadow-2xl'> */}
      <h2 className='text-[#141115] mb-[10px] text-xl font-medium sm:text-[18px]'>
        {t('Messages')}
      </h2>
      <p
        style={{ marginTop: '-2px' }}
        className='text-[#141115] sm:text-[13px] text-sm'
      >
        {t(
          'Receive messages from workspace owners and users, including booking requests.'
        )}
      </p>
      <div className='h-[auto]'>
        {/* <label htmlFor="name">{t("Text Messages")}</label> */}
        <div className='flex justify-between w-[100%] '>
          <p>Text Messages</p>
          {(messageTextObj?.text === true ||
            messageTextObj?.text === false) && (
            <Toggle
              defaultChecked={messageTextObj?.text}
              icons={false}
              onChange={() =>
                mergeChange('Messages', 'textMessageState', !textMessageState)
              }
            />
          )}
        </div>
        <hr className='mt-[5px] mb-[20px]' style={{ borderColor: '#D4D4D4' }} />
      </div>

      <div className='h-[auto]'>
        {/* <label htmlFor="name">Email</label> */}
        <div className='flex justify-between w-[100%] '>
          <p>Email</p>
          {(messageTextObj?.email === true ||
            messageTextObj?.email === false) && (
            <Toggle
              defaultChecked={messageTextObj?.email}
              icons={false}
              onChange={() =>
                mergeChange('Messages', 'emailState', !emailState)
              }
            />
          )}
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
          {(messageTextObj?.browser === true ||
            messageTextObj?.browser === false) && (
            <Toggle
              defaultChecked={messageTextObj?.browser}
              icons={false}
              onChange={() =>
                mergeChange(
                  'Messages',
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

export default Messages
