// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { addBlogApi, getBlogApi, editBlogApi, deleteBlogApi, getBlogBySlugApi } from '../../../services/Blog.service'
import { toastError, toastSuccess } from '../../../utility/toastutill'
import { addBlogVideoApi, deleteBlogVideoApi, editBlogVideoApi, getBlogVideoApi, getBlogVideoBySlugApi } from '../../../services/BlogVideo.service'


export const getBlogVideo = createAsyncThunk('BlogVideo/getBlogVideo', async params => {
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
  const response = await getBlogVideoApi(query)
  return {
    params,
    data: response.data.data,
    BlogVideoCount: response.data.BlogVideoCount
  }
})

export const getBlogVideoById = createAsyncThunk('BlogVideo/getBlogVideoById', async id => {
  try {
    const response = await getBlogVideoBySlugApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})

export const addBlogVideo = createAsyncThunk('BlogVideo/addBlogVideo', async (formData, { dispatch }) => {

  try {
    const res = await addBlogVideoApi(formData)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getBlogVideo())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const updateBlogVideo = createAsyncThunk('BlogVideo/updateBlogVideo', async (formData, { dispatch }) => {

  try {
    const res = await editBlogVideoApi(formData.id, formData)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getBlogVideo())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const deleteBlogVideo = createAsyncThunk('BlogVideo/deleteBlogVideo', async (id, { dispatch }) => {
  try {
    const res = await deleteBlogVideoApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getBlogVideo())
    }
    return id
  } catch (error) {
    toastError(error)
    return error
  }
})

export const BlogVideoSlice = createSlice({
  name: 'BlogVideo',
  initialState: {
    data: [],
    params: {},
    allData: [],
    selectedBlogVideo: null,
    success: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getBlogVideo.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.BlogVideoCount
      })
      .addCase(getBlogVideoById.fulfilled, (state, action) => {
        state.selectedBlogVideo = action.payload
      })
      .addCase(addBlogVideo.fulfilled, (state, action) => {
        state.success = action.payload
      })
      .addCase(updateBlogVideo.fulfilled, (state, action) => {
        state.selectedBlogVideo = null
      })
  }
})

export default BlogVideoSlice.reducer
