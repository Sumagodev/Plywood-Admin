import axiosInstance from './axios.service'
import BaseUrl from './url.service'
import axios from 'axios'

const serverUrl = `${BaseUrl}/homepageBanners`

export const addHomePageBannersApi = (formData) => {
  return axiosInstance.post(`${serverUrl}/`, formData)
}

export const getHomePageBannersApi = (query) => {
  return axiosInstance.get(`${serverUrl}/getHomePageBanners?${query}`)
}

export const getByIdApi = (id) => {
  return axiosInstance.get(`${serverUrl}/getById/${id}`)
}

export const deleteHomePageBannersApi = (id) => {
  return axiosInstance.delete(`${serverUrl}/deleteById/${id}`)
}

export const updateHomePageBannersApi = (formData, id) => {
  return axiosInstance.patch(`${serverUrl}/updateById/${id}`, formData)
}

