import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import DatePicker from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { toast } from 'react-toastify'
import axios from 'axios'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import useCookieHandler from '../../../hooks/useCookieHandler'
import useLimitedRoute from '../../../hooks/useLimitedRoute'
import {
  setTotalSpaces,
  setWorkspace,
  setWorkspaceDetails,
  setSpaceModal,
} from '../../../slices/workspaceSlice'
import Loader from '../../Loader/Loader'
import WorkspaceExcerpt from './workspaceExcerpt'

import { TextField } from '../../Login/TextField'
import WorkspaceAutocomplete from '../BookingsUI/auto_complete'
import DashboardHeader from '../../Layout/Header'

const UnbookedWorkspace = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { token } = useCookieHandler('user_token')
  const { success } = useLimitedRoute('Owner')
  const [layout, setLayout] = useState(true)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])
  const [accountType, setAccountType] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [sort, setSort] = useState('none')
  const [error, setError] = useState(null)

  // Edit space stuff
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
    mentorship_available: 0,
    price: null,
    category: 0,
  })

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

  const workspaceData = useSelector((state) => state.workspaces.workspace)
  const totalWorkspaces = useSelector((state) => state.workspaces.totalSpaces)

  // SORT WORKSPACE
  const sortMethod = {
    none: { method: (a, b) => null },
    lowestToHighest: { method: (a, b) => (b > a ? 1 : -1) },
    highestToLowest: { method: (a, b) => (a > b ? -1 : 1) },
  }

  // Fetch Workspace from the server
  const workspaceApiCall = async (index) => {
    if (!token) {
      return
    }
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/workspaces?unbooked`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()
      dispatch(setTotalSpaces(data?.data.total))
      dispatch(setWorkspace(data?.data.data))
      setLoading(false)
      if (data?.status !== true) {
        setError(data.errors)
        return
      }
    } catch (error) {}
  }

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
        return
      }
    } catch (error) {}
  }

  const exchangeTokenForId = async () => {
    if (!token) {
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
        alert('something went wrong. Seems you are not authenticated')
        return
      }
      // setId(data?.data?.id)
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

      setUser(userToFIll)
      setAccountType(data?.data?.account_type[0]?.user_type.type)
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
    workspaceApiCall()
    exchangeTokenForId()
  }, [token])

  const unbooked = workspaceData
    ?.filter((workspace) =>
      workspace.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .sort(sortMethod[sort].method)
    .map((data) => {
      return (
        <WorkspaceExcerpt
          key={data.id}
          data={data}
          layout={layout}
          setDelete={deleteWorkspace}
        />
      )
    })

  useEffect(() => {
    fetchCategories()
  }, [])

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
      <Loader failure={error} isLoading={loading} />
      <section
        className='flex flex-col xl:w-[87%] lg:w-[84%] ml-auto'
        loadingfinished={loading}
        success={success}
        errorAuth={error}
      >
        <DashboardHeader
          icon={
            'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Workspacesblue.svg'
          }
          title='Spaces'
          linkJson={headerLinkJson}
        />
        <div className='lg:hidden md:hidden sm:flex sm:flex-row sm:justify-start sm:items-center sm:gap-4 sm:p-5 '>
          <Link
            to={'/workspaces'}
            className={({ isActive }) =>
              isActive ? 'text-[#0559FD]' : 'text-black'
            }
          >
            {' '}
            {t('All')}{' '}
          </Link>
          <Link
            to={'/workspaces/booked'}
            className={({ isActive }) =>
              isActive ? 'text-[#0559FD]' : 'text-black'
            }
          >
            {' '}
            {t('Booked')}{' '}
          </Link>
          <Link
            to={'/workspaces/unbooked'}
            className={({ isActive }) =>
              isActive ? 'text-[#0559FD]' : 'text-black'
            }
          >
            {' '}
            {t('Unbooked')}{' '}
          </Link>
        </div>

        <div className='bg-white shadow-2fl rounded-t-lg py-5 my-4 lg:px-2 lg:mx-5 md:px-4 sm:px-4 '>
          <div
            className='lg:flex lg:justify-between lg:items-center md:flex md:justify-between md:items-center sm:flex sm:justify-between
                        sm:items-center '
          >
            <div className='flex justify-center items-center gap-2'>
              <span className='text-[#0559FD] text-[25px] font-small'>
                {' '}
                {/* {unbooked?.length} */}
                {totalWorkspaces}
              </span>
              <p className='text-[18px] font-small'>{t('Workspaces')}</p>
            </div>

            <Link
              to='/addspace'
              className='flex justify-center items-center gap-2 lg:w-[120px] lg:h-[48px] md:w-[100px] md:h-[40px] 
                                    sm:w-[100px] sm:h-[40px] rounded bg-[#0559FD] 
                                    text-white hover:text-white'
            >
              <img
                className='w-4'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Add.svg'
                alt='Add'
              />
              <p> Add New </p>
            </Link>
          </div>

          <div
            className='flex lg:flex-row lg:justify-between lg:items-center md:flex-row md:justify-between md:items-center sm:flex-row 
                        sm:justify-between sm:my-3 '
          >
            <div className='lg:flex lg:flex-row lg:gap-4 sm:gap-2 md:flex-row sm:flex-col'>
              <div className='relative'>
                <input
                  type='text'
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search space'
                  maxLength='44'
                  className='bg-[#FCFCFC] border-none outline-none rounded-md placeholder:text-[#AAAAAA] lg:h-[40px] lg:w-[252px]
                            md:w-[200px] md:h-[40px] sm:w-full sm:h-[40px] indent-6 '
                />
                <img
                  className='absolute w-[16px] h-[16px] top-3 lg:block md:block sm:hidden'
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Search-icon.svg'
                  alt='search'
                />
              </div>

              <div className='flex items-center '>
                <p className='lg:text-[13px]'>Sort by:</p>
                <select
                  onChange={(e) => setSort(e.target.value)}
                  defaultValue={'none'}
                  className='lg:flex lg:justify-center lg:items-center lg:gap-2 lg:h-[36px] lg:w-[146px]
                                        rounded bg-[#FCFCFC] outline-0'
                >
                  <option value='none' disabled className='lg:my-2'>
                    {t('None')}
                  </option>

                  <option value='lowestToHighest' className='lg:my-2'>
                    {t('Lowest To Highest')}
                  </option>

                  <option value='highestToLowest' className='lg:my-2'>
                    {t('Highest To Lowest')}
                  </option>
                </select>
              </div>
            </div>

            <div className='flex items-center py-2 lg:relative '>
              <div className='lg:flex lg:flex-row lg:items-center lg:gap-2 md:flex-row sm:flex-col '>
                <button type='button' onClick={() => setLayout(true)}>
                  <img
                    src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/List.svg'
                    alt='list'
                  />
                </button>

                <button type='button' onClick={() => setLayout(false)}>
                  <img
                    src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/Grid.svg'
                    alt='grid'
                  />
                </button>
              </div>
            </div>
          </div>

          <div className='flex justify-between items-center xl:gap-5 lg:gap-5 md:gap-5 sm:gap-5 w-full '>
            <p className=' xl:w-[25%] lg:w-[25%] md:w-[25%] sm:w-[50%]'>
              {' '}
              {t('Space Name')}
            </p>
            <p className='xl:w-[5%] lg:w-[5%] md:w-[5%] lg:flex md:flex sm:hidden'>
              {' '}
              {t('Rating')}{' '}
            </p>
            <p className='xl:w-[10%] lg:w-[10%] md:w-[10%] lg:flex md:flex sm:hidden'>
              {' '}
              {t('Status')}{' '}
            </p>
            <p className='xl:w-[10%] lg:w-[10%] md:w-[10%] lg:flex md:flex sm:hidden'>
              {' '}
              {t('Price')}{' '}
            </p>
            <p className='xl:w-[10%] lg:w-[10%] md:w-[10%] sm:w-[30%]'>
              {' '}
              {t('Publish Date')}{' '}
            </p>
            <p className='xl:w-[25%] lg:w-[25%] md:w-[25%] lg:flex md:flex sm:hidden'>
              {' '}
              {t('Location')}{' '}
            </p>
            <span className='xl:w-[5%] lg:w-[5%] md:w-[5%] sm:w-[5%]'></span>
          </div>
        </div>

        {unbooked?.length !== 0 ? (
          layout ? (
            <section className='flex flex-col gap-2 lg:mx-5 lg:overflow-x-hidden md:mx-2 md:overflow-x-hidden sm:overflow-x-auto sm:mx-2'>
              {unbooked}
            </section>
          ) : (
            <section className='grid lg:grid-cols-3 gap-5 lg:mx-5 md:grid-cols-2 md:mx-5 sm:grid-cols-1 sm:mx-5 '>
              {unbooked}
            </section>
          )
        ) : (
          <span className='text-3xl flex justify-start items-start m-5'>
            {t('No unbooked spaces found')}
          </span>
        )}
      </section>

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
    </>
  )
}

export default UnbookedWorkspace
