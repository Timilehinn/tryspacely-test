import React from 'react'


const CustomPagination = ({ pageCount, setCurrentPagination, totalPaginatePage }) => {
    if (totalPaginatePage === 0) {
        totalPaginatePage = totalPaginatePage + 1
    }

    if (pageCount > totalPaginatePage) {
        setCurrentPagination(prev => prev - 1)
    }

    if (pageCount < 1) {
        setCurrentPagination(1)
    }

    const incrementPage = () => {
        setCurrentPagination(prev => prev + 1)
    }

    const decrementPage = () => {
        setCurrentPagination(prev => prev - 1)
    }

    return (
        <div className="flex items-center space-x-3 p-[10px]">
            <div onClick={decrementPage} className="rounded-full flex justify-center items-center w-[35px] h-[35px] 
                border cursor-pointer">
                <img src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/Left.svg" alt="left-arrow" />
            </div>

            <div className="rounded-full flex justify-center items-center w-[35px] h-[35px] border text-[16px]">
                {pageCount}
            </div>

            <div onClick={incrementPage} className="rounded-full flex justify-center items-center w-[35px] h-[35px] 
                 border cursor-pointer">
                <img src="https://trybookings-assets.s3.eu-west-2.amazonaws.com/Right.svg" alt="right-arrow" />
            </div>
        </div>
    )
}

export default CustomPagination