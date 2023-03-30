import React, { useState } from 'react'
import './Addon.css'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import InsightPagination from '../../Insight/InsightPagination'

const DetailReviews = ({ reviews, id, token, userId }) => {
  const { t } = useTranslation()
  const [reviewRating, setReviewRating] = useState()
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [currentPagination, setCurrentPagination] = useState(1)
  const [perPage, setPerPage] = useState(3)
  const [reviewChecker, setReviewChecker] = useState(false)
  const [blocker, setBlocker] = useState(false)
  const [btnEnabler, setBtnEnabler] = useState(false)

  if (!blocker && reviews?.length > 0) {
    reviews?.map((r) => {
      if (r?.user?.id === userId) {
        setReviewChecker(true)
        setBlocker(true)
      }
    })
  }

  //pagination for reviews
  const indexOfLastPage = currentPagination * perPage
  const indexOfFirstPage = indexOfLastPage - perPage
  const currentPageList = reviews?.slice(indexOfFirstPage, indexOfLastPage)
  let totalPaginatePage = Math.ceil(reviews?.length / perPage)

  //posting review Api function
  const postReviewHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError(false)
    setBtnEnabler(true)
    // setLoading(true)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/workspaces/${id}/reviews`,
        {
          method: 'POST',
          body: JSON.stringify({
            rating: reviewRating,
            review: comment,
          }),
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      if (data?.status === true) {
        setLoading(false)
        setSuccess(true)
        setTimeout(() => {
          location.reload()
        }, 2000)
        return
      }
    } catch (err) {
      setLoading(false)
      setError(true)
      setBtnEnabler(false)
    }
  }

  return (
    <>
      <div className='download w-full'>
        {currentPageList?.map(({ rating, user, review, created_at, id }) => (
          <div
            key={id}
            className='rounded border w-full bg-[#ffffff] p-[10px] mt-[5px]'
          >
            <div className='flex justify-between'>
              <span className='font-500 font-[Plus Jakarta Display] text-[#141115] text-[16px]'>
                {t('Awesome place')}
              </span>
              <div className='flex space-x-1 mr-[10px]'>
                {[...Array(5)].map((star, index) => {
                  let newIndex = index + 1
                  return (
                    <svg
                      key={index}
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M11.9998 17.75L5.82784 20.995L7.00684 14.122L2.00684 9.255L8.90684 8.255L11.9928 2.002L15.0788 8.255L21.9788 9.255L16.9788 14.122L18.1578 20.995L11.9998 17.75Z'
                        fill={rating >= newIndex ? '#F9DC5C' : 'none'}
                        stroke={rating >= newIndex ? '#F9DC5C' : '#141115'}
                        stroke-width='1'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  )
                })}
              </div>
            </div>
            <div className='flex space-x-2 items-center'>
              <span className='font-400 text-[#5B585B] text-[10px] font-[Plus Jakarta Display]'>
                by {user?.last_name} {user?.first_name}
              </span>
              <span className='font-400 text-[#5B585B] text-[10px] font-[Plus Jakarta Display]'>
                {moment(created_at).startOf('day').fromNow()}
              </span>
            </div>
            <div className='font-300 text-[#5B585B] text-[14px] font-[Plus Jakarta Display]'>
              {review}
            </div>
          </div>
        ))}
      </div>
      {reviews?.length > 0 && (
        <InsightPagination
          pageCount={currentPagination}
          currentPageList={currentPageList}
          currentPagination={currentPagination}
          setCurrentPagination={setCurrentPagination}
          totalPaginatePage={totalPaginatePage}
        />
      )}
    </>
  )
}

export default DetailReviews
