import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import Location from '../../svgs/Location.svg'
import Gallary from '../../svgs/Gallary.svg'
import Button from '../button'
import AmentyComp from '../amenities'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Select } from 'antd'
import { useParams } from 'react-router'

import './spaceDetails.scss'
import useProtectedRoute from '../../hooks/useProtectedRoute'
import Loader from '../Loader/Loader'
import GallaryCaraosel from '../../helper/Gallary'
import useCookieHandler from '../../hooks/useCookieHandler'
import Cookies from 'universal-cookie'
import WorkspaceMap from '../workspace-map'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { enGB } from 'date-fns/locale'
import { isSameDay } from 'date-fns'
import parse from 'html-react-parser'

import 'react-nice-dates/build/style.css'
import DashboardHeader from '../Layout/Header'
import tw from 'tailwind-styled-components'
import { truncate } from '../../lib/factory'
import { toast } from 'react-toastify'

const { Option } = Select

const SpaceDetailsForSalesPerson = (props) => {
  const navigate = useNavigate()
  const { token } = useCookieHandler('user_token')
  const { success, errorAuth, loadingfinished } = useProtectedRoute()
  let { id } = useParams()

  const [active, setActive] = useState('Description')
  const [userToken, setUserToken] = useState(token)
  const [workspaceData, setWorkspaceData] = useState({})
  const [photos, setPhotos] = useState([])
  const [bookings, setBookings] = useState([])
  const [fullPhotos, setFullPhotos] = useState([])
  const [open_hours, setOpen_Hours] = useState(null)
  const [SeatingOptions, setSeatingOptions] = useState([])
  const [BasicOptions, setBasicOptions] = useState([])
  const [FacilitiesOptions, setFacilitiesOptions] = useState([])
  const [EquipmentOptions, setEquipmentOptions] = useState([])
  const [OtherOptions, setOtherOptions] = useState([])
  const [WorkspaceReviews, setWorkspaceReviews] = useState([])
  const [viewAll, setViewAll] = useState(false)
  const hiddenDatePicker = useRef < HTMLDivElement > null
  const [pageSuccess, setPageSucesss] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [pageFailure, setPageFailure] = useState(false)
  const [selectedDate, setSelectedDate] = useState([])

  const [startFrom, setStartFrom] = useState(0)
  const [options, setOptions] = useState([
    {
      displayText: '',
      date: '',
    },
  ])
  const [hourlyTimeOption, setHourlyTimeOption] = useState([])
  const [workspaceFavourites, setWorkspaceFavourites] = useState([])
  const [isFavourited, setIsFavoutited] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const Review = searchParams.get('Review')
  const [startMonthDate, setStartMonthDate] = useState()
  const [bookingDate, setBookingDate] = useState([])

  useEffect(() => {
    const newPhotos = workspaceData?.photos
    setPhotos(newPhotos?.slice(0, 5))
  }, [workspaceData])

  const getNextHour = (time, incremental) => {
    const firstTwo = time.slice(0, 2)
    const lastTwo = time.slice(-2)
    let firstTwoOperatedByAddition = parseInt(firstTwo) + incremental
    if (firstTwoOperatedByAddition == 24) {
      firstTwoOperatedByAddition = '00'
    }
    if (firstTwoOperatedByAddition < 10) {
      firstTwoOperatedByAddition = `0${firstTwoOperatedByAddition}`
    }
    if (typeof firstTwoOperatedByAddition === 'number') {
      firstTwoOperatedByAddition = firstTwoOperatedByAddition.toString()
    }
    return `${firstTwoOperatedByAddition}:${lastTwo}`
  }

  function tConv24(time24) {
    var ts = time24
    var H = +ts.substr(0, 2)
    var h = H % 12 || 12
    h = h < 10 ? '0' + h : h // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? ' AM' : ' PM'
    ts = h + ts.substr(2, 3) + ampm
    return ts
  }

  const handleTimeFormation = () => {
    if (!open_hours) return
    const timeArr = open_hours.split(/(\s+)/)
    const firstTwo = timeArr[0].slice(0, 2)
    const lastTwo = timeArr[timeArr.length - 1].slice(0, 2)
    let timeDistance = parseInt(lastTwo) - parseInt(firstTwo)
    const dummyArr = [...Array(timeDistance).keys()]
    const newIso = new Date(`${moment().format('YYYY-M-D')} ${timeArr[0]}`)

    let newOptionArray = []
    options.map((x) => {
      if (!x?.date) return

      dummyArr.map((y, i) => {
        const newIso = new Date(
          `${moment(x?.date).format('YYYY-M-D')} ${getNextHour(timeArr[0], i)}`
        )
        const newObj = {
          date: newIso.toISOString(),
          displayText: `${tConv24(getNextHour(timeArr[0], i))}-${tConv24(
            getNextHour(timeArr[0], i + 1)
          )}${'....'}${moment(x?.date).format('YYYY-MMM-Do')} `,
        }
        newOptionArray = [...newOptionArray, newObj]
      })
    })
    setHourlyTimeOption(newOptionArray)
  }

  useEffect(() => {
    handleTimeFormation()
  }, [options, open_hours])

  useEffect(() => {
    const newPhotos = workspaceData?.photos
    if (viewAll) {
      setPhotos(newPhotos)
      return
    }
    setPhotos(newPhotos?.slice(0, 5))
  }, [viewAll])

  const formatDateOutputForMontly = (date) => {
    let currentDate = new Date(date)
    const nextMonthDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + 1)
    )
    setSelectedDate([
      new Date(date).toISOString(),
      nextMonthDate?.toISOString(),
    ])
  }

  useEffect(() => {
    if (workspaceData?.type?.type === 'Monthly' && startMonthDate) {
      formatDateOutputForMontly(startMonthDate)
    }
  }, [startMonthDate])

  const transformSelectedDate = (type) => {
    if (type === 'Daily') {
      const output_dates = bookingDate?.map((date) => {
        const formattedDate = date?.toISOString()
        return formattedDate
      })
      setSelectedDate(output_dates)
    }
  }

  useEffect(() => {
    if (workspaceData?.type?.type !== 'Daily') return
    transformSelectedDate('Daily')
  }, [bookingDate])

  const handleViewAll = () => {
    setViewAll(!viewAll)
    setStartFrom(0)
  }

  const handleClick = (name) => {
    setActive(name)
  }

  const hanldeExpandImage = (index) => {
    setStartFrom((prev) => (prev = index + 1))
    setViewAll(true)
  }

  const formatAvailiablilty = () => {
    let cache = []
    try {
      const presentYear = new Date().getFullYear()
      const presentMonth = new Date().getMonth() + 1
      const presentDay = new Date().getDate()
      const presentHour = new Date().getHours()
      // const presentHour = 13;
      function addHoursToDate(date, hours) {
        return new Date(new Date(date).setHours(date.getHours() + hours))
      }
      const timeAvaliable = bookings?.filter((item) => {
        const bookedYear = new Date(item?.date).getFullYear()
        const bookedMonth = new Date(item?.date).getMonth() + 1
        const bookedDay = new Date(item?.date).getDate()
        const bookedHours = new Date(item?.date).getHours()
        if (
          bookedHours > presentHour &&
          presentDay == bookedDay &&
          presentYear == bookedYear &&
          presentMonth == bookedMonth
        ) {
          let backupCache = [...cache]
          cache = [...cache, item?.id]
          if (!backupCache.includes(item?.id)) {
            return item
          }
        }
        if (
          presentYear == bookedYear &&
          presentMonth == bookedMonth &&
          presentDay < bookedDay
        ) {
          if (!cache.includes(item?.id) && presentDay != bookedDay) {
            cache = [...cache, item?.id]
            return item
          }
        }
      })
      timeAvaliable.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
      })

      const isToday = (someDate) => {
        const today = new Date()
        return (
          someDate.getDate() == today.getDate() &&
          someDate.getMonth() == today.getMonth() &&
          someDate.getFullYear() == today.getFullYear()
        )
      }

      timeAvaliable.reverse().map((x) => {
        let formattedTimeOption
        const writtenTime = moment(x?.date).format('ha')
        const writtenTime2 = addHoursToDate(new Date(x?.date), 1)
        const writtenTime2Parsed = moment(writtenTime2).format('ha')
        const timeParsed = parseInt(moment(x?.date).format('ha'))
        const closedTime = timeParsed + 1
        if (isToday(new Date(x?.date))) {
          formattedTimeOption = `${writtenTime} - ${writtenTime2Parsed}   today`
        } else {
          formattedTimeOption = `${writtenTime} - ${writtenTime2Parsed}   ${moment(
            x?.date
          ).format('MMM Do YY')}`
        }
        setOptions((prev) => [
          ...prev,
          {
            displayText: formattedTimeOption,
            date: x?.date,
          },
        ])
      })

      return isToday
    } catch (error) {}
  }

  useEffect(() => {
    if (!bookings?.length) return
    formatAvailiablilty()
  }, [bookings])

  const getUserDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/retrieve-token`,
        {
          method: 'POST',
          body: JSON.stringify({
            token,
          }),
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      if (data?.status !== true) {
        // setError(true);
        return
      }
      setWorkspaceFavourites(data?.data?.workspace_favourites)
    } catch (error) {}
  }

  const isWorkspaceFavourited = () => {
    const findLovedWorkspace = workspaceFavourites?.find(
      (space) => space?.id == workspaceData?.id && space?.pivot?.favourite
    )
    if (!findLovedWorkspace) {
      setIsFavoutited(false)
      return
    }
    setIsFavoutited(true)
    return true
  }

  useEffect(() => {
    isWorkspaceFavourited()
  }, [workspaceData])

  useEffect(() => {
    token && getUserDetails()
  }, [token])

  const getAllDetails = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/workspaces/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    const data = await res.json()
    if (data?.status === false) {
      toast.error('This space has not been approved!')
      toast.info("I'm taking you back to dashboard")
      navigate('/dashboard')
      setPageSucesss(false)
      setPageFailure(true)
      setPageLoading(false)
      return
    }
    try {
      data?.data?.amenities?.map((amenity) => {
        if (amenity?.amenities_item?.amenitygroups?.name === 'Seating') {
          setSeatingOptions((prevState) => [
            ...prevState,
            amenity?.amenities_item?.name,
          ])
        } else if (amenity?.amenities_item?.amenitygroups?.name === 'Basic') {
          setBasicOptions((prevState) => [
            ...prevState,
            amenity?.amenities_item?.name,
          ])
        } else if (
          amenity?.amenities_item?.amenitygroups?.name === 'Facilities'
        ) {
          setFacilitiesOptions((prevState) => [
            ...prevState,
            amenity?.amenities_item?.name,
          ])
        } else if (
          amenity?.amenities_item?.amenitygroups?.name === 'Equipment'
        ) {
          setEquipmentOptions((prevState) => [
            ...prevState,
            amenity?.amenities_item?.name,
          ])
        } else if (amenity?.amenities_item?.amenitygroups?.name === 'Others') {
          setOtherOptions((prevState) => [
            ...prevState,
            amenity?.amenities_item?.name,
          ])
        }
      })
      setWorkspaceData(data?.data)

      setOpen_Hours(data?.data?.open_hours)
      setWorkspaceReviews(data?.data.reviews)
      setBookings(data?.data?.bookings)
      data?.data?.photos?.map((item) => {
        setFullPhotos((prev) => [...prev, item?.url])
      })
      setTimeout(() => {
        setPageSucesss(true)
        setPageFailure(false)
        setPageLoading(false)
      }, 1500)
    } catch (error) {
      setPageSucesss(false)
      setPageFailure(true)
      setPageLoading(false)
    }
  }

  useLayoutEffect(() => {
    getAllDetails()
  }, [])

  const handleSelectedDate = (e) => {
    let filtered = e.filter(function (el) {
      return el != null
    })
    setSelectedDate(filtered)
  }

  const optionRow = hourlyTimeOption.map((opt) => {
    if (!opt?.displayText) return
    return (
      <Option value={opt?.date} key={opt?.date}>
        {opt?.displayText}
      </Option>
    )
  })

  const displayReviews = WorkspaceReviews?.map((info) => {
    let stars
    if (info?.rating == 1) {
      stars = [<span className='fa fa-star checked'></span>]
    } else if (info?.rating == 2) {
      stars = [
        <span className='fa fa-star checked'></span>,
        <span className='fa fa-star checked'></span>,
      ]
    } else if (info?.rating == 3) {
      stars = [
        <span className='fa fa-star checked'></span>,
        <span className='fa fa-star checked'></span>,
        <span className='fa fa-star checked'></span>,
      ]
    } else if (info?.rating == 4) {
      stars = [
        <span className='fa fa-star checked'></span>,
        <span className='fa fa-star checked'></span>,
        <span className='fa fa-star checked'></span>,
        <span className='fa fa-star checked'></span>,
      ]
    } else if (info?.rating == 5) {
      stars = [
        <span className='fa fa-star checked'></span>,
        <span className='fa fa-star checked'></span>,
        <span className='fa fa-star checked'></span>,
        <span className='fa fa-star checked'></span>,
        <span className='fa fa-star checked'></span>,
      ]
    }
    return (
      <div className='reviews_holder' key={info?.id}>
        <h4>
          {info?.user?.first_name} {info?.user?.last_name} says:
        </h4>
        <h3>{info?.review} </h3>
        <div className='host_info'>
          <span>{info?.first_name}</span>
          <span>{info?.time}</span>
        </div>
        <div className='reviews_holder_stars'>
          {stars?.map((star, index) => (
            <React.Fragment key={index}>{star}</React.Fragment>
          ))}
        </div>
        <p>{info?.description}</p>
      </div>
    )
  })

  const modifiers = {
    selected: (date) => bookingDate.some((booking) => isSameDay(booking, date)),
  }

  const isSameDate = (dateA, dateB) => {
    return dateA.toISOString() === dateB.toISOString()
  }

  const handleDayClick = (date) => {
    let toRemove = false
    const remainingDates = bookingDate.filter((d) => {
      const isEqual = isSameDate(new Date(date), new Date(d))
      if (!isEqual) {
        return d
      }
      toRemove = true
    })
    if (toRemove) {
      setBookingDate(remainingDates)
      return
    }
    setBookingDate([...bookingDate, date])
  }

  const handleClear = () => {
    setSelectedDate([])
    setBookingDate([])
    setStartMonthDate(null)
  }

  return (
    <div className='xl:w-[87%] lg:w-[84%] md:w-[100%] sm:w-[100%] ml-auto mb-10'>
      <Helmet>
        <title>
          {workspaceData.name +
            ' ' +
            ' | ' +
            ' ' +
            'Get access to enjoy the best and affordable workspace in Lagos...'}
        </title>
        <meta name='description' content={workspaceData.description} />
        <meta property='og:image' content='https://example.com/ogp.jpg' />
        <meta
          property='og:image:secure_url'
          content='	https://trybookings-uploads.s3.eu-west-2.amazonaws.com/6327113800c505.27710219.png'
        />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:width' content='400' />
        <meta property='og:image:height' content='300' />
        <meta property='og:image:alt' content='Beautiful workspace' />
        <meta
          name='keywords'
          content='workspace, rental, affordable space, remote working space, working space around you, monetize your workspace, co-working space, office space with internet,
         '
        />
      </Helmet>
      <DashboardHeader
        icon={
          'https://trybookings-assets.s3.eu-west-2.amazonaws.com/Workspacesblue.svg'
        }
        title='Spaces Details'
      />
      <Loader
        noAuth={true}
        failure={pageFailure}
        redirectTo={'dashboard'}
        successful={pageSuccess}
        isLoading={pageLoading}
      />
      {viewAll && (
        <GallaryCaraosel
          startFrom={startFrom}
          imageArray={fullPhotos}
          handleToggle={handleViewAll}
          workspaceName={workspaceData?.name}
        />
      )}
      <div className='w-full px-6 mb-8'>
        <div className=' flex py-5 items-center'>
          <Link to={'/dashboard'}>
            <span className='w-max m-0 text-sm text-[#141115]'>Spaces</span>
          </Link>
          <span className='w-max m-0'>
            <svg
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
                stroke='#0559FD'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </span>
          <span className='w-max m-0 text-[#AAAAAA] text-sm'>
            {workspaceData?.name}
          </span>
        </div>

        <OverView>
          <OverViewDetails>
            <OverViewDetailsLeft>
              <OverViewDetailsLeftComponent workspaceData={workspaceData} />
              <ViewAllPhotos
                photos={photos}
                viewAll={viewAll}
                handleViewAll={handleViewAll}
              />
            </OverViewDetailsLeft>
            <OverViewDetailsRight>
              <OverviewComponent workspaceData={workspaceData} />
            </OverViewDetailsRight>
          </OverViewDetails>
          <OverViewSpaceOwnerDetails>
            <Title>Workspace Owner</Title>
            <OwnerDetail workspaceData={workspaceData} />
          </OverViewSpaceOwnerDetails>
        </OverView>

        <div className='w-full flex mt-8 justify-between'>
          <SpaceDetailsLeft>
            <Tabs active={active} review={Review} handleClick={handleClick} />
            <div id='viewMap' className='w-full'>
              {active === 'Description' && (
                <Description workspaceData={workspaceData} />
              )}
              {active === 'Amenities' && (
                <Amenities
                  OtherOptions={OtherOptions}
                  BasicOptions={BasicOptions}
                  SeatingOptions={SeatingOptions}
                  EquipmentOptions={EquipmentOptions}
                  FacilitiesOptions={FacilitiesOptions}
                />
              )}
              {active === 'Reviews' && (
                <Reviews
                  workspaceData={workspaceData}
                  displayReviews={displayReviews}
                  WorkspaceReviews={WorkspaceReviews}
                />
              )}
              {active === 'Gallery' && <Gallery />}
              {active === 'Location' && (
                <LocationComponent workspaceData={workspaceData} />
              )}
            </div>
          </SpaceDetailsLeft>
          <SpaceDetailsRight>
            <Price
              enGB={enGB}
              optionRow={optionRow}
              modifiers={modifiers}
              handleClear={handleClear}
              selectedDate={selectedDate}
              workspaceData={workspaceData}
              startMonthDate={startMonthDate}
              handleDayClick={handleDayClick}
              setStartMonthDate={setStartMonthDate}
              handleSelectedDate={handleSelectedDate}
            />
          </SpaceDetailsRight>
        </div>
      </div>
    </div>
  )
}

export default SpaceDetailsForSalesPerson

const ViewAllPhotos = ({ photos, handleViewAll, viewAll }) => (
  <>
    {photos?.length && (
      <div className='relative top-0 right-0 mr-2 mt-2'>
        <div
          onClick={handleViewAll}
          className='absolute bottom-5 right-3 cursor-pointer active:opacity-0 bg-[#f5f5f5] rounded-md px-3 '
        >
          <span className='flex items-center'>
            <Gallary />
            <span className='ml-1 text-xs'>
              {!viewAll ? 'View all photos' : 'Collapse All'}
            </span>
          </span>
        </div>
      </div>
    )}
  </>
)

const Tabs = ({ active, review, handleClick }) => (
  <TabWrapper>
    <Button
      height={50}
      width={186}
      variant='outline'
      label='Description'
      isActive={active === 'Description'}
      extraClass='space_button_borderless'
      handleClick={() => handleClick('Description')}
    />
    <Button
      height={50}
      width={186}
      label='Amenities'
      variant='outline'
      isActive={active === 'Amenities'}
      extraClass='space_button_borderless'
      handleClick={() => handleClick('Amenities')}
    />
    {/* <Button
      height={50}
      width={186}
      label="Gallery"
      variant="outline"
      isActive={active === "Gallery"}
      extraClass="space_button_borderless"
      handleClick={() => handleClick("Gallery")}
    /> */}
    <Button
      width={186}
      height={50}
      label='Reviews'
      variant='outline'
      isActive={active === 'Reviews'}
      extraClass='space_button_borderless'
      handleClick={() => handleClick('Reviews')}
    />
    {review}
    <Button
      height={50}
      width={186}
      label='Location'
      variant='outline'
      isActive={active === 'Location'}
      extraClass='space_button_borderless'
      handleClick={() => handleClick('Location')}
    />
  </TabWrapper>
)

const Description = ({ workspaceData }) => (
  <TabContentWrapper>
    {parse(workspaceData?.description + '')}
  </TabContentWrapper>
)

const Amenities = ({
  BasicOptions,
  OtherOptions,
  SeatingOptions,
  EquipmentOptions,
  FacilitiesOptions,
}) => (
  <TabContentWrapper>
    <div className='amenities'>
      {BasicOptions?.length > 0 && (
        <AmentyComp label='Basic' options={BasicOptions} />
      )}
      {SeatingOptions?.length > 0 && (
        <AmentyComp label='Seating' options={SeatingOptions} />
      )}

      {FacilitiesOptions?.length > 0 && (
        <AmentyComp label='Facilities' options={FacilitiesOptions} />
      )}
    </div>
    <div className='amenities sec-div'>
      {EquipmentOptions?.length > 0 && (
        <AmentyComp label='Equipment' options={EquipmentOptions} />
      )}
    </div>
    <div className='amenities sec-div'>
      {OtherOptions?.length > 0 && (
        <AmentyComp label='Others' options={OtherOptions} />
      )}
    </div>
  </TabContentWrapper>
)

const Reviews = ({ WorkspaceReviews, workspaceData, displayReviews }) => (
  <TabContentWrapper>
    <div className='desc_wrapper_subtext'>
      <div>
        <span className='fa fa-star checked'></span>
        <span>{`${WorkspaceReviews?.length}`} reviews</span>
      </div>
      <Link to={`/space/${workspaceData?.slug}/reviews`}>
        <span>View all</span>
      </Link>
    </div>
    {displayReviews}
  </TabContentWrapper>
)

const Gallery = () => <TabContentWrapper>this is galery</TabContentWrapper>

const LocationComponent = ({ workspaceData }) => (
  <TabContentWrapper>
    <div className='desc_wrapper_subtext'>
      <div className='pb-5'>
        <Location />
        <span>{workspaceData?.address}</span>
      </div>
    </div>
    <WorkspaceMap
      space_data={workspaceData}
      staticView={true}
      latValue={workspaceData?.lat}
      lngValue={workspaceData?.lng}
    />
  </TabContentWrapper>
)

const Price = ({
  enGB,
  optionRow,
  modifiers,
  handleClear,
  selectedDate,
  workspaceData,
  startMonthDate,
  handleDayClick,
  handleNavigate,
  setStartMonthDate,
  handleSelectedDate,
}) => (
  <PriceWrapper>
    <Button
      height={50}
      size={'full'}
      variant='outline'
      label={
        <SpacePrice>
          ₦{''}
          {workspaceData?.type?.type === 'Daily'
            ? `${workspaceData?.price}/daily`
            : workspaceData?.type?.type === 'Hourly'
            ? `${workspaceData?.price}/hour`
            : workspaceData?.type?.type === 'Monthly'
            ? `${workspaceData?.price}/month`
            : 0}
        </SpacePrice>
      }
      isActive={true}
      extraClass='space_button_borderless'
      handleClick={() => {}}
      className='price_figure'
    ></Button>
  </PriceWrapper>
)

const Content = ({ title, data }) => (
  <div className='m-2 mb-3 min-w-[25%]  border-b-[0.5px] border-[#D4D4D4]'>
    <div className='text-xs text-[#727073]'>{title}</div>
    <div className='lg:text-[13px] py-3   text-left'>{data}</div>
  </div>
)

const OverviewComponent = ({ workspaceData }) => {
  const {
    name,
    type,
    city,
    state,
    status,
    category,
    bookings,
    mentorship_available: mentorship,
  } = workspaceData && workspaceData

  return (
    <div>
      <Title>Overview</Title>
      <div className='flex grid-cols-4 justify-between flex-wrap'>
        <Content title={'Workspace Name'} data={name || 'N/A'} />
        <Content title={'Status'} data={status || 'N/A'} />
        <Content title={'Number of users'} data={bookings?.length || 'N/A'} />
        <Content
          title={'Mentorship'}
          data={mentorship === true ? 'Yes' : 'No'}
        />
        <Content
          title={'Location'}
          data={truncate(city + ', ' + state, 20) || 'N/A'}
        />
        <Content
          title={'Category'}
          data={truncate(category?.name, 20) || 'N/A'}
        />
        <Content title={'Duration'} data={type?.type || 'N/A'} />
      </div>
    </div>
  )
}

const OwnerDetail = ({ workspaceData }) => (
  <div className='w-full h-[90%] flex flex-col items-center justify-center'>
    <div className='w-[150px] h-[150px] rounded-full mb-4 shadow-2fl overflow-hidden object-cover'>
      <img
        className='w-full h-full'
        src={workspaceData?.owner?.profile_url || '/avatar.png'}
        alt={workspaceData?.owner?.first_name}
      />
    </div>

    <div className='text-sm flex flex-col items-center'>
      <p className='text-gray-900 font-bold leading-none'>
        {workspaceData?.owner?.first_name +
          ' ' +
          workspaceData?.owner?.last_name}
      </p>
      <p className=' text-[#727073'>
        {workspaceData?.owner?.email || 'Email N/A'}
      </p>
      <p className=' text-[#727073'>
        {workspaceData?.owner?.gender || 'Gender N/A'}
      </p>
      <p className=' text-[#727073'>
        {workspaceData?.owner?.phone || 'Phone N/A'}
      </p>
    </div>
  </div>
)
const OverViewDetailsLeftComponent = ({ workspaceData }) => (
  <div className='object w-full h-full overflow-hidden rounded-tl-lg rounded-bl-lg relative'>
    {workspaceData?.photos?.map(({ url }, i) => (
      <img
        className='w-full h-full '
        src={i === 0 ? url : '/workspace/workspace.jpeg'}
        alt='workspace image'
      />
    ))}
    <div className='flex justify-between px-2 py-1 absolute bottom-0 left-0 ml-1 mb-1 rounded-lg bg-[#0000005f]'>
      <Rating reviews={workspaceData?.reviews} />
      <div className='text-white'>
        {workspaceData?.reviews?.length}
        {' (reviews)'}
      </div>
    </div>
  </div>
)

const Rating = ({ reviews }) => {
  const RatingAvg = () => {
    const sumUp = reviews?.reduce((x, y) => x + y, 0)
    const avg = sumUp / reviews.length
    const review = avg.toFixed(2)
    return review
  }

  return (
    <>
      {reviews?.length ? (
        <div className='flex'>
          <div className='text-[#F9DC5C] text-xs mr-1'>
            <svg
              width='22'
              height='21'
              viewBox='0 0 22 21'
              fill='#F9DC5C'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11 16.75L4.82796 19.995L6.00696 13.122L1.00696 8.25495L7.90696 7.25495L10.993 1.00195L14.079 7.25495L20.979 8.25495L15.979 13.122L17.158 19.995L11 16.75Z'
                fill='#F9DC5C'
                stroke='#F9DC5C'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </div>
          <div className='xxl:text-xs text-[#F9DC5C] text-xs'>{RatingAvg}</div>
        </div>
      ) : null}
    </>
  )
}

// STYLED COMPONENTS TO BE EXTACTED TO A SEPARATE FILE
const TabContentWrapper = tw.div``
const TabWrapper = tw.div`mb-2 flex justify-between`
const PriceWrapper = tw.div`relative w-full  shadow-2fl `

const SpaceDetailsLeft = tw.div` xxl:basis-[75%] xl:basis-[65%] lg:basis-[63%] md:basis-[70%] sm:basis-[80%] shadow-2fl rounded-lg p-4`
const SpaceDetailsRight = tw.div`xxl:basis-[20%] xl:basis-[30%] lg:basis-[32%] md:basis-[25%] sm:basis-[15%] rounded-lg`
const SpacePrice = tw.div`text-xl font-semibold`

// Overview section
const OverView = tw.div`flex justify-between w-full h-[300px]`

const OverViewDetails = tw.div`basis-[75%] flex justify-between rounded-lg relative`
const OverViewDetailsLeft = tw.div`
basis-[35%] bg-[#fff] shadow-2fl rounded-tl-lg rounded-bl-lg p-1
`

const OverViewDetailsRight = tw.div`basis-[62%] p-4 bg-[#fff] shadow-2fl  rounded-tr-lg rounded-br-lg`
const Title = tw.h3`font-semibold ml-2`

const OverViewSpaceOwnerDetails = tw.div`basis-[23%] rounded-lg shadow-2fl p-4 bg-[#fff]`

// const CustomCard = tw.div`rounded-lg shadow-2fl p-4 bg-[#fff]`;
// const FlexibleDiv = tw.div`flex justify-between`;
