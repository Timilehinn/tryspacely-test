import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Testimonies = () => {
  const { t } = useTranslation()

  const imgSlider = {
    display: 'flex',
    gap: '4',
  }

  const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 6,
    speed: 500,
    arrows: false,
    autoplaySpeed: 7000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          mobileFirst: true,
        },
      },
    ],
  }

  return (
    <section className='bg-[#011936] flex space-x-6 pt-10 xl:flex-row sm:flex-col'>
      <div className='container space-x-2 w-[48rem]'>
        <Slider style={imgSlider} {...settings}>
          <div
            className=' lg:flex lg:flex-col lg:gap-4 bg-[#99A3AF] lg:w-[700px] md:w-[14rem] rounded-xl text-white lg:p-5 md:mx-auto sm:w-full
            md:pt-3 sm:mx-auto sm:p-6  '
          >
            <div className='lg:flex lg:items-center lg:space-x-3 md:flex md:gap-5 md:pb-4 sm:flex sm:gap-5'>
              <div className='mr-5'>
                <img
                  className='rounded-full w-[30px] h-[30px] border-2 border-white '
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/profile-3.jpg'
                  alt='pics'
                />
              </div>
              <div className='lg:flex lg:flex-col lg:justify-center lg:gap-1'>
                <div className='text-xl font-semibold'> {t('Tera Hailey')}</div>
                <div className='text-sm font-light'>
                  {' '}
                  {t('Frontend Developer')}
                </div>
              </div>
            </div>

            <p className='text-sm font-light lg:-mt-4 lg:text-sm md:text-xl sm:text-lg sm:py-5'>
              {t(
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
              )}
            </p>
          </div>

          <div
            className=' lg:flex lg:flex-col lg:gap-4 bg-[#99A3AF] lg:w-[700px] md:w-[14rem]
                rounded-xl text-white lg:p-5 md:mx-auto sm:w-full
              md:pt-3 sm:mx-auto sm:p-6 space-x-1'
          >
            <div className='lg:flex lg:items-center lg:space-x-3 md:flex md:gap-5 md:pb-4 sm:flex sm:gap-5'>
              <div className='mr-5'>
                <img
                  className='rounded-full w-[30px] h-[30px] border-2 border-white '
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/profile-3.jpg'
                  alt='pics'
                />
              </div>
              <div className='lg:flex lg:flex-col lg:justify-center lg:gap-1'>
                <div className='text-xl font-semibold'> {t('Tera Hailey')}</div>
                <div className='text-sm font-light'>
                  {' '}
                  {t('Frontend Developer')}
                </div>
              </div>
            </div>

            <p className='text-sm font-light lg:-mt-4 lg:text-sm md:text-xl sm:text-lg sm:py-5'>
              {t(
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
              )}
            </p>
          </div>

          <div
            className='lg:flex lg:flex-col lg:gap-4 bg-[#99A3AF] lg:w-[700px] md:w-[14rem]
                rounded-xl text-white lg:p-5 md:mx-auto sm:w-full
              md:pt-3 sm:mx-auto sm:p-6 space-x-1'
          >
            <div className='lg:flex lg:items-center lg:space-x-3 md:flex md:gap-5 md:pb-4 sm:flex sm:gap-5'>
              <div className='mr-5'>
                <img
                  className='rounded-full w-[30px] h-[30px] border-2 border-white '
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/profile-3.jpg'
                  alt='pics'
                />
              </div>
              <div className='lg:flex lg:flex-col lg:justify-center lg:gap-1'>
                <div className='text-xl font-semibold'> {t('Tera Hailey')}</div>
                <div className='text-sm font-light'>
                  {' '}
                  {t('Frontend Developer')}
                </div>
              </div>
            </div>

            <p className='text-sm font-light lg:-mt-4 lg:text-sm md:text-xl sm:text-lg sm:py-5'>
              {t(
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
              )}
            </p>
          </div>
        </Slider>
      </div>

      <div
        className='flex lg:flex-col lg:justify-start lg:items-start lg:gap-5  md:flex-col md:justify-center md:items-center md:gap-4
      md:py-3 sm:flex-col sm:justify-center sm:items-center sm:gap-4 sm:py-4 '
      >
        <p
          className='text-white font-medium lg:text-start lg:text-3xl lg:w-[80%] md:w-[80%] md:text-2xl md:text-center sm:text-center
         sm:text-2xl sm:w-[100%]'
        >
          {t('Loved by developers, and individuals across the country')}
        </p>
        <Link
          to='/booking'
          className='w-[173px] h-[56px] flex justify-center items-center bg-white rounded-lg text-black hover:bg-[#0559FD] 
          hover:text-white '
        >
          {t('Book A Workspace')}
        </Link>
      </div>
    </section>
  )
}

export default Testimonies
