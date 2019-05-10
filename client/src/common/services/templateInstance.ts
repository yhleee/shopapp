import { axios } from 'common/utils'
import { Instance } from '../types/entities/generated'
import { PageResponse } from '../types/entities/pageResponse'

export async function getInstanceList(templateId: string, criteria): Promise<PageResponse<Instance[]>> {
  if (!templateId) return null
  const response = await axios.get(`/api/templates/${templateId}/instances`, {
    params: criteria,
  })

  if (response) {
    return {
      data: response.data,
      totalCount: Number(response.headers['x-total-count']),
    }
  }

  return {
    data: [],
    totalCount: 0,
  }
}

export async function getInstance(templateId: string, id: string): Promise<Instance> {
  if (!templateId || !id) return null
  const response = await axios.get(`/api/templates/${templateId}/instances/${id}`)
  return response && response.data
}

export async function postInstance(templateId: string, instance: Instance) {
  if (!templateId) return null
  const response = await axios.post(`/api/templates/${templateId}/instances/`, instance)
  return response && response.data
}

export async function putInstance(templateId: string, id: string, instance: Instance) {
  if (!templateId) return null
  const response = await axios.put(`/api/templates/${templateId}/instances/${id}`, instance)
  return response && response.data
}

export async function patchInspected(templateId: string, id: string, instance: Instance) {
  if (!templateId) return null
  const response = await axios.patch(`/api/templates/${templateId}/instances/${id}/inspect`, instance)
  return response && response.data
}

export async function deleteInstance(templateId: string, id: string) {
  const response = await axios.delete(`/api/templates/${templateId}/instances/${id}`)
  return response && response.data
}
