import React, { useState, useEffect } from 'react'
import { Field } from 'formik'
import Toggle from 'react-toggle'
// import '../addOn.scss';
import { useTranslation } from "react-i18next";
import { BsCheck, BsXLg } from 'react-icons/bs';
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CustomAlert = ({ watcher, setWatcher }) => {
    return (
        <div style={{ zIndex: 1000 }} className='h-full w-[100%] bg-[#f3f3f3da] fixed inset-0 flex justify-center items-center '>
            <div className='py-2 space-y-4 bg-[white] w-[620px] h-[316px] rounded ml-[10px] p-[20px] pt-[20px] pb-[20px] shadow-xl mt-[20px]' style={{ boxShadow: '1px 1px 2px #adadad' }}>
                <div onClick={() => setWatcher({
                    statement: '',
                    value: false
                })} className='flex justify-end w-[100%]'>
                    <BsXLg />
                </div>
                <div className="h-[auto] flex flex-col justify-center items-center">
                    <p className=' mt-[30px] leading-6 text-[#141115]'>{watcher?.statement}</p>
                    <button onClick={() => setWatcher({
                        statement: '',
                        value: false
                    })} className='w-[177px] h-[52px] p-[20px] rounded mt-[30px] flex items-center justify-center bg-[#0559FD] text-[#FCFCFC] text-[17px]'>
                        {'Ok'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomAlert