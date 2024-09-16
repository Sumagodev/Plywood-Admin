import axiosInstance from './axios.service'
import BaseUrl from './url.service'
import axios from 'axios'
const url = `${BaseUrl}/users`

export const loginApi = (formData) => {
    return axios.post(`${url}/login`, formData)
}

export const addUserApi = (formData) => {
    return axiosInstance.post(`${url}/addUser`, formData)
}


export const editUserApi = (formData, id) => {
    return axiosInstance.patch(`${url}/updateUserById/${id}`, formData)
}

export const getAllUsers = (query) => {
    return axiosInstance.get(`${url}/getAllUsers?${query}`)
}
export const getSalesUsersApi = (query) => {
    return axiosInstance.get(`${url}/getSalesUsers?${query}`)
}
export const getAllSalesReport = (query) => {
    return axiosInstance.get(`${url}/getAllSalesReport?${query}`)
}
export const getAllUsersWithSubsciption = (query) => {
    return axiosInstance.get(`${url}/getAllUsersWithSubsciption/?${query}`)
}

export const deleteUserById = (id) => {
    return axios.delete(`${url}/deleteUserById/${id}`)
}

export const getUserById = (id) => {
    return axios.get(`${url}/getUserById/${id}`)
}

export const approveUserById = (id, formData) => {
    return axios.patch(`${url}/approveUserById/${id}`, formData)
}

export const verifyUserById = (id, formData) => {
    return axios.patch(`${url}/verifyUserById/${id}`, formData)
}

export const blockUserById = (id, formData) => {
    return axios.patch(`${url}/blockUserById/${id}`, formData)
}

export const refreshTokenApi = (formData) => {
    return axios.post(`${url}/refresh-token`, formData)
}