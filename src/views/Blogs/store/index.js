// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { addBlogApi, getBlogApi, editBlogApi, deleteBlogApi, getBlogBySlugApi } from '../../../services/Blog.service'
import { toastError, toastSuccess } from '../../../utility/toastutill'


export const getBlogs = createAsyncThunk('Blogs/getBlogs', async params => {
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
  const response = await getBlogApi(query)
  return {
    params,
    data: response.data.data,
    BlogsCount: response.data.BlogsCount
  }
})

export const getBlogsById = createAsyncThunk('Blogs/getBlogsById', async id => {
  try {
    const response = await getBlogBySlugApi(id)
    toastSuccess(response.data.message)
    return response.data.data
  } catch (error) {
    toastError(error)
    return error
  }
})

export const addBlogs = createAsyncThunk('Blogs/addBlogs', async (formData, { dispatch }) => {

  try {
    const res = await addBlogApi(formData)
    if (res.data) {
      toastSuccess(res.data.message)
      await dispatch(getBlogs())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const updateBlogs = createAsyncThunk('Blogs/updateBlogs', async (formData, { dispatch }) => {

  try {
    const res = await editBlogApi(formData.id, formData)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getBlogs())
    }

    return res.data.success ? res.data.success : false
  } catch (error) {
    toastError(error)
    return error
  }

})

export const deleteBlogs = createAsyncThunk('Blogs/deleteBlogs', async (id, { dispatch }) => {
  try {
    const res = await deleteBlogApi(id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getBlogs())
    }
    return id
  } catch (error) {
    toastError(error)
    return error
  }
})

export const BlogsSlice = createSlice({
  name: 'Blogs',
  initialState: {
    data: [],
    params: {},
    allData: [],
    selectedBlogs: null,
    success: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.BlogsCount
      })
      .addCase(getBlogsById.fulfilled, (state, action) => {
        state.selectedBlogs = action.payload
      })
      .addCase(addBlogs.fulfilled, (state, action) => {
        state.success = action.payload
      })
      .addCase(updateBlogs.fulfilled, (state, action) => {
        state.selectedBlogs = null
      })
  }
})

export default BlogsSlice.reducer
