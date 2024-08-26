// First we need to import axios.js
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  RequestMethod,
  FilterParams,
  RequestError,
  ApiResponse,
} from './common'
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../../lib/helpers'

let refreshTokenRequest: Promise<unknown> | null = null
let isTokenExpired = false

const IS_REFRESH_TOKEN = false
const Base_url = 'http://127.0.0.1:8000/api'
const noRefreshTokenPaths = ['/refresh-token', '/logout']

const formatPrams = (params: FilterParams = {}) => {
  if (!params) return undefined
  const { page, limit, order, sort, ...otherParams } = params
  return {
    page: page,
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
  baseURL: Base_url, // Replace with your API's base URL
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/** Refresh token */
const refreshTokenHandle = async (): Promise<string | undefined> => {
  try {
    const token = getRefreshToken()
    const res: AxiosResponse = await axios.get(`${Base_url}/refresh-token`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    })
    const access_token = res.data.access_token
    if (access_token) {
      setAccessToken(access_token)
    }
    // [TODO]: Set accessToken
    // [TODO]: Set refreshToken

    return access_token
  } catch (error) {
    removeAccessToken()
    removeRefreshToken()
    // [TODO]: Remove accessToken
    // [TODO]: Remove refreshToken
    return undefined
  }
}

/** Pre request */
axiosInstance.interceptors.request.use(
  async (config) => {
    const defaultToken = config.headers?.Authorization
      ? String(config.headers.Authorization)
      : undefined
    const accessToken = defaultToken || getAccessToken()
    if (accessToken)
      config.headers.setAuthorization(
        accessToken?.includes('Bearer') ? accessToken : `Bearer ${accessToken}`,
      )

    return config
  },
  async (error) => Promise.reject(error),
)

/** Pre response */
axiosInstance.interceptors.response.use(
  async (response) => Promise.resolve(response),
  async (error) => {
    const status = error?.response?.status
    const { url } = error.config
    const noRefreshTokenUrls = noRefreshTokenPaths

    if (noRefreshTokenUrls.includes(url)) return Promise.reject(error)

    if (status === 401 && IS_REFRESH_TOKEN) isTokenExpired = true

    const token = getRefreshToken()
    if (isTokenExpired && token) {
      refreshTokenRequest = refreshTokenRequest || refreshTokenHandle()

      const newToken = await refreshTokenRequest
      refreshTokenRequest = null
      isTokenExpired = false

      if (newToken)
        return axiosInstance.request({
          ...error.config,
          headers: {
            Authorization: newToken,
          },
        })
      return Promise.reject(error)
    }
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

const sendRequest = (
  type: RequestMethod,
  apiUrl: string,
  data?: any,
  headers?: any,
) => {
  return axios({
    method: type,
    url: apiUrl,
    data: data,
    headers: {
      ...headers,
      contentType: 'application/json',
      dataType: 'json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

export const apiUrl = 'https://6699bdd69ba098ed61fd35aa.mockapi.io/users'

export { baseRequest, axiosInstance, sendRequest }
