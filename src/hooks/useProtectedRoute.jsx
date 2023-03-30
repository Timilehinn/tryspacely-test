import { useState, useLayoutEffect } from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const useProtectedRoute = (cookieToGet = 'user_token', shouldRouteOnError) => {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const [token, setToken] = useState()
  const [errorAuth, setError] = useState()
  const [loadingfinished, setloadingfinished] = useState(false)
  const [success, setSuccess] = useState()

  const getCookie = () => {
    const gottenToken = cookies.get(cookieToGet)
    if (!gottenToken) {
      setError(true)
      setloadingfinished(true)
      return
    }
    setToken(gottenToken)
    setError(false)
    setloadingfinished(true)
    return
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      getCookie()
    }, 1000)
  }, [])

  useLayoutEffect(() => {
    if (!token) {
      return
    }
    // exchangeTokenForId()
    setError(false)
    setSuccess(true)
  }, [token])

  const exchangeTokenForId = async () => {
    const token = cookies.get('user_token')
    if (!token) {
      setError(true)
      setloadingfinished(true)
      return
    }
    try {
      const gottenToken = cookies.get('user_token')
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/retrieve-token`,
        {
          method: 'POST',
          body: JSON.stringify({
            token,
          }),
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${gottenToken}`,
          },
        }
      )
      const data = await res.json()
      if (data?.status !== true) {
        setError(true)
        setloadingfinished(true)
        // shouldRouteOnError && alert('something went wrong. Seems you are not authenticated. Routing back to login');
        return
      }
      setError(false)
      setSuccess(true)
      setloadingfinished(true)
    } catch (error) {
      setError(true)
      setloadingfinished(true)
    }
  }

  if (errorAuth && shouldRouteOnError) {
    navigate('/login')
  }

  return { success, errorAuth, loadingfinished }
}

export default useProtectedRoute
