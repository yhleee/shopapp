export interface Product {
  id: string
  rank?: number
  productName: string
  brandName: string
  imageUrl: string
  linkUrl: string
  price: number
  volume?: string
}

export interface ProductCompareInfo {
  goodsCode: string
  goodsNo: String
  name: string
  brandName: string
  brandCode: string
  imageUrl: string
  price: string
  reviewPoint?: string
  reviewStarHtml?: string
  reviewPollHtml?: string
  volume?: string
}

export interface ProductDetailInfo extends ProductCompareInfo {
  html: string
}
