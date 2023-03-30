import classNames from 'classnames'
import React, { useState, useEffect } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  getCoordinatesLatLng,
  setCoordinatesLatLng,
  setFilterViaCoordinates,
} from '../../slices/filterOptions'

const BookingAutoComplete = ({
  styles,
  noBorder,
  noAbsoulte,
  placeholder,
  contentBoxStyle,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const coordinates = useSelector(getCoordinatesLatLng)
  const [address, setAddress] = useState('')
  const [coordinatesState, setCoordinates] = useState({
    lat: null,
    lng: null,
  })

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value)
    const ll = await getLatLng(result[0])
    setAddress(value)
    setCoordinates(ll)
    dispatch(setFilterViaCoordinates(true))
    dispatch(setCoordinatesLatLng(ll))
    // navigate('/booking')
  }

  const handleChange = (e) => {
    setAddress(e)
  }

  const searchOptions = {
    componentRestrictions: { country: ['ng'] },
  }

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={(e) => handleChange(e)}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <div>
              <input
                style={{
                  fontSize: 13,
                  outline: 'none',
                  // position: "absolute",
                  position: noAbsoulte ? 'relative' : 'absolute',
                  ...styles,
                  // top: noAbsoulte ? 0 : 45,
                }}
                {...getInputProps({
                  placeholder: placeholder,
                  className: `w-full lg:h-[40px] lg:top-4 md:h-[40px] md:top-4 sm:top-8 sm:h-[40px] ${
                    noBorder ? '' : 'border-[1px]'
                  } indent-8 rounded-lg`,
                })}
              />
              <div
                className='shadow-2fl'
                style={{
                  fontSize: 13,
                  outline: 'none',
                  position: noAbsoulte ? 'absolute' : 'absolute',
                  top: noAbsoulte ? 40 : 20,
                  left: noAbsoulte ? '0' : 0,
                  height: 'fit-content',
                  width: 'auto',
                  zIndex: '10',
                }}
              >
                {/* {loading ? <div>...loading</div> : null} */}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active '
                    : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' }

                  return (
                    <div
                      key={index}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                        ...contentBoxStyle,
                      })}
                    >
                      <div className='lg:w-[500px] lg:z-20 md:w-[500px] md:-z-20 sm:z-20 sm:w-[300px] '>
                        {suggestion.description}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }}
      </PlacesAutocomplete>
    </>
  )
}

export default BookingAutoComplete
