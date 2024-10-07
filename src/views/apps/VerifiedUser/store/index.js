// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import { getAllverifiedusers, deleteverifiedusers } from '../../../../services/VerifiedUsers.service'
import { toastError, toastSuccess } from '../../../../utility/toastutill'

export const getAllquickenquries = createAsyncThunk(
  'appUsers/getAllquickenquries',
  async (params = {}) => { // Default to an empty object
    try {
      let query = ''
      if (params.sort) query += `sort=${params.sort}`
      if (params.sortColumn) query += `&sortColumn=${params.sortColumn}`
      if (params.q) query += `&q=${params.q}`
      if (params.perPage) query += `&perPage=${params.perPage}`
      if (params.page) query += `&page=${params.page}`
      if (params.role) query += `&role=${params.role}`
      if (params.hasActiveSubsctipion) query += `&hasActiveSubsctipion=${params.hasActiveSubsctipion}`
      if (params.status) query += `&status=${params.status}`
      if (params.startDate) query += `&startDate=${params.startDate}`
      if (params.endDate) query += `&endDate=${params.endDate}`
      if (params.showName) query += `&showName=${params.showName}`

      const response = await getAllverifiedusers(query)

      return {
        params,
        data: response.data.data,
        totalPages: response.data.totalCounts
      }
    } catch (err) {
      toastError(err.message || 'Something went wrong')
      throw err // rethrow the error to handle it in extraReducers
    }
  }
)

// ** Thunk to Delete Quick Enquiries
export const deletequickenquries = createAsyncThunk(
  'appUsers/deleteById',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await deleteverifiedusers(id)
      if (res.data.success) {
        toastSuccess(res.data.message || 'Deleted successfully')
        await dispatch(getAllquickenquries())  // Correct dispatch
      } 
      return id
    } catch (error) {
      toastError(error.message || 'Failed to delete')
      return rejectWithValue(error.response.data || error)
    }
  }
)

// ** Slice Definition
export const userRequirementSlice = createSlice({
  name: 'userRequirement',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null,
    success: false,
    isLoading: false,  // Added to track loading state
    error: null        // Added to track errors
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllquickenquries.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllquickenquries.fulfilled, (state, action) => {
        state.data = action.payload?.data
        state.total = action.payload?.totalPages
        state.isLoading = false
      })
      .addCase(getAllquickenquries.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to fetch data'
      })
      .addCase(deletequickenquries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletequickenquries.fulfilled, (state, action) => {
        state.data = state.data.filter(item => item.id !== action.payload)
        state.isLoading = false
      })
      .addCase(deletequickenquries.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to delete'
      })
  }
})

export default userRequirementSlice.reducer
