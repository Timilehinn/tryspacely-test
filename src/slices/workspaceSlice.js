import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  workspace: [],
  workspacesDetails: {
    id: 0,
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    description: '',
    available_space: 0,
    mentorship_available: 0,
    price: null,
    bookings: [],
    amenities: [],
    reviews: [],
    photos: [],
    category: 0,
  },
  totalSpaces: 0,
  spaceModal: false,
}

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspace: (state, action) => {
      state.workspace = action.payload
    },
    setWorkspaceDetails: (state, action) => {
      state.workspacesDetails = action.payload
    },
    setTotalSpaces: (state, action) => {
      state.totalSpaces = action.payload
    },
    setSpaceModal: (state, action) => {
      state.spaceModal = action.payload
    },
  },
})

export const { setWorkspace, setWorkspaceDetails, setTotalSpaces, setSpaceModal } = workspaceSlice.actions
export default workspaceSlice.reducer