import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const BlogFooter = () => {
  const { t } = useTranslation()

  return (
    <div className='bg-[#FCFCFC] lg:px-14 lg:py-4 md:px-14 md:py-4 sm:py-4 sm:px-10 '>
      <div className='flex lg:justify-between lg:items-center md:justify-between md:items-center sm:justify-center sm:items-center lg:py-5 '>
        <Link
          to='/'
          className='text-[#011936] lg:text-3xl font-bold md:text-4xl sm:text-2xl hover:text-[#0555FD] '
        >
          TrySpacely
        </Link>

        {/* Fixing the social media icons to show later  */}
        <div className='flex space-x-3 lg:py-0 md:py-0 sm:py-4'>
          <Link to='/linkedin'>
            {' '}
            <i className='fa-brands fa-linkedin-square fa-2x'></i>
          </Link>

          <a href='https://twitter.com/trybookinz' target={'_blank'}>
            {' '}
            <i className='fa-brands fa-twitter-square fa-2x'></i>
          </a>
          <a href='https://facebook.com/tryspacely' target={'_blank'}>
            {' '}
            <i className='fa-brands fa-facebook-square fa-2x'></i>
          </a>
          <a href='https://instagram.com/tryspacely' target={'_blank'}>
            {' '}
            <i className='fa-brands fa-instagram-square fa-2x'></i>
          </a>
        </div>
      </div>

      <hr className='opacity-50' />

      <div className='flex flex-col py-4 lg:justify-between md:justify-between sm:justify-center'>
        <div
          className='flex lg:justify-between lg:flex-row lg:items-center md:justify-between md:flex-row md:items-center sm:flex-col sm:justify-center sm:items-center
          sm:gap-3'
        >
          <div className='flex lg:gap-3 lg:text-1xl md:gap-4 sm:gap-4 font-medium text-[#141115] '>
            <Link to='/booking'>{t('Find Space')}</Link>
            <Link to='/booking'>{t('List Space')}</Link>
          </div>

          <div className='flex lg:gap-3 lg:text-1xl md:gap-4 sm:gap-4 font-light '>
            <Link to='/about'>{t('About Us')}</Link>
            <Link to='/blog'>{t('Blog')}</Link>
            <Link to='/support'>{t('Support')}</Link>
            <Link to='/contact-us'>{t('Contact Us')}</Link>
          </div>
        </div>

        <div
          className='flex lg:justify-between lg:flex-row lg:items-center lg:gap-3 font-light md:justify-between md:items-center md:flex-row 
          md:gap-3 sm:justify-center sm:items-center sm:gap-3 sm:flex-col py-3'
        >
          <p className='text-black'>
            {' '}
            &#169; {new Date().getFullYear()}, TrySpacely, Inc
          </p>

          <div className='flex flex-row gap-4 ustify-center items-center'>
            <Link to='/privacy' className='underline'>
              {t('Privacy')}
            </Link>

            <Link to='/tandc' className='underline'>
              {t('Terms & Condition')}
            </Link>

            <Link to='/sitemap' className='underline'>
              {t('Site Map')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogFooter
