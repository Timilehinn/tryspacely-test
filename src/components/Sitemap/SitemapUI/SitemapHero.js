import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function SitemapHero() {
  const { t } = useTranslation()
  return (
    <div>
      <main
        className='lg:flex lg:flex-row lg:flex-col lg:justify-between lg:mx-14 lg:items-baseline
      lg:px-10 lg:py-10 md:flex md:justify-center md:flex-col sm:ml-4 w-full md:pt-5 sm:pt-4'
      >
        <div>
          <Link to='/' className=''>
            <h1 className='text-[#141115] lg:text-3xl  font-light sm:font-semibold  md:font-bold md:text-2xl md:pt-5 md:mb-5  sm:text-xl'>
              {t('TryBookings Site Map')}
            </h1>
          </Link>
        </div>

        <section className='flex flex-wrap gap-y-4 gap-x-56'>
          <div className='lg:-ml-0 '>
            <h1 className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-bold sm:font-base'>
              {t('Company')}
            </h1>

            <div className='circle-list lg:flex lg:flex-col  text-[#428BF9] py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-medium md:text-lg sm:text-base'>
              <Link to='/about'>
                <li> {t('About Us')}</li>{' '}
              </Link>
              <Link to='/blog'>
                <li> {t('Blog')} </li>
              </Link>
              {/*<Link to='/support'><li> {t("Support")}</li> </Link>*/}
            </div>
          </div>

          <div>
            <h1 className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-bold sm:font-medium'>
              {t('Support')}
            </h1>
            <div className='circle-list lg:flex lg:flex-col text-[#428BF9]  py-4 md:flex md:flex-col lg:text-base sm:flex sm:flex-col lg:font-medium md:text-lg sm:text-base'>
              <Link to='/helpcenter'>
                <li> {t('Help Center')}</li>{' '}
              </Link>
              {/*<Link to='/contact'><li> {t("Contact Us")}</li> </Link>*/}
              {/*<Link to='/cancel'><li> {t("Cancellation Option")}</li> </Link>*/}
            </div>
          </div>

          <div className='lg:ml-0'>
            <h1 className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-bold sm:font-medium'>
              {t('Space Owners')}
            </h1>

            <div className='circle-list lg:flex lg:flex-col text-[#428BF9] py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-medium md:text-lg sm:text-base'>
              <Link to='/listworkspace'>
                <li> {t('List Workspace')} </li>
              </Link>
              <Link to='/signup'>
                <li> {t('Sign Up')} </li>
              </Link>
              <Link to='/login'>
                <li> {t('Login')} </li>
              </Link>
            </div>
          </div>

          <div>
            <h1 className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-bold sm:font-medium'>
              {t('Reviews')}
            </h1>
            <div className='circle-list lg:flex lg:flex-col text-[#428BF9]  py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-medium md:text-lg sm:text-base'>
              {/* <Link to='/viewallreviews'><li> {t("view all Reviews")} </li></Link> */}
              {/*<Link to='/mostreviewed'><li> {t("Most Reviewed Spaces")}</li> </Link>*/}
              <Link to='/howitworks'>
                <li> {t('How It Works')} </li>
              </Link>
            </div>
          </div>

          <div className='w-full'>
            <h1 className='uppercase text-base lg:text-[#434144] lg:font-medium md:font-bold sm:font-medium'>
              {t('Search')}
            </h1>
            <div className='circle-list lg:flex lg:flex-col text-[#428BF9]  py-4 md:flex md:flex-col sm:flex-col lg:text-base lg:font-medium md:text-lg sm:text-base'>
              <Link to='/booking'>
                <li> {t('Search Workspaces')}</li>{' '}
              </Link>
              <Link to='/booking'>
                <li> {t('Search by City')} </li>
              </Link>
              <Link to='/booking'>
                <li> {t('Hottest Coding Space Nearby')} </li>
              </Link>
              <Link to='/booking'>
                <li> {t('Search by mentorship Opening')} </li>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
