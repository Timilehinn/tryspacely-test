import React from 'react'
import FavourityActive from '../../../svgs/FavourityActive.svg'
import { useTranslation } from 'react-i18next'

const FavoriteBody = ({ user }) => {
  const { t } = useTranslation()

  return (
    <main className='flex flex-col lg:p-10 md:p-10 sm:p-5'>
      <section className='flex flex-row justify-between items-center'>
        <div className='flex flex-col py-4'>
          <p className='font-medium text-[18px]'> {t('Favorite space')} </p>
          <span className='text-[16px]'>
            <span className='text-[20px]'>
              {' '}
              {user.workspace_favourites?.length}{' '}
            </span>
            {t('spaces')}{' '}
          </span>
        </div>
      </section>

      <section className='grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 md:gap-4 sm:grid-cols-1 sm:gap-4 '>
        {user.workspace_favourites?.map((data) => (
          <article className='grid grid-cols-1 content-center border-[1px] border-[#5B585B] rounded-lg p-1'>
            <div className='relative'>
              <img
                src={
                  data.photos[0]
                    ? data.photos[0] === 'null'
                    : 'https://cdn.pixabay.com/photo/2018/03/19/18/20/tea-time-3240766_960_720.jpg'
                }
                alt=''
                className='h-[300px] w-full rounded-lg'
              />
              <span
                className='bg-[#ED254E] rounded-r-md w-[118px] h-[28px] absolute top-3 left-0 px-1 text-white 
                            font-medium text-[16px] '
              >
                {data.is_featured === true ? 'Featured' : 'Not featured'}
              </span>
            </div>

            <div className='flex flex-row justify-between items-center gap-2 px-3 py-1'>
              <div className='flex flex-col'>
                <span className='text-[#141115] '> {data.name} </span>
                <span className='text-[#5B585B]'> {data.address} </span>
              </div>

              <span>
                <FavourityActive />
              </span>
            </div>

            <div className='grid grid-cols-3 text-[#5B585B] px-3 py-2'>
              {data.available_space} User
            </div>

            <div className='flex flex-row justify-between items-center gap-3 px-3'>
              <span className='flex items-center gap-1'>
                <img
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/icons8-star-16.png'
                  alt=''
                />
                <img
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/icons8-star-16.png'
                  alt=''
                />
                <img
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/icons8-star-16.png'
                  alt=''
                />
                <img
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/icons8-star-16.png'
                  alt=''
                />
                <img
                  src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/icons8-star-16.png'
                  alt=''
                />
                <span
                  className='flex justify-center items-center bg-black w-[30px] h-[20px] rounded-l-full 
                                rounded-r-full text-white'
                >
                  5.0
                </span>
              </span>
              <span className='font-normal text-[18px]'>
                {' '}
                ₦{data.price}/hour{' '}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* <button className="bg-[#FCFCFC] h-[56px] w-[118px] rounded-md my-5 grid grid-cols-1 content-center 
            place-content-center mx-auto text-[#0559FD] font-medium shadow-2fl hover:bg-[#0559FD] hover:text-white ">
                {t('Load More')}
            </button> */}
    </main>
  )
}

export default FavoriteBody
