import React, { useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import { useDispatch } from 'react-redux'
import {
  setCoordinatesLatLng,
  setFilterViaCoordinates,
  setAddressDetails,
} from '../../slices/filterOptions'

const CreateWorkspaceAddress = ({
  placeholder,
  noAbsoulte,
  setAddressPicked,
}) => {
  const dispatch = useDispatch()
  const [address, setAddress] = useState('')
  const [coordinatesState, setCoordinates] = useState({
    lat: null,
    lng: null,
  })

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value)
    const ll = await getLatLng(result[0])
    setAddressPicked(value)
    setAddress(value)
    setCoordinates(ll)
    dispatch(setFilterViaCoordinates(true))
    dispatch(setCoordinatesLatLng(ll))
    dispatch(setAddressDetails(value))
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
        {({ getInputProps, suggestions, getSuggestionItemProps }) => {
          return (
            <div>
              <input
                autoComplete='off'
                style={{
                  fontSize: 13,
                  outline: 'none',
                  position: noAbsoulte ? 'relative' : 'absolute',
                  top: noAbsoulte ? 0 : 45,
                  border: '2px solid gray',
                  borderRadius: '10px',
                  borderColor: '#F6F6F6',
                  height: '56px',
                  width: '100%',
                  textIndent: '10px',
                  margin: '10px 0',
                }}
                {...getInputProps({
                  placeholder: placeholder,
                  className: 'Enter your address',
                })}
              />
              <div
                style={{
                  fontSize: 13,
                  outline: 'none',
                  position: noAbsoulte ? 'absolute' : 'absolute',
                  top: noAbsoulte ? 100 : 90,
                  left: noAbsoulte ? '0%' : 0,
                  height: 'fit-content',
                  width: 'auto',
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
                      <div>{suggestion.description}</div>
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

export default CreateWorkspaceAddress
