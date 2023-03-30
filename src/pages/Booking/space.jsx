import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import Location from '../../svgs/Location.svg'
import Save from '../../svgs/Fav.svg'
import Share from '../../svgs/Share.svg'
import ScrollIntoView from 'react-scroll-into-view'
import Gallary from '../../svgs/Gallary.svg'
import Button from '../../components/button'
import AmentyComp from '../../components/amenities'
import Naira from '../../assets/icons/Naira.svg'
import Instagram from '../../svgs/IG.svg'
import LinkedIn from '../../svgs/LinkedIn.svg'
import Github from '../../svgs/Github.svg'
import Twitter from '../../svgs/Twitter.svg'
import { DatePicker } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { Select } from 'antd'
import { useParams } from 'react-router'

import './space.scss'
import useProtectedRoute from '../../hooks/useProtectedRoute'
import Aboutfooterlink from '../../components/aboutblog/aboutui/aboutfooterlink'
import Header from '../../components/homepage/ui/header'
import Loader from '../../components/Loader/Loader'
import GallaryCaraosel from '../../helper/Gallary'
import useCookieHandler from '../../hooks/useCookieHandler'
import Cookies from 'universal-cookie'
import { RWebShare } from 'react-web-share'
import WorkspaceMap from '../../components/workspace-map'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Calendar, DatePickerCalendar } from 'react-nice-dates'
import { enGB } from 'date-fns/locale'
import { isSameDay } from 'date-fns'
import parse from 'html-react-parser'

import 'react-nice-dates/build/style.css'

const { Option } = Select

const { RangePicker } = DatePicker

