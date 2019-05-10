import ProductAttribute from './productAttribute'
import { Category } from './category'
import { SubVerticalType } from './generated'
import { Image } from './image'

export interface ProductCategory extends Category {
  id: string
  parentId: string
  name: string
  level: number
  isLeaf: boolean
  order: number
  deleted: boolean
  used: boolean
  isSmartStore: boolean
  wholeIds: string[]
  subVerticals: SubVerticalType[]
  attributes: ProductAttribute[]
  children: ProductCategory[]

  alias: string
  iconImage: Image

  banner: {
    pcTitle1: string
    pcTitle2: string
    pcImage: Image
    mobileTitle1: string
    mobileTitle2: string
    mobileImage: Image
  }
}
