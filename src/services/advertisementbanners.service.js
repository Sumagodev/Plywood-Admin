import axiosInstance from './axios.service'
import BaseUrl from './url.service'
import axios from 'axios'

const serverUrl = `${BaseUrl}/BannerImage`

export const addadvertisementbannersApi = (formData) => {
  return axiosInstance.post(`${serverUrl}/`, formData)
}

export const getadvertisementbannersApi = (query) => {
  return axiosInstance.get(`${serverUrl}/getbanner`)
}

export const getByIdApi = (id) => {
  return axiosInstance.get(`${serverUrl}/getById/${id}`)
}

export const deleteadvertisementbannersApi = (id) => {
  return axiosInstance.delete(`${serverUrl}/deleteById/${id}`)
}

export const updateadvertisementbannersApi = (formData, id) => {
  return axiosInstance.patch(`${serverUrl}/updateById/${id}`, formData)
}

// *************************

