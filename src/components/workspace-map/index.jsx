import React, { useCallback, useState, useEffect } from 'react'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  ScaleControl,
} from 'react-map-gl'
import Pin from './pin'
import useGeoLocation from '../../hooks/useGeolocation'
import Switch from '../switch'
import Cookies from 'universal-cookie'
import {
  setCoordinatesLatLng,
  setFilterViaCoordinates,
} from '../../slices/filterOptions'
const TOKEN =
  'pk.eyJ1IjoiaWFmb2xheWFuIiwiYSI6ImNsMTBwcGVxajIwc3UzYmtibWppMnRxZTAifQ.7YH7BoXUrg3R8T-NcRX3SA'
import { useDispatch } from 'react-redux'

const WorkspaceMap = ({
  staticView,
  latValue,
  lngValue,
  space_data,
  givenHeight,
  givenZoom,
}) => {
  const cookies = new Cookies()
  const dispatch = useDispatch()
  const [popupInfo, setPopupInfo] = useState(null)
  const location = useGeoLocation()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [workspaces, setWorkspaces] = useState([])

  let { lat, lng } = location.cord
  if (latValue) {
    lat = latValue
  }
  if (lngValue) {
    lng = lngValue
  }

  useEffect(() => {
    setTimeout(() => {
      latitude && TriggerSearch()
    }, 1000)
  }, [latitude])

  useEffect(() => {
    setTimeout(() => {
      longitude && TriggerSearch()
    }, 1000)
  }, [longitude])

  const TriggerSearch = () => {
    let newCordinate = {
      lat: latitude ?? lat,
      lng: longitude ?? lng,
    }
    dispatch(setCoordinatesLatLng(newCordinate))
    dispatch(setFilterViaCoordinates(true))
  }
  const getWorkspaces = async () => {
    try {
      const gottenToken = cookies.get('user_token')
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/workspaces`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${gottenToken}`,
        },
      })
      const data = await res.json()
      if (data?.status === false) {
        // alert('Error occured')
        return
      }
      const myData = data?.data?.data
      myData.map((item) => {
        const { city, price, state, lat, lng, photos, id } = item
        const newObject = {
          id,
          city,
          price,
          state,
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          image: photos[0]?.url ?? null,
        }
        setWorkspaces((prev) => [...prev, newObject])
      })
    } catch (error) {}
  }

  useEffect(() => {
    getWorkspaces()
  }, [])

  const pins = workspaces.map((space, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={space.longitude}
      latitude={space.latitude}
      anchor='top'
    >
      <Pin onClick={() => setPopupInfo(space)} amount={space.price} />
    </Marker>
  ))

  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      ref.trigger()
    }
  }, [])

  const MapOnMove = (e) => {
    setLongitude(e.longitude.toFixed(4))
    setLatitude(e.latitude.toFixed(4))
  }

  return (
    <div className='relative'>
      {location.loaded && (
        <>
          <div className='bg-white w-2/3 md:w-[285px] z-50 mx-auto h-10 rounded-lg absolute top-2 right-0 left-0 flex justify-center items-center'>
            <Switch />
          </div>
          <Map
            initialViewState={{
              latitude: parseFloat(lat).toFixed(4),
              longitude: parseFloat(lng).toFixed(4),
              zoom: givenZoom ?? 15,
              bearing: 0,
              pitch: 0,
            }}
            // {...viewPort}
            mapStyle='mapbox://styles/mapbox/streets-v9'
            onMove={(evt) => MapOnMove(evt.viewState)}
            style={{ width: '100%', height: givenHeight ?? '50vh' }}
            mapboxAccessToken={TOKEN}
            attributionControl={false}
            dragPan={staticView && false}
          >
            <GeolocateControl
              showAccuracyCircle={true}
              trackUserLocation={true}
              showUserLocation={true}
              ref={geolocateControlRef}
              trigger
            />
            <FullscreenControl position='top-left' />
            <NavigationControl position='bottom-right' />
            <ScaleControl />

            {!staticView ? (
              pins
            ) : (
              <Marker
                // key={`marker-$`}
                longitude={parseFloat(lng).toFixed(4)}
                latitude={parseFloat(lat).toFixed(4)}
                anchor='top'
              >
                <Pin
                  onClick={() => setPopupInfo(space_data)}
                  amount={space_data?.price}
                />
              </Marker>
            )}

            {popupInfo && (
              <Popup
                anchor='top'
                longitude={!staticView ? popupInfo.longitude : popupInfo?.lng}
                latitude={!staticView ? popupInfo.latitude : popupInfo?.lat}
                closeOnClick={false}
                onClose={() => setPopupInfo(null)}
                className='mt-7'
              >
                <div className='text-slate-800 py-1'>
                  {popupInfo.city}, {popupInfo.state} |{' '}
                  <a
                    target='_new'
                    // href={`https://camc-backend.herokuapp.com/booking/${popupInfo.id}`}
                    // href={`localhost:8080/booking/workspace?search=${popupInfo.city}, ${popupInfo.state}`}
                  >
                    Workspace
                  </a>
                </div>
                <img
                  width='100%'
                  src={
                    !staticView ? popupInfo.image : popupInfo?.photos[0]?.url
                  }
                />
              </Popup>
            )}
          </Map>
        </>
      )}
      {location.loaded === false && <div>Loading map</div>}
    </div>
  )
}

export default WorkspaceMap
