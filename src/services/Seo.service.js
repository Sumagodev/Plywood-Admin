import axios from "axios"
import url from "./url.service"

const serverUrl = `${url}/seo`

export const addSeoApi = async (formData) => {
    return axios.post(`${serverUrl}/`, formData)
}

export const getSeoApi = async (query) => {
    return axios.get(`${serverUrl}/?${query}`)
}

export const editSeoApi = async (id, formData) => {
    return axios.patch(`${serverUrl}/updateById/${id}`, formData)
}

export const getSeoBySlugApi = async (id, formData) => {
    return axios.get(`${serverUrl}/getById/${id}`, formData)
}

export const deleteSeoApi = async (id) => {
    return axios.delete(`${serverUrl}/deleteById/${id}`)
}


export const getSeoBySlug = async (slug) => {
    return axios.get(`${serverUrl}/getById/:${slug}`)
}

