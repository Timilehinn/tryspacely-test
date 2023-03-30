import moment from 'moment'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { saveAs } from 'file-saver'

const EachTransaction = ({ amount_paid, user, id, created_at, token }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const base64RepairSystem = (str) => {
    str = str.replaceAll('\r', '')
    str = str.replaceAll('\n', '')
    return `data:application/pdf;base64,${str}`
  }

  // ?returning back
  const recieptGenerator = async (tnxId, type) => {
    let endpoint
    setLoading(true)
    if (type == 'success') {
      endpoint = `${process.env.REACT_APP_BASE_URL}/transactions/${tnxId}/receipt?payment`
    } else {
      endpoint = `${process.env.REACT_APP_BASE_URL}/transactions/${tnxId}/receipt?refund`
    }
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (data?.status !== true) {
        setLoading(false)
        toast.error('error occured while retriving recepit')
        return
      }
      let content = data?.data?.content
      const repairedReceipt = await base64RepairSystem(content)
      saveAs(repairedReceipt, `receipt${id}.pdf`)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div
      key={id}
      className='download w-full flex justify-between items-center rounded md:mt-[10px] sm:mt-[5px] md:p-[10px] sm:p-[5px] bg-[#fff] md:space-x-0 sm:space-x-2'
    >
      <div className='flex items-center md:space-x-1 sm:space-x-2'>
        <div className='md:w-[70px] md:h-[70px] sm:w-[70px] sm:h-[70px] flex justify-center items-center rounded-full overflow-hidden'>
          <img
            className='w-[100%] rounded-full object-cover'
            src={
              user?.profile_url
                ? user?.profile_url
                : 'https://cdn.pixabay.com/photo/2018/03/19/18/20/tea-time-3240766_960_720.jpg'
            }
            alt='owner-image'
          />
        </div>
        <div className='flex flex-col space-y-1'>
          <div className='font-500 font-[Plus Jakarta Display] md:text-[16px] sm:text-[14px] text-[#2C292C]'>
            Payment to {user?.first_name} {user?.last_name}
          </div>
          <div className='font-400 font-[Plus Jakarta Display] md:text-[10px] sm:text-[8px] text-[#727073]'>
            {moment(created_at).format('LLL')}
          </div>
        </div>
      </div>
      <div className='font-400 font-[Plus Jakarta Display] md:text-[13px] sm:text-[10px] bg-[#FEF8DE] text-[#F9DC5C] md:p-[10px] sm:p-[5px] text-center md:mr-[0px] sm:mr-[5px]'>
        {t('Space & Mentorship')}
      </div>
      {/* <div
          onClick={() => recieptGenerator(id, payment_status)}
          className='rounded font-400 font-[Plus Jakarta Display] md:text-[13px] sm:text-[10px] bg-[#4380f0] text-[#ffffff] md:p-[10px] sm:p-[5px] text-center md:mr-[0px] sm:mr-[5px]'
        >
          {loading ? 'Downloading...' : <HiDownload size={20} />}
        </div> */}
      <div className='flex justify-start items-center text-center font-400 font-[Plus Jakarta Display] md:text-[16px] sm:text-[14px] text-[#14115]'>
        &#8358; {amount_paid}
      </div>
    </div>
  )
}

export default EachTransaction
