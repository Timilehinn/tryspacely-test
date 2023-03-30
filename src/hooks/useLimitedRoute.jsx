import { useState, useLayoutEffect } from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const useLimitedRoute = (incomingAcctType) => {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const [errorAuth, setError] = useState()
  const [loadingfinished, setloadingfinished] = useState(false)
  const [success, setSuccess] = useState()

  const checkAcctType = async () => {
    const token = cookies.get('user_token')
    if (!token) {
      setError(true)
      setloadingfinished(true)
      navigate(-1)
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
        navigate(-1)
        return
      }
      let accountType = data?.data?.account_type[0]?.user_type?.type
      if (!accountType) {
        setError(true)
        setloadingfinished(true)
        navigate(-1)
        return
      }
      if (accountType.toLowerCase() != incomingAcctType.toLowerCase()) {
        setError(true)
        setloadingfinished(true)
        navigate(-1)
        return
      }
      setError(false)
      setSuccess(true)
      setloadingfinished(true)
    } catch (error) {
      setError(true)
      setloadingfinished(true)
      navigate(-1)
    }
  }

  useLayoutEffect(() => {
    checkAcctType()
  }, [])

  return { success, errorAuth, loadingfinished }
}

export default useLimitedRoute
