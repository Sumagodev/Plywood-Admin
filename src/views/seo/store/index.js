// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { addBlogApi, getBlogApi, editBlogApi, deleteBlogApi, getBlogBySlugApi } from '../../../services/Blog.service'
import { toastError, toastSuccess } from '../../../utility/toastutill'
import { addSeoApi, deleteSeoApi, editSeoApi, getSeoApi, getSeoBySlugApi } from '../../../services/Seo.service'


export const getSeo = createAsyncThunk('Seo/getSeo', async params => {
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
  const response = await getSeoApi(query)
  return {
    params,
    data: response.data.data,
    SeoCount: response.data.SeoCount
  }
})

export const getSeoById = createAsyncThunk('Seo/getSeoById', async id => {
  try {
    const response = await getSeoBySlugApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})

export const addSeo = createAsyncThunk('Seo/addSeo', async (formData, { dispatch }) => {

  try {
    const res = await addSeoApi(formData)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getSeo())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const updateSeo = createAsyncThunk('Seo/updateSeo', async (formData, { dispatch }) => {

  try {
    const res = await editSeoApi(formData.id, formData)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getSeo())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const deleteSeo = createAsyncThunk('Seo/deleteSeo', async (id, { dispatch }) => {
  try {
    const res = await deleteSeoApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getSeo())
    }
    return id
  } catch (error) {
    toastError(error)
    return error
  }
})

export const SeoSlice = createSlice({
  name: 'Seo',
  initialState: {
    data: [],
    params: {},
    allData: [],
    selectedSeo: null,
    success: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getSeo.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.SeoCount
      })
      .addCase(getSeoById.fulfilled, (state, action) => {
        state.selectedSeo = action.payload
      })
      .addCase(addSeo.fulfilled, (state, action) => {
        state.success = action.payload
      })
      .addCase(updateSeo.fulfilled, (state, action) => {
        state.selectedSeo = null
      })
  }
})

export default SeoSlice.reducer
