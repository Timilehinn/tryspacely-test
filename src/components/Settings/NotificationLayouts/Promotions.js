import React, { useEffect, useState } from 'react'
import Toggle from 'react-toggle'
import Cookies from 'universal-cookie'

const Promotions = ({
  t,
  settingStatus,
  notificationState,
  promotionTextObj,
}) => {
  const cookies = new Cookies()
  const [textMessageState, setTextMessageState] = useState(
    promotionTextObj?.text
  )
  const [emailState, setEmailState] = useState(promotionTextObj?.email)
  const [pushNotificationState, setPushNotificationState] = useState(
    promotionTextObj?.browser
  )

  useEffect(() => {
    setEmailState(promotionTextObj?.email)
    setTextMessageState(promotionTextObj?.text)
    setPushNotificationState(promotionTextObj?.browser)
  }, [
    promotionTextObj?.email,
    promotionTextObj?.text,
    promotionTextObj?.browser,
  ])

  const mergeChange = async (
    initial = 'Promotions',
    type = 'Promotions',
    value
  ) => {
    const finalUrl = promotionTextObj?.id
      ? `messages/notification?id=${promotionTextObj?.id}`
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
      {/* <form className='md:w-[45rem] sm:w-[25rem] xxs:w-[15rem] py-2 space-y-4 bg-[white] sm:h-[auto] rounded mx-3 p-[20px] pt-[20px] pb-[20px] shadow-xl mt-[20px] drop-shadow-2xl'> */}
      <h2 className='text-[#141115] mb-[10px] text-xl font-medium'>
        {t('Promotions & Tips')}
      </h2>
      <p
        style={{ marginTop: '-2px' }}
        className='text-[#141115] text-sm sm:text-[13px]'
      >
        {t(
          'Receive coupons, promotions, surveys, product updates, and inspiration from CAMC and CAMC partners.'
        )}
      </p>
      <div className='h-[auto]'>
        {/* <label htmlFor="name">{t("Text Messages")}</label> */}
        <div className='flex justify-between w-[100%] '>
          <p>Text Messages</p>
          {(promotionTextObj?.text === true ||
            promotionTextObj?.text === false) && (
            <Toggle
              defaultChecked={promotionTextObj?.text}
              icons={false}
              onChange={() =>
                mergeChange('Promotions', 'textMessageState', !textMessageState)
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
          {(promotionTextObj?.email === true ||
            promotionTextObj?.email === false) && (
            <Toggle
              defaultChecked={promotionTextObj?.email}
              icons={false}
              onChange={() =>
                mergeChange('Promotions', 'emailState', !emailState)
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
          {(promotionTextObj?.browser === true ||
            promotionTextObj?.browser === false) && (
            <Toggle
              defaultChecked={promotionTextObj?.browser}
              icons={false}
              onChange={() =>
                mergeChange(
                  'Promotions',
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

export default Promotions
