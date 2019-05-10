import * as HttpStatus from 'http-status-codes'
import { AxiosResponse } from 'axios'
import { axios, axiosFileDownload } from 'common/utils'
import { VerticalType, SubVerticalType } from 'common/types/entities/generated'
import { StoreMenu } from 'common/types/entities/storeMenu'

interface Params {
  vertical?: VerticalType
  subVertical?: SubVerticalType
  ids?: string[]
  descendant?: boolean
}

export const findAll = async (params: Params): Promise<StoreMenu[]> => {
  const { ids } = params
  const response = await axios.get('/api/store-menus', {
    params: {
      ...params,
      ids: ids && ids.join(','),
    },
  })
  return response && response.data
}

export const findById = async (id: string): Promise<StoreMenu> => {
  const response = await axios.get(`/api/store-menus/${id}`)
  return response && response.data
}

export const findSubMenusById = async (id: string, params: Params): Promise<StoreMenu[]> => {
  const response = await axios.get(`/api/store-menus/${id}/sub-menus`, {
    params,
  })
  return response && response.data
}

export const post = async (storeMenu: StoreMenu): Promise<StoreMenu> => {
  const response = await axios.post('/api/store-menus', storeMenu)
  return response && response.data
}

export const patch = async (storeMenu: StoreMenu): Promise<StoreMenu> => {
  const response = await axios.patch(`/api/store-menus/${storeMenu.id}`, storeMenu)
  return response && response.data
}

export const deleteById = async (id: string): Promise<boolean> => {
  const response = await axios.delete(`/api/store-menus/${id}`)
  return response && response.status === HttpStatus.OK
}

export async function downloadExcel(subVertical: SubVerticalType): Promise<AxiosResponse> {
  const response = await axiosFileDownload.get(`/api/store-menus/excel/${subVertical}`)
  return response
}
