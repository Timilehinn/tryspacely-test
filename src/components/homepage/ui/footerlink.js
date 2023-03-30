import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const FooterLinks = () => {
  const { t } = useTranslation()

  return (
    <section
      className='bg-[#000710] text-white lg:flex lg:flex-row lg:justify-between lg:px-10 lg:py-4 lg:items-center lg:mx-0 md:flex md:flex-col
    md:px-10 md:mx-auto md:justify-center md:items-center sm:flex sm:flex-col sm:justify-center sm:items-center sm:mx-auto sm:px-5 sm:py-4'
    >
      <div className='lg:flex lg:flex-row lg:gap-5 md:flex md:flex-col md:items-center md:justify-center sm:flex sm:flex-col sm:justify-center sm:items-center'>
        <p> &#169; {new Date().getFullYear()}, TrySpacely, Inc</p>
        <div className='lg:flex lg:gap-4 lg:px-5 lg:py-0 md:py-2 sm:py-2'>
          <Link to='/tandc' className='lg:px-2 md:px-2 sm:px-2'>
            {' '}
            {t('Terms & Condition')}{' '}
          </Link>
          <Link to='/sitemap' className='lg:px-2 md:px-2 sm:px-2'>
            {' '}
            {t('Site Map')}{' '}
          </Link>
        </div>
      </div>

      <div className='flex gap-4 items-center sm:mr-2 sm:mt-2'>
        <a href='/linkedin'>
          <i className='fa-brands fa-linkedin-square fa-2x'></i>
        </a>
        <a href='https://twitter.com/trybookinz' target={'_blank'}>
          <i className='fa-brands fa-twitter-square fa-2x'></i>
        </a>
        <a href='https://facebook.com/tryspacely' target={'_blank'}>
          <i className='fa-brands fa-facebook-square fa-2x'></i>
        </a>
        <a href='https://instagram.com/tryspacely' target={'_blank'}>
          <i className='fa-brands fa-instagram-square fa-2x'></i>
        </a>
      </div>
    </section>
  )
}

export default FooterLinks
