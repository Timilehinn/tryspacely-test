import React, { useState, useRef, useEffect } from 'react'
import './addOnsStyle.scss'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { useSwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Gallery = ({ imageArray, handleToggle, workspaceName, startFrom }) => {
  const swiperRef = useRef()
  const [currentSlide, setCurrentSlide] = useState(1)
  const [colorRight, setColorRight] = useState('')
  const [colorLeft, setColorLeft] = useState('')
  const ImageArray = imageArray?.map((item, index) => {
    return (
      <SwiperSlide key={index}>
        <div className='lg:w-[100%] lg:h-[530px] sm:h-[280px] sm:h-[100%] rounded'>
          <img
            style={{
              objectFit: 'fill',
              minHeight: '100%',
              maxHeight: '100%',
              maxWidth: '100%',
            }}
            src={item}
            height={'100%'}
            width={'100%'}
            alt=''
          />
        </div>
      </SwiperSlide>
    )
  })

  useEffect(() => {
    if (!startFrom) return
    swiperRef.current.slideTo(startFrom - 1, 300, true, true)
  }, [])

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        swiperRef.current.slidePrev()
        break
      case 39:
        swiperRef.current.slideNext()
        break
    }
  }

  useEffect(() => {
    if (currentSlide === imageArray.length) {
      setColorRight(0.4)
    } else {
      setColorRight(1)
    }
    if (currentSlide === 1) {
      setColorLeft(0.4)
    } else {
      setColorLeft(1)
    }
  }, [currentSlide])

  const handleSlideChange = (e) => {
    setCurrentSlide(e?.activeIndex + 1)
  }

  const swipe = (
    <Swiper
      navigation
      spaceBetween={50}
      slidesPerView={1}
      modules={[Navigation, A11y]}
      scrollbar={{ draggable: true }}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper
      }}
      className='mySwiper rounded-lg'
      onSlideChange={(e) => handleSlideChange(e)}
    >
      {ImageArray}
    </Swiper>
  )

  return (
    <>
      <div
        className='w-full h-full bg-[#2d2c2dca] fixed bottom-0 left-0 top-0 flex flex-col'
        style={{ zIndex: 1000 }}
      >
        <div
          style={{ flex: 1 }}
          className='h-[100%] flex w-[100%] pl-[9%] pr-[9%] justify-around items-center'
        >
          <div className='font-400 font-[Plus Jakarta Display] text-[#ffffff] z-[50] text-[20px]'>
            {workspaceName} Images
          </div>
          <div className='text-[#FFFFFF] font-[Plus Jakarta Display] font-400 text-[20px]'>
            {currentSlide}/{imageArray?.length}
          </div>
          <div
            onClick={handleToggle}
            className='rounded-full w-[32px] h-[32px] bg-[#ffffff] z-[50] flex justify-center items-center border cursor-pointer'
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='#141115'
              stroke='#141115'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18 6L6 18'
                stroke='#141115'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M6 6L18 18'
                stroke='#141115'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </div>
        </div>

        <div
          style={{ flex: 6 }}
          className='h-[100%] w-[100%] flex justify-center items-center'
        >
          <div
            style={{ flex: 1 }}
            className='h-[100%] w-[100%] flex justify-center items-center'
          >
            <div style={{ color: 'white', cursor: 'pointer' }}>
              <svg
                style={{ opacity: colorLeft }}
                onClick={() => swiperRef.current.slidePrev()}
                className='left-svg-swipe sm:hidden lg:inline-block'
                clip-rule='evenodd'
                fill={`${'white'}`}
                fill-rule='evenodd'
                stroke-linejoin='round'
                stroke-miterlimit='2'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='m22 12.002c0-5.517-4.48-9.997-9.998-9.997-5.517 0-9.997 4.48-9.997 9.997 0 5.518 4.48 9.998 9.997 9.998 5.518 0 9.998-4.48 9.998-9.998zm-8.211-4.843c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591z'
                  fill-rule='nonzero'
                />
              </svg>
            </div>
          </div>

          <div
            style={{ flex: 7 }}
            className='h-[100%] w-[100%] flex justify-center items-center'
          >
            <div className='flex justify-between items-center h-[100%] lg:w-[800px] sm:w-[100%]'>
              {swipe}
            </div>
          </div>

          <div
            style={{ flex: 1 }}
            className='h-[100%] w-[100%] flex justify-center items-center'
          >
            <div style={{ color: 'white', cursor: 'pointer' }}>
              <svg
                style={{ opacity: colorRight }}
                onClick={() => swiperRef.current.slideNext()}
                className='right-svg-swipe sm:hidden lg:inline-block'
                clip-rule='evenodd'
                fill={`${'white'}`}
                fill-rule='evenodd'
                stroke-linejoin='round'
                stroke-miterlimit='2'
                viewBox='0 0 24 24'
                height='80'
                width='80'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='m2.009 12.002c0-5.517 4.48-9.997 9.998-9.997s9.998 4.48 9.998 9.997c0 5.518-4.48 9.998-9.998 9.998s-9.998-4.48-9.998-9.998zm8.211-4.843c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591z'
                  fill-rule='nonzero'
                />
              </svg>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} className='h-[100%] w-[100%]'></div>
      </div>
    </>
  )
}

export default Gallery
