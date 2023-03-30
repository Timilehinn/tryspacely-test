import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle',
  error: [],
}

const createWorkspace = createSlice({
  name: 'createWorkspace',
  initialState,
  reducers: {
    setErrors: (state, action) => {
      state.error = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
  },
})

export const { setErrors, setStatus } = createWorkspace.actions

export default createWorkspace.reducer
