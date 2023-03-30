import React, { useState, useEffect } from 'react'
import { usePaystackPayment } from 'react-paystack'
import { v4 as uuidv4 } from 'uuid'
import PaymentSuccessful from '../../../components/payment-status'

const Paystack = ({
  setIsSuccess,
  workspaceData,
  userDetails,
  transactionId,
  dateBooked,
  blockPayment,
}) => {
  const [loading, setLoading] = useState(false)
  let price = `${workspaceData?.price}00`
  const amount_payment =
    workspaceData?.type?.type === 'Monthly'
      ? (10 / 100) * parseInt(price) + parseInt(price)
      : (10 / 100) * (parseInt(price) * dateBooked.length) +
        parseInt(price) * dateBooked.length
  const config = {
    reference: transactionId,
    email: userDetails?.email,
    amount: amount_payment,
    // amount:
    //   (10 / 100) * (parseInt(price) * dateBooked.length) +
    //   parseInt(price) * dateBooked.length,
    publicKey: `${process.env.PAYSTACK_PUBLIC_API_KEY}`,
  }

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    setIsSuccess(true)
  }

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
  }

  const initializePayment = usePaystackPayment(config)

  return (
    <>
      {/* <PaymentSuccessful /> */}
      <button
        disabled={blockPayment}
        style={{ marginLeft: -250 }}
        className={`bg-[${
          blockPayment ? 'grey' : 'green'
        }] p-2 rounded text-[white]`}
        onClick={() => {
          initializePayment(onSuccess, onClose)
        }}
      >
        {blockPayment == true ? 'Checking...' : 'Make Payment Now'}
      </button>
    </>
  )
}

export default Paystack
