import { ArrayUtils, axios } from 'common/utils'
import { Brand } from '../types/entities/brand'

export async function findAll(params = {}): Promise<Brand[]> {
  const response = await axios.get(`/api/brands`, { params })
  return response && response.data
}

export async function findById(id: string, params = {}): Promise<Brand> {
  const response = await axios.get(`/api/brands/${id}`, { params })
  return response && response.data
}

export async function findByIds(ids: string[], params = {}): Promise<Brand[]> {
  if (ArrayUtils.isEmpty(ids)) {
    return []
  }
  const response = await axios.get(`/api/brands`, {
    params: {
      ...params,
      ids: ids.join(','),
    },
  })
  return response && response.data
}

export async function findWithProductCount(ids: string[]) {
  if (ArrayUtils.isEmpty(ids)) {
    return []
  }
  const response = await axios.get(`/api/brands/with-product-count/${ids.join(',')}`)
  return response && response.data
}
