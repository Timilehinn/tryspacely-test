import React, { useState } from 'react'
import Pagination from '../../pagination'
import { useTranslation } from "react-i18next";

const People_Pagination = ({ pageCount, handlePageClick, currentPageList }) => {
    const [pageDropdown, setPageDropdown] = useState()
    const { t } = useTranslation()
    return (
        <>
            <nav className='flex justify-end items-center gap-3 py-5 px-10 '>
                <button
                    onClick={() => setPageDropdown(!pageDropdown)}
                    className='flex justify-center items-center h-[40px] w-[80px] gap-2 bg-[#EEEEEE] rounded '
                >
                    <span className='text-[#5B585B]'> {pageCount} </span>
                    <img src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Down-1.svg' alt='dropdown arrow' />
                </button>

                <Pagination
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                    pageRangeDisplay='5'
                />
                <div className='flex xl:flex-row lg:flex-row md:flex-row sm:flex-col items-center space-x-2 '>
                    <p className='text-[#2C292C]'> {t("Go to:")} </p>
                    <input
                        className='bg-[#EEEEEE] rounded text-[#AAAAAA] border-none outline-none indent-2 w-[80px] h-[40px] '
                        placeholder='e.g 103'
                    />
                </div>
            </nav>
        </>
    );
}

export default People_Pagination; { }