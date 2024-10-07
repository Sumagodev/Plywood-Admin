import axios from "axios"
import axiosInstance from "./axios.service"
import BaseUrl from './url.service'

const serverUrl = `${BaseUrl}/VerifiedUser`

export const getAllverifiedusers = async (query) => {
    return axiosInstance.get(`${serverUrl}/getVerifiedUser`)
}

export const deleteverifiedusers = async (id) => {
  return axiosInstance.delete(`${serverUrl}/deleteById/${id}`)
}
