import React from 'react'
import clsx from 'clsx'

const Steps = ({ current, availableSteps }) => {
  return (
    <div className="flex justify-between w-full lg:w-[568px] relative">
      {availableSteps.map((step, index) => (
        <div key={index} className="flex flex-col justify-center items-center gap-y-2">
          <div  className={clsx({
            ["rounded-full w-8 border border-[#434144] bg-white h-8 flex items-center justify-center z-50"]: true,
            ["!bg-[#0559FD] text-white border-[#0559FD]"]: current === step
          })}>{step.value}</div>
          <span>{step.text}</span>
        
        </div>
        
      ))}
      <hr className="border border-[#434144] w-[72%] lg:w-[80%] ml-8 absolute top-4" />

    </div>
  )
}

export default Steps