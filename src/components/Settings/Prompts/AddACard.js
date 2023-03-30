import React from 'react'
import { Icon } from '@iconify/react';


const AddACard = ({ t, setShowAddcard }) => {
    return (
        <div className='h-full w-[100%] bg-[#f3f3f3da] fixed inset-0 flex justify-center items-center' >
            <div className='bg-[white] mx-6 p-[10px] min-h-[370px] w-[300px] drop-shadow-2xl mt-[20px]' style={{ boxShadow: '2px 2px 5px #9c9c9c' }} >
                <div className='flex items-center justify-end'>
                    <button onClick={() => setShowAddcard(false)} className='rounded-full h-5 w-5 drop-shadow-2xl' style={{ boxShadow: '2px 2px 5px #9c9c9c' }}>
                        X
                    </button>
                </div>
                <h2 className="text-[#141115] mb-[10px] text-xl font-medium sm:text-[14px]">{t("Add Payment Method")}</h2>
                <div className='w-[100%] h-[auto] flex gap-[10px] mb-[10px]'>
                    <div style={{ borderStyle: 'solid', borderColor: '#D4D4D4', borderWidth: 1 }} className='text-white w-[40px] h-[28px] bg-[white] rounded flex justify-center item-center'>
                        <Icon icon="logos:visa" width="24" height="24" />
                    </div>
                    <div style={{ borderStyle: 'solid', borderColor: '#D4D4D4', borderWidth: 1 }} className='w-[40px] h-[28px] bg-[white] rounded flex justify-center item-center'>
                        <Icon icon="uim:master-card" color="red" width="24" height="24" />
                    </div>
                </div>
                <div className='w-[100%] h-[auto] flex flex-col gap-[10px]'>
                    <div className='w-[100%] h-[auto] flex gap-[10px]'>
                        <div>
                            <label className='sm:text-[11px]' htmlFor="name">FIrst Name</label>
                            <input style={{ borderStyle: 'solid', borderColor: '#D4D4D4', borderWidth: 1 }} type="text" className='w-[100%] h-[44px] border-1 border-slate-500 rounded' />
                        </div>
                        <div>
                            <label className='sm:text-[11px]' htmlFor="name">Last Name</label>
                            <input style={{ borderStyle: 'solid', borderColor: '#D4D4D4', borderWidth: 1 }} type="text" className='rounded w-[100%] h-[44px] border-1 border-slate-500' />
                        </div>
                    </div>
                    <div>
                        <label className='sm:text-[11px]' htmlFor="name">Card Number</label>
                        <input style={{ borderStyle: 'solid', borderColor: '#D4D4D4', borderWidth: 1 }} type="text" className='rounded w-[100%] h-[44px] border-1 border-slate-500' />
                    </div>
                    <div className='w-[100%] h-[auto] flex gap-[10px]'>
                        <div>
                            <label className='sm:text-[11px]' htmlFor="name">Expiration Date</label>
                            <input style={{ borderStyle: 'solid', borderColor: '#D4D4D4', borderWidth: 1 }} type="text" className='rounded w-[100%] h-[44px] border-1 border-slate-500' />
                        </div>
                        <div>
                            <label className='sm:text-[11px]' htmlFor="name">CVV</label>
                            <input style={{ borderStyle: 'solid', borderColor: '#D4D4D4', borderWidth: 1 }} type="text" className=' rounded w-[100%] h-[44px] border-1 border-slate-500' />
                        </div>
                    </div>
                    <div className='w-[100%] h-[auto] flex gap-[10px] mt-[20px]'>
                        <button className='text-white w-[70px] h-[30px] bg-[#0559FD] sm:text-[11px] rounded'>
                            Add Card
                        </button>
                        <button className='w-[70px] h-[30px] bg-[white] sm:text-[11px] rounded'>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddACard