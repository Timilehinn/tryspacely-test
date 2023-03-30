import React, { useState } from 'react'
import Pagination from '../../components/pagination'
import { Rate } from 'antd'
import RatingBreakdown from '../../components/rating-breakdown'
import parse from 'html-react-parser'

import { useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import moment from 'moment'
import { useParams } from 'react-router'
import Loader from '../../components/Loader/Loader'
import Header from '../../components/homepage/ui/header'
import Aboutfooterlink from '../../components/aboutblog/aboutui/aboutfooterlink'

const SpaceReview = () => {
  const search = useLocation().search
  let { id } = useParams()
  const [WorkspaceReviews, setWorkspaceReviews] = useState([])
  const [avgRating, setAvgRating] = useState(null)
  const [workspaceData, setWorkspaceData] = useState(null)
  const [pageSuccess, setPageSucesss] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [pageFailure, setPageFailure] = useState(false)
  const [Rating, setRating] = useState([])

  function sumArr(arr) {
    return arr.reduce((x, y) => x + y, 0)
  }

  const calculateRatingAvg = (reviewsArrays) => {
    let reviewsArr = []
    const pushingRating = reviewsArrays?.map((item) => {
      reviewsArr = [...reviewsArr, item?.rating]
    })
    if (!reviewsArr.length) {
      return
    }
    const sumUp = sumArr(reviewsArr)
    const avg = sumUp / reviewsArr.length
    setAvgRating(avg)
  }

  const calPercentageRatings = () => {
    // get all number of times an elements appear
    let reviewsArr = []
    const pushingRating = WorkspaceReviews?.map((item) => {
      reviewsArr = [...reviewsArr, item?.rating]
    })
    const rating5 = reviewsArr.filter((x) => x === 5).length
    const rating4 = reviewsArr.filter((x) => x === 4).length
    const rating3 = reviewsArr.filter((x) => x === 3).length
    const rating2 = reviewsArr.filter((x) => x === 2).length
    const rating1 = reviewsArr.filter((x) => x === 1).length

    const rating5Percentage = (rating5 / reviewsArr?.length) * 100
    const rating4Percentage = (rating4 / reviewsArr?.length) * 100
    const rating3Percentage = (rating3 / reviewsArr?.length) * 100
    const rating2Percentage = (rating2 / reviewsArr?.length) * 100
    const rating1Percentage = (rating1 / reviewsArr?.length) * 100

    setRating((prev) => [
      ...prev,
      {
        stars: 5,
        percentage: rating5Percentage,
        users: rating5,
      },
    ])
    setRating((prev) => [
      ...prev,
      {
        stars: 4,
        percentage: rating4Percentage,
        users: rating4,
      },
    ])
    setRating((prev) => [
      ...prev,
      {
        stars: 3,
        percentage: rating3Percentage,
        users: rating3,
      },
    ])
    setRating((prev) => [
      ...prev,
      {
        stars: 2,
        percentage: rating2Percentage,
        users: rating2,
      },
    ])
    setRating((prev) => [
      ...prev,
      {
        stars: 1,
        percentage: rating1Percentage,
        users: rating1,
      },
    ])
  }

  const getReview = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/workspaces/${id}/reviews`
    )
    const data = await res.json()
    if (data?.status !== true) {
      return
    }
    setWorkspaceReviews(data?.data?.data)
    calculateRatingAvg(data?.data?.data)
  }

  useLayoutEffect(() => {
    getReview()
  }, [])

  useLayoutEffect(() => {
    if (WorkspaceReviews?.length) {
      calPercentageRatings()
    }
  }, [WorkspaceReviews])

  const getWorkspace = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/workspaces/${id}`
      )
      const data = await res.json()
      if (data?.status !== true) {
        setPageSucesss(false)
        setPageFailure(true)
        setPageLoading(false)
        return
      }
      setWorkspaceData(data?.data)
      setTimeout(() => {
        setPageSucesss(true)
        setPageFailure(false)
        setPageLoading(false)
      }, 1500)
    } catch (error) {
      setPageSucesss(false)
      setPageFailure(true)
      setPageLoading(false)
    }
  }

  useLayoutEffect(() => {
    getWorkspace()
  }, [])

  return (
    <>
      <Loader
        failure={pageFailure}
        successful={pageSuccess}
        isLoading={pageLoading}
        redirectTo={`/booking/${id}`}
      />
      <Header />

      <div className='w-[90%] mx-auto md:w-2/4 md:ml-20 py-5'>
        {/*<Breadcrum base="Lagos" current={workspaceData?.name} />*/}
        {/*<div className="flex items-center mb-6"><ArrowLeftOutlined className="mr-4" /> Reviews</div>*/}
        <div className='flex border-b pb-4 gap-x-10 flex-col md:flex-row'>
          <div className='w-full md:w-[270px] p-6'>
            <h3 className='font-normal text-base mb-4'>Average User Rating</h3>
            {avgRating && (
              <p className='font-bold text-2xl mb-5 flex items-baseline'>
                <span className='text-4xl'>{avgRating.toFixed(2)}</span>
                <span>/5</span>
              </p>
            )}

            <p className='mb-5'>
              <Rate disabled allowHalf defaultValue={1} />
            </p>
            <h4 className='text-lg'>{WorkspaceReviews?.length} Ratings</h4>
          </div>
          <div className='p-6 md:w-3/4'>
            <p className='font-normal text-base mb-4'>Rating Breakdown</p>
            {Rating?.map((info, index) => (
              <RatingBreakdown rating={info} key={index} />
            ))}
          </div>
        </div>

        {WorkspaceReviews.map((info) => (
          <div className='reviews_holder' key={info?.id}>
            {/* <h4>{info?.created_at} </h4> */}
            <div className='host_info'>
              <span>
                {info?.user?.first_name} {info?.user?.last_name}
              </span>
              <span>{moment(info?.created_at).startOf('day').fromNow()}</span>
              {/* <span>{info?.time}</span> */}
            </div>
            {/* <div className="reviews_holder_stars">
                      <Rate disabled defaultValue={info?.stars} />
                    </div> */}
              {parse(info?.review + '')}
          </div>
        ))}

        <Pagination
          pageCount={3}
          handlePageClick={() => {}}
          pageRangeDisplayed='5'
        />
      </div>

      <Aboutfooterlink />
    </>
  )
}

export default SpaceReview
