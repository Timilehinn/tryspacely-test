import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   userBookings:{},
   userBookingDetails:{}
  }

  export const userBookingsSlice = createSlice({
    name:'userBookings',
    initialState,
    reducers: {
        setUserBookings: (state, action) => {
            state.userBookings = action.payload
        },
        setUserBookingDetails: (state, action) => {
            state.userBookingDetails = action.payload
        }
    }
})

export const {setUserBookings, setUserBookingDetails} = userBookingsSlice.actions
export default userBookingsSlice.reducer

