import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const GetRequest = async (url:string, id?: string) => {
  return axios.get(`${API_URL}${url}/${id}`)
}

export const PostRequest = async (url:string, body: {}) => {
  return axios.post(`${API_URL}${url}`, body)
}

export const PutRequest = async (url:string, body: {} ) => {
  return axios.put(`${API_URL}${url}`, body)
}