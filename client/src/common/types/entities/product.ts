import { Channel } from './channel'
import { Image } from './image'
import { Brand } from './brand'

export default interface Product {
  id: string

  name: string
  contentText: string
  modelNumber: string

  salePrice: number
  pcDiscountPrice: number
  mobileDiscountPrice: number

  npay: boolean
  best: boolean
  soldout: boolean
  exposure: boolean
  talkPay: boolean

  flag: string
  inspectionStatus: string

  channel: Channel
  images: Image[]
  brand: Brand

  viewCount: number
  satisfactionPercent: number
  recentSaleCount: number
  totalSaleCount: number
  totalReviewCount: number
  popularScore: number

  saleStartAt: Date
  saleEndAt: Date
  createdAt: Date
  updatedAt: Date
  martUpdatedAt: Date
  inspectedAt: Date
}
