// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addadvertisementbannersApi, deleteadvertisementbannersApi, getadvertisementbannersApi, getByIdApi, updateadvertisementbannersApi } from '../../../services/advertisementbanners.service'

// ** Axios Imports
import { toastError, toastSuccess } from '../../../utility/toastutill'


export const getadvertisementbanners = createAsyncThunk('advertisementbanners/getadvertisementbanners', async params => {
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
  const response = await getadvertisementbannersApi(query)
  return {
    params,
    data: response.data.data,
    totalCount: response.data.totalCount
  }
})

export const getadvertisementbannerssById = createAsyncThunk('advertisementbanners/getadvertisementbannerssById', async id => {
  try {
    const response = await getByIdApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})


export const addadvertisementbanners = createAsyncThunk('advertisementbanners/addadvertisementbanners', async (params, { dispatch }) => {
  try {
    const response = await addadvertisementbannersApi(params)
    toastSuccess(response.data.message)
    await dispatch(getadvertisementbanners())

    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})


export const updateHomepageBanner = createAsyncThunk('advertisementbanners/updateHomepageBanner', async (formData, { dispatch, getState }) => {

  try {
    const res = await updateadvertisementbannersApi(formData, formData.id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getadvertisementbanners())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const deleteadvertisementbanners = createAsyncThunk('advertisementbanners/deleteadvertisementbanners', async (id, { dispatch, getState }) => {
  try {
    const res = await deleteadvertisementbannersApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getadvertisementbanners())
    }
    return id
  } catch (error) {
    toastError(error)
    return error
  }
})


export const advertisementbannerslice = createSlice({
  name: 'advertisementbanners',
  initialState: {
    data: [],
    params: {},
    allData: [],
    selectedObj: null,
    success: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getadvertisementbanners.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.selectedObj = null
        state.total = action.payload.totalCount
      })
      .addCase(getadvertisementbannerssById.fulfilled, (state, action) => {
        state.selectedObj = action.payload
      })
      .addCase(addadvertisementbanners.fulfilled, (state, action) => {
        // state.selectedFlashSales = null
      })
      // .addCase(updateHomepageBanner.fulfilled, (state, action) => {
      //   state.selectedCategory = null
      // })
      .addCase(deleteadvertisementbanners.fulfilled, (state, action) => {
        state.selectedObj = null
      })
  }
})

export default advertisementbannerslice.reducer
