import React, { useState, useEffect } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getCoordinatesLatLng,
  setCoordinatesLatLng,
  setFilterViaCoordinates,
} from '../../../slices/filterOptions'

const AutoCompletePlaces = ({ placeholder, noAbsoulte }) => {
  const dispatch = useDispatch()
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
                  // top: noAbsoulte ? 0 : 45,
                }}
                {...getInputProps({
                  placeholder: placeholder,
                  className:
                    'lg:w-[200px] lg:h-[24px] lg:top-7 md:h-[40px] md:w-[500px] sm:w-[300px] sm:h-[40px] ',
                })}
              />
              <div
                style={{
                  fontSize: 13,
                  outline: 'none',
                  position: noAbsoulte ? 'absolute' : 'absolute',
                  top: noAbsoulte ? 150 : 70,
                  left: noAbsoulte ? '0' : 0,
                  height: 'fit-content',
                  width: 'auto',
                  zIndex: '10',
                }}
              >
                {/* {loading ? <div>...loading</div> : null} */}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
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

export default AutoCompletePlaces
