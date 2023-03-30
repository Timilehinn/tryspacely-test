import React from 'react'
import { useTranslation } from 'react-i18next'

const BlogDetailsEx = () => {
  const { t } = useTranslation()

  return (
    <div className='bg-[#FCFCFC]'>
      <div
        className=' lg:flex lg:justify-center lg:items-center md:justify-center md:items-center  lg:flex-col lg:space-x-5 lg:mx-auto lg:mt-0 md:mt-0 sm:mt-3 border-box
        sm:py-4 lg:px-14  box-border md:w-full lg:w-full lg:py-5  sm:px-9 md:px-0'
      >
        <h1 className='lg:px-9 md:px-8 lg:pb-3 md:pb-2 sm:pb-2 lg:mr-auto font-medium'>
          {t('Similar Posts to Read')}
        </h1>
        <div
          className='lg:flex lg:justify-center md:justify-center md:self-center lg:space-x-9 md:flex md:flex-wrap
        sm:divide-btnColor lg:divide-y-0 md:divide-y-0 sm:divide-y md:w-full lg:w-full  sm:space-y-3'
        >
          <div className='text-lg sm:pt-4 lg:pt-3 md:pt-7'>
            <p className='text-[#5B585B] font-light text-sm lg:pb-3 md:pb-3 sm:pb-3'>
              {t('October 30, 2017 - Community, Engineering')}
            </p>
            <h1 className='font-medium text-base text-[#2C292C] w-[22rem]'>
              {t(
                '13 short and scary games plus source to play (or hack) this Hallowen'
              )}
            </h1>
            <div className='lg:flex lg:items-center md:flex md:items-center sm:flex sm:items-center lg:mt-5 md:mt-4 sm:mt-4'>
              <img
                className=' andrew'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/image-anousheh-ansari.png'
                alt='andrew_pics'
              />
              <p className='lg:pl-3 text-sm md:pl-3 text-[#5B585B]'>
                {t('Andrew Johnson')}
              </p>
            </div>
          </div>

          <div className='text-lg sm:pt-4 lg:pt-0 md:pb-0 '>
            <p className='text-[#5B585B] font-light text-sm lg:pb-3 md:pb-3 sm:pb-3'>
              {t('October 30, 2017 - Community, Engineering')}
            </p>
            <h1 className='font-medium text-base text-[#2C292C] w-[22rem]'>
              {t(
                '13 short and scary games plus source to play (or hack) this Hallowen'
              )}
            </h1>
            <div className='lg:flex lg:items-center md:flex md:items-center sm:flex sm:items-center lg:mt-5 md:mt-4 sm:mt-4'>
              <img
                className=' andrew'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/image-anousheh-ansari.png'
                alt='andrew_pics'
              />
              <p className='lg:pl-3  md:pl-3 text-sm text-[#5B585B]'>
                {t('Andrew Johnson')}
              </p>
            </div>
          </div>

          <div className='text-lg sm:pt-4 lg:pt-0 md:pt-0 '>
            <p className='text-[#5B585B] font-light text-sm lg:pb-3 md:pb-3 sm:pb-3'>
              {t('October 30, 2017 - Community, Engineering')}
            </p>
            <h1 className='font-medium text-base text-[#2C292C] w-[22rem]'>
              {t(
                '13 short and scary games plus source to play (or hack) this Hallowen'
              )}
            </h1>
            <div className='lg:flex lg:items-center md:flex md:items-center sm:flex sm:items-center lg:mt-5 md:mt-4 sm:mt-4'>
              <img
                className=' andrew'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/image-anousheh-ansari.png'
                alt='andrew_pics'
              />
              <p className='lg:pl-3 text-sm md:pl-3 text-[#5B585B]'>
                {t('Andrew Johnson')}
              </p>
            </div>
          </div>

          <div className='text-lg sm:pt-4 lg:pt-0 md:pt-0 '>
            <p className='text-[#5B585B] font-light text-sm lg:pb-3 md:pb-3 sm:pb-3'>
              {t('October 30, 2017 - Community, Engineering')}
            </p>
            <h1 className='font-medium text-base text-[#2C292C] w-[22rem]'>
              {t(
                '13 short and scary games plus source to play (or hack) this Hallowen'
              )}
            </h1>
            <div className='lg:flex lg:items-center md:flex md:items-center sm:flex sm:items-center lg:mt-5 md:mt-4 sm:mt-4'>
              <img
                className=' andrew'
                src='https://trybookings-assets.s3.eu-west-2.amazonaws.com/image-anousheh-ansari.png'
                alt='andrew_pics'
              />
              <p className='lg:pl-3 text-sm md:pl-3 text-[#5B585B]'>
                {t('Andrew Johnson')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BlogDetailsEx
