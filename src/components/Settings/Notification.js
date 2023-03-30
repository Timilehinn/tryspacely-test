import React, { useState, useEffect } from 'react'
import './addOn.scss'
import { useTranslation } from 'react-i18next'
import Cookies from 'universal-cookie'
import Messages from './NotificationLayouts/Messages'
import Reminders from './NotificationLayouts/Reminders'
import Promotions from './NotificationLayouts/Promotions'
import AccountSupport from './NotificationLayouts/AccountSupport'
import CustomAlert from '../CustomComponents/CustomAlert'

const Notification = ({
  settingStatus,
  setTriggerRecall,
  notificationState,
}) => {
  const { t } = useTranslation()

  // const cookies = new Cookies()
  // const [displayFullName, setDisplayFullName] = useState(
  //   settingStatus?.full_name
  // )
  // const [displayEmail, setDisplayEmail] = useState(settingStatus?.email)
  // const [displayDOB, setDisplayDOB] = useState(settingStatus?.date_of_birth)
  const [messageTextObj, setMessageTextObj] = useState()
  const [reminderTextObj, setReminderTextObj] = useState()
  const [promotionTextObj, setPromotionTextObj] = useState()
  const [accountSupportTextObj, setAccountSupportTextObj] = useState()
  // const [displaySearchEnginesInclusion, setDisplaySearchEnginesInclusion] =
  //   useState(settingStatus?.seo)
  const [alertWatcher, setAlertWatcher] = useState({
    statement: '',
    value: false,
  })

  // const testingEndpoint = async (type, value) => {
  //   try {
  //     const token = cookies.get('user_token')
  //     if (!token) {
  //       setAlertWatcher({
  //         statement: `Not authenticated!!!`,
  //         value: true,
  //       })
  //       return
  //     }
  //     const res = await fetch(`${process.env.REACT_APP_BASE_URL}/settings`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         token,
  //         full_name: type == 'full_name' ? value : displayFullName,
  //         seo: type == 'seo' ? value : displaySearchEnginesInclusion,
  //         date_of_birth: type == 'dob' ? value : displayDOB,
  //         email: type == 'email' ? value : displayEmail,
  //       }),
  //     })
  //     const data = await res.json()
  //     if (data?.status !== true) {
  //       setAlertWatcher({
  //         statement: `something went wrong. Seems you are not authenticated`,
  //         value: true,
  //       })
  //       return
  //     }
  //     if (type == 'full_name') {
  //       setDisplayFullName(value)
  //     }
  //     if (type == 'email') {
  //       setDisplayEmail(value)
  //     }
  //     if (type == 'dob') {
  //       setDisplayDOB(value)
  //     }
  //     if (type == 'seo') {
  //       setDisplaySearchEnginesInclusion(value)
  //     }
  //     setTriggerRecall((prev) => prev + 1)
  //   } catch (error) {}
  // }

  useEffect(async () => {
    if (notificationState == null) return
    const messageTextFound = await notificationState?.find(
      (x) => x.type == 'Messages' && x.hasOwnProperty('text')
    )

    if (!messageTextFound) {
      setMessageTextObj({
        text: false,
        browser: false,
        email: false,
        loaded: true,
      })
    } else {
      setMessageTextObj({
        id: messageTextFound?.id,
        text: messageTextFound?.text,
        browser: messageTextFound?.browser,
        email: messageTextFound?.email,
        loaded: true,
      })
    }
    const remindersTextFound = notificationState?.find(
      (x) => x.type == 'Reminders' && x.hasOwnProperty('text')
    )

    if (!remindersTextFound) {
      setReminderTextObj({
        text: false,
        browser: false,
        email: false,
        loaded: true,
      })
    } else {
      setReminderTextObj({
        id: remindersTextFound?.id,
        text: remindersTextFound?.text,
        browser: remindersTextFound?.browser,
        email: remindersTextFound?.email,
        loaded: true,
      })
    }
    const promotionsTextFound = notificationState?.find(
      (x) => x.type == 'Promotions' && x.hasOwnProperty('text')
    )

    if (!promotionsTextFound) {
      setPromotionTextObj({
        text: false,
        browser: false,
        email: false,
        loaded: true,
      })
    } else {
      setPromotionTextObj({
        id: promotionsTextFound?.id,
        text: promotionsTextFound?.text,
        browser: promotionsTextFound?.browser,
        email: promotionsTextFound?.email,
        loaded: true,
      })
    }
    const accountSupportTextFound = notificationState?.find(
      (x) => x.type == 'AccountSupport' && x.hasOwnProperty('text')
    )

    if (!accountSupportTextFound) {
      setAccountSupportTextObj({
        text: false,
        browser: false,
        email: false,
        loaded: true,
      })
    } else {
      setAccountSupportTextObj({
        id: accountSupportTextFound?.id,
        text: accountSupportTextFound?.text,
        browser: accountSupportTextFound?.browser,
        email: accountSupportTextFound?.email,
        loaded: true,
      })
    }
    return () => {}
  }, [notificationState])

  return (
    <div className='xl:px-10 md:px-5 sm:px-3 xl:block sm:flex sm:justify-center sm:items-center sm:flex-col overflow-x-hidden'>
      {alertWatcher?.value && (
        <CustomAlert watcher={alertWatcher} setWatcher={setAlertWatcher} />
      )}

      {messageTextObj?.loaded == true && (
        <Messages
          messageTextObj={messageTextObj}
          t={t}
          settingStatus={settingStatus}
          notificationState={notificationState}
        />
      )}

      {reminderTextObj?.loaded == true && (
        <Reminders
          reminderTextObj={reminderTextObj}
          t={t}
          settingStatus={settingStatus}
          notificationState={notificationState}
        />
      )}

      {promotionTextObj?.loaded == true && (
        <Promotions
          promotionTextObj={promotionTextObj}
          t={t}
          settingStatus={settingStatus}
          notificationState={notificationState}
        />
      )}
      {accountSupportTextObj?.loaded == true && (
        <AccountSupport
          accountSupportTextObj={accountSupportTextObj}
          t={t}
          settingStatus={settingStatus}
          notificationState={notificationState}
        />
      )}
    </div>
  )
}

export default Notification
