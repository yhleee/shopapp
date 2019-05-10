import { InspectionStatusType, Product } from './product'
import { RelationProductImageType } from './relationProductImageType'

export interface InspectionHistory {
  serialVersionUID?: number
  relationProductNo?: string
  inspectedAt?: Date
  inspectionStatus?: InspectionStatusType
  inspectorName?: string
  inspectorId?: string
  inspectionOpinion?: string
}

export interface RelationProductImage {
  serialVersionUID?: number
  imageUrl?: string
  width?: number
  height?: number
  type?: RelationProductImageType
  order?: number
}

export interface RelationProductView {
  id?: string
  type?: string
  category?: string
  channelName?: string
  representativeImage?: string
  images?: RelationProductImage[]
  imageHeight?: number
  imageWidth?: number
  title?: string
  createdAt?: Date
  inspectionStatus?: string
  inspectedAt?: Date
  inspectionOpinion?: string
  description?: string
  products?: Product[]
  representativeProductNo?: string
  recentInspectionCompleteHistory?: InspectionHistory
}
