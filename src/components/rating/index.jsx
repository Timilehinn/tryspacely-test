import React, { useEffect, useState } from 'react'
import Rating from 'react-rating'
import EmptyStar from '../../svgs/Star-empty.svg'
import FullStar from '../../svgs/full-star.svg'
import Spacer from '../spacer'

const WorkSpaceRating = ({ rating }) => {
  const [avgrating, setAvgRating] = useState(0);

  function sumArr(arr) {
    return arr.reduce((x, y) => x + y, 0);
  }

  const calculateRatingAvg = (reviewsArrays) => {
    let reviewsArr = [];
    const pushingRating = reviewsArrays?.map((item) => {
      reviewsArr = [...reviewsArr, item?.rating];
    })
    if (!reviewsArr.length) {
      return
    }
    const sumUp = sumArr(reviewsArr)
    const avg = sumUp / reviewsArr.length
    setAvgRating(avg.toFixed(2))
  }

  useEffect(() => {
    calculateRatingAvg(rating);
  }, [])

  return (
    <div className="w-[150px] flex justify-between items-center">
      <Rating 
        readonly
        initialRating={avgrating}
        emptySymbol={<EmptyStar className="space-x-6 w-4" />}
        fullSymbol={<FullStar />} 
      />
      <Spacer width={5} />
      <span className="bg-black text-white rounded-2xl text-center text-xs w-[30px] h-4 items-center">{avgrating}</span>
    </div>
  )
}

export default WorkSpaceRating
