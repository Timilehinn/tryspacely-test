import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import FavourityOutline from '../../svgs/FavIcon.svg'
import FavourityActive from '../../svgs/FavourityActive.svg'
import WorkSpaceRating from '../rating'
import Naira from '../../assets/icons/Naira.svg'
import EachCard from './EachCard'
import useCookieHandler from '../../hooks/useCookieHandler'

const Card = ({ isListView, isGridView, currentPagelist }) => {
  const { token } = useCookieHandler('user_token')
  const [user, setUser] = useState(null)

  const getUserDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/retrieve-token`,
        {
          method: 'POST',
          body: JSON.stringify({
            token,
          }),
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      if (data?.status !== true) {
        return
      }
      setUser(data?.data)
    } catch (error) {}
  }

  useEffect(() => {
    token && getUserDetails()
    return () => {
      // second
    }
  }, [token])

  return (
    <>
      {currentPagelist?.map((item) => {
        return (
          <EachCard
            user={user}
            key={item?.id}
            item={item}
            isListView={isListView}
            isGridView={isGridView}
          />
        )
      })}
    </>
  )
}

export default Card
