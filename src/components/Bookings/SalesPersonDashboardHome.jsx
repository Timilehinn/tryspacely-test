import React, { useState, useEffect } from 'react'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import { Formik, Form, Field } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-multi-date-picker'
import { useDispatch, useSelector } from 'react-redux'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { setUserReducer } from '../../slices'
import {
  useFetchApiData,
  useGetWorkSpaces,
  useSalesUpdateSpace,
} from '../../hooks'

import FilterSpaces from './filter'
import useLimitedRoute from '../../hooks/useLimitedRoute'
import useCookieHandler from '../../hooks/useCookieHandler'

import DashboardHeader from '../Layout/Header'
import { TextField } from '../Login/TextField'
import WorkspaceAutocomplete from './BookingsUI/auto_complete'

import {
  setWorkspace,
  setSpaceModal,
  setTotalSpaces,
  setWorkspaceDetails,
} from '../../slices/workspaceSlice'

const SalesPersonDashboardHome = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    data: categoriesData,
    error: categoriesError,
    failure: isCategoriesFailure,
    isSuccess: isCategoriesAvailable,
    isPending: isCategoriesPending,
    getApiData,
  } = useFetchApiData('GET', 'categories')

  const {
    spaces,
    getSpaces,
    spacesError,
    spacesStatus,
    isSpacesLoading,
    spacesFailedToLoad,
    spacesSuccessfullyLoaded,
  } = useGetWorkSpaces()

  // if (spacesSuccessfullyLoaded) {
  // console.log(
  //   "spaces:",
  //   spaces,

  //   "error:",
  //   spacesError,

  //   "loading:",
  //   isSpacesLoading
  // );
  // }

  const { token } = useCookieHandler('user_token')
  const spaceModal = useSelector((state) => state.workspaces.spaceModal)
  const { updateSpace, status: updateSpaceStatus } = useSalesUpdateSpace()
  const { success, loadingfinished, errorAuth } = useLimitedRoute('Sales')
  const workspaceText = useSelector(
    (state) => state.workspaces.workspacesDetails
  )

  const headerLinkJson = [
    {
      title: 'All',
      path: '/dashboard/spaces',
    },
    {
      title: 'Booked',
      path: '/dashboard/spaces/booked',
    },
    {
      title: 'Unbooked',
      path: '/dashboard/spaces/unbooked',
    },
  ]

  const {
    id,
    name,
    city,
    state,
    price,
    status,
    rating,
    country,
    category,
    agreement,
    available_space,
    mentorship_available,
  } = workspaceText

  // const HeaderlinksTabs = ["All", "Booked", "Unbooked"];
  const [loading, setLoading] = useState(true)
  const [failure, setFailure] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isSuccess, setisSuccess] = useState(false)
  const [account_type, setAccountType] = useState(null)
  const [currentPageData, setCurrentPageData] = useState(null)
  const [currentPagination, setCurrentPagination] = useState(1)

  const [editorState, setEditorState] = useState()
  const [address, setAddress] = useState(workspaceText?.address)
  const [description, setDescription] = useState(workspaceText?.description)

  const [bookingDate, setBookingDate] = useState()
  const [photos, setPhotos] = useState([])
  const [updateBtn, setUpdateBtn] = useState('Update')
  const [categories_avaliable, set_categories_avaliable] = useState([])
  const [updateError, setUpdateError] = useState([])

  const bookings = bookingDate?.split(',')

  // edit workspace states
  const [spaceValues, setSpaceValues] = useState({
    name: '',
    city: '',
    state: '',
    country: '',
    address: '',
    // description,
    mentorship_available: 0,
    price: null,
    category: 0,
  })

  // Fetch Workspace from the server
  const workspaceApiCall = async (index) => {
    if (!token) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/workspaces?page=${index}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      //fetch current user to secure account type
      const user = await fetch(
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
      const userData = await user.json()

      const data = await res.json()
      setLoading(false)
      setCurrentPageData(data)
      setAccountType(userData?.data?.account_type[0]?.user_type?.type)
      dispatch(setTotalSpaces(data?.data.total))
      dispatch(setWorkspace(data?.data.data))
      dispatch(setUserReducer(userData?.data))

      setisSuccess(true)
      setFailure(false)

      if (data?.status !== true) {
        setErrorMsg(data.errors)
        setisSuccess(false)
        setFailure(true)
        setLoading(false)
        return
      }

      if (res.status === 500) {
        navigate('/500')
      } else if (res.status === 400) {
        navigate('/400')
      }
    } catch (error) {
      setisSuccess(false)
      setFailure(true)
      setLoading(false)
    }
  }

  const salesUpdateSpaceData = {
    name,
    city,
    price,
    state,
    photos,
    status,
    address,
    country,
    bookings,
    agreement,
    description,
    available_space,
    mentorship_available,
    category: category.id,
  }

  useEffect(() => {
    if (isCategoriesAvailable) {
      set_categories_avaliable(categoriesData)
      return
    }
  }, [isCategoriesAvailable])

  // Handle page click function
  const handlePageClick = (selected) => {
    setCurrentPagination(selected)
  }

  useEffect(() => {
    workspaceApiCall(currentPagination)
    // getApiData(currentPagination);
  }, [currentPagination, token])

  useEffect(() => {
    console.log(
      'spaces:',
      spaces,

      'error:',
      spacesError,

      'loading:',
      isSpacesLoading
    )
  }, [spaces])

  useEffect(() => {}, [token])

  // Handling photos uploading and converting into base64
  const onImageChange = (e) => {
    const photos = e.target.files
    Object.keys(photos).forEach((key) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotos((prev) => [...prev, reader.result.toString()])
      }
      reader.readAsDataURL(photos[key])
    })
  }

  const onEditorStateChange = (editor) => {
    setEditorState(editor)
    const editorText = draftToHtml(
      convertToRaw(editorState?.getCurrentContent())
    )
    setDescription(editorText)
  }

  const handleEdit = (e, incomingType) => {
    if (incomingType === 'name') {
      setSpaceValues({ ...spaceValues, name: e.target.value })
      const newData = { ...workspaceText, name: e.target.value }
      dispatch(setWorkspaceDetails(newData))
      return
    }

    if (incomingType === 'address') {
      setSpaceValues({ ...spaceValues, address: e.target.value })
      const newData = { ...workspaceText, address: e.target.value }
      dispatch(setWorkspaceDetails(newData))
      return
    }

    if (incomingType === 'city') {
      setSpaceValues({ ...spaceValues, city: e.target.value })
      const newData = { ...workspaceText, city: e.target.value }
      dispatch(setWorkspaceDetails(newData))
      return
    }

    if (incomingType === 'price') {
      setSpaceValues({ ...spaceValues, price: e.target.value })
      const newData = { ...workspaceText, price: e.target.value }
      dispatch(setWorkspaceDetails(newData))
      return
    }

    if (incomingType === 'mentorship_available') {
      setSpaceValues({ ...spaceValues, mentorship_available: e.target.value })
      const newData = {
        ...workspaceText,
        mentorship_available: e.target.value,
      }
      dispatch(setWorkspaceDetails(newData))
      return
    }

    if (incomingType === 'category') {
      setSpaceValues({ ...spaceValues, category: e.target.value })
      const newData = {
        ...workspaceText,
        category: e.target.value,
      }
      dispatch(setWorkspaceDetails(newData))
      return
    }
  }

  const displayOptions = categories_avaliable?.map((x, key, i) => {
    return (
      <option key={key} selected={x?.id === category?.id} value={x?.id}>
        {x?.name}
      </option>
    )
  })

  const PER_PAGE = 50
  const offset = currentPagination * PER_PAGE
  const currentPageList = currentPageData?.data.data?.slice(
    offset,
    offset + PER_PAGE
  )
  const pageCount = Math.ceil(currentPageData?.data.total / PER_PAGE)

  useEffect(() => {
    if (!workspaceText) return
    setDescription(workspaceText?.description)
  }, [workspaceText])

  useEffect(() => {
    if (!workspaceText) return
    setAddress(workspaceText?.address)
  }, [workspaceText])

  return (
    <>
      <main className='flex flex-col xl:w-[87%] lg:w-[84%] md:w-[100%] sm:w-[100%] ml-auto relative'>
        <DashboardHeader
          icon={
            'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Workspacesblue.svg'
          }
          title='Spaces'
        />

        <div className='flex flex-col'>
          <FilterSpaces
            error={spacesError}
            success={spacesStatus}
            loading={isSpacesLoading}
            account_type={account_type}
            workspaceApiCall={workspaceApiCall}
          />
        </div>

        {spaceModal === id && (
          <>
            <div className='overlay'></div>
            <section
              className='xl:h-auto lg:w-[700px] lg:h-auto lg:p-5 lg:grid lg:grid-cols-1 lg:content-end lg:top-0 
              lg:-right-0 md:w-screen md:h-auto md:p-5 md:grid md:grid-cols-1 md:content-end md:top-0 md:right-0 sm:w-screen
              sm:right-0 sm:h-auto sm:p-5 sm:grid sm:grid-cols-1 sm:content-end sm:top-0 shadow-2fl bg-white absolute z-10 ml-auto'
            >
              <div className='flex justify-between items-center'>
                <h1 className='text-1xl'> Edit Space </h1>
                <button
                  onClick={() => dispatch(setSpaceModal(false))}
                  className='text-[19px] border-0 bg-transparent'
                >
                  x
                </button>
              </div>
              <hr />

              <Formik>
                {() => (
                  <Form className='py-4'>
                    <TextField
                      label='Name'
                      name='name'
                      value={name}
                      onChange={(e) => handleEdit(e, 'name')}
                    />

                    <div className='relative my-5'>
                      <label htmlFor='city' className='font-semibold'>
                        {t('Address')}
                      </label>
                      <WorkspaceAutocomplete
                        location={address}
                        setAddressPicked={setAddress}
                        noAbsoulte={'absolute'}
                        placeholder={'Enter your address'}
                      />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <TextField
                        label='City/State'
                        name='city'
                        value={city}
                        onChange={(e) => {
                          handleEdit(e, 'city')
                        }}
                      />

                      <div className='flex flex-col py-2'>
                        <label className='font-medium'> {t('Country')} </label>
                        <Field
                          as='select'
                          name='country'
                          value={country}
                          onChange={(e) => handleEdit(e, 'country')}
                          className=' border-2 border-[#D4D4D4] rounded w-full indent-3 h-[56px] p-0 outline-none
                            shadow-none focus:border-[#0559FD] my-2'
                        >
                          <option value='Nigeria'> {t('Nigeria')} </option>
                        </Field>
                      </div>

                      <div className='flex flex-col py-2'>
                        <label className='font-medium'> {t('Category')} </label>

                        <select
                          // value={category.name}
                          onChange={(e) => {
                            handleEdit(e, 'category')
                          }}
                          className='border-2 border-[#D4D4D4] rounded w-full indent-3 h-[56px] p-0 outline-none shadow-none focus:border-[#0559FD] my-2'
                          name=''
                          id=''
                        >
                          {displayOptions}
                        </select>
                      </div>

                      {category.id === 2 && (
                        <div className='flex flex-col py-2'>
                          <label className='font-medium'>
                            {' '}
                            {t('Mentorship')}{' '}
                          </label>
                          <Field
                            as='select'
                            name='mentorship_available'
                            value={mentorship_available}
                            onChange={(e) =>
                              handleEdit(e, 'mentorship_available')
                            }
                            className=' border-2 border-[#D4D4D4] rounded w-full indent-3 h-[56px] p-0 outline-none
                            shadow-none focus:border-[#0559FD] my-2'
                          >
                            <option value='1'> Yes </option>
                            <option value='0'> No </option>
                          </Field>
                        </div>
                      )}

                      <div className='my-2'>
                        {workspaceText.type?.type === 'Hourly' && (
                          <label htmlFor='price'> Hourly Price </label>
                        )}

                        {workspaceText.type?.type === 'Daily' && (
                          <label htmlFor='price'> Daily Price </label>
                        )}

                        {workspaceText.type?.type === 'Monthly' && (
                          <label htmlFor='price'> Monthly Price </label>
                        )}

                        {workspaceText.type === null && (
                          <label htmlFor='price'> Daily Price </label>
                        )}

                        <div className='relative'>
                          <span className='absolute z-10 top-[26px] font-medium left-2'>
                            {' '}
                            NGN{' '}
                          </span>
                          <input
                            type='number'
                            name='price'
                            id='price'
                            value={price}
                            onChange={(e) => handleEdit(e, 'price')}
                            className='border-2 border-[#D4D4D4] rounded w-full indent-12 h-[56px] p-0 outline-none
                                shadow-none focus:border-[#0559FD] my-2 cursor-pointer'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col'>
                      <label className='font-medium py-2'>
                        {' '}
                        {t('Description')}{' '}
                      </label>

                      <Editor
                        toolbarClassName='toolbarClassName'
                        wrapperClassName='wrapperClassName'
                        editorClassName='editorClassName'
                        wrapperStyle={{
                          border: '2px solid #e5e7eb',
                          height: 'auto',
                        }}
                        editorState={
                          !editorState
                            ? EditorState.createWithContent(
                                ContentState.createFromBlockArray(
                                  convertFromHTML(workspaceText?.description)
                                )
                              )
                            : editorState
                        }
                        // description={desc}
                        onEditorStateChange={onEditorStateChange}
                        className='outline-0 border-[1px] w-full lg:h-[180px] border-[#D4D4D4] focus:border-[#2C292C]
                              rounded-lg md:h-[282px] sm:h-[180px] p-2'
                      />
                    </div>

                    <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 py-3'>
                      <div className='flex flex-col py-2'>
                        <label className='font-medium'> {t('Bookings')} </label>

                        <DatePicker
                          minDate={new Date()}
                          onChange={(array) => {
                            setBookingDate(array.join(','))
                          }}
                          multiple
                          format='DD-MM-YYYY'
                          plugins={[<DatePanel />]}
                        />
                      </div>
                    </div>
                    <br />
                    <hr />

                    <div className='upload'>
                      <div className='flex flex-col w-full py-2'>
                        <header className='font-semibold py-2'>
                          {' '}
                          {t('Features')}{' '}
                        </header>
                        <div className='grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-4 sm:grid-cols-2 sm:gap-4'>
                          {workspaceText.photos?.map((img) => (
                            <img
                              key={img.id}
                              src={img.url}
                              alt=''
                              className='lg:w-[160px] lg:h-[100px] rounded-lg '
                            />
                          ))}
                        </div>
                      </div>

                      <div className='relative'>
                        <p className='font-semibold py-2'> {t('Gallery')} </p>
                        <input
                          type='file'
                          multiple
                          accept='image/*'
                          id='file'
                          onChange={(e) => onImageChange(e)}
                          className='w-full border-2 border-[#F6F6F6] h-[50px] rounded-md'
                        />
                        <label
                          htmlFor='file'
                          className='border-2 border-[#E5E5E5] py-2 px-5 rounded-md cursor-pointer absolute top-10 right-1 '
                        >
                          {' '}
                          Browse{' '}
                        </label>
                      </div>

                      <div
                        className='lg:grid lg:grid-cols-3 lg:gap-3 lg:h-auto py-4 md:h-auto md:grid md:grid-cols-2
                            sm:h-auto sm:grid sm:grid-cols-1 overflow-auto '
                      >
                        {photos.length > 0 &&
                          photos.map((img, key) => (
                            <img
                              src={img}
                              key={key}
                              className='lg:h-[130px] lg:w-full rounded-md '
                              style={{
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                              }}
                            />
                          ))}
                      </div>
                    </div>

                    {Object.entries(updateError).map((err, key) => {
                      return (
                        <ul className='px-5 pb-2'>
                          <li className='text-red-500 font-medium'>
                            {' '}
                            {err[0]}: {err[1]}{' '}
                          </li>
                        </ul>
                      )
                    })}
                    <button
                      type='button'
                      onClick={() => {
                        updateSpace(workspaceText.id, salesUpdateSpaceData)
                      }}
                      className='w-[98px] h-[52px] bg-[#0559FD] text-white rounded-md'
                    >
                      {updateSpaceStatus}
                    </button>
                  </Form>
                )}
              </Formik>
            </section>
          </>
        )}
      </main>
    </>
  )
}
export default SalesPersonDashboardHome
