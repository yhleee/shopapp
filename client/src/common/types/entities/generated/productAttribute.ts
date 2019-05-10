import { ProductAttributeValue } from './productAttributeValue'

export interface ProductAttribute {
  COLLECTION_NAME?: string
  serialVersionUID?: number
  id?: string
  name?: string
  order?: number
  values?: ProductAttributeValue[]
}
