import axiosInstance from './axios.service'
import BaseUrl from './url.service'
import axios from 'axios'

const serverUrl = `${BaseUrl}/topup`

export const addTopupApi = (formData) => {
    return axiosInstance.post(`${serverUrl}`, formData)
}

export const getTopupApi = (query) => {
    return axiosInstance.get(`${serverUrl}?${query}`)
}

export const getTopupWithSubscriberCountApi = (query) => {
    return axiosInstance.get(`${serverUrl}/getTopupWithSubscriberCountApi?${query}`)
}

export const getByIdApi = (id) => {
    return axiosInstance.get(`${serverUrl}/getById/${id}`)
}

export const deleteTopupApi = (id) => {
    return axiosInstance.delete(`${serverUrl}/deleteById/${id}`)
}

export const updateTopupApi = (formData, id) => {
    return axiosInstance.patch(`${serverUrl}/updateById/${id}`, formData)
}

