import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  textState: {
    id: '1',
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    gender: '',
    date_of_birth: '',
    language: '',
    interest: '',
    phone_number: '',
    account_type: '',
    role: '',
    position: '',
    stacks: '',
    github: '',
    company: '',
    photo: '',
    new_password: '',
    old_password: '',
  },

  passwordChange: {
    new_password: '',
    old_password: '',
  },
}

export const profileUpdateSlice = createSlice({
  name: 'profileUpdate',
  initialState,
  reducers: {
    setTextState: (state, action) => {
      state.textState = action.payload
    },

    setPasswordChange: (state, action) => {
      state.signUpBody = action.payload
    },
  },
})

export const getTextState = (state) => state.profileUpdate.textState
export const getPasswordChange = (state) => state.profileUpdate.textState

export const { setTextState, setPasswordChange } = profileUpdateSlice.actions
export default profileUpdateSlice.reducer
