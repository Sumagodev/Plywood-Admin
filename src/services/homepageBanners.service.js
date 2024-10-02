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

// *************************


export const getHomePageBannerImageApi = (query) => {
  return axiosInstance.get(`${BaseUrl}/BannerImage/getbanner`)
}

export const addHomePageBannerImageApi = (formData) => {
  return axiosInstance.post(`${BaseUrl}/BannerImage/postbanner`, formData)
}

export const getByIdBannerApi = (id) => {
  return axiosInstance.get(`${BaseUrl}/BannerImage/getBannerImageById/${id}`)
}


export const updateBannersApi = (formData, id) => {
  return axiosInstance.put(`${BaseUrl}/BannerImage/updatebanner/${id}`, formData)
}

export const deleteBannersApi = (id) => {
  return axiosInstance.delete(`${BaseUrl}/BannerImage/deletebanner/${id}`)
}