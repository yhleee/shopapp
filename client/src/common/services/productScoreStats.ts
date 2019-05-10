import { axios } from 'common/utils'
import ProductScoreStats from '../types/entities/productScoreStats'

export async function findAll(): Promise<ProductScoreStats[]> {
  const resposne = await axios.get('/api/product-score-stats')
  return resposne && resposne.data
}

export async function findById(id: string): Promise<ProductScoreStats> {
  const resposne = await axios.get(`/api/product-score-stats/${id}`)
  return resposne && resposne.data
}
