import React, { useEffect, useState } from 'react'
import DashboardHeader from '../Layout/Header'
import ChatWrapper from './ChatWrapper'

const Inbox = () => {
  const [currentUserDetails, setCurrentUserDetails] = useState(null)
  const [otherUserDetails, setOtherUserDetails] = useState(null)
  const getInitChatHandle = () => {
    let newConvoInitMe = window.localStorage.getItem('newConvoInitMe')
    const parsedNewConvoInitme = JSON.parse(newConvoInitMe)
    setCurrentUserDetails(parsedNewConvoInitme)
    window.localStorage.removeItem('newConvoInitMe')

    let otherUserConvoInfo = window.localStorage.getItem('otherUserConvoInfo')
    const parsedOtherUserInfo = JSON.parse(otherUserConvoInfo)
    setOtherUserDetails(parsedOtherUserInfo)
    window.localStorage.removeItem('otherUserConvoInfo')
  }

  useEffect(() => {
    getInitChatHandle()
  }, [])

  return (
    <main className='xl:w-[87%] lg:w-[84%] flex flex-col ml-auto items-end'>
      <DashboardHeader title='Inbox' />
      <div
        style={{
          height: '80vh',
          width: '100%',
          // position: 'fixed',
          top: '10%',
          right: 0,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          // marginLeft: '5%',
          padding: '2% 0',
        }}
      >
        <ChatWrapper
          currentUserDetails={currentUserDetails}
          otherUserDetails={otherUserDetails}
        />
      </div>
    </main>
  )
}

export default Inbox
