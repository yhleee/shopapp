import { Brand } from 'common/types/entities/brand'

export const getBrandInfo = async (name: string) => {
  const brand = await receiveDummyBrand()
  return brand && brand
}

const receiveDummyBrand = () => {
  const brand1: Brand = {
    id: '1',
    name: 'MAC',
    imageUrl: 'https://image.oliveyoung.co.kr/uploads/images/display/500000200100001/122/3862109024775009161.png',
  }
  const brand2: Brand = {
    id: '2',
    name: '크리니크',
    imageUrl: 'https://image.oliveyoung.co.kr/uploads/images/display/500000200080001/102/4891207789564048479.png',
  }
  const brand3: Brand = {
    id: '3',
    name: '에스티로더',
    imageUrl: 'https://image.oliveyoung.co.kr/uploads/images/display/500000200080001/102/5268320966382485058.png',
  }
  return [brand1, brand2, brand3]
}
