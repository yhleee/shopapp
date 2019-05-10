import { Category, CategoryAttribute } from './category'
import { MenuType, SubVerticalType, VerticalType } from './generated'
import MenuAttribute from 'common/types/entities/generated/menuAttribute'
import { MenuEnv } from './menuEnv'

export interface Menu extends Category {
  id: string
  name: string
  alias: string
  vertical: VerticalType
  subVertical: SubVerticalType
  wholeIds: string[]

  type: MenuType
  envs: MenuEnv[]

  order: number
  used: boolean
  exposed: boolean
  deleted: boolean

  productCategories: string[]
  storeCategories: string[]
  brands: string[]
  channels: string[]
  attributes: CategoryAttribute[]
  tags: string[]
  productAttributes: MenuAttribute[]

  requestedProductCategories: string[]
  requestedStoreCategories: string[]
  requestedBrands: string[]
  requestedChannels: string[]
  requestedAttributes: CategoryAttribute[]
  requestedTags: string[]
  requestedProductAttributes: MenuAttribute[]

  urlPc: string
  urlMobile: string

  requestedSetting: boolean
  updatedSettingAt: Date
  completedSettingAt: Date
}
