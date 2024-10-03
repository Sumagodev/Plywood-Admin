// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addHomePageBannerImageApi, deleteBannersApi, getHomePageBannerImageApi, getByIdBannerApi, updateBannersApi } from '../../../services/homepageBanners.service'

// ** Axios Imports
import { toastError, toastSuccess } from '../../../utility/toastutill'


export const getHomepageBanners = createAsyncThunk('HomepageBanners/getHomepageBanners', async params => {
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
  const response = await getHomePageBannerImageApi(query)
  return {
    params,
    data: response.data.bannerImages,
    totalCount: response.data.totalCount
  }
})

export const getHomepageBannerssById = createAsyncThunk('HomepageBanners/getHomepageBannerssById', async id => {
  try {
    const response = await getByIdBannerApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})


export const addHomepageBanners = createAsyncThunk('HomepageBanners/addHomepageBanners', async (params, { dispatch }) => {
  try {
    const response = await addHomePageBannerImageApi(params)
    toastSuccess(response.data.message)
    await dispatch(getHomepageBanners())

    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})


export const updateHomepageBanner = createAsyncThunk('HomepageBanners/updateHomepageBanner', async (formData, { dispatch, getState }) => {

  try {
    const res = await updateBannersApi(formData, formData.id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getHomepageBanners())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const deleteHomepageBanners = createAsyncThunk('HomepageBanners/deleteHomepageBanners', async (id, { dispatch, getState }) => {
  try {
    const res = await deleteBannersApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getHomepageBanners())
    }
    return id
  } catch (error) {
    toastError(error)
    return error
  }
})


export const HomepageBannerslice = createSlice({
  name: 'homepageBannersimges',
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
      .addCase(getHomepageBanners.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.selectedObj = null
        state.total = action.payload.totalCount
      })
      .addCase(getHomepageBannerssById.fulfilled, (state, action) => {
        state.selectedObj = action.payload
      })
      .addCase(addHomepageBanners.fulfilled, (state, action) => {
        // state.selectedFlashSales = null
      })
      // .addCase(updateHomepageBanner.fulfilled, (state, action) => {
      //   state.selectedCategory = null
      // })
      .addCase(deleteHomepageBanners.fulfilled, (state, action) => {
        state.selectedObj = null
      })
  }
})

export default HomepageBannerslice.reducer
