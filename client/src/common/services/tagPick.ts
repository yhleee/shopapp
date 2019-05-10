import * as HttpStatus from 'http-status-codes'
import { AxiosResponse } from 'axios'
import { axios, axiosFileDownload } from 'common/utils'
import { SubVerticalType, Product } from 'common/types/entities/generated'
import { ProductCategory } from '../types'
import { TagPick } from 'common/types/entities/tagPick'

export async function post(tagPick: TagPick): Promise<TagPick> {
  const response = await axios.post(`/api/tagpick`, tagPick)
  return response && response.data
}

export async function patch(tagPick: TagPick): Promise<TagPick> {
  const response = await axios.patch(`/api/tagpick/${tagPick.id}`, tagPick)
  return response && response.data
}

export async function fetch(searchParams): Promise<TagPick[]> {
  const response = await axios.get(`/api/tagpick`, { params: { ...searchParams } })
  return response && response.data
}

export async function downloadExcel(searchParams): Promise<AxiosResponse> {
  const response = await axios.get(`/api/tagpick/excel`, { params: { ...searchParams }, responseType: 'blob' })
  return response
}

export async function fetchById(id: string): Promise<TagPick> {
  const response = await axios.get(`/api/tagpick/${id}`)
  return response && response.data
}

export async function fetchByName(name: string): Promise<TagPick> {
  const response = await axios.get('/api/tagpick', { params: { name, nameMatch: 'overall' } })
  return response && response.data && response.data[0]
}

export async function deleteByIds(ids: string[]): Promise<boolean> {
  const response = await axios.delete('/api/tagpick', { data: ids })
  return response && response.status === HttpStatus.OK
}

export async function fetchProducts(id: string): Promise<Product[]> {
  const response = await axios.get(`/api/tagpick/${id}/products`)
  return response && response.data
}

export async function fetchSelectedProducts(id: string): Promise<Product[]> {
  const response = await axios.get(`/api/tagpick/${id}/selectedProducts`)
  return response && response.data
}

export async function fetchExcludedProducts(id: string): Promise<any> {
  const response = await axios.get(`/api/tagpick/${id}/excludedProducts`)
  return response && response.data
}

export async function postSelectedProducts(
  id: string,
  productIds: string[],
  excludedProductIds: string[],
): Promise<boolean> {
  const response = await axios.post(`/api/tagpick/${id}/selectedProducts`, {
    productIds,
    excludedProductIds,
  })
  return response && response.status === HttpStatus.OK
}
