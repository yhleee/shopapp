import { Image } from './image'
import { InspectionStatusType } from './product'
import { VerticalType } from './verticalType'
import { ChannelAdditionalAttribute } from './channelAdditionalAttribute'
import { SubVerticalType } from './subVerticalType'
import { Brand } from './brand'
import { StoreCategoryRelation } from './storeCategoryRelation'
import { SalesTime } from './salesTime'

export interface Channel {
  COLLECTION_NAME?: string
  serialVersionUID?: number
  id?: string
  name?: string
  vertical?: VerticalType
  subVertical?: SubVerticalType
  inspectionStatus?: InspectionStatusType
  storeCategory?: any[]
  representativeImage?: Image
  additionalImages?: Image[]
  logoImage?: Image
  talkAccountId?: string
  talkExposedYn?: boolean
  descriptionContents?: string
  detailIntroductionContents?: string
  salesTime?: SalesTime
  bestShopYn?: boolean
  inspectionBypassYN?: boolean
  inquiryUseYN?: boolean
  additionalAttribute?: ChannelAdditionalAttribute
  communicationSalesNo?: string
  accountId?: string
  testChannelYn?: boolean
  createdAt?: Date
  updatedAt?: Date
  storeCategoryRelations?: StoreCategoryRelation[]
  alias?: string
  handleBrandNames?: any[]
  storeNaverMapUrl?: string
  storeNaverMapMobileUrl?: string
  recentlyUpdatedProductCount?: number
  representBrands?: Brand[]
}
