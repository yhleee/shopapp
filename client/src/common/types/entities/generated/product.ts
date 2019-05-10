import { Image } from './image'
import { ShoppingCategory } from './shoppingCategory'
import { ProductFlagType } from './productFlagType'
import { Channel } from './channel'
import { Tag } from './tag'
import { Brand } from './brand'
import { ProductAttribute } from './productAttribute'

export enum InspectionStatusType {
  UNINSPECTION = 'UNINSPECTION',
  NOTINSPECTION = 'NOTINSPECTION',
  COMPLETE = 'COMPLETE',
}

interface InspectionStatusConfig {
  text?: string
  displayCode?: string
}

type InspectionStatusConfigType = { [key in InspectionStatusType]: InspectionStatusConfig }

export const inspectionStatusConfig: InspectionStatusConfigType = {
  UNINSPECTION: {
    text: '검수대기',
    displayCode: 'WAIT',
  },
  NOTINSPECTION: {
    text: '검수불가',
    displayCode: 'SUSPENSION',
  },
  COMPLETE: {
    text: '검수승인',
    displayCode: 'ON',
  },
}

export interface Product {
  COLLECTION_NAME?: string
  serialVersionUID?: number
  id?: string
  name?: string
  displayCategory?: any[]
  productCategory?: any[]
  menus?: any[]
  goods?: string
  contentText?: string
  modelNumber?: string
  npay?: boolean
  best?: boolean
  flag?: ProductFlagType
  recommendSellerScore?: number
  viewCount?: number
  satisfactionPercent?: number
  salePrice?: number
  pcDiscountPrice?: number
  mobileDiscountPrice?: number
  pcDiscountRate?: number
  mobileDiscountRate?: number
  recentViewCount?: number
  recentFavoriteCount?: number
  recentSaleCount?: number
  totalSaleCount?: number
  totalReviewCount?: number
  popularScore?: number
  soldout?: boolean
  inspectionStatus?: InspectionStatusType
  channel?: Channel
  exposure?: boolean
  talkPay?: boolean
  presentContent?: string
  images?: Image[]
  barcodeImage?: Image
  brand?: Brand
  naverShoppingCategory?: ShoppingCategory
  tags?: Tag[]
  attributes?: ProductAttribute[]
  saleStartAt?: Date
  saleEndAt?: Date
  createdAt?: Date
  updatedAt?: Date
  martUpdatedAt?: Date
  inspectedAt?: Date
}
