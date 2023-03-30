import React, { useEffect, useState } from 'react'

import useCookieHandler from '../../hooks/useCookieHandler'
import DashboardHeader from '../Layout/Header'
import Loader from '../Loader/Loader'
import FavoriteBody from './BookingsUI/favBody'

const FavoriteWorkspace = () => {
  const [user, setUser] = useState([])
  const { token } = useCookieHandler('user_token')
  const [loading, setLoading] = useState(true)

  const exchangeTokenForId = async () => {
    if (!token) {
      return
    }
    setLoading(true)
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
      if (data?.status !== true) {
        alert('something went wrong. Seems you are not authenticated')
        return
      }
      // setId(data?.data?.id)
      let myStacks = []
      const findStack = data?.data?.stacks?.map((item) => {
        myStacks = [...myStacks, item?.stacks]
      })
      let userToFIll = {
        first_name: data?.data?.first_name,
        last_name: data?.data?.last_name,
        email: data?.data?.email,
        stacks: myStacks?.toString(),
        role: data?.data?.role?.position,
        company: data?.data?.role?.company,
        position: data?.data?.role?.position,
        account_type: data?.data?.account_type.toString(),
        workspace_favourites: data?.data?.workspace_favourites,
        // reviews: data?.data?.workspace_favourites.reviews,
        github: data?.data?.github,
        gender: data?.data?.gender,
        profile_url: data?.data?.profile_url,
      }
      setUser(userToFIll)
      setLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
    exchangeTokenForId()
  }, [token])

  return (
    <main className='flex flex-row xl:w-[87%] lg:w-[84%] md:w-[100%] sm:w-[100%] ml-auto'>
      <Loader isLoading={loading} />
      <section className='flex flex-col w-full'>
        <DashboardHeader
          title='Favorite Spaces'
          icon='https://trybookings-assets.s3.eu-west-2.amazonaws.com/love-icon.svg'
        />
        <FavoriteBody user={user} />
      </section>
    </main>
  )
}

export default FavoriteWorkspace
