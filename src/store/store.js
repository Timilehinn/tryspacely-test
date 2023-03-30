import { configureStore } from '@reduxjs/toolkit'

import authRelatedSlice from '../slices/authRelated'
import filterOptionSlice from '../slices/filterOptions'
import particulesSlice from '../slices/particules'
import profileUpdateSlice from '../slices/profileUpdateSlice'
import insightSlice from '../slices/insightSlice'
import userBookingsSlice from '../slices/userBookingsSlice'
import accountRestorerSlice from '../slices/accountRestorer'
import workspaceSlice from '../slices/workspaceSlice'
import createWorkspaceSlice from '../slices/createWorkspaceSlice'
import surveySlice from '../slices/BookingSurvey'
import userReducerSlice from '../slices/userReducerSlice'
import admin_user from '../slices/admin_user'
import bookingSearch from '../slices/search_bookin'
import accountActivitiesSlice from '../slices/accountActivitiesSlice'

const reducer = {
  authrelated: authRelatedSlice,
  filteroptions: filterOptionSlice,
  particules: particulesSlice,
  profileUpdate: profileUpdateSlice,
  insight: insightSlice,
  userBookings: userBookingsSlice,
  accountRestorer: accountRestorerSlice,
  workspaces: workspaceSlice,
  createWorkspace: createWorkspaceSlice,
  survey: surveySlice,
  currentUser: userReducerSlice,
  adminPeople: admin_user,
  searchBookin: bookingSearch,
  activity: accountActivitiesSlice,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store
