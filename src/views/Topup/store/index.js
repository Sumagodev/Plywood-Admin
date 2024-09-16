// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { addTopupApi, deleteTopupApi, getByIdApi, getTopupApi, updateTopupApi } from '../../../services/topup.service'
import { toastError, toastSuccess } from '../../../utility/toastutill'


export const getTopup = createAsyncThunk('Topup/getTopup', async params => {
  let query = ``
  if (params) {
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
    if (params.status) {
      query = `${query}&status=${params.status}`
    }
  }
  const response = await getTopupApi(query)
  return {
    params,
    data: response.data.data,
    TopupCount: response.data.TopupCount
  }
})

export const getTopupById = createAsyncThunk('Topup/getTopupById', async id => {
  try {
    const response = await getByIdApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})

export const addTopup = createAsyncThunk('Topup/addTopup', async (formData, { dispatch }) => {

  try {
    const res = await addTopupApi(formData)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getTopup())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const updateTopup = createAsyncThunk('Topup/updateTopup', async (formData, { dispatch }) => {

  try {
    const res = await updateTopupApi(formData, formData.id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getTopup())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const deleteTopup = createAsyncThunk('Topup/deleteTopup', async (id, { dispatch }) => {
  try {
    const res = await deleteTopupApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getTopup())
    }
    return id
  } catch (error) {
    toastError(error)
    return error
  }
})

export const TopupSlice = createSlice({
  name: 'Topup',
  initialState: {
    data: [],
    params: {},
    allData: [],
    selectedTopup: null,
    success: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getTopup.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.TopupCount
      })
      .addCase(getTopupById.fulfilled, (state, action) => {
        state.selectedTopup = action.payload
      })
      .addCase(addTopup.fulfilled, (state, action) => {
        state.success = action.payload
      })
      .addCase(updateTopup.fulfilled, (state, action) => {
        state.selectedTopup = null
      })
  }
})

export default TopupSlice.reducer
