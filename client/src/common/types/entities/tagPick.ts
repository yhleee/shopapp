import * as moment from 'moment'
import { Category, CategoryAttribute } from './category'
import { MenuType, SubVerticalType, VerticalType } from './generated'
import MenuAttribute from 'common/types/entities/generated/menuAttribute'

export interface TagPick {
  id: string
  name: string
  vertical: VerticalType
  subVertical: SubVerticalType
  recommendationTargets: string[]
  comment: string
  used: boolean
  showDate: moment.Moment[]

  verticals: VerticalType[]
  subVerticals: SubVerticalType[]
  productCategories: string[]
  storeCategories: string[]
  brands: string[]
  channels: string[]
  attributes: CategoryAttribute[]
  tags: string[]
  productAttributes: MenuAttribute[]

  exposureStartAt?: moment.Moment
  exposureEndAt?: moment.Moment
  updatedBy: string
  updatedAt: Date

  count?: number
}
