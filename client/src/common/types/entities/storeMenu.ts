import { SubVerticalType, VerticalType, LocationView, Location } from './generated'
import { Category } from './category'

export interface StoreMenu extends Category {
  id: string
  parentId: string
  name: string
  vertical: VerticalType
  subVertical: SubVerticalType
  wholeIds: string[]
  used: boolean
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string

  alias?: string
  order?: number

  location?: Location
  locationView?: LocationView

  storeCategories?: string[]
  channels?: string[]
}
