// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllPromotions, updatePromotion } from '../../../../services/promotions.service'

// ** Fetch promotions with query params
export const getPromotions = createAsyncThunk('Promotions/GetPromotions', async (params = {}) => {
  let query = ''
  if (params.q) query += `&q=${params.q}`
  if (params.perPage) query += `&perPage=${params.perPage}`
  if (params.page) query += `&page=${params.page}`
  if (params.status) query += `&status=${params.status}`

  const response = await getAllPromotions(query)
  return {
    params,
    data: response.data.data,
    promotionCount: response.data.AdvertisementsubscriptionCount
  }
})

// ** Update a specific promotion
export const updatePromotions = createAsyncThunk('advertisementbanners/updateHomepageBanner', async (formData, { dispatch }) => {
  try {
    const res = await updatePromotion(formData, formData.id)
    if (res.data.success) {
      toastSuccess(res.data.message)
      await dispatch(getPromotions())  // Fetch updated promotions
    }
    return res.data.success || false
  } catch (error) {
    toastError(error.message)
    return false
  }
})

// ** Promotions slice with initial state and async reducers
export const PromotionsSlice = createSlice({
  name: 'promotions',
  initialState: {
    data: [],
    params: {},
    allData: [],
    selectedPromotions: null,
    success: false
  },
  reducers: {
    // Define any needed reducers here (currently empty)
  },
  extraReducers: builder => {
    builder
      .addCase(getPromotions.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.promotionCount
      })
      // Ensure this action exists or remove it from extraReducers
      .addCase(updatePromotions.fulfilled, (state) => {
        state.selectedPromotions = null
      })
  }
})

export default PromotionsSlice.reducer
