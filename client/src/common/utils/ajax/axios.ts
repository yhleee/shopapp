import originalAxios, { AxiosRequestConfig } from 'axios'
import handleError from './apiErrorHandler'
import { getBaseUrl } from './urlUtils'

export const axios = originalAxios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
})
axios.interceptors.response.use(null, error => {
  return handleError(error)
})

export const axiosFileDownload = originalAxios.create({
  baseURL: getBaseUrl(),
  responseType: 'blob',
})
axiosFileDownload.interceptors.response.use(null, error => {
  return handleError(error)
})

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  onErrorHttpStatuses?: number[]
}
