import ProductScoreAttributeWeight from './productScoreAttributeWeight'

export default interface ProductScoreWeight {
  subVertical: string
  totalView: number
  recentView: number
  recentZzim: number
  created: number
  satisfaction: number
  totalSale: number
  recentSale: number
  sale: number
  recentPublishedContent: number
  attributes: ProductScoreAttributeWeight[]
}
