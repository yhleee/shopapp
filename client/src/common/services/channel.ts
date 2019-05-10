import { ArrayUtils, axios } from 'common/utils'
import { Channel } from '../types/entities/channel'

export async function findAll(params = {}): Promise<Channel[]> {
  const response = await axios.get(`/api/channels`, { params })
  return response && response.data
}

export async function findById(id: string, params = {}): Promise<Channel> {
  const response = await axios.get(`/api/channels/${id}`, { params })
  return response && response.data
}

export async function findByIds(ids: string[], params = {}): Promise<Channel[]> {
  if (ArrayUtils.isEmpty(ids)) {
    return []
  }
  const response = await axios.get(`/api/channels`, {
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
  const response = await axios.get(`/api/channels/with-product-count/${ids.join(',')}`)
  return response && response.data
}
