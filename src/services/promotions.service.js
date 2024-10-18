import axiosInstance from './axios.service'
import BaseUrl from "./url.service"

const serverUrl = `${BaseUrl}/advertisement`


export const getAllPromotions = async (query) => {
    return axiosInstance.get(`${serverUrl}/?${query}`)
}

export const updatePromotion = (formData, id) => {
    return axiosInstance.patch(`${serverUrl}/updateById/${id}`, formData)
  }
  