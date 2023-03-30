import React, {
  useEffect,
  useLayoutEffect,
  useState,
  lazy,
  Suspense,
} from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-datepicker/dist/react-datepicker.css'
import 'antd/dist/antd.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-dater/dist/index.css'
import 'react-toggle/style.css'
import 'react-toastify/dist/ReactToastify.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-datepicker/dist/react-datepicker.css'

import useCookieHandler from './hooks/useCookieHandler'

// Dashbaord routes
import Sidebar from './components/Layout/Sidebar'
import Overview from './components/Overview/Overview'
import Workspaces from './components/Bookings/workspaces'
import SalesPersonDashboardHome from './components/Bookings/SalesPersonDashboardHome'
import BookedWorkspace from './components/Bookings/BookingsUI/bookedWorkspace'
import UnbookedWorkspace from './components/Bookings/BookingsUI/unbookedWorkspace'
import FavoriteWorkspace from './components/Bookings/favWorkspace'
import UserBookingDashboard from './components/Bookings/UserBookingDashboard'
import UserBookingsDetail from './components/Bookings/UserBookingsDetail'
import BookingsDashboard from './components/Bookings/booking'
import PeopleIndex from './components/people/people_outlet'
import People from './components/people/people'
import People_Details from './components/people/peopleUI/people_details'
import Insight from './components/Insight/Insight'
import UserReviews from './components/Insight/Reviews'
import Transaction from './components/Insight/Transaction'
import MstVstdPLc from './components/Insight/MstVstdPLc'
import Settings from './components/Settings/Settings'
import Profile from './components/Settings/Profile'
import LoginSecurity from './components/Settings/LoginSecurity'
import Notifications from './components/Notification/Notifications'
import Inbox from './components/Chat/Inbox'
import Page404 from './components/404/Page404'
import SpaceSurvey from './components/SurveyForm/Surveyform'
import ErrorPage from './components/ErrorPage/errorPage'
import InternalError from './components/ErrorPage/internalError'
import SpaceDetailForSalesPerson from './components/Bookings/SpaceDetailsForSalesPerson'
import AdminUsers from './components/Admin/Admin'
import User_Details from './components/Admin/userdetails'

// React lazy loading of components
const HomeComponent = lazy(() => import('./components/homepage/homepage'))
const LoginComponent = lazy(() => import('./components/Login/Login'))
const SignupComponent = lazy(() => import('./components/Signup/signupSteps'))
const ForgetPasswordComponent = lazy(() =>
  import('./components/ForgetPassword/ForgetPassword')
)
const ResetPasswordComponent = lazy(() =>
  import('./components/ForgetPassword/ResetPassword')
)
const AboutComponent = lazy(() => import('./components/aboutblog/About'))
const BlogComponent = lazy(() => import('./components/Blog/Blog'))
const BlogDetailsComponent = lazy(() =>
  import('./components/BlogDetails/BlogDetails')
)
const ContactPageComponent = lazy(() =>
  import('./components/ContactPage/ContactPage')
)
const BookIndexComponent = lazy(() => import('./pages/Booking'))
const BookListComponent = lazy(() => import('./pages/Booking/list'))
const HelpCenterComponent = lazy(() =>
  import('./components/HelpCenter/HelpCenter')
)
const SitemapComponent = lazy(() => import('./components/Sitemap/Sitemap'))
const ReviewsComponent = lazy(() => import('./components/Reviews/Reviews'))
const TermsComponent = lazy(() => import('./components/TandC/TandC'))
const SpaceDetailsComponent = lazy(() => import('./pages/Booking/space'))
const SpaceReviewComponent = lazy(() => import('./pages/Reviews'))
const PaymentComponent = lazy(() => import('./pages/Booking/payment'))
const PaymentSuccessfulComponent = lazy(() =>
  import('./components/payment-status')
)
const AddSpaceComponent = lazy(() =>
  import('./components/Add_Workspace/view/AddWorkspace')
)
const HowitWorkComponent = lazy(() =>
  import('./components/HowItWorks/HowItWorksUI/HowItWorksSetup')
)
const KYC = lazy(() => import('./components/KYC/kyc'))

