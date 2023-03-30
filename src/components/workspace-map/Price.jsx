import React from 'react'
import Polygon from '../../svgs/Polygon.svg'
import Naira from '../../svgs/NairaWhite.svg'
import { FormatAmount } from '../../utils/formatAmount'

const Price = ({amount, onClick}) => {
  return (
    <div className="w-[93px] h-[48px] flex items-center flex-col z-50" onClick={onClick}>
        <div className="flex items-center justify-between text-base bg-[#0559FD] justify-center h-[32px] py-1 px-3 rounded-lg text-white font-bold">
          <Naira />
          {FormatAmount(amount)}
        </div>
        <Polygon className="-mt-1" />
    </div>
  )
}

export default Price
