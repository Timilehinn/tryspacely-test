import React from 'react'
import { useTranslation } from 'react-i18next'

const DetailGallery = ({ setShowImageCarosel, photos, setImgNumber }) => {
  const imageHandler = (num) => {
    setShowImageCarosel(true)
    setImgNumber(num)
  }
  const { t } = useTranslation()

  return (
    <>
      <div className='font-400 text-[20px] font-[Plus Jakarta Display] text-[#141115]'>
        {t('Gallery')}
      </div>

      <div className='lg:grid lg:grid-cols-4 lg:gap-2 md:grid md:grid-cols-3 md:gap-3 sm:grid sm:grid-cols-1 sm:gap-4'>
        {photos?.map(({ url, id }, index) => (
          <div
            key={id}
            className='relative rounded w-[100%] h-[120px] flex justify-center items-center'
          >
            <img
              className='w-[100%] h-[170px] fit-contain'
              src={url}
              alt='workspace_gallery'
            />
            <div
              onClick={() => imageHandler(index)}
              className=' absolute rounded bottom-[5%] right-[5%] h-[20px] w-[20px] bg-[#ffffff] cursor-pointer flex justify-center items-center'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M4 8V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8'
                  stroke='#141115'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M4 16V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H8'
                  stroke='#141115'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V8'
                  stroke='#141115'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V16'
                  stroke='#141115'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default DetailGallery
