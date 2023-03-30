import './extra-styles.css'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DatePicker } from 'antd'
import InsightPagination from './InsightPagination'
import moment from 'moment'
import Loader from '../Loader/Loader'

import { useTranslation } from 'react-i18next'

import { setTransactionDetails } from '../../slices/insightSlice'
import useCookieHandler from '../../hooks/useCookieHandler'
import { HiDownload } from 'react-icons/hi'
import { ImSpinner6 } from 'react-icons/im'
import { Link, useNavigate } from 'react-router-dom'
import EachTransaction from './EachTransaction'
import xlsx from 'json-as-xlsx'
import { Formik, Form, Field } from 'formik'
import DashboardHeader from '../Layout/Header'

const Transaction = () => {
  const { token } = useCookieHandler('user_token')
  const navigate = useNavigate()
  const { t } = useTranslation()
  const url = window.location.href
  const dispatch = useDispatch()
  const [active, setActive] = useState('text-[#0559FD]')
  const [inActive, setInActive] = useState('text-[#434144]')
  const [accountType, setAccountType] = useState(null)

  // My states
  const [filterOption, setFilterOption] = useState(false)
  const [fromDate, setFromDate] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  )
  const [toDate, setToDate] = useState(
    moment().add(30, 'days').format('YYYY-MM-DD')
  )
  const [currentPagination, setCurrentPagination] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [loadingPdf, setLoadingPdf] = useState(false)
  const [loadingExcel, setLoadingExcel] = useState(false)

  const [spaces, setSpaces] = useState([{ id: '', name: 'Choose a category' }])
  const [spaceId, setSpaceId] = useState(0)

  const fromOnChange = (date, dateString) => {
    setFromDate(dateString)
  }

  const toOnChange = (date, dateString) => {
    setToDate(dateString)
  }

  // Fetch Workspace
  const workspaceApiCall = async (index) => {
    if (!token) {
      return
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/workspaces?booked`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()
      setSpaces(data?.data?.data)
      setLoading(false)
    } catch (error) {}
  }

  const exchangeTokenForId = async () => {
    if (!token) {
      // alert('Not authenticated!!!')
      return
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/retrieve-token`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        }
      )
      const data = await res.json()

      if (data?.status !== true) {
        return
      }

      let myStacks = []
      const findStack = data?.data?.stacks?.map((item) => {
        myStacks = [...myStacks, item?.stacks]
      })
      let userToFIll = {
        first_name: data?.data?.first_name,
        last_name: data?.data?.last_name,
        email: data?.data?.email,
        stacks: myStacks?.toString(),
        role: data?.data?.role?.position,
        company: data?.data?.role?.company,
        position: data?.data?.role?.position,
        account_type: data?.data?.account_type.toString(),
        github: data?.data?.github,
      }

      setAccountType(data?.data?.account_type[0]?.user_type.type)
    } catch (error) {}
  }

  useEffect(() => {
    exchangeTokenForId()
    workspaceApiCall()
  }, [token])

  //  Fetching user transactions
  const getUserDetails = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/transactions`,
        {
          method: 'GET',
          // body: JSON.stringify({
          //     token
          // }),
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      if (data?.status === true) {
        setLoading(false)
        setSuccess(true)
        setFailure(false)
        dispatch(setTransactionDetails(data))
      }

      if (res.status === 500) {
        navigate('/500')
      } else if (res.status === 400) {
        navigate('/400')
      }
    } catch (err) {
      setLoading(false)
      setSuccess(false)
      setFailure(true)
    }
  }

  useEffect(() => {
    if (!token) return
    if (transactions) return
    getUserDetails()
  }, [token])

  const transactions = useSelector(
    (state) => state.insight.transactionsDetails.data?.data
  )
  const transactionsDatas = useSelector(
    (state) => state.insight.transactionsDetails
  )

  // pagination
  const indexOfLastPage = currentPagination * perPage
  const indexOfFirstPage = indexOfLastPage - perPage
  const currentPageList = transactions?.slice(indexOfFirstPage, indexOfLastPage)
  let totalPaginatePage = Math.ceil(transactionsDatas?.data?.total / perPage)

  const getDetailsQueryBased = async () => {
    setLoading(true)
    setFilterOption(false)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/transactions?date_from=${fromDate}&date_to=${toDate}&space=${spaceId}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()

      if (data?.status === true) {
        setLoading(false)
        setSuccess(true)
        setFailure(false)
        dispatch(setTransactionDetails(data))
      }
    } catch (err) {
      setLoading(false)
      setSuccess(false)
      setFailure(true)
    }
  }

  const base64RepairSystem = (str) => {
    str = str.replaceAll('\r', '')
    str = str.replaceAll('\n', '')
    return `data:application/pdf;base64,${str}`
  }

  const getTransactions = async () => {
    const endpoint = `${process.env.REACT_APP_BASE_URL}/transactions/pdf-download`
    try {
      setLoadingPdf(true)
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (data?.status !== true) {
        setLoadingPdf(false)
        toast.error('error occured while retriving recepit')
        return
      }
      let content = data?.data?.content
      setLoadingPdf(false)
      const repairedReceipt = await base64RepairSystem(content)
      saveAs(repairedReceipt, `transactions.pdf`)
    } catch (error) {
      setLoadingPdf(false)
    }
  }

  const getExcelTransaction = async () => {
    try {
      setLoadingExcel(true)
      const endpoint = `${process.env.REACT_APP_BASE_URL}/transactions/excel-download`
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (data?.status !== true) {
        setLoadingExcel(false)
        toast.error('error occured while retriving recepit')
        return
      }

      let settings = {
        fileName: 'November, 21 2022', // Name of the resulting spreadsheet
        // fileName: data?.data?.sheet, // Name of the resulting spreadsheet
        extraLength: 3, // A bigger number means that columns will be wider
        writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
        writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
        // RTL: true, // Display the columns from right-to-left (the default value is false)
      }
      setLoadingExcel(false)
      xlsx([data.data], settings)
    } catch (error) {
      setLoadingExcel(false)
    }
  }

  const headerLinkJson = [
    {
      title: 'Revenue',
      path: '/dashboard/revenue',
    },
    {
      title: 'Transactions',
      path: '/dashboard/revenue/transaction',
    },
    {
      title: 'Reviews',
      path: '/dashboard/revenue/reviews',
    },
  ]

  const headerLinkJsonUser = [
    {
      title: 'Expenses',
      path: '/dashboard/expenses',
    },
    {
      title: 'Transactions',
      path: '/dashboard/expenses/transaction',
    },
    {
      title: 'Most Visited Locations',
      path: '/dashboard/expenses/visited-location',
    },
    {
      title: 'Reviews',
      path: '/dashboard/expenses/reviews',
    },
  ]

  return (
    <div className='w-full flex overflow-hidden'>
      <Loader
        failure={failure} //if your api or state fails and page should not show
        successful={success} //if the api or state is successful
        isLoading={loading} //if your api or state is still fetching
        redirectTo={
          accountType === 'Owner' ? '/dashboard/revenue' : '/dashboard/expenses'
        }
      />
      <div className='flex flex-col xl:w-[87%] lg:w-[84%] lg:ml-auto'>
        <DashboardHeader
          icon={
            'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Workspacesblue.svg'
          }
          title='Insight'
          linkJson={
            accountType === 'Owner' ? headerLinkJson : headerLinkJsonUser
          }
        />
        <div className='w-full h-auto md:p-[20px] sm:p-[3%] bg-[#FCFCFC]'>
          <div className='md:w-[80%] sm:w-[100%] h-[auto]'>
            <div className='xl:hidden lg:hidden md:hidden sm:flex sm:flex-row sm:items-center sm:gap-4 sm:my-2 '>
              {accountType === 'User' && (
                <Link to={'/expenses'}>
                  <h1 className={url.includes('/expenses') ? active : inActive}>
                    {t('Expenses')}
                  </h1>
                </Link>
              )}

              {accountType === 'Owner' && (
                <Link to={'/revenue'}>
                  <h1 className={url.includes('/revenue') ? active : inActive}>
                    {t('Revenue')}
                  </h1>
                </Link>
              )}

              {accountType === 'Owner' && (
                <Link to={'/revenue/transaction'}>
                  <p
                    className={url.includes('/transaction') ? active : inActive}
                  >
                    {t('Transactions')}
                  </p>
                </Link>
              )}

              {accountType === 'User' && (
                <Link to={'/expenses/transaction'}>
                  <p
                    className={url.includes('/transaction') ? active : inActive}
                  >
                    {t('Transactions')}
                  </p>
                </Link>
              )}

              {accountType === 'User' && (
                <Link to={'/expenses/visited-location'}>
                  <p
                    className={
                      url.includes('/visited-location') ? active : inActive
                    }
                  >
                    {t('Most Visited Locations')}
                  </p>
                </Link>
              )}

              {accountType === 'Owner' && (
                <Link to={'/revenue/reviews'}>
                  <p className={url.includes('/reviews') ? active : inActive}>
                    {t('Reviews')}
                  </p>
                </Link>
              )}

              {accountType === 'User' && (
                <Link to={'/expenses/reviews'}>
                  <p className={url.includes('/reviews') ? active : inActive}>
                    {t('Reviews')}
                  </p>
                </Link>
              )}
            </div>

            <div className='w-full h-[screen]'>
              <div className='font-400 font-[Plus Jakarta Display] md:text-[24px] sm:text-[20px] text-[#14115] md:mt-[10px] sm:mt-[5px] flex justify-between'>
                {t('Transaction History')}
                <div className='flex justify-end gap-2 align-center'>
                  <div
                    onClick={() => getTransactions()}
                    className='shadow-2fl cursor-pointer h-[40px] p-2 rounded text-[16px] mt-0.3'
                  >
                    {!loadingPdf ? (
                      <div
                        style={{
                          display: 'flex',
                          gap: 5,
                          alignItems: 'center',
                        }}
                      >
                        {' '}
                        <HiDownload size={20} /> Pdf{' '}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          gap: 5,
                          alignItems: 'center',
                        }}
                      >
                        <ImSpinner6 size={20} /> Downloading
                      </div>
                    )}
                  </div>
                  <div
                    onClick={() => getExcelTransaction()}
                    className='shadow-2fl h-[40px] cursor-pointer p-2 rounded text-[16px] '
                  >
                    {!loadingExcel ? (
                      <div
                        style={{
                          display: 'flex',
                          gap: 5,
                          alignItems: 'center',
                        }}
                      >
                        <HiDownload size={20} /> Excel
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          gap: 5,
                          alignItems: 'center',
                        }}
                      >
                        <ImSpinner6 size={20} /> Downloading
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex justify-end items-center md:space-x-0 sm:space-x-3'>
                <div className='flex justify-center items-center md:space-x-2 sm:space-x-1'>
                  <div
                    onClick={() => setFilterOption(!filterOption)}
                    className='download flex justify-start items-center space-x-1 md:mt-[10px] sm:mt-[5px] md:p-[10px] sm:p-[5px] bg-[#fff] cursor-pointer'
                  >
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http:www.w3.org/2000/svg'
                    >
                      <path
                        d='M5.33301 7.33333V8.07999C5.33426 8.16792 5.3702 8.25178 5.43301 8.31333L10.2863 13.22C10.3491 13.2815 10.3851 13.3654 10.3863 13.4533V18.0467C10.3862 18.1091 10.4037 18.1704 10.4367 18.2234C10.4697 18.2765 10.5169 18.3192 10.573 18.3467L13.2063 19.2867C13.2572 19.3116 13.3136 19.3231 13.3702 19.3202C13.4267 19.3173 13.4816 19.3 13.5297 19.27C13.5777 19.24 13.6173 19.1982 13.6447 19.1486C13.6721 19.0991 13.6865 19.0433 13.6863 18.9867V13.3933C13.6956 13.3032 13.7384 13.2199 13.8063 13.16L18.553 8.32666C18.6158 8.26512 18.6518 8.18125 18.653 8.09333V7.33333H5.33301Z'
                        fill='#141115'
                      />
                    </svg>
                    <div className='font-400 font-[Plus Jakarta Display] md:text-[14px] sm:text-[12px] text-[#5B585B]'>
                      {t('Filter')}
                    </div>
                  </div>
                </div>
              </div>

              {filterOption && (
                <div className='w-full bg-[#fff] flex justify-between items-center md:p-[5px] sm:p-[3px] md:mt-[10px] sm:mt-[5px]'>
                  <div clasName='flex items-center md:space-x-2 lg:space-x-3 sm:space-x-1'>
                    <span className='font-400 font-[Plus Jakarta Display] md:text-[14px] sm:text-[12px] text-[#5B585B]'>
                      {t('Date from:')}
                    </span>
                    <span
                      onClick={() => setFromDate()}
                      className='font-400 font-[Plus Jakarta Display] md:text-[14px] sm:text-[12px] text-[#5B585B] md:ml-[10px] sm:ml-[5px] cursor-pointer'
                    >
                      {fromDate}
                    </span>
                    {!fromDate && (
                      <DatePicker onChange={fromOnChange} bordered={false} />
                    )}
                    {/* <CustomDatePicker/> */}
                  </div>

                  <div clasName='flex items-center md:space-x-2 lg:space-x-3 sm:space-x-1'>
                    <span className='font-400 font-[Plus Jakarta Display] md:text-[14px] sm:text-[12px] text-[#5B585B]'>
                      Date to:
                    </span>
                    <span
                      onClick={() => setToDate()}
                      className='font-400 font-[Plus Jakarta Display] md:text-[14px] sm:text-[12px] text-[#5B585B] md:ml-[10px] sm:ml-[5px] cursor-pointer'
                    >
                      {toDate}
                    </span>
                    {!toDate && (
                      <DatePicker onChange={toOnChange} bordered={false} />
                    )}
                  </div>

                  <Formik>
                    <Form>
                      <Field
                        as='select'
                        name='spaces'
                        onChange={(e) => setSpaceId(e.target.value, 'as id')}
                        className='border-2 border-[#D4D4D4] rounded w-[150px] indent-3 h-[40px]'
                      >
                        <option value='Select a space'> Select a space </option>
                        {spaces.map((data, key) => (
                          <option key={data.id} value={data.id}>
                            {' '}
                            {data.name}{' '}
                          </option>
                        ))}
                      </Field>
                    </Form>
                  </Formik>

                  <div
                    onClick={getDetailsQueryBased}
                    className='md:px-[20px] sm:px-[10px] md:py-[10px] sm:py-[5px] bg-[blue] text-[#fff] flex items-center justify-center rounded font-400 font-[Plus Jakarta Display] text-[14px] hover:text-[blue] hover:bg-[#fff] cursor-pointer'
                  >
                    Go
                  </div>
                </div>
              )}

              {/* Transaction */}
              {transactions?.length < 1 && (
                <div className='download w-full bg-[#fff] md:p-[20px] sm:p-[10px] md:mt-[20px] sm:mt-[10px] md:rounded-[8px] sm:rounded-[5px]'>
                  <div className='font-500 font-[Plus Jakarta Display] md:text-[18px] sm:text-[16px] text-[#2C292C]'>
                    {t('No Transaction During Selected Data Range')}
                  </div>
                  <div className='font-300 font-[Plus Jakarta Display] md:text-[16px] sm:text-[14px] text-[#434144]'>
                    {t('Please search for a different data range')}
                  </div>
                </div>
              )}
              <div>
                {currentPageList
                  ?.reverse()
                  .map(
                    (
                      {
                        amount_paid,
                        user,
                        id,
                        created_at,
                        transaction_id,
                        payment_status,
                      },
                      index
                    ) => (
                      <EachTransaction
                        amount_paid={amount_paid}
                        user={user}
                        id={id}
                        created_at={created_at}
                        index={index}
                        key={id}
                        transaction_id={transaction_id}
                        payment_status={payment_status}
                        token={token}
                      />
                    )
                  )}
              </div>
              <div className='w-full bg-[#fff] md:p-[10px] sm:p-[5px] md:mt-[10px] sm:mt-[5px] flex justify-end items-center'>
                <InsightPagination
                  pageCount={currentPagination}
                  currentPageList={currentPageList}
                  currentPagination={currentPagination}
                  setCurrentPagination={setCurrentPagination}
                  totalPaginatePage={totalPaginatePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction
