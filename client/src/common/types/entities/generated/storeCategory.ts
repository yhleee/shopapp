import { SalesTime } from './salesTime'

export enum StoreCategoryType {
  GROUP = 'GROUP',
  SEVERALTY = 'SEVERALTY',
  UNABLE_JOIN = 'UNABLE_JOIN',
}

interface StoreCategoryConfig {
  text?: string
}

type StoreCategoryConfigType = { [key in StoreCategoryType]: StoreCategoryConfig }

export const storeCategoryConfig: StoreCategoryConfigType = {
  GROUP: {
    text: '집합체',
  },
  SEVERALTY: {
    text: '단독',
  },
  UNABLE_JOIN: {
    text: '단독(가입불가)',
  },
}

export interface Business {
  businessNo?: string
  representativeName?: string
  tradeName?: string
  businessConditionName?: string
  businessTypeName?: string
  corporationRegistrationNo?: string
  biztalkChannelId?: string
  salesTime?: SalesTime
}

export interface Location {
  zipCode?: string
  baseAddress?: string
  roadNameAddress?: string
  detailAddress?: string
  massiveAddress?: string
  latitude?: number
  longitude?: number
}
