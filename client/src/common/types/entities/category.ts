import { SubVerticalType } from './generated'

export const RootParentId = 0

export enum CategoryType {
  PRODUCT,
  STORE,
}

export interface Category {
  id: string
  parentId: string
  name: string
  subVerticals: SubVerticalType[]
  wholeIds: string[]
  children: Category[]

  updatedBy: string
  updatedAt: Date
}

export interface CategoryAttribute {
  id: string
  attributes: Attribute[]
}

export interface Attribute {
  id: string
  values: string[]
}
