// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import { getAllUsersWithSubsciption } from '../../../../services/user.service'
import { toastError } from '../../../../utility/toastutill'
import { deleteUserRequirementstApi, getAllUserRequirements } from '../../../../services/UserRequirements.service'
import { getAllquickenqury, deletequickenqury } from '../../../../services/Quickrequiries.service'
export const getAllquickenquries = createAsyncThunk('appUsers/getAllquickenquries', async params => {
  try {
    let query = ``
    if (params.sort) {
      query = `sort=${params.sort}`
    }
    if (params.sortColumn) {
      query = `${query}&sortColumn=${params.sortColumn}`
    }
    if (params.q) {
      query = `${query}&q=${params.q}`
    }
    if (params.perPage) {
      query = `${query}&perPage=${params.perPage}`
    }
    if (params.page) {
      query = `${query}&page=${params.page}`
    }
    if (params.role) {
      query = `${query}&role=${params.role}`
    }
    if (params.hasActiveSubsctipion) {
      query = `${query}&hasActiveSubsctipion=${params.hasActiveSubsctipion}`
    }
    if (params.status) {
      query = `${query}&status=${params.status}`
    }

    if (params.startDate) {
      query = `${query}&startDate=${params.startDate}`
    }
    if (params.endDate) {
      query = `${query}&endDate=${params.endDate}`
    }
    console.log(params.showName, "params.showName")
    if (params.showName) {
      query = `${query}&showName=${params.showName}`
    }
    const response = await getAllquickenqury(query)
    return {
      params,
      data: response.data.data,
      totalPages: response.data.totalCounts
    }
  } catch (err) {
    toastError(err)
  }
})


export const deletequickenquries = createAsyncThunk(
  "appUsers/deleteById",
  async (id, { dispatch }) => {
    try {
      const res = await deletequickenqury(id)
      if (res.data.success) {
        toastSuccess(res.data.message)
        await dispatch(getAllquickenquries())
      }
      return id
    } catch (error) {
      toastError(error)
      return error
    }
  }
)
export const userRequirementSlice = createSlice({
  name: 'userRequirement',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllquickenquries.fulfilled, (state, action) => {
      state.data = action?.payload?.data
      state.total = action?.payload?.totalPages
    })
  }
})


export default userRequirementSlice.reducer
