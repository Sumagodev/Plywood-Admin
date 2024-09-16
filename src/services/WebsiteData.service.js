import axios from "axios"
import axiosInstance from "./axios.service"

import BaseUrl from './url.service'

const serverUrl = `${BaseUrl}/websiteData`

export const AddWebsiteData = async (obj) => {
    return axiosInstance.post(`${serverUrl}/`, obj)
}

export const getWebsiteData = async () => {
    return axiosInstance.get(`${serverUrl}/`)
}
