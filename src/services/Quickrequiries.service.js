import axios from "axios"
import axiosInstance from "./axios.service"
import BaseUrl from './url.service'

const serverUrl = `${BaseUrl}/userRequirement`

export const getAllquickenqury = async (query) => {
    return axiosInstance.get(`${BaseUrl}/quickenqury/?${query}`)
}

export const deletequickenqury = async (id) => {
  return axiosInstance.delete(`${BaseUrl}/quickenqury/deleteById/${id}`)
}
