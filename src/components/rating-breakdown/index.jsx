import React from 'react'
import { Progress } from 'antd'
import { StarFilled } from '@ant-design/icons'

const RatingBreakdown = ({rating}) => {
  const {stars, percentage, users } = rating
  return (
      <div className="flex items-center space-x-3 my-4">
        <div className="flex items-center">{stars} <StarFilled className="ml-2 space-y-5" /></div>
          <Progress percent={percentage} strokeColor="#F9DC5C" trailColor="#D4D4D4" showInfo={false} />
          <span>{users}</span>
      </div>
  )
}

export default RatingBreakdown