import axios from "axios"
import url from "./url.service"

export const getNewsLetter = async (query) => {
    return axios.get(`${url}/newsLetter/?${query}`)
}