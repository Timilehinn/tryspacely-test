import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allPeople: [],
  userDetails: [],
  totalPeople: 0,
  error: [],
  filterToggle: false,
  accountType: null,
}

export const adminAllUsers = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    setAllPeople: (state, action) => {
      state.allPeople = action.payload
    },
    setTotalPeople: (state, action) => {
      state.totalPeople = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload
    },
    setFilterToggle: (state, action) => {
      state.filterToggle = action.payload
    },
    setAccountType: (state, action) => {
      state.accountType = action.payload
    },
  },
})

export const {
  setAllPeople,
  setTotalPeople,
  setError,
  setUserDetails,
  setFilterToggle,
  setPaginate,
  setAccountType,
} = adminAllUsers.actions
export default adminAllUsers.reducer
