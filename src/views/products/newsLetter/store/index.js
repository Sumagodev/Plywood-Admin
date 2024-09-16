// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import { getNewsLetter } from '../../../../services/newsLetter.service'
import { toastError } from '../../../../utility/toastutill'

export const getnewsLetters = createAsyncThunk('productnewsLetters/getnewsLetter', async params => {
  try {

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
      if (params.startDate) {
        query = `${query}&startDate=${params.startDate}`
      }

      if (params.endDate) {
        query = `${query}&endDate=${params.endDate}`
      }
    }

    const response = await getNewsLetter(query)
    return {
      params,
      data: response.data.data,
      totalPages: response.data.NewsLetterCount
    }

  } catch (error) {
    toastError(error)
    return []
  }
})

export const newsLettersSlice = createSlice({
  name: 'newsLetters',
  initialState: {
    newsLetter: [],
    total: 1,
    params: {},
    newsLetters: [],
    selectednewsLetter: null,
    success: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getnewsLetters.fulfilled, (state, action) => {
        state.newsLetter = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
  }
})

export default newsLettersSlice.reducer
