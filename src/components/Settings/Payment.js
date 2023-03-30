import React, { useState } from 'react'
import './addOn.scss'
import { useTranslation } from 'react-i18next'
import CardIcon from '../../assets/icons/Card.svg'
import PaypalIcon from '../../assets/icons/Paypal.svg'
import AddACard from './Prompts/AddACard'
import Card from './Prompts/Card'

const Payment = () => {
  const [showAddCard, setShowAddcard] = useState(false)
  const { t } = useTranslation()

  return (
    <>
      {showAddCard ? (
        <AddACard t={t} setShowAddcard={setShowAddcard} />
      ) : (
        <div className='md:w-[45rem] sm:w-[25rem] xxs:w-[15rem] py-2 space-y-4 bg-[white] sm:h-[auto] rounded mx-3 p-[20px] pt-[20px] pb-[20px] shadow-xl mt-[20px] drop-shadow-2xl mb-[20px]'>
          <Card t={t} />
          <h2 className='text-[#141115] mb-[10px] text-xl font-medium'>
            {t('Payment Method')}
          </h2>
          <div
            onClick={() => setShowAddcard(true)}
            style={{ boxShadow: '2px 2px 5px #9c9c9c' }}
            className='drop-shadow-2xl w-[80%] min-h-[80px] card flex p-4 items-center gap-x-3 rounded-lg cursor-pointer'
          >
            <CardIcon />
            <span>Add Card</span>
          </div>
          <div
            style={{ boxShadow: '2px 2px 5px #9c9c9c' }}
            className='drop-shadow-2xl w-[80%] min-h-[80px] card flex p-4 items-center gap-x-3 rounded-lg cursor-pointer'
          >
            <PaypalIcon />
            <span>Paypal</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Payment
