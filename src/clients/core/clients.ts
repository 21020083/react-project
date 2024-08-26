import { AxiosRequestConfig } from 'axios'

import { baseRequest } from './axiosConfig'
const apiUrl = 'http://127.0.0.1:8000/api/users'
const client = {
  getUser: async (
    url: string,
    data: unknown = null,
    configs: AxiosRequestConfig = {},
  ) => {
    return baseRequest(url, 'GET', data, configs)
  },
  getUserById: async (
    id: string,
    data: unknown = null,
    configs: AxiosRequestConfig = {},
  ) => {
    return baseRequest(apiUrl + '/' + id, 'GET', data, configs)
  },

  postUser: async (data: unknown = null, configs: AxiosRequestConfig = {}) => {
    return baseRequest(apiUrl, 'POST', data, configs)
  },

  putUser: async (
    id: string,
    data: unknown = null,
    configs: AxiosRequestConfig = {},
  ) => {
    return baseRequest(apiUrl + '/update/' + id, 'PUT', data, configs)
  },

  deleteUser: async (id: number, configs: AxiosRequestConfig = {}) => {
    return baseRequest(apiUrl + '/delete/' + id, 'DELETE', null, configs)
  },
}

export default client
