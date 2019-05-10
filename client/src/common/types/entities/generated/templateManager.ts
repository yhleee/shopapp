import { VerticalType } from './verticalType'
import { SubVerticalType } from './subVerticalType'

export enum TemplateAttributeType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  LINK = 'LINK',
  COLOR = 'COLOR',
  SELECTOR = 'SELECTOR',
  VERTICAL = 'VERTICAL',
  STORE = 'STORE',
  BRAND = 'BRAND',
  TEXTAREA = 'TEXTAREA',
}

export interface Instance {
  id?: string
  templateId?: string
  order?: number
  activeStartAt?: Date
  activeEndAt?: Date
  updatedBy?: string
  updatedAt?: Date
  inspected?: boolean
  used?: boolean
  inspectedAt?: Date
  inspectedBy?: string
  data?: object
}

export interface InstanceAttribute {
  value?: object
  newWindow?: boolean
}

export interface Template {
  id?: string
  name?: string
  description?: string
  employeeNo?: string
  usedUserFilter?: boolean
  updatedAt?: Date
  updatedBy?: string
  used?: boolean
  pcPreviewUrl?: string
  mobilePreviewUrl?: string
  attributes?: TemplateAttribute[]
}

export interface TemplateAttribute {
  name?: string
  type?: TemplateAttributeType
  description?: string
  required?: boolean
  exposure?: boolean
  maxLength?: number
  width?: number
  height?: number
  size?: number
  hasMultipleValue?: boolean
  options?: TemplateAttributeOption[]
}

export interface TemplateAttributeOption {
  name?: string
  value?: string
}

export interface WindowSelector {
  vertical?: VerticalType
  subVertical?: SubVerticalType
  storeCategoryId?: string
  channelIds?: any[]
  all?: boolean
}
