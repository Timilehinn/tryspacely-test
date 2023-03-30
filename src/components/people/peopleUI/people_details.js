import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'

import useCookieHandler from '../../../hooks/useCookieHandler'
import WorkspaceMap from '../../workspace-map'
import Loader from '../../Loader/Loader'
import DashboardHeader from '../../Layout/Header'
import useLimitedRoute from '../../../hooks/useLimitedRoute'

const People_Details = () => {
  const { t } = useTranslation()
  const params = useParams()
  const navigate = useNavigate()
  const { token } = useCookieHandler('user_token')
  const { success, errorAuth, loadingfinished } = useLimitedRoute('Owner')
  const [loading, setLoading] = useState(true)
  const [failure, setFailure] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [user, setUser] = useState(null)
  const [isError, setIsError] = useState('')
  const [person, setPerson] = useState([])
  const [sendMessageRequested, setSendMessageRequest] = useState(false)

  const exchangeTokenForId = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/retrieve-token`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        }
      )
      const data = await res.json()

      if (data?.status === true) {
        setUser(data?.data)
        setUserName({
          ...userName,
          firstName: data?.data?.first_name,
          lastName: data?.data?.last_name,
        })
      }
      if (data?.status !== true) {
        setAlertWatcher({
          statement: `something went wrong. Seems you are not authenticated`,
          value: true,
        })
        return
      }
    } catch (error) {}
  }

  const fetchPoepleDetails = async () => {
    if (!token) return
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/people/${params.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      setPerson(data.data)
      setLoading(false)
      setIsSuccess(true)
      setFailure(false)

      if (data?.status !== true) {
        setFailure(true)
        setIsSuccess(false)
        setLoading(false)
      }

      if (response.status === 500) {
        navigate('/500')
      } else if (response.status === 400) {
        navigate('/400')
      }
    } catch (error) {
      setFailure(true)
      setIsSuccess(false)
      setLoading(false)
    }
  }

  // geting user details
  useEffect(() => {
    fetchPoepleDetails()
    if (!token) return
    exchangeTokenForId()
  }, [token])

  const handleSendMessage = async () => {
    let newConvoInitMe = {
      id: user?.id,
      name: `${user?.first_name} ${user?.last_name}`,
      email: user?.email,
      photoUrl: user?.profile_url,
      welcomeMessage: '',
      role: 'default',
    }
    let otherUserConvoInfo = {
      id: person?.id,
      name: `${person?.first_name} ${person?.last_name}`,
      email: person?.email,
      photoUrl: person?.profile_url,
      welcomeMessage: '',
      role: '',
    }
    window.localStorage.setItem(
      'newConvoInitMe',
      JSON.stringify(newConvoInitMe)
    )
    window.localStorage.setItem(
      'otherUserConvoInfo',
      JSON.stringify(otherUserConvoInfo)
    )
    setSendMessageRequest(!sendMessageRequested)
    navigate('/dashboard/inbox')
  }

  return (
    <main className='lg:w-full lg:h-full lg:flex lg:flex-row'>
      <>
        <Loader
          failure={failure}
          isLoading={loading}
          successful={isSuccess}
          errorAuth={errorAuth}
          success={success}
          loadingfinished={loadingfinished}
        />
      </>
      <section className='xl:w-[87%] lg:w-[84%] ml-auto'>
        <DashboardHeader
          icon={
            'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Workspacesblue.svg'
          }
          title='People Details'
        />
        <article
          className='xl:grid xl:grid-cols-3 xl:p-5 xl:gap-10 lg:grid lg:grid-cols-3 lg:p-5 lg:gap-5
                md:grid md:grid-cols-2 md:gap-5 md:p-5 sm:grid sm:grid-cols-1 sm:gap-5 sm:p-5 '
        >
          <div className='flex flex-col justify-center items-center shrink-0 py-5 shadow-2fl rounded-lg bg-white '>
            {person.gender === null && (
              <img
                src={
                  person.profile_url !== null
                    ? person.profile_url
                    : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                }
                alt='profile picture'
                className='w-[72px] h-[72px] bg-black rounded-full '
              />
            )}

            {person.gender === 'Male' && (
              <img
                src={
                  person.profile_url !== null
                    ? person.profile_url
                    : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/men_dark.png'
                }
                alt='profile picture'
                className='w-[72px] h-[72px] bg-black rounded-full '
              />
            )}

            {person.gender === 'Female' && (
              <img
                src={
                  person.profile_url !== null
                    ? person.profile_url
                    : 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/girl_light.png'
                }
                alt='profile picture'
                className='w-[72px] h-[72px] bg-black rounded-full '
              />
            )}
            <span className='font-medium text-black lg:text-[16px] pt-2 '>
              {' '}
              {person.first_name} {person.last_name}{' '}
            </span>

            <div className='flex justify-between items-center divide-x py-2'>
              <div className='flex flex-col justify-center items-center px-4 '>
                <span className='text-[20px] font-medium'>
                  {' '}
                  {person.booked_workspaces?.length}{' '}
                </span>
                <span className='text-[14px] font-light'>
                  {' '}
                  {t('Workspace')}{' '}
                </span>
              </div>

              <div className='flex flex-col justify-center items-center px-4 '>
                {/* <span className='text-[20px] font-medium'> 101 </span> */}
                <span className='text-[14px] font-light'>
                  {' '}
                  {t('Workspace users')}{' '}
                </span>
              </div>
            </div>

            <div
              onClick={handleSendMessage}
              // to={'/dashboard/inbox'}
              className='w-[80%] h-[55px] border-[1px] flex items-center justify-center rounded-lg bg-transparent my-2'
            >
              Send Message
            </div>
          </div>

          <div
            className='lg:grid lg:grid-cols-2 lg:content-start lg:gap-7 lg:px-3 md:py-5 md:grid md:px-5 sm:grid 
                    sm:py-4 sm:px-4 py-5 sm:gap-4 shadow-2fl rounded-lg bg-white '
          >
            <div className='people_underline flex flex-col gap-2 lg:mt-4 break-all '>
              <span className='text-[14px] text-[#727073] '>
                {' '}
                {t('Email')}{' '}
              </span>
              <span className='lg:text-[13px] font-medium '>
                {' '}
                {person.email}{' '}
              </span>
            </div>

            <div className='people_underline flex flex-col gap-2 lg:mt-4 '>
              <span className='text-[14px] text-[#727073] '>
                {' '}
                {t('Phone Number')}{' '}
              </span>
              <span className='lg:text-[16px] font-medium'>
                {person.phone_number !== null
                  ? person.phone_number
                  : 'Not filled'}
              </span>
            </div>

            <div className='people_underline flex flex-col gap-2 lg:py-3 break-all '>
              <span className='text-[14px] text-[#727073] '>
                {' '}
                {t('Address')}{' '}
              </span>
              <span className='lg:text-[16px] font-medium'>
                {person.address !== null ? person.address : 'Not filled'}
              </span>
            </div>

            <div className='people_underline flex flex-col gap-2 lg:py-3 '>
              <span className='text-[14px] text-[#727073] '>
                {' '}
                {t('Membership')}{' '}
              </span>
              <span className='lg:text-[16px] font-medium'>
                {' '}
                {t('Workspace User')}{' '}
              </span>
            </div>

            <div className='flex flex-col gap-2 lg:py-3 '>
              <span className='text-[14px] text-[#727073] '>
                {' '}
                {t('Membership Status')}{' '}
              </span>
              <span className='lg:text-[16px] font-medium'>
                {' '}
                {t('Active')}{' '}
              </span>
            </div>

            <div className='flex flex-col gap-2 lg:py-3 '>
              <span className='text-[14px] text-[#727073] '>
                {' '}
                {t('Registration Date')}{' '}
              </span>
              <span className='lg:text-[16px] font-medium'>
                {person.created_at
                  ? format(new Date(person.created_at), 'dd/mm/yyyy', {
                      locale: enGB,
                    })
                  : 'none'}
              </span>
            </div>
          </div>

          <div className='shadow-2fl rounded-lg h-[380px] lg:block md:hidden sm:hidden'>
            <WorkspaceMap />
          </div>

          <div
            className='lg:h-[464px] lg:py-3 lg:col-span-2 md:py-3 md:col-span-full md:h-[400px] sm:col-span-full sm:h-[500px]
                    sm:py-2 rounded-lg shadow-2fl lg:overflow-auto md:overflow-auto sm:overflow-x-scroll sm:overflow-y-auto '
          >
            <h1 className='text-[20px] ml-4 py-2'> {t('Workspaces')} </h1>
            {person?.booked_workspaces?.map((workspace, key) => (
              <section
                key={key}
                className='flex justify-between items-center gap-5 shadow-2fl rounded-lg my-3 mx-4 xl:w-full 
                            lg:w-full md:w-full sm:w-[500px] '
              >
                <div className='flex items-center lg:w-[40%] md:w-[40%] h-auto gap-2'>
                  <img
                    src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/coding_set.jpeg'
                    alt=''
                    className='xl:w-[90px] xl:h-auto lg:w-[70px] lg:h-auto lg:flex md:flex md:w-[70px] md:h-auto sm:flex sm:w-[70px] rounded-lg '
                  />
                  <div className='flex flex-col'>
                    <span className='lg:text-[15px] md:text-[18px] sm:text-[10px] font-medium'>
                      {' '}
                      {workspace.name}{' '}
                    </span>
                    <span className='text-[#727073] text-[12px] '>
                      {' '}
                      {t('Workspace Name')}{' '}
                    </span>
                  </div>
                </div>

                <div className='flex flex-col lg:mr-4 lg:w-[10%] md:w-[10%] md:mr-0 sm:w-[20%]'>
                  <span className='lg:text-[14px] md:text-[18px] sm:text-[10px] font-medium'>
                    {' '}
                    &#8358; {workspace.price}{' '}
                  </span>
                  <span className='text-[#727073] '> {t('Price')} </span>
                </div>

                <div className='flex flex-col lg:w-[20%] lg:flex md:flex md:w-[30%] sm:w-[30%] sm:hidden'>
                  <span className='lg:text-[14px] md:text-[18px] sm:text-[10px] font-medium'>
                    {workspace.rating
                      ? workspace.rating === 'null'
                      : '0 rating'}{' '}
                  </span>
                  <span className='text-[#727073] '> {t('Ratings')} </span>
                </div>

                <div className='flex flex-col lg:w-[30%] md:w-[30%] sm:w-[30%]'>
                  <span className='lg:text-[14px] md:text-[18px] sm:text-[10px] font-medium'>
                    {' '}
                    {workspace.address}{' '}
                  </span>
                  <span className='text-[#727073] '> {t('Location')} </span>
                </div>
              </section>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default People_Details
