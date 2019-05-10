import { Image } from '../types/entities/image'
import { PhotoInfraResponse } from '../types/entities/PhotoInfra'

export const convertImageToPhotoInfra = (image: Image): PhotoInfraResponse => {
  if (!image) return null

  const photo: PhotoInfraResponse = {
    url: image.imageUrl || '',
    fileName: image.originalFileName || '',
    fileSize: image.fileSize || 0,
    height: image.height || 0,
    width: image.width || 0,
    resultMessage: '',
  }

  return photo
}
