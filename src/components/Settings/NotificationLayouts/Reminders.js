import React, { useEffect, useState } from 'react'
import Toggle from 'react-toggle'
import Cookies from 'universal-cookie'

const Reminders = ({
  t,
  settingStatus,
  notificationState,
  reminderTextObj,
}) => {
  const cookies = new Cookies()
  const [textMessageState, setTextMessageState] = useState(
    reminderTextObj?.text
  )
  const [emailState, setEmailState] = useState(reminderTextObj?.email)
  const [pushNotificationState, setPushNotificationState] = useState(
    reminderTextObj?.browser
  )

  useEffect(() => {
    setEmailState(reminderTextObj?.email)
    setTextMessageState(reminderTextObj?.text)
    setPushNotificationState(reminderTextObj?.browser)
  }, [reminderTextObj?.email, reminderTextObj?.text, reminderTextObj?.browser])

  const mergeChange = async (
    initial = 'Reminders',
    type = 'Reminders',
    value
  ) => {
    const finalUrl = reminderTextObj?.id
      ? `messages/notification?id=${reminderTextObj?.id}`
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
    <form className='drop-shadow-2xl md:w-[45rem] sm:w-[25rem] xxs:w-[15rem] py-4 space-y-4 bg-[white] h-[auto] rounded p-5 my-4 '>
      {/* <form className='md:w-[45rem] sm:w-[25rem] xxs:w-[15rem] py-2 space-y-4 bg-[white] sm:h-[auto] rounded mx-3 p-[20px] pt-[20px] pb-[20px] shadow-xl mt-[20px] drop-shadow-2xl'> */}
      <h2 className='text-[#141115] mb-[10px] text-xl font-medium sm:text-[18px]'>
        {t('Reminders')}
      </h2>
      <p
        style={{ marginTop: '-2px' }}
        className='text-[#141115] sm:text-[13px] text-sm'
      >
        {t(
          'Receive booking reminders, requests to write a review, pricing notices, and other reminders related to your activities on CAMC.'
        )}
      </p>
      <div className='h-[auto]'>
        {/* <label htmlFor="name">{t("Text Messages")}</label> */}
        <div className='flex justify-between w-[100%] '>
          <p>Text Messages</p>
          {(reminderTextObj?.text === true ||
            reminderTextObj?.text === false) && (
            <Toggle
              defaultChecked={reminderTextObj?.text}
              icons={false}
              onChange={() =>
                mergeChange('Reminders', 'textMessageState', !textMessageState)
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
          {(reminderTextObj?.email === true ||
            reminderTextObj?.email === false) && (
            <Toggle
              defaultChecked={reminderTextObj?.email}
              icons={false}
              onChange={() =>
                mergeChange('Reminders', 'emailState', !emailState)
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
          {(reminderTextObj?.browser === true ||
            reminderTextObj?.browser === false) && (
            <Toggle
              defaultChecked={reminderTextObj?.browser}
              icons={false}
              onChange={() =>
                mergeChange(
                  'Reminders',
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

export default Reminders