const SpaceDetail = (props) => {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const { token } = useCookieHandler('user_token')
  const { success, errorAuth, loadingfinished } = useProtectedRoute()
  let { id } = useParams()

  const [active, setActive] = useState('Description')
  const [selected, setSelected] = useState('Check Availablity')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [workspaceData, setWorkspaceData] = useState({})
  const [photos, setPhotos] = useState([])
  const [bookings, setBookings] = useState([])
  const [fullPhotos, setFullPhotos] = useState([])
  const [availableDate, setAvailableDate] = useState({
    from: '',
    to: '',
  })
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

  const SocialIcons = [<Instagram />, <LinkedIn />, <Twitter />, <Github />]

  const handleClick = (name) => {
    setActive(name)
  }

  const onChange = (dateString) => {
    setAvailableDate({
      from: dateString[0],
      to: dateString[1],
    })
  }

  const hanldeExpandImage = (index) => {
    setStartFrom((prev) => (prev = index + 1))
    setViewAll(true)
  }

  const photosMapped = photos?.map((item, index) => {
    return (
      <li onClick={() => hanldeExpandImage(index)}>
        <img src={item?.url} alt='' />
      </li>
    )
  })

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

      return today
    } catch (error) {}
  }

  useEffect(() => {
    if (!bookings?.length) return
    formatAvailiablilty()
  }, [bookings])

  const dismissDropdown = () => {
    setIsMenuOpen(false)
  }

  const handleSelection = (value) => {
    setSelected(value)
    dismissDropdown()
  }

  useOnClickOutside(hiddenDatePicker, () => dismissDropdown())

  const handleCheckAvailability = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
    return () => {
      // second
    }
  }, [token])

  const getOnlyAvaliableDates = (bookings, booked_dates) => {
    const filteredArr = bookings?.filter((booking, number) => {
      for (let index = 0; index < booked_dates.length; index++) {
        const element = booked_dates[index]

        if (element?.booking_date === booking?.date) {
          return booking
        }
      }
    })
    return filteredArr
  }

  const getAllDetails = async () => {
    cookies.get('user_token')
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/workspaces/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await res.json()
    let _bookings = data['data']['bookings']
    let _available_dates = data['data']['available_dates']
    const unbooked_dates = await getOnlyAvaliableDates(
      _bookings,
      _available_dates
    )

    if (data?.status === false) {
      // alert('Error occured');
      setPageSucesss(false)
      setPageFailure(true)
      setPageLoading(false)
      return
    }
    const myData = data?.data?.data
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

  const handleViewOnMap = () => {
    setActive('Location')
  }

  const workspaceFavouriteSetter = async () => {
    const isFavourite = isFavourited ? 'unfavourite' : 'favourite'
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/workspaces/${workspaceData?.id}/${isFavourite}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      if (data?.status === false) {
        return
      }
      setIsFavoutited(!isFavourited)
    } catch (error) {}
  }

  const handleSelectedDate = (e) => {
    let filtered = e.filter(function (el) {
      return el != null
    })
    setSelectedDate(filtered)
  }
  const handleNavigate = (e) => {
    // e.preventDefault();
    try {
      if (!selectedDate?.length) return
      let sorted_date = selectedDate.sort(function (a, b) {
        const date1 = new Date(a)
        const date2 = new Date(b)

        return date1 - date2
      })
      const dateObj = {
        workspaceId: workspaceData?.id,
        value: sorted_date,
      }
      localStorage.setItem('dateBooked', JSON.stringify(dateObj))
      setTimeout(() => {
        navigate(`/booking/${id}/payment`)
        // ?come back here
      }, 100)
    } catch (error) {}
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
    <div>
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
      <Header
        errorAuth={errorAuth}
        success={success}
        loadingfinished={loadingfinished}
      />
      <Loader
        failure={pageFailure}
        successful={pageSuccess}
        isLoading={pageLoading}
        redirectTo={'booking'}
        noAuth={true}
      />
      {viewAll && (
        <GallaryCaraosel
          imageArray={fullPhotos}
          handleToggle={handleViewAll}
          workspaceName={workspaceData?.name}
          startFrom={startFrom}
        />
      )}
      {/* {viewAll && <GallaryCaraosel imageArray={fullPhotos} handleToggle={handleViewAll} workspaceName={workspaceData?.name} />} */}
      <div className='space-wrapper'>
        <div className='space-breadcrum'></div>
        <h1>{`${workspaceData?.name}`}</h1>
        <div className='space_address'>
          <div className='space_left '>
            <div className='review-icon'>
              <span className='fa fa-star checked'></span>
              <span>{`${WorkspaceReviews?.length}`} reviews</span>
            </div>
            <div className='flex'>
              <Location />
              <span>{workspaceData?.address}</span>
              <ScrollIntoView selector='#viewMap'>
                <span
                  onClick={handleViewOnMap}
                  style={{ cursor: 'pointer' }}
                  className='space_map'
                >
                  View on map
                </span>
              </ScrollIntoView>
            </div>
          </div>
          <div className='space_right'>
            <Button
              label='Save'
              icon={
                isFavourited ? (
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='red'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M20.84 4.60987C20.3292 4.09888 19.7228 3.69352 19.0554 3.41696C18.3879 3.14039 17.6725 2.99805 16.95 2.99805C16.2275 2.99805 15.5121 3.14039 14.8446 3.41696C14.1772 3.69352 13.5708 4.09888 13.06 4.60987L12 5.66987L10.94 4.60987C9.9083 3.57818 8.50903 2.99858 7.05 2.99858C5.59096 2.99858 4.19169 3.57818 3.16 4.60987C2.1283 5.64156 1.54871 7.04084 1.54871 8.49987C1.54871 9.95891 2.1283 11.3582 3.16 12.3899L4.22 13.4499L12 21.2299L19.78 13.4499L20.84 12.3899C21.351 11.8791 21.7563 11.2727 22.0329 10.6052C22.3095 9.93777 22.4518 9.22236 22.4518 8.49987C22.4518 7.77738 22.3095 7.06198 22.0329 6.39452C21.7563 5.72706 21.351 5.12063 20.84 4.60987V4.60987Z'
                      fill='red'
                      stroke='red'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                ) : (
                  <Save />
                )
              }
              variant='outline'
              handleClick={() => workspaceFavouriteSetter()}
              height={30}
              width={120}
            />
            <RWebShare
              data={{
                text: workspaceData?.description,
                url: window.location.href,
                title: workspaceData?.name,
              }}
              onClick={() => {}}
            >
              <button>
                <Button
                  label='Share'
                  icon={<Share />}
                  variant='outline'
                  height={30}
                  width={120}
                />
              </button>
            </RWebShare>
          </div>
        </div>
        {photos?.length && (
          <div class='ImageContainer'>
            <ul class='image-gallery'>{photosMapped}</ul>
            <div onClick={handleViewAll} className='gallaryPlacement'>
              <span>
                <Gallary />
                {!viewAll ? 'View all photos' : 'Collapse All'}
              </span>
            </div>
          </div>
        )}

        <div className='space_tab_wrapper'>
          <div className='space_tab_wrapper_left'>
            <div className='tabs'>
              <Button
                label='Description'
                width={186}
                handleClick={() => handleClick('Description')}
                isActive={active === 'Description'}
                variant='outline'
                extraClass='space_button_borderless'
                height={40}
              />
              <Button
                label='Amenities'
                width={186}
                handleClick={() => handleClick('Amenities')}
                isActive={active === 'Amenities'}
                variant='outline'
                extraClass='space_button_borderless'
                height={40}
              />
              <Button
                label='Reviews'
                width={186}
                handleClick={() => handleClick('Reviews')}
                isActive={active === 'Reviews'}
                variant='outline'
                extraClass='space_button_borderless'
                height={40}
              />
              {Review}
              <Button
                label='Location'
                width={186}
                handleClick={() => handleClick('Location')}
                isActive={active === 'Location'}
                variant='outline'
                extraClass='space_button_borderless'
                height={40}
              />
            </div>
            <div id='viewMap' className='space_desc_tab_wrapper'>
              {active === 'Description' && (
                <>
                  <div className='desc_wrapper'>
                    {/* <div className="desc_wrapper"> */}
                    {/* <h4>Description</h4>*/}
                    {/*<p className="desc_text">{workspaceData?.description}</p>*/}
                    {parse(workspaceData?.description + '')}
                  </div>
                </>
              )}
              {active === 'Amenities' && (
                <>
                  <div className='desc_wrapper'>
                    {/* <h4>Amenities</h4>*/}
                    <div className='amenities'>
                      {BasicOptions?.length > 0 && (
                        <AmentyComp label='Basic' options={BasicOptions} />
                      )}
                      {SeatingOptions?.length > 0 && (
                        <AmentyComp label='Seating' options={SeatingOptions} />
                      )}

                      {FacilitiesOptions?.length > 0 && (
                        <AmentyComp
                          label='Facilities'
                          options={FacilitiesOptions}
                        />
                      )}
                    </div>
                    <div className='amenities sec-div'>
                      {EquipmentOptions?.length > 0 && (
                        <AmentyComp
                          label='Equipment'
                          options={EquipmentOptions}
                        />
                      )}
                    </div>
                    <div className='amenities sec-div'>
                      {OtherOptions?.length > 0 && (
                        <AmentyComp label='Others' options={OtherOptions} />
                      )}
                    </div>
                  </div>
                </>
              )}
              {active === 'Reviews' && (
                <>
                  <div className='desc_wrapper'>
                    {/*<h4>Reviews</h4>*/}
                    <div className='desc_wrapper_subtext'>
                      <div>
                        <span className='fa fa-star checked'></span>
                        <span>{`${WorkspaceReviews?.length}`} reviews</span>
                      </div>
                      <Link to={`/space/${workspaceData?.slug}/reviews`}>
                        {/* <Link to={`/workspace/reviews?id=${workspaceData?.id}`}> */}
                        <span>View all</span>
                      </Link>
                    </div>
                    {displayReviews}
                  </div>
                </>
              )}
              {active === 'Location' && (
                <>
                  <div className='desc_wrapper'>
                    {/*<h4>Location</h4>*/}
                    <div className='desc_wrapper_subtext'>
                      <div className='pb-5'>
                        <Location />
                        <span>{workspaceData?.address}</span>
                      </div>
                    </div>
                    {/* <img src="../map.png" alt="map" className="mapHolderImg" /> */}
                    <WorkspaceMap
                      space_data={workspaceData}
                      staticView={true}
                      latValue={workspaceData?.lat}
                      lngValue={workspaceData?.lng}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='space_tab_wrapper_right'>
            <div className='price_wrapper relative'>
              <span>Price</span>
              <div className='price_figure'>
                <Naira />
                {workspaceData?.type?.type === 'Daily' ? (
                  <>
                    <span>{workspaceData?.price}</span>/daily
                  </>
                ) : workspaceData?.type?.type === 'Hourly' ? (
                  <>
                    <span>{workspaceData?.price}</span>/hour
                  </>
                ) : workspaceData?.type?.type === 'Monthly' ? (
                  <>
                    <span>{workspaceData?.price}</span>/month
                  </>
                ) : null}
              </div>
              <>
                {/* <Button label="" height={40} variant="primary" size="full" handleClick={handleCheckAvailability} /> */}
                {workspaceData?.type?.type === 'Daily' && (
                  <Calendar
                    onDayClick={handleDayClick}
                    modifiers={modifiers}
                    locale={enGB}
                    minimumDate={new Date()}
                  />
                )}
                {workspaceData?.type?.type === 'Monthly' && (
                  <DatePickerCalendar
                    // onDayClick={handleMonthClick}
                    onDateChange={setStartMonthDate}
                    date={startMonthDate}
                    // modifiers={modifiers}
                    locale={enGB}
                    minimumDate={new Date()}
                  />
                )}
                {workspaceData?.type?.type === 'Hourly' && (
                  <Select
                    onChange={(e) => handleSelectedDate(e)}
                    style={{ backgroundColor: 'blue', borderRadius: 5 }}
                    mode='multiple'
                    placeholder='Check availability'
                    className='w-[88%]'
                  >
                    {optionRow}
                  </Select>
                )}
                {selectedDate?.length > 0 && (
                  <div className='flex space-x-4 justify-end w-full mt-6 -ml-10'>
                    <button
                      className='h-[40px] w-[20%] bg-[red] rounded text-[white] pl-3 pr-3'
                      onClick={() => handleClear()}
                    >
                      Clear
                    </button>
                    <button
                      className='h-[40px] w-[50%] bg-[green] rounded text-[white] pl-3 pr-3'
                      onClick={(e) => handleNavigate(e)}
                    >
                      Book Space
                    </button>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>

      <Aboutfooterlink />
    </div>
  )
}

export default SpaceDetail
