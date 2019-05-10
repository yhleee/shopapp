import { AxiosResponse } from 'axios'
import { axios, axiosFileDownload } from '../utils'

export async function fetchInspectionCounts(params: {}): Promise<Object[]> {
  const response = await axios.get(`/api/inspection-count/store-products`, {
    params,
  })
  return response && response.data
}

export async function excelInspectionCounts(params: {}): Promise<AxiosResponse> {
  const response = await axiosFileDownload.get(`/api/inspection-count/store-products/excel`, {
    params,
  })
  return response
}
