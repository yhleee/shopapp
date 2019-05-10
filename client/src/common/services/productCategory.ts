import { axios, axiosFileDownload } from 'common/utils'
import { ProductCategory } from 'common/types'
import { AxiosResponse } from 'axios'
import { SubVerticalType } from '../types/entities/generated'

export async function findAll(params = {}): Promise<ProductCategory[]> {
  const response = await axios.get(`/api/product-categories`, { params })
  return response && response.data
}

export async function findById(id: string): Promise<ProductCategory> {
  const response = await axios.get(`/api/product-categories/${id}`)
  return response && response.data
}

export async function findByIds(ids: string[]): Promise<ProductCategory[]> {
  const response = await axios.get(`/api/product-categories`, {
    params: {
      ids: ids.join(','),
    },
  })
  return response && response.data
}

export async function findBySubVertical(subVertical: SubVerticalType): Promise<ProductCategory[]> {
  return findAll({ subVertical })
}

export async function findWholeCategoriesByIds(ids: string[], params = {}): Promise<ProductCategory[]> {
  const response = await axios.get(`/api/product-categories/whole-categories/${ids.join(',')}`, { params })
  return response && response.data
}

export async function findSubCategoriesById(id: string, params = {}): Promise<ProductCategory[]> {
  const response = await axios.get(`/api/product-categories/${id}/sub-categories`, {
    params,
  })
  return response && response.data
}

export async function findSubCategories(
  id: string,
  subVertical?: string,
  isDescendant: boolean = false,
): Promise<ProductCategory[]> {
  const response = await axios.get(`/api/product-categories/${id}/sub-categories`, {
    params: {
      subVertical,
      isDescendant,
    },
  })
  return response && response.data
}

export async function patch(id: string, values = {}): Promise<boolean> {
  const response = await axios.patch(`/api/product-categories/${id}`, values)
  return response && response.status === 200
}

export async function patchSubVerticals(categories: ProductCategory[]): Promise<ProductCategory> {
  const response = await axios.patch(`/api/product-categories/sub-verticals`, categories)
  return response && response.data
}

export async function downloadExcel(): Promise<AxiosResponse> {
  const response = await axiosFileDownload.get(`/api/product-categories/excel`)
  return response
}

export async function downloadExcelTemplate(): Promise<AxiosResponse> {
  const response = await axiosFileDownload.get(`/api/vertical-category-mapper/excel/template`)
  return response
}
