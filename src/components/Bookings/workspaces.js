import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { useTranslation } from 'react-i18next'

import DatePicker from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { toast } from 'react-toastify'
import axios from 'axios'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import BookingSpaces from './BookingsUI/BookingSpaces'
import WorkspacePagination from './BookingsUI/workspacePagination'
import useCookieHandler from '../../hooks/useCookieHandler'
import useLimitedRoute from '../../hooks/useLimitedRoute'

import {
  setWorkspace,
  setTotalSpaces,
  setWorkspaceDetails,
  setSpaceModal,
} from '../../slices/workspaceSlice'
import { TextField } from '../Login/TextField'
import WorkspaceAutocomplete from './BookingsUI/auto_complete'
import DashboardHeader from '../Layout/Header'
import Loader from '../Loader/Loader'

const Workspaces = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useCookieHandler('user_token')
  const { success, loadingfinished, errorAuth } = useLimitedRoute('Owner')
  const workspaceText = useSelector(
    (state) => state.workspaces.workspacesDetails
  )

  const spaceModal = useSelector((state) => state.workspaces.spaceModal)
  const {
    id,
    name,
    state,
    country,
    city,
    rating,
    status,
    mentorship_available,
    available_space,
    agreement,
    category,
    price,
  } = workspaceText

  const HeaderlinksTabs = ['All', 'Booked', 'Unbooked']
  const [currentPageData, setCurrentPageData] = useState(null)
  const [currentPagination, setCurrentPagination] = useState(1)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isSuccess, setisSuccess] = useState(false)
  const [failure, setFailure] = useState(false)

  const [address, setAddress] = useState(workspaceText?.address)
  const [editorState, setEditorState] = useState()
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
    address: '',
    city: '',
    state: '',
    country: '',
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

      const data = await res.json()
      setLoading(false)
      setCurrentPageData(data)
      dispatch(setTotalSpaces(data?.data.total))
      dispatch(setWorkspace(data?.data.data))
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

  // Delete workspace
  const deleteWorkspace = async (id) => {
    if (!token) {
      return
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/workspaces/${id}/delete`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()
      workspaceApiCall()
      if (data?.status !== true) {
        alert('something went wrong. Seems you are not authenticated')
        return
      }
    } catch (error) {}
  }

  //Update workspace to the server
  const updatePost = async (id) => {
    const updateData = {
      photos,
      name,
      address,
      state,
      country,
      status,
      mentorship_available,
      available_space,
      agreement,
      description,
      bookings,
      city,
      price,
      category: category.id,
    }

    setUpdateBtn('Updating....')
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/workspaces/${id}/update`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      )

      const data = await res.json()
      if (data?.status === true) {
        setUpdateBtn('Successful!')
        toast.success('Workspace updated successfully')
        dispatch(setSpaceModal(false))
        setTimeout(() => {
          window.location.reload(true)
        }, 5000)
        return
      }
      if (data?.status === false) {
        setUpdateError(data.errors)
        setUpdateBtn('Error, try again')
        return
      }
    } catch (error) {}
  }

  const fetchCategories = async () => {
    const config = {
      url: `${process.env.REACT_APP_BASE_URL}/categories`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }

    const { data } = await axios(config)

    if (data?.status) {
      set_categories_avaliable(data?.data)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Handle page click function
  const handlePageClick = (selected) => {
    setCurrentPagination(selected)
  }

  useEffect(() => {
    workspaceApiCall(currentPagination)
  }, [currentPagination, token])

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

  return (
    <>
      <Loader
        failure={failure}
        isLoading={loading}
        successful={isSuccess}
        errorAuth={errorAuth}
        success={success}
        loadingfinished={loadingfinished}
      />
      <main className='flex flex-col xl:w-[87%] lg:w-[84%] md:w-[100%] sm:w-[100%] ml-auto relative'>
        <DashboardHeader
          icon={
            'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Workspacesblue.svg'
          }
          title='Spaces'
          linkJson={headerLinkJson}
        />
        <div className='flex flex-col'>
          <BookingSpaces
            loading={loading}
            error={failure}
            success={isSuccess}
            workspaceApiCall={workspaceApiCall}
            setDelete={deleteWorkspace}
          />
          <WorkspacePagination
            pageCount={pageCount}
            handlePageClick={handlePageClick}
            currentPageList={currentPageList}
            pageRangeDisplay='5'
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
                  X
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
                        updatePost(workspaceText.id)
                      }}
                      className='w-[98px] h-[52px] bg-[#0559FD] text-white rounded-md'
                    >
                      {updateBtn}
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
export default Workspaces
