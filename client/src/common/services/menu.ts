import { axios, axiosFileDownload } from 'common/utils'
import * as HttpStatus from 'http-status-codes'
import { SubVerticalType } from '../types/entities/generated'
import { Menu } from '../types/entities/menu'
import { ProductCategory } from '../types'
import { AxiosResponse } from 'axios'

export async function findAll(params = {}): Promise<Menu[]> {
  const response = await axios.get(`/api/menus`, { params })
  return response && response.data
}

export async function findById(id: string): Promise<Menu> {
  const response = await axios.get(`/api/menus/${id}`)
  return response && response.data
}

export async function findByIds(ids: string[]): Promise<Menu[]> {
  const response = await axios.get(`/api/menus`, {
    params: {
      ids: ids.join(','),
    },
  })
  return response && response.data
}

export async function findWholeCategoriesByIds(ids: string[], params = {}): Promise<ProductCategory[]> {
  const response = await axios.get(`/api/menus/whole-menus/${ids.join(',')}`, { params })
  return response && response.data
}

export async function findBySubVertical(subVertical: SubVerticalType): Promise<Menu[]> {
  return findAll({ subVertical })
}

export async function findSubCategoriesById(id: string, params = {}): Promise<Menu[]> {
  const response = await axios.get(`/api/menus/${id}/sub-menus`, {
    params,
  })
  return response && response.data
}

export async function findSubCategories(
  id: string,
  subVertical?: SubVerticalType,
  isDescendant: boolean = false,
): Promise<Menu[]> {
  const response = await axios.get(`/api/menus/${id}/sub-menus`, {
    params: {
      subVertical,
      isDescendant,
    },
  })
  return response && response.data
}

export async function post(menu: Menu): Promise<Menu> {
  const response = await axios.post(`/api/menus`, menu)
  return response && response.data
}

export async function patch(menu: Menu): Promise<Menu> {
  const response = await axios.patch(`/api/menus/${menu.id}`, menu)
  return response && response.data
}

export async function deleteById(id: string): Promise<boolean> {
  const response = await axios.delete(`/api/menus/${id}`)
  return response && response.status === HttpStatus.OK
}

export async function requestSetting(id: string): Promise<boolean> {
  const response = await axios.patch(`/api/menus/${id}/requestSetting`)
  return response && (response.status === HttpStatus.OK || response.status === HttpStatus.CREATED)
}

export async function downloadExcel(subVertical: SubVerticalType): Promise<AxiosResponse> {
  const response = await axiosFileDownload.get(`/api/menus/excel/${subVertical}`)
  return response
}
