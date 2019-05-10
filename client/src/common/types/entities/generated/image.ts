import { ImageClassType } from './imageClassType'

export interface Image {
  serialVersionUID?: number
  imageUrl?: string
  imageName?: string
  width?: number
  height?: number
  fileSize?: number
  sortOrder?: number
  originalFileName?: string
  representativeImage?: boolean
  imageClassType?: ImageClassType
}
