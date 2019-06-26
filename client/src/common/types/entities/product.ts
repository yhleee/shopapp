import { OnlineMallBenefit, OnlineMallGoodsSort } from '../enum/searchOptions'

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

export interface ProductSearchParam {
  query: string
  startCouont: number
  displayCateId: string
  cateId1: string
  cateId2: string
  cateId3: string
  sale_below_price: number
  sale_over_price: number
  goods_sort: OnlineMallGoodsSort
  brandCheck: string[]
  benefitCheck: OnlineMallBenefit[]
}
