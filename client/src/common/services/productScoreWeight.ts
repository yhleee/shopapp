import { axios } from 'common/utils'
import ProductScoreWeight from '../types/entities/productScoreWeight'

export async function findAll(): Promise<ProductScoreWeight[]> {
  const resposne = await axios.get('/api/product-score-weight')
  return resposne && resposne.data
}

export async function findById(id: string): Promise<ProductScoreWeight> {
  const resposne = await axios.get(`/api/product-score-weight/${id}`)
  return resposne && resposne.data
}

export async function put(weight: ProductScoreWeight): Promise<ProductScoreWeight> {
  const resposne = await axios.put(`/api/product-score-weight/${weight.subVertical}`, weight)
  return resposne && resposne.data
}
