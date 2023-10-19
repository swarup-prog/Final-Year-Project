import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const GetRequest = async (url:string, config?: {}) => {
  return axios.get(`${API_URL}${url}`, config)
}

export const PostRequest = async (url:string, body: {}) => {
  return axios.post(`${API_URL}${url}`, body)
}

export const PutRequest = async (url:string, body: {} ) => {
  return axios.put(`${API_URL}${url}`, body)
}