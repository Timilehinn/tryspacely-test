import React, { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet'
import Zoom from 'react-reveal/Zoom'

const HeaderComponent = lazy(() => import('./ui/header'))
const HeroComponent = lazy(() => import('./ui/hero'))
const Workhero = lazy(() => import('./ui/worklocation'))
const CitiesComponent = lazy(() => import('./ui/cities'))
const TestimoniesComponent = lazy(() => import('./ui/testimonies'))
const MonetizationComponent = lazy(() => import('./ui/monetization'))
const FooterComponent = lazy(() => import('./ui/footer'))
const FooterlinkComponent = lazy(() => import('./ui/footerlink'))

const Homepage = () => {
  return (
    <div className='md:h-screen sm:h-screen'>
      <Helmet>
        <title>TrySpacely | Home</title>
        <meta
          name='description'
          content='We connect remote workers to affordable and safe working environment'
        />
        <meta
          name='keywords'
          content='workspace, rental, affordable space, remote working space, working space around you, monetize your workspace, co-working space,
           office space with internet, workspace login, workspace near me, workspaces in lagos, workspace meaning, workspace in yaba, workspace in ikeja, workspace.google.com login,
           workspaces in lekki, workspace table'
        />
      </Helmet>
      {/* <Suspense fallback={<p> Loading...</p>}> */}
        <HeaderComponent />
        <div className='relative'>
          <div className='home opacity-40'></div>
          <div className='home'>
            <HeroComponent />
          </div>
          <div className='home'>
            <Workhero />
          </div>
        </div>

        <Zoom>
          <CitiesComponent />
        </Zoom>

        <Zoom>
          {' '}
          <TestimoniesComponent />
        </Zoom>

        <Zoom>
          {' '}
          <MonetizationComponent />
        </Zoom>

        <Zoom>
          <FooterComponent />
          <FooterlinkComponent />
        </Zoom>
      {/* </Suspense> */}
    </div>
  )
}

export default Homepage
