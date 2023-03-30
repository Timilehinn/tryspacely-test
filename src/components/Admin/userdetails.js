import moment from 'moment'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useCookieHandler } from '../../hooks'
import { setError, setUserDetails } from '../../slices/admin_user'
import DashboardHeader from '../Layout/Header'
import Loader from '../Loader/Loader'

const User_Details = () => {
  const ref = useRef
  const { id } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)
  const [isSuccess, setIsSucess] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const { token } = useCookieHandler('user_token')

  const data = useSelector((state) => state.adminPeople.userDetails)

  const getUserDetails = async () => {
    if (!token) {
      return
    }
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/people/all/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()
      dispatch(setUserDetails(data?.data))
      setLoading(false)
      setIsFailure(false)
      setIsSucess(true)

      if (data?.status !== true) {
        setLoading(false)
        setIsFailure(true)
        setIsSucess(false)
        dispatch(setError(data?.errors))
      }
    } catch (error) {
      setLoading(false)
      setIsFailure(true)
      setIsSucess(false)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [token])

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showImage && ref.current && !ref.current.contains(e.target)) {
        setShowImage(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showImage])

  return (
    <main className='xl:w-[87%] lg:w-[84%] md:w-[100%] sm:w-[100%] ml-auto relative h-screen'>
      <Loader
        failure={isFailure} //if your api or state fails and page should not show
        successful={isSuccess} //if the api or state is successful
        isLoading={loading} //if your api or state is still fetching
      />
      <DashboardHeader
        icon={'https://trybookings-assets.s3.eu-west-2.amazonaws.com/People.svg'}
        title='Users Details'
      />
      <main className='xl:grid-cols-3 xl:gap-5 grid lg:grid-cols-3 lg:gap-5 lg:mx-10 md:grid-cols-1 md:mx-5 md:gap-5 sm:grid-cols-1 sm:gap-5 sm:mx-5 relative'>
        <section className='col-span-1 flex justify-center items-center lg:p-5 lg:my-4 md:p-5 md:my-5 sm:p-5 sm:my-5 shadow-2fl rounded-lg '>
          <img
            src={
              data[0]?.prpfile_url !== null
                ? data[0]?.profile_url
                : 'https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482__340.jpg'
            }
            alt='profile picture'
            className='w-[250px] h-[250px] bg-cover '
          />
        </section>

        <section className='col-span-2 p-5 shadow-2fl  rounded-lg grid lg:my-4 lg:grid-cols-2 md:grid-cols-1 md:my-5 sm:grid-cols-1 sm:my-5  '>
          <article className=''>
            <p className='flex flex-col gap-1 py-2 justify-start items-start text-gray-500 text-[14px] '>
              {' '}
              Name{' '}
              <span className='text-black text-[16px] '>
                {data[0]?.first_name} {data[0]?.last_name}
              </span>
            </p>

            <p className='flex flex-col gap-1 py-2 justify-start items-start text-gray-500 text-[14px] '>
              {' '}
              Email{' '}
              <span className='text-black text-[16px] '>{data[0]?.email}</span>
            </p>

            <p className='flex flex-col gap-1 py-2 justify-start items-start text-gray-500 text-[14px] '>
              {' '}
              Phone Number{' '}
              <span className='text-black text-[16px] '>
                {' '}
                {data[0]?.phone_number}{' '}
              </span>
            </p>

            <p className='flex flex-col gap-1 py-2 justify-start items-start text-gray-500 text-[14px] '>
              {' '}
              Location{' '}
              <span className='text-black text-[16px] '>
                {data[0]?.address}
              </span>
            </p>
          </article>

          <article className=''>
            <p className='flex flex-col gap-1 py-2 justify-start items-start text-gray-500 text-[14px] '>
              {' '}
              Gender{' '}
              <span className='text-black text-[16px] '>{data[0]?.gender}</span>
            </p>

            <p className='flex flex-col gap-1 py-2 justify-start items-start text-gray-500 text-[14px] '>
              {' '}
              Date of birth{' '}
              <span className='text-black text-[16px] '>
                {moment(data[0]?.date_of_birth).format('LL')}
              </span>
            </p>

            <p className='flex flex-col gap-1 py-2 justify-start items-start text-gray-500 text-[14px] '>
              Interest
              <span className='text-black text-[16px] '>
                {data[0]?.interest}
              </span>
            </p>
          </article>
        </section>

        <section className='col-span-1 relative rounded-lg my-5'>
          <img
            src={data[0]?.kyc_document?.document_url}
            alt='kyc_image'
            className='w-full h-[300px] rounded-lg'
          />
          <span className='absolute top-0 left-0 w-full h-full bg-[#00000091] flex justify-center items-center m-auto '>
            {' '}
            <button
              onClick={() => setShowImage(true)}
              className='bg-blue-500 h-[40px] w-[140px] rounded-md text-white font-normal hover:bg-white hover:text-black '
            >
              {' '}
              Click to verify{' '}
            </button>{' '}
          </span>
        </section>
      </main>

      {showImage === true && (
        <div className='flex flex-col justify-center items-center mx-0'>
          <div className='overlay'></div>

          <article
            className='lg:h-[500px] lg:w-[600px] lg:top-[10rem] md:top-[14rem] md:h-[400px] md:w-[90%] sm:h-[400px] sm:top-[10rem] sm:w-[90%]
          z-10 bg-white rounded-lg shadow-2fl p-5 absolute mx-auto '
          >
            <button
              onClick={() => setShowImage(false)}
              className='flex justify-end items-end text-2xl font-semibold '
            >
              {' '}
              X{' '}
            </button>
            <img
              src={data[0]?.kyc_document?.document_url}
              alt='KYC'
              className='w-full lg:h-[350px] md:h-[250px] sm:h-[200px] flex justify-center items-center m-auto py-3 rounded-lg '
            />
            <p className='flex flex-row items-center gap-2 text-gray-400 text-[14px]'>
              Means of id:
              <span className='text-black text-[16px] '>
                {' '}
                {data[0]?.kyc_document?.means_of_id}{' '}
              </span>
            </p>
            <button className='bg-blue-500 w-[200px] h-[35px] rounded-lg text-white my-2 hover:bg-black  '>
              {' '}
              Geenerate kyc details{' '}
            </button>
          </article>
        </div>
      )}
    </main>
  )
}

export default User_Details
