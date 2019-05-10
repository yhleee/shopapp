import { ProductAttributeValue } from './productAttributeValue'

export default interface ProductAttribute {
  id: string
  name: string
  order: number
  values: ProductAttributeValue[]
}
