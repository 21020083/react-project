// First we need to import axios.js
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import {
  RequestMethod,
  FilterParams,
  RequestError,
  ApiResponse,
} from './common'

const formatPrams = (params: FilterParams = {}) => {
  if (!params) return undefined
  const { page, limit, order, sort, ...otherParams } = params
  return {
    _page: page,
    _limit: limit,
    _order: order,
    _sort: sort,
    ...Object.keys(otherParams)
      .filter(
        (key) =>
          otherParams[key] !== null &&
          otherParams[key] !== undefined &&
          otherParams[key] !== '',
      )
      .reduce((obj: FilterParams, key) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = otherParams[key]
        return obj
      }, {}),
  }
}

// Next we make an 'instance' of it
const axiosInstance = axios.create({
  // .. where we make our configurations
  baseURL: 'http://127.0.0.1:8000/api', // Replace with your API's base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Where you would set stuff like your 'Authorization' header, etc ...
//instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// Also add/ configure interceptors && all the other cool stuff
axiosInstance.interceptors.response.use(
  function (response) {
    return response.data ? response.data : { statusCode: response.data }
  },
  function (error) {
    console.log('check error: ', error.name)
    console.log('check error: ', error.response)
    return Promise.reject(error)
  },
)

const baseRequest = async (
  url: string,
  method: RequestMethod,
  data: unknown = null,
  configs: AxiosRequestConfig = {},
) => {
  try {
    const response = await axiosInstance.request({
      ...configs,
      method,
      params: method === 'GET' && formatPrams(data as FilterParams),
      data: method !== 'GET' && data,
      url,
    })

    return response.data.data || response.data
  } catch (error) {
    const err = error as AxiosError
    const requestError: RequestError = {}
    if (err.response) {
      const responseData = err.response.data as ApiResponse<unknown>
      requestError.message = responseData.message
      requestError.errors = responseData.errors
    } else if (err.request) {
      requestError.message = err.message
    } else {
      requestError.message = err.message
    }

    return Promise.reject(requestError)
  }
}
 const sendRequest = (type: RequestMethod, apiUrl: string, data?: any, headers?: any) => {
  return axios({
      method: type,
      url: apiUrl,
      data: data,
      headers: {
          ...headers,
          contentType: "application/json",
          dataType: 'json',
          "Access-Control-Allow-Origin": "*",
      },
  })
}

export const apiUrl = "https://6699bdd69ba098ed61fd35aa.mockapi.io/users"

export  { baseRequest, axiosInstance, sendRequest }
