import { ImageType } from './imageType'

export interface Image {
  imageUrl: string
  width: number
  height: number
  imageName: string
  fileSize: number
  sortOrder: number
  originalFileName: string
  representativeImage: boolean
  imageClassType: ImageType
}
