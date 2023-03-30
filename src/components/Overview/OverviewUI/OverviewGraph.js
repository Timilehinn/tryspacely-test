import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import useCookieHandler from '../../../hooks/useCookieHandler'
import { setTotalAmount, setChartData } from '../../../slices/insightSlice'
import Chart from '../../Insight/Chart'

const OverviewGraph = ({ dashboard }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { token } = useCookieHandler('user_token')
  const [insight, setInsight] = useState([])
  const [blockStateChange, setBlockStateChange] = useState(false)
  const [chosenData, setChosenData] = useState([])

  const accountType = useSelector((state) => state.adminPeople.accountType)

  //fetch chart data function
  const getChartDetails = async () => {
    if (accountType === 'Sales') return

    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/insights`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      if (data?.status === true) {
        dispatch(setChartData(data?.data))
        setInsight(data?.data)
        return
      }
    } catch (err) {}
  }

  useEffect(() => {
    if (!token) return

    if (accountType && accountType !== 'Admin') {
      getChartDetails()
    }
  }, [token])

  //selector for datas in redux
  const transactions = useSelector(
    (state) => state?.insight?.transactionsDetails
  )
  const totalAmount = useSelector((state) => state?.insight?.totalAmount)

  const chartHistory = useSelector((state) => state.insight.chartData)

  let date = new Date()
  const currentYear = moment(date).format('YYYY')
  const currentMonth = moment(date).format('MMM')

  if (!blockStateChange && chartHistory?.length > 0) {
    setChosenData(chartHistory?.filter((h) => h.year === Number(currentYear)))

    setBlockStateChange(true)
  }

  const amountPaid = transactions?.data?.data?.map((t, i) =>
    Math.round(t?.amount_paid)
  )

  if (amountPaid?.length > 0) {
    let money = amountPaid?.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue
    })
    dispatch(setTotalAmount(money))
  }

  return (
    <main className='lg:col-span-2 lg:my-4 md:col-auto md:my-4 sm:my-4 sm:col-auto relative p-4 rounded-md shadow-2fl '>
      {insight.length > 0 ? (
        <div className=''>
          <div className='flex flex-col gap-0'>
            {accountType === 'User' && (
              <span className='font-500 text-[14px] text-[#727073]'>
                {' '}
                {t('Monthly Expenses')}{' '}
              </span>
            )}

            {accountType === 'Owner' && (
              <span className='font-500 text-[14px] text-[#727073]'>
                {' '}
                {t('Monthly Revenue')}{' '}
              </span>
            )}

            <div className='flex flex-row items-center gap-2'>
              <span className='text-[#727073] text-[20px]'> &#8358; </span>
              {accountType === 'Owner' && (
                <span className='text-[#141115] font-700 text-[25px] font-medium'>
                  {' '}
                  {dashboard.total_expenses}{' '}
                </span>
              )}

              {accountType === 'User' && (
                <span className='text-[#141115] font-700 text-[25px] font-medium'>
                  {' '}
                  {dashboard.total_expenses}{' '}
                </span>
              )}
            </div>
          </div>

          <div className='lg:col-span-2 lg:pt-5 md:pt-8 md:col-auto sm:col-auto sm:pt-8 '>
            <Chart
              chosenData={chosenData}
              setChosenData={setChosenData}
              currentMonth={currentMonth}
              chartHistory={chartHistory}
            />
          </div>
        </div>
      ) : (
        <>
          {accountType === 'User' && (
            <div className='flex flex-col justify-center items-center gap-2 my-14 '>
              <img
                className='font-medium w-10'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Analytics.svg'
                alt='analytics'
              />
              <h1 className='font-medium text-2xl'> {t('No Expense Yet!')} </h1>
              <p className='w-[70%] text-center '>
                {t(
                  'You have made no expenses yet. Once you do, it will be displayed here.'
                )}
              </p>
            </div>
          )}

          {accountType === 'Owner' && (
            <div className='flex flex-col justify-center items-center gap-2 my-14 '>
              <img
                className='font-medium w-10'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Analytics.svg'
                alt='analytics'
              />
              <h1 className='font-medium text-2xl'>
                {' '}
                {t('No Revenue Yet! ')}{' '}
              </h1>
              <p className='w-[70%] text-center '>
                {t(
                  'You have made no Revenue yet. Once you do, it will be displayed here.'
                )}
              </p>
            </div>
          )}

          {accountType === 'Admin' && (
            <div className='flex flex-col justify-center items-center gap-2 my-14 '>
              <img
                className='font-medium w-10'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Analytics.svg'
                alt='analytics'
              />
              <h1 className='font-medium text-2xl'>
                {' '}
                {t('No Revenue Yet! ')}{' '}
              </h1>
              <p className='w-[70%] text-center '>
                {t(
                  'You have made no Revenue yet. Once you do, it will be displayed here.'
                )}
              </p>
            </div>
          )}
        </>
      )}
    </main>
  )
}
export default OverviewGraph
