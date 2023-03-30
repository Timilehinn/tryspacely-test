import React from 'react'
import { useTranslation } from 'react-i18next'
import useProtectedRoute from '../../hooks/useProtectedRoute'
import { BiBell } from 'react-icons/bi'
import Cookies from 'universal-cookie'
import { useEffect } from 'react'
import QuickSvg from '../../assets/icons/quickChat.svg'
import { useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import NotificationHeader from './header'

const Notifications = () => {
  const cookies = new Cookies()
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState([])
  const [emptyNotifications, setEmptyNotifications] = useState(false)
  const { success, errorAuth, loadingfinished } = useProtectedRoute(
    'user_token',
    false
  )
  const [nextUrl, setNextUrl] = useState(null)
  const [loadMoreBtn, setLoadMoreBtn] = useState('Load More')

  const fetchNotifications = async () => {
    try {
      const token = cookies.get('user_token')
      if (!token) {
        alert('Not authenticated!!!')
        return
      }
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/notifications`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res?.json()

      if (data?.status !== true) {
        toast.error('Error fetching notifications')
        return
      }
      setNextUrl(data?.data?.next_page_url)
      setNotifications(data?.data?.data)
      if (!data?.data?.data?.length) {
        setEmptyNotifications(true)
      }
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  useEffect(() => {}, [notifications])

  const sendSeenNotification = async (id) => {
    try {
      const token = cookies.get('user_token')
      if (!token) {
        alert('Not authenticated!!!')
        return
      }
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/notifications/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res?.json()

      if (data?.status !== true) {
        toast.error('Error fetching notifications')
        return
      }
    } catch (error) {}
  }

  const loadMoreNotifications = async () => {
    try {
      const token = cookies.get('user_token')
      if (!token) {
        alert('Not authenticated!!!')
        return
      }
      setLoadMoreBtn('Loading...')
      const res = await fetch(`${nextUrl}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res?.json()

      if (data?.status !== true) {
        setLoadMoreBtn('Load More')
        toast.error('Error fetching notifications')
        return
      }
      setLoadMoreBtn('Load More')
      setNextUrl(data?.data?.next_page_url)
      setNotifications((prev) => [...prev, data?.data?.data])
    } catch (error) {
      setLoadMoreBtn('Load More')
    } finally {
    }
  }

  const displayNotifications = notifications?.map((item, index) => {
    sendSeenNotification(item?.id)
    return (
      <>
        <div
          key={item.id}
          className='height-[40px] width-[100%] bg-[] flex item-center gap-x-10 cursor-pointer'
        >
          <div
            style={{ boxShadow: '0px 4px 4px rgba(51, 51, 51, 0.04)' }}
            className='height-[30px] width-[30px] bg-[#FFFFFF] rounded-full'
          >
            <BiBell size={18} />
          </div>
          <p className='font-bold'>
            {t(item?.event)}:{' '}
            <span className='font-normal'>{t(item?.message)}</span>{' '}
            <span className='font-normal text-[#428BF9] ml-[10px]'>
              {t(moment(item?.updated_at).startOf('hour').fromNow())}
            </span>
          </p>
          {/* <p className='font-bold'>{t(item?.event)}: <span className='font-normal'>{t(item?.message)}</span> <span className='font-normal text-[#428BF9] ml-[10px]'>{t(moment(new Date(item?.updated_at)).startOf('day').fromNow())}</span></p> */}
        </div>
        <hr />
      </>
    )
  })

  const noNotifications = (
    <div className='h-[100vh] w-[100%] bg-[white] flex flex-col justify-center items-center'>
      <QuickSvg className='-mt-60' />
      <p className='text-[#141115] text-[20px] -mt-[50px] font-medium'>
        {t('No Notification!')}
      </p>
      <div className='w-[367px] h-[auto]'>
        <p className='text-center text-[#141115] text-[16px] font-light'>
          {t(
            'You have no notification yet. Your notification will be displayed here'
          )}
        </p>
      </div>
    </div>
  )

  return (
    <>
      <NotificationHeader
        errorAuth={errorAuth}
        success={success}
        loadingfinished={loadingfinished}
      />
      {/* */}
      {emptyNotifications ? (
        noNotifications
      ) : (
        <div className='min-h[100%] w-[83%] ml-auto bg-[white] p-[3%]'>
          <h1 className='text-[24px] text-[#141115]'>{t('Notifications')}</h1>
          <div className='height-[auto] width-[100%] flex flex-col gap-y-5 mt-[10px] pt-[20px]'>
            {displayNotifications}
          </div>
          {nextUrl && (
            <div className='flex width-[100%] height-[40px] justify-center items-center mt-[30px]'>
              <button
                onClick={() => loadMoreNotifications}
                className='width-[118px] height-[52px] bg-[#0559FD] text-[white] p-[2%] rounded'
              >
                {t(loadMoreBtn)}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Notifications
