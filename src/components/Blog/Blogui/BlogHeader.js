import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const BlogHeader = () => {
  const { t } = useTranslation()

  return (
    <div className=''>
      <div className='lg:flex lg:flex-col md:flex md:flex-col sm:flex sm:flex-col'>
        <Link
          to='/'
          className='bg-[#011936] text-white lg:px-14 lg:py-4 md:px-10 md:py-4
        sm:px-10 sm:py-4 '
        >
          {t('Back to TrySpacely')}
        </Link>

        <div
          className='lg:flex lg:justify-between lg:items-center lg:py-4 lg:px-14
          md:flex md:justify-between md:items-center md:py-4 md:px-10 sm:flex sm:justify-between
          sm:items-center sm:py-4 sm:px-10
         shadow-1fl text-xl bg-white'
        >
          <h1>Blog</h1>

          <div className='font-light lg:flex lg:space-x-10 md:flex md:space-x-5 sm:flex sm:space-x-5'>
            <p>
              {t('Blog Categories')}
              <span>
                <i className='fas fa-caret-down'></i>
              </span>
            </p>
            <div>
              <i className='fas fa-search'></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BlogHeader
