import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'

import useCookieHandler from '../../../hooks/useCookieHandler'

const OverviewFeedbacks = ({ workspace, accountType, user }) => {
  const { t } = useTranslation()
  const { token } = useCookieHandler('user_token')
  const [notifications, setNotifications] = useState([])

  const fetchNotifications = async () => {
    try {
      if (!token) {
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
      setNotifications(data?.data?.data)
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [token])

  return (
    <>
      {accountType === 'User' && (
        <div className='shadow-2fl rounded-lg p-5 my-1 lg:h-auto md:h-[350px] sm:h-[350px]'>
          <div className='flex flex-row justify-between items-center'>
            <span className='font-medium text-[20px]'>
              {t('Most Visited Space')}
            </span>

            {workspace.length > 0 && (
              <Link to='/dashboard/expenses/visited-location'>
                {' '}
                {t('View all')}{' '}
              </Link>
            )}
          </div>

          {workspace.length > 0 ? (
            workspace.slice(0, 5).map((data, key) => (
              <div
                // to={`/user/bookings/${data.slug}`}
                className='bg-white shadow-2fl rounded-lg flex flex-row justify-between items-start my-4 lg:h-[60px] md:h-[60px] sm:h-[70px] '
                key={key}
              >
                <div className='flex flex-row gap-2'>
                  <img
                    className='rounded-l-lg w-[100px] lg:h-[60px] md:h-[60px] sm:h-[70px] '
                    src={
                      data.photos.length > 0
                        ? data.photos[0].url
                        : 'https://via.placeholder.com/150'
                    }
                    alt={data.name + ' default image'}
                  />

                  <div className='flex flex-col justify-start items-start lg:gap-1 md:gap-1 sm:gap-0'>
                    <div className='text-lg font-medium'>{data.name}</div>
                    <span className='flex flex-row items-center gap-1'>
                      <i className='fas fa-map-marker-alt'></i>
                      {data.address}{' '}
                    </span>
                  </div>
                </div>

                <span className='flex flex-row justify-center items-center pr-2'>
                  <img
                    src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Naira1.svg'
                    alt=''
                    className='w-8 text-black'
                  />
                  {data.price}
                </span>
              </div>
            ))
          ) : (
            <div className='flex flex-col justify-center items-center gap-2 text-center my-10'>
              <img
                className='w-14'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Workspaces1.svg'
                alt='workspace'
              />
              <p className='text-[#2C292C] text-2xl'> {t('No space Yet')} </p>
              <p>
                {t(
                  'You are yet to use any space. Your most viewed spaces will displayed here'
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {accountType === 'Owner' && (
        <section className='owner_activity shadow-2fl rounded-lg p-5 my-1 lg:h-[304px] md:h-[350px] sm:h-[300px] overflow-auto'>
          <span className='text-[20px] font-medium'>
            {' '}
            {t('Recent Activities')}{' '}
          </span>
          {notifications.length > 0 ? (
            <div className='flex flex-col justify-start items-start mt-5 gap-5 '>
              {notifications
                .filter((x) => {
                  const currentdate = new Date()
                  const dateFromData = new Date(x.created_at)
                  const diff = moment(currentdate).diff(dateFromData, 'days')
                  if (diff < 7) {
                    return x
                  }
                })
                .map((activities) => (
                  <div
                    key={activities.id}
                    className='activities flex flex-row justify-start items-start gap-2 relative'
                  >
                    {activities.event === 'Bookings' && (
                      <section className='flex flex-row items-start gap-2'>
                        <span className='flex flex-col justify-center items-center h-[30px] p-2 w-[30px] rounded-full bg-[#30D158]'>
                          <svg className='w-[18px] h-[18px] flex flex-col justify-center items-center fill-white'>
                            <use
                              xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#calendar-svgrepo-com'
                              className='calendar'
                            ></use>
                          </svg>
                        </span>

                        <div className='flex flex-col gap-1'>
                          <span className='text-[#30D158] flex flex-row gap-2 items-center'>
                            <svg
                              viewBox='0 0 24 24'
                              className='fill-[#30D158] stroke-[#30D158] w-3 h-3 '
                            >
                              <path d='M23.903,0H3C1.346,0,0,1.346,0,3V24H2V15H23.903l-5.651-7.5L23.903,0Zm-4.011,13H2V3c0-.552,.449-1,1-1H19.892l-4.144,5.5,4.144,5.5Z' />
                            </svg>
                            {t('Bookings')}
                          </span>

                          <span className='text-[#2C292C] text-[16px]'>
                            {activities.message}
                          </span>
                          <span className='text-[#727073] text-[10px]'>
                            {moment(activities.updated_at)
                              .startOf('day')
                              .fromNow()}
                          </span>
                        </div>
                      </section>
                    )}

                    {activities.event === 'Workspaces' && (
                      <section className='flex flex-row justify-start items-start gap-2'>
                        <span className='flex flex-col justify-center items-center h-[30px] p-2 w-[30px] rounded-full bg-[#F9DC5C]'>
                          <svg className='w-[18px] h-[18px] flex flex-col justify-center items-center'>
                            <use
                              xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#workspace-svgrepo-com'
                              className='workspace'
                            ></use>
                          </svg>
                        </span>

                        <div className='flex flex-col gap-1'>
                          <span className='text-[#2C292C] text-[16px]'>
                            {activities.message}
                          </span>
                          <span className='text-[#727073] text-[10px]'>
                            {moment(activities.updated_at)
                              .startOf('day')
                              .fromNow()}
                          </span>
                        </div>
                      </section>
                    )}

                    {activities.event === 'Transactions' && (
                      <section className='flex flex-row justify-start items-start gap-2'>
                        <span className='flex flex-col justify-center items-center h-[30px] p-2 w-[30px] rounded-full bg-[E034E8]'>
                          <img
                            src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Money.svg'
                            alt='money'
                            className='w-[18px] h-[18px] flex flex-col justify-center items-center'
                          />
                        </span>

                        <div className='flex flex-col gap-1'>
                          <span className='text-[#2C292C] text-[16px]'>
                            {activities.message}
                          </span>
                          <span className='text-[#727073] text-[10px]'>
                            {moment(activities.updated_at)
                              .startOf('day')
                              .fromNow()}
                          </span>
                        </div>
                      </section>
                    )}

                    {activities.event === 'User Account' && (
                      <section className='flex flex-row justify-start items-start gap-2'>
                        <span className='flex flex-col justify-center items-center h-[30px] p-2 w-[30px] rounded-full bg-[#ED254E]'>
                          <svg className='w-[18px] h-[18px] flex flex-col justify-center items-center'>
                            <use
                              xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#calendar-svgrepo-com'
                              className='calendar'
                            ></use>
                          </svg>
                        </span>

                        <div className='flex flex-col gap-1'>
                          <span className='text-[#2C292C] text-[16px]'>
                            {activities.message}
                          </span>
                          <span className='text-[#727073] text-[10px]'>
                            {moment(activities.updated_at)
                              .startOf('day')
                              .fromNow()}
                          </span>
                        </div>
                      </section>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center gap-2 text-center my-10'>
              <img className='w-14' src='heart-beat.png' alt='workspace' />
              <p className='font-medium text-[20px]'>
                {' '}
                {t('No Recent Activities Yet!')}{' '}
              </p>
              <p className='w-[70%] text-center'>
                {t(
                  'Trybookinz has no recent activities yet. Recent Activities will be displayed here'
                )}
              </p>
            </div>
          )}
        </section>
      )}

      {accountType === 'Admin' && (
        <section className='owner_activity shadow-2fl rounded-lg p-5 my-1 lg:h-[304px] md:h-[350px] sm:h-[300px] overflow-auto'>
          <span className='text-[20px] font-medium'>
            {' '}
            {t('Recent Activities')}{' '}
          </span>
          {notifications.length > 0 ? (
            <div className='flex flex-col justify-start items-start mt-5 gap-5 '>
              {notifications
                .filter((x) => {
                  const currentdate = new Date()
                  const dateFromData = new Date(x.created_at)
                  const diff = moment(currentdate).diff(dateFromData, 'days')
                  if (diff < 7) {
                    return x
                  }
                })
                .map((activities) => (
                  <div
                    key={activities.id}
                    className='activities flex flex-row justify-start items-start gap-2 relative'
                  >
                    {activities.event === 'Bookings' && (
                      <section className='flex flex-row items-start gap-2'>
                        <span className='flex flex-col justify-center items-center h-[30px] p-2 w-[30px] rounded-full bg-[#30D158]'>
                          <svg className='w-[18px] h-[18px] flex flex-col justify-center items-center fill-white'>
                            <use
                              xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#calendar-svgrepo-com'
                              className='calendar'
                            ></use>
                          </svg>
                        </span>

                        <div className='flex flex-col gap-1'>
                          <span className='text-[#30D158] flex flex-row gap-2 items-center'>
                            <svg
                              viewBox='0 0 24 24'
                              className='fill-[#30D158] stroke-[#30D158] w-3 h-3 '
                            >
                              <path d='M23.903,0H3C1.346,0,0,1.346,0,3V24H2V15H23.903l-5.651-7.5L23.903,0Zm-4.011,13H2V3c0-.552,.449-1,1-1H19.892l-4.144,5.5,4.144,5.5Z' />
                            </svg>
                            {t('Bookings')}
                          </span>

                          <span className='text-[#2C292C] text-[16px]'>
                            {activities.message}
                          </span>
                          <span className='text-[#727073] text-[10px]'>
                            {moment(activities.updated_at)
                              .startOf('day')
                              .fromNow()}
                          </span>
                        </div>
                      </section>
                    )}

                    {activities.event === 'Workspaces' && (
                      <section className='flex flex-row justify-start items-start gap-2'>
                        <span className='flex flex-col justify-center items-center h-[30px] p-2 w-[30px] rounded-full bg-[#F9DC5C]'>
                          <svg className='w-[18px] h-[18px] flex flex-col justify-center items-center'>
                            <use
                              xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#workspace-svgrepo-com'
                              className='workspace'
                            ></use>
                          </svg>
                        </span>

                        <div className='flex flex-col gap-1'>
                          <span className='text-[#2C292C] text-[16px]'>
                            {activities.message}
                          </span>
                          <span className='text-[#727073] text-[10px]'>
                            {moment(activities.updated_at)
                              .startOf('day')
                              .fromNow()}
                          </span>
                        </div>
                      </section>
                    )}

                    {activities.event === 'Transactions' && (
                      <section className='flex flex-row justify-start items-start gap-2'>
                        <span className='flex flex-col justify-center items-center h-[30px] p-2 w-[30px] rounded-full bg-[E034E8]'>
                          <img
                            src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Money.svg'
                            alt='money'
                            className='w-[18px] h-[18px] flex flex-col justify-center items-center'
                          />
                        </span>

                        <div className='flex flex-col gap-1'>
                          <span className='text-[#2C292C] text-[16px]'>
                            {activities.message}
                          </span>
                          <span className='text-[#727073] text-[10px]'>
                            {moment(activities.updated_at)
                              .startOf('day')
                              .fromNow()}
                          </span>
                        </div>
                      </section>
                    )}

                    {activities.event === 'User Account' && (
                      <section className='flex flex-row justify-start items-start gap-2'>
                        <span className='flex flex-col justify-center items-center h-[30px] p-2 w-[30px] rounded-full bg-[#ED254E]'>
                          <svg className='w-[18px] h-[18px] flex flex-col justify-center items-center'>
                            <use
                              xlinkHref='https://trybookings-assets.s3.eu-west-2.amazonaws.com/sprite.svg#calendar-svgrepo-com'
                              className='calendar'
                            ></use>
                          </svg>
                        </span>

                        <div className='flex flex-col gap-1'>
                          <span className='text-[#2C292C] text-[16px]'>
                            {activities.message}
                          </span>
                          <span className='text-[#727073] text-[10px]'>
                            {moment(activities.updated_at)
                              .startOf('day')
                              .fromNow()}
                          </span>
                        </div>
                      </section>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center gap-2 text-center my-10'>
              <img className='w-14' src='heart-beat.png' alt='workspace' />
              <p className='font-medium text-[20px]'>
                {' '}
                {t('No Recent Activities Yet!')}{' '}
              </p>
              <p className='w-[70%] text-center'>
                {t(
                  'Trybookinz has no recent activities yet. Recent Activities will be displayed here'
                )}
              </p>
            </div>
          )}
        </section>
      )}
    </>
  )
}

export default OverviewFeedbacks
