import { InspectionStatusType } from './product'
import { VerticalType } from './verticalType'
import { SubVerticalType } from './subVerticalType'

export interface StoreCategoryRelation {
  serialVersionUID?: number
  channelId?: string
  vertical?: VerticalType
  subVertical?: SubVerticalType
  inspectionStatus?: InspectionStatusType
  storeCategory?: any[]
}
