import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <div className='bg-[#011936]'>
      <main
        className='lg:flex lg:flex-row lg:justify-between lg:items-baseline lg:mt-10 text-white lg:gap-6
      lg:px-10 lg:py-14 md:flex md:justify-center md:flex-col md:px-10 md:mt-10 sm:mt-10 sm:px-10 sm:py-10 '
      >
        <div>
          <Link to='/' className='w-1/6 '>
            <h1
              className='text-white lg:text-4xl font-bold md:font-bold md:text-2xl 
             sm:pt-4 lg:pt-0 md:mb-5 sm:text-2xl'
            >
              TrySpacely
            </h1>
          </Link>
        </div>

        <section className='lg:grid lg:grid-cols-3 gap-5 w-4/6 lg:-mt-1 md:grid md:grid-cols-2 sm:mt-4'>
          <div className='lg:py-0 md:py-4 sm:py-4'>
            <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
              {t('Search')}
            </h1>
            <div
              className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col 
              lg:text-base lg:font-light md:text-base sm:text-base'
            >
              <Link to='/booking'> {t('Search Spaces')} </Link>
              <Link to='/booking'> {t('Search by City')} </Link>
              <Link to='/booking'> {t('Hottest Coding Space Nearby')} </Link>
              <Link to='/booking'> {t('Search by mentorship Opening')} </Link>
            </div>
          </div>

          <div className='lg:-ml-0 lg:py-0 md:py-4 sm:py-4'>
            <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
              {t('Space Owners')}
            </h1>
            <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base '>
              <Link to='/booking'> {t('List Workspace')} </Link>
              <Link to='/signup'> {t('Sign Up')} </Link>
              <Link to='/login'> {t('Login')} </Link>
            </div>
          </div>

          <div className='lg:py-0 md:py-4 sm:py-4'>
            <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
              {t('Reviews')}
            </h1>
            <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
              {/* <Link to='/'> {t('View all Reviews')} </Link> */}
              <Link to='/howitworks'> {t('How It Works')} </Link>
            </div>
          </div>

          <div className='lg:py-0 md:py-4 sm:py-4'>
            <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
              {t('Company')}
            </h1>
            <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
              <Link to='/about'> {t('About Us')} </Link>
              <Link to='/blog'> {t('Blog')} </Link>
            </div>
          </div>

          <div className='lg:py-0 md:py-4 sm:py-4'>
            <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
              {t('Support')}
            </h1>
            <div className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col lg:text-base sm:flex sm:flex-col lg:font-light md:text-base sm:text-base'>
              <a href='https://tryspacely.tawk.help/' target={'_blank'}>
                {' '}
                {t('Help Center')}
              </a>
              <a href='https://tryspacely.tawk.help/' target={'_blank'}>
                {t('Support Center')}
              </a>
              <Link to={'/contact-us'}>Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Footer
