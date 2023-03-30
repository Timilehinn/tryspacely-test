import React from 'react'
import CustomPagination from './CustomPagination'

const InsightPagination = ({
  pageCount,
  setCurrentPagination,
  currentPagination,
  totalPaginatePage,
}) => {
  return (
    <nav className='flex justify-end items-center gap-3 px-5'>
      {totalPaginatePage >= 2 && (
        <select
          onChange={(e) => setCurrentPagination(Number(e.target.value + 1))}
          className='flex justify-center items-center h-[40px] w-[80px] gap-2 bg-[#EEEEEE] rounded outline-none'
        >
          {[...Array(totalPaginatePage)]?.map((o, index) => (
            <option value={index}>{index + 1}</option>
          ))}
        </select>
      )}
      <CustomPagination
        pageCount={pageCount}
        setCurrentPagination={setCurrentPagination}
        totalPaginatePage={totalPaginatePage}
      />
      <div className='flex xl:flex-row lg:flex-row md:flex-row sm:flex-col items-center space-x-2 '>
        <p className='text-[#2C292C]'> Go to: </p>
        <input
          // value={currentPagination}
          onChange={(e) => setCurrentPagination(e.target.value)}
          className='bg-[#EEEEEE] rounded text-[#AAAAAA] border-none outline-none indent-2 w-[80px] h-[40px] '
          placeholder={currentPagination}
        />
      </div>
    </nav>
  )
}

export default InsightPagination
