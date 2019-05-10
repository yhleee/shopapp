import { Attribute, Category } from './category'
import { SubVerticalType, Business, StoreCategoryType, Location } from './generated'
import { Image } from './image'

export interface StoreCategory extends Category {
  id: string
  parentId: string
  name: string
  used: boolean
  order: number
  exposureText: string
  alias: string
  attributes: Attribute[]
  subVerticals: SubVerticalType[]
  type: StoreCategoryType
  wholeIds: string[]
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
  usedAtFront?: boolean
  business?: Business
  location?: Location
  images?: Image[]
  slogan?: string
}
