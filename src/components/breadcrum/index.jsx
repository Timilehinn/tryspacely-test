import React from 'react'
import { RightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const Breadcrum = ({base, current}) => {
  return (
    <div className="flex items-center space-x-4 my-4">
      <Link to="/">{base}</Link> <RightOutlined className="mr-4" /> {current}
    </div>
  )
}

export default Breadcrum