import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  transactionsDetails: {},
  totalAmount:'---',
  totalReviews:{},
  mostVisited:{},
  chartData:[],
  currentChart:[]
}

export const insightSlice = createSlice({
    name:'insight',
    initialState,
    reducers: {
        setTransactionDetails: (state, action) => {
            state.transactionsDetails = action.payload
        },
        setTotalAmount: (state, action) => {
            state.totalAmount = action.payload
        },
        setTotalReviews: (state, action) => {
            state.totalReviews = action.payload
        },
        setMostVisited: (state, action) => {
            state.mostVisited = action.payload
        },
        setChartData: (state, action) => {
            state.chartData = action.payload
        }, 
        setCurrentChart: (state, action) => {
            state.currentChart = action.payload
        }
    }
})

export const {setTransactionDetails, setTotalAmount, setTotalReviews, setMostVisited, setChartData, setCurrentChart} = insightSlice.actions
export default insightSlice.reducer