function App() {
  const [user, setUser] = useState(null)
  const [isProtected, setIsProtected] = useState(true)
  const { token } = useCookieHandler('user_token')
  const [accountType, setAccountType] = useState(null)
  const { pathname } = useLocation()

  const exchangeTokenForId = async () => {
    if (!token) {
      return
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/retrieve-token`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        }
      )
      const data = await res.json()
      if (data?.status !== true) {
        alert('something went wrong. Seems you are not authenticated')
        return
      }
      setUser(data['data'])
      let userToFIll = {
        account_type: data?.data?.account_type.toString(),
      }

      setAccountType(data?.data?.account_type[0]?.user_type.type)
    } catch (error) {}
  }

  useLayoutEffect(() => {
    //Alternative to dynamic routing
    const splitLink = pathname.includes('%3F')
      ? pathname.split('%3F')
      : undefined
    if (splitLink) {
      const [path, query] = splitLink
      const [key, value] = query.split('%3D')
      const chk = [path, key]
      if (['/resetpassword', 'activation_code'].includes(...chk)) {
        setIsProtected(false)
      } else {
        setIsProtected(true)
      }
    }
  }, [pathname])

  useEffect(() => {
    exchangeTokenForId()
  }, [token])

  useEffect(() => {
    if (!user) return

    window.Tawk_API.onLoad = function () {
      window.Tawk_API.setAttributes(
        {
          name: `${user?.first_name} ${user?.last_name}`,
          email: user?.email,
        },
        function (error) {}
      )
    }
  }, [user])

  return (
    <main className='lg:w-full'>
      <Routes>
        <Route
          exact
          path='dashboard'
          element={
            <>
              {' '}
              <Sidebar />
              <Outlet />
            </>
          }
        >
          <Route
            path='/dashboard'
            element={
              accountType && accountType === 'Sales' ? (
                <SalesPersonDashboardHome />
              ) : (
                <Overview />
              )
            }
          />

          <Route path='spaces' element={<Workspaces />} />
          <Route path='spaces/booked' element={<BookedWorkspace />} />
          <Route path='spaces/unbooked' element={<UnbookedWorkspace />} />
          <Route path='fav-space' element={<FavoriteWorkspace />} />
          <Route path='user/bookings' element={<UserBookingDashboard />} />
          <Route path='user/bookings/:id' element={<UserBookingsDetail />} />
          <Route path='bookings' element={<BookingsDashboard />} />
          <Route path='people' element={<PeopleIndex />}>
            <Route index element={<People />} />
            <Route path=':id' element={<People_Details />} />
          </Route>
          <Route path='inbox' element={<Inbox />} />
          <Route path='settings' element={<Settings />} />
          <Route path='profile' element={<Profile />} />
          <Route path='login-security' element={<LoginSecurity />} />
          <Route path='notifications' element={<Notifications />} />

          {/* Owners Routes */}
          {accountType === 'Owner' && (
            <Route path='revenue' element={<Insight />} />
          )}
          {accountType === 'Owner' && (
            <Route path='revenue/transaction' element={<Transaction />} />
          )}
          {accountType === 'Owner' && (
            <Route path='revenue/reviews' element={<UserReviews />} />
          )}

          {/* Users routes */}
          {accountType === 'User' && (
            <Route path='expenses' element={<Insight />} />
          )}
          {accountType === 'User' && (
            <Route path='expenses/transaction' element={<Transaction />} />
          )}
          {accountType === 'User' && (
            <Route path='expenses/reviews' element={<UserReviews />} />
          )}
          {accountType === 'User' && (
            <Route path='expenses/visited-location' element={<MstVstdPLc />} />
          )}

          {/* Sales routes */}
          {accountType === 'Sales' && (
            <Route
              path='/dashboard/space-details/:id'
              element={<SpaceDetailForSalesPerson />}
            />
          )}

          <Route path='admin/allpeople' element={<AdminUsers />} />
          <Route path='admin/user/:id' element={<User_Details />} />
        </Route>

        <Route
          path='/'
          element={
            <Suspense fallback='Loading...'>
              <HomeComponent />
            </Suspense>
          }
        />
        <Route
          path='/login'
          element={
            <Suspense fallback='Loading...'>
              <LoginComponent />
            </Suspense>
          }
        />
        <Route
          path='/signup'
          element={
            <Suspense fallback='Loading...'>
              <SignupComponent />
            </Suspense>
          }
        />
        <Route
          path='/forgetpassword'
          element={
            <Suspense fallback='Loading...'>
              <ForgetPasswordComponent />
            </Suspense>
          }
        />
        {!isProtected && (
          <Route
            path={pathname}
            element={
              <Suspense fallback='Loading...'>
                <ResetPasswordComponent />
              </Suspense>
            }
          />
        )}

        <Route
          path='/about'
          element={
            <Suspense fallback='Loading...'>
              <AboutComponent />
            </Suspense>
          }
        />
        <Route
          path='/blog'
          element={
            <Suspense fallback='Loading...'>
              <BlogComponent />
            </Suspense>
          }
        />

        <Route
          path='/contact-us'
          element={
            <Suspense fallback='Loading...'>
              <ContactPageComponent />
            </Suspense>
          }
        />

        <Route
          path='/blogId'
          element={
            <Suspense fallback='Loading...'>
              <BlogDetailsComponent />
            </Suspense>
          }
        />
        <Route
          path='/booking'
          element={
            <Suspense fallback='Loading...'>
              <BookIndexComponent />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback='Loading...'>
                <BookListComponent />
              </Suspense>
            }
          />
          <Route
            path=':id'
            element={
              <Suspense fallback='Loading...'>
                <SpaceDetailsComponent />
              </Suspense>
            }
          />
          <Route
            path=':id/payment'
            element={
              <Suspense fallback='Loading...'>
                <PaymentComponent />
              </Suspense>
            }
          />
        </Route>
        <Route
          path='/booking/payment/status'
          element={
            <Suspense fallback='Loading...'>
              <PaymentSuccessfulComponent />
            </Suspense>
          }
        />
        <Route
          path='/space/:id/reviews'
          element={
            <Suspense fallback='Loading...'>
              <SpaceReviewComponent />
            </Suspense>
          }
        />
        <Route
          path='/howitworks'
          element={
            <Suspense fallback='Loading...'>
              <HowitWorkComponent />
            </Suspense>
          }
        />
        <Route
          path='/helpcenter'
          element={
            <Suspense fallback='Loading...'>
              <HelpCenterComponent />
            </Suspense>
          }
        />
        <Route
          path='/sitemap'
          element={
            <Suspense fallback='Loading...'>
              <SitemapComponent />
            </Suspense>
          }
        />
        <Route
          path='/viewallreviews'
          element={
            <Suspense fallback='Loading...'>
              <ReviewsComponent />
            </Suspense>
          }
        />
        <Route
          path='/tandc'
          element={
            <Suspense fallback='Loading...'>
              <TermsComponent />
            </Suspense>
          }
        />
        <Route
          path='/addspace'
          element={
            <Suspense fallback='Loading...'>
              <AddSpaceComponent />
            </Suspense>
          }
        />
        <Route path='/space/owner-kyc' element={<KYC />} />
        <Route path='*' element={<Page404 />} />
        <Route path='/space-review/:tranxId' element={<SpaceSurvey />} />
        <Route path='/500' element={<ErrorPage />} />
        <Route path='/400' element={<InternalError />} />
      </Routes>

      <ToastContainer />
    </main>
  )
}

export default App
