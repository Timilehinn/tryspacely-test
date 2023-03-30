import React from 'react'
import MultiRangeSlider from '../range'

const RangeComponent = ({ min, max, title, subTitle, setRange }) => {
  return (
    <div>
      <span className="block text-md font-light mt-8 mb-11">{title}</span>
      <MultiRangeSlider
        min={min}
        max={max}
        title={title}
        subTitle={subTitle}
        onChange={({ min, max }) =>
        setRange({ min: min, max: max })
      }
    />
    </div>
  )
}

export default RangeComponent