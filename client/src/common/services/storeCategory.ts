import { ArrayUtils, axios, axiosFileDownload } from 'common/utils'
import * as HttpStatus from 'http-status-codes'
import { StoreCategory } from 'common/types'
import { AxiosResponse } from 'axios'
import { SubVerticalType } from '../types/entities/generated'
import { ProductCategory } from '../types'

export async function findAll(params = {}): Promise<StoreCategory[]> {
  const response = await axios.get('/api/store-categories', { params })
  return response && response.data
}

export async function findByIds(ids: string[]): Promise<StoreCategory[]> {
  if (ArrayUtils.isEmpty(ids)) return []
  return findAll({
    ids: ids.join(','),
  })
}

export async function findBySubVertical(subVertical: SubVerticalType): Promise<StoreCategory[]> {
  return findAll({ subVertical })
}

export async function findById(id: string): Promise<StoreCategory> {
  const response = await axios.get(`/api/store-categories/${id}`)
  return response && response.data
}

export async function findWholeCategoriesByIds(ids: string[], params = {}): Promise<ProductCategory[]> {
  const response = await axios.get(`/api/store-categories/whole-categories/${ids.join(',')}`, { params })
  return response && response.data
}

export async function findSubCategoriesById(id: string, params = {}): Promise<ProductCategory[]> {
  const response = await axios.get(`/api/store-categories/${id}/sub-categories`, {
    params,
  })
  return response && response.data
}

export async function findSubCategories(
  id: string,
  subVertical?: string,
  isDescendant: boolean = false,
): Promise<StoreCategory[]> {
  const response = await axios.get(`/api/store-categories/${id}/sub-categories`, {
    params: {
      subVertical,
      isDescendant,
    },
  })
  return response && response.data
}

export async function patch(storeCategory: StoreCategory): Promise<StoreCategory> {
  const response = await axios.patch(`/api/store-categories/${storeCategory.id}`, storeCategory)
  return response && response.data
}

export async function patchSubVerticals(storeCategories: StoreCategory[]): Promise<StoreCategory> {
  const response = await axios.patch(`/api/store-categories/sub-verticals`, storeCategories)
  return response && response.data
}

export async function post(storeCategory: StoreCategory): Promise<StoreCategory> {
  const response = await axios.post(`/api/store-categories`, storeCategory)
  return response && response.data
}

export async function deleteById(id: string): Promise<boolean> {
  const response = await axios.delete(`/api/store-categories/${id}`)
  return response && response.status === HttpStatus.OK
}

export async function downloadExcel(subVertical: SubVerticalType): Promise<AxiosResponse> {
  const response = await axiosFileDownload.get(`/api/store-categories/excel/${subVertical}`)
  return response
}
