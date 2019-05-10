import { Tag } from '../types/entities/tag'
import { axios } from '../utils'
import typeChecker from '../typeChecker'

export async function findAll(params = {}): Promise<Tag[]> {
  const response = await axios.get(`/api/tag-dictionary`, { params })
  return response && response.data
}

export async function findById(id: string, params = {}): Promise<Tag> {
  const response = await axios.get(`/api/tag-dictionary/${id}`, { params })
  return response && response.data
}

export async function findByIds(ids: string[], params = {}): Promise<Tag[]> {
  if (ids && ids.length > 0) {
    const response = await axios.get(`/api/tag-dictionary/${ids.join(',')}`, { params })
    console.log(response && (typeChecker.isArray(response.data) ? response.data : [response.data]))
    return response && (typeChecker.isArray(response.data) ? response.data : [response.data])
  }
  return []
}
