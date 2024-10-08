import axiosInstance from './axios.service'
import BaseUrl from './url.service'
import axios from 'axios'

const serverUrl = `${BaseUrl}/product`

export const addProductApi = (formData) => {
  return axiosInstance.post(`${serverUrl}/`, formData)
}

export const getProductApi = (query) => {
  return axiosInstance.get(`${serverUrl}/?${query}`)
}

export const getByIdApi = (id) => {
  return axiosInstance.get(`${serverUrl}/getById/${id}`)
}

export const deleteProductApi = (id) => {
  return axiosInstance.delete(`${serverUrl}/deleteById/${id}`)
}

export const updateProductApi = (formData, id) => {
  return axiosInstance.patch(`${serverUrl}/updateById/${id}`, formData)
}


const serverUrl2 = `${BaseUrl}/productReview`


export const deleteReviewById = async (id) => {
    return axiosInstance.delete(`${serverUrl2}/deleteById/${id}`)
}


export const getReviewForProduct = async (query) => {
    return axiosInstance.get(`${serverUrl2}/getReviewForProduct?${query}`)
}
