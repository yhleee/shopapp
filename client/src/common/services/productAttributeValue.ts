import { axios } from 'common/utils'
import ProductAttribute from 'common/types/entities/productAttribute'

export async function findByKeywordOfValueName(keyword: string, size: number): Promise<ProductAttribute[]> {
  const response = await axios.get(`/api/product-attributes/with-filtered-values`, {
    params: {
      keyword,
      size,
    },
  })
  return response && response.data
}

export async function findByValueId(valueId: string): Promise<ProductAttribute[]> {
  const response = await axios.get(`/api/product-attributes/with-filtered-values`, {
    params: { valueId },
  })
  return response && response.data
}

export async function findById(id: string, valueId: string): Promise<ProductAttribute> {
  const response = await axios.get(`/api/product-attributes/${id}`, { params: { valueId } })
  return response && response.data
}
