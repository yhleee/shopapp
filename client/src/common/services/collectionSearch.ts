import { AxiosResponse } from 'axios'
import { axios, axiosFileDownload } from 'common/utils'

export interface CollectionSearchParams {
  name: string
  queryParams: string[]
  fields?: string
}

const PARAMS_SEPARATOR = ';'

export const fetchCount = async (collectionSearchParams: CollectionSearchParams): Promise<number> => {
  const { name, queryParams } = collectionSearchParams
  const response = await axios.get(`/api/collections/${name}/count`, {
    params: {
      queryParams: queryParams.join(PARAMS_SEPARATOR),
    },
  })
  return response && response.data
}

export const downloadExcel = async (collectionSearchParams: CollectionSearchParams): Promise<AxiosResponse> => {
  const { name, queryParams, fields } = collectionSearchParams
  return await axiosFileDownload.get(`/api/collections/${name}/excel`, {
    params: {
      fields,
      queryParams: queryParams.join(PARAMS_SEPARATOR),
    },
  })
}
