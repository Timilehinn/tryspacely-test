import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Cities = () => {
  const { t } = useTranslation()

  const citiesImage = [
    {
      id: 1,
      src: 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/karate.jpeg',
      alt: 'Lagos',
      state: 'Lagos',
      totalSpaces: 100,
    },
    {
      id: 2,
      src: 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/china.jpeg',
      alt: 'Abuja',
      state: 'Abuja',
      totalSpaces: 20,
    },
    {
      id: 3,
      src: 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/india.jpeg',
      alt: 'Portharcourt',
      state: 'PortHarcourt',
      totalSpaces: 10,
    },
    {
      id: 4,
      src: 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/congo.jpeg',
      alt: 'Enugu',
      state: 'Enugu',
      totalSpaces: 500,
    },
    {
      id: 5,
      src: 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/yankee.jpeg',
      alt: 'Ogun',
      state: 'Ogun',
      totalSpaces: 50,
    },
    {
      id: 6,
      src: 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/atlas.jpeg',
      alt: 'Jos',
      state: 'Jos',
      totalSpaces: 10,
    },
    {
      id: 7,
      src: 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/poland.jpeg',
      alt: 'Imo',
      state: 'Imo',
      totalSpaces: 10,
    },
    {
      id: 8,
      src: 'https://trybookings-assets.s3.eu-west-2.amazonaws.com/chad.jpeg',
      alt: 'Ibadan',
      state: 'Ibadan',
      totalSpaces: 500,
    },
  ]

  return (
    <main className='grid grid-cols-1 lg:p-10 md:p-10 sm:p-5'>
      <h1 className='font-medium text-3xl py-2 '>{t('Explore Top Cities')}</h1>
      <p className='text-2xl'>
        {t('Search for available workspace in the most popular cities')}
      </p>

      <section className='lg:grid lg:grid-cols-4 lg:gap-4 py-10 md:grid md:grid-cols-2 md:gap-5 sm:grid sm:grid-cols-1 sm:gap-5'>
        {citiesImage.map((img) => {
          return (
            <Link key={img.id} to='/booking' className='relative '>
              <LazyLoadImage
                src={img.src}
                effect='blur'
                className='rounded-2xl w-full h-auto '
              />
              <div
                className='text-white absolute lg:top-0 lg:left-0 lg:grid lg:grid-cols-1 lg:content-center lg:align-middle
                md:top-24 md:left-3 sm:top-24 sm:left-3'
              >
                <h3 className='text-2xl font-semibold lg:pl-4 lg:mt-32 text-white sm:3xl'>
                  {img.state}
                </h3>
                <p className='lg:pl-4 md:text-xl sm:text-2xl'>
                  {img.totalSpaces}
                </p>
              </div>
            </Link>
          )
        })}
      </section>
    </main>
  )
}

export default Cities
