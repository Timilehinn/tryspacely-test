import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdMessage } from 'react-icons/md'
// import { BiBell } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import useProtectedRoute from '../../hooks/useProtectedRoute'
import SmallQuickSvg from '../../assets/icons/SmallQuickChat.svg'
import moment from 'moment'

const FixedNofitication = ({ setOpenNotification }) => {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState([])
  const { success, errorAuth, loadingfinished } = useProtectedRoute(
    'user_token',
    false
  )
  const [nextUrl, setNextUrl] = useState(null)
  const [emptyNotifications, setEmptyNotifications] = useState(false)
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

  const displayNotifications = notifications?.map((item, index) => {
    return (
      <>
        <div className='height-[40px] width-[100%] bg-[] flex item-center gap-x-10 cursor-pointer'>
          <div
            style={{ boxShadow: '0px 4px 4px rgba(51, 51, 51, 0.04)' }}
            className='height-[15px] width-[15px] bg-[#FFFFFF] rounded-full'
          >
            <MdMessage size={13} />
            {/* <BiBell size={13} /> */}
          </div>
          <p className='font-bold text-[13px]'>
            {t(item?.event)}:{' '}
            <span className='font-normal'>{t(item?.message)}</span>
            <span className='font-normal text-[#428BF9] ml-[10px]'>
              {t(moment(item?.updated_at).startOf('hour').fromNow())}
            </span>
          </p>
        </div>
        <hr />
      </>
    )
  })

  const noNotifications = (
    <div className='z-50 drop-shadow-2xl right-5 top-[70px] h-[400px] w-[400px] bg-[white] p-[3%] fixed flex flex-col justify-center items-center gap-y-5'>
      <SmallQuickSvg className='-mt-20' />
      <p className='text-[#141115] text-[16px] font-medium'>
        {t('No Notification!')}
      </p>
      <div className='w-[367px] h-[auto]'>
        <p className='text-center text-[#141115] text-[13px] font-light'>
          {t(
            'You have no notification yet. Your notification will be displayed here'
          )}
        </p>
      </div>
    </div>
  )

  return (
    <>
      <div
        style={{ zIndex: 100 }}
        onClick={() => setOpenNotification(false)}
        className='h-full w-[83%] ml-auto fixed inset-0 flex justify-center items-center '
      >
        {emptyNotifications ? (
          noNotifications
        ) : (
          <div
            style={{ overflow: 'auto' }}
            className='z-50 drop-shadow-2xl right-5 top-[70px] h-[400px] w-[400px] bg-[white] p-[3%] fixed'
          >
            <div className='flex justify-between items-center'>
              <h1 className='text-[16px] text-[#141115]'>
                {t('Notifications')}
              </h1>
              <h1
                onClick={() => navigate('/dashboard/notifications')}
                className='cursor-pointer text-[16px] text-[#0559FD] text-right'
              >
                {t('View all')}
              </h1>
            </div>
            <div className='height-[auto] width-[100%] flex flex-col gap-y-5 mt-[10px] pt-[20px]'>
              {displayNotifications}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default FixedNofitication
