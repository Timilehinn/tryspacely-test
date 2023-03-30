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
  setAddressDetails,
} from '../../../slices/filterOptions'

const WorkspaceAutocomplete = ({
  placeholder,
  noAbsoulte,
  setAddressPicked,
  location,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const coordinates = useSelector(getCoordinatesLatLng)
  const [address, setAddress] = useState('')
  const [coordinatesState, setCoordinates] = useState({
    lat: null,
    lng: null,
  })
  const workspaceText = useSelector(
    (state) => state.workspaces.workspacesDetails
  )

  // const { address } = workspaceText

  const handleSelect = async (value, id, fullPlaceDetails) => {
    console.log(fullPlaceDetails, 'value')
    const result = await geocodeByAddress(value)
    const ll = await getLatLng(result[0])
    setAddressPicked(value)
    setAddress(value)
    setCoordinates(ll)
    dispatch(setFilterViaCoordinates(true))
    dispatch(setCoordinatesLatLng(ll))
    dispatch(setAddressDetails(value))
    // navigate('/booking')
  }

  const handleChange = (e) => {
    setAddress(e)
    setAddressPicked(e)
  }

  const searchOptions = {
    componentRestrictions: { country: ['ng'] },
  }

  useEffect(() => {
    if (!workspaceText) return
    setAddress(workspaceText?.address)
  }, [workspaceText])

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={(e) => handleChange(e)}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          // console.log(suggestions, 'suggestions')
          // console.log(getInputProps, 'getInputProps')
          // console.log(getSuggestionItemProps, 'getSuggestionItemProps')
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

export default WorkspaceAutocomplete
