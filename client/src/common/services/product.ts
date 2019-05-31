import { axios } from 'common/utils'
import { Product } from 'common/types/entities/product'

export const getProductDetailHtml = async (pid: string) => {
  const response = await axios.get(`/api/product/detail/parser?pid=${pid}`)
  return response && response.data
}

export const getProductList = async (params: any) => {
  const response = await getProductDummyList()
  return response && response
}

const getProductDummyList = () => {
  return dummyProducts
}

const dummyProducts: Product[] = [
  {
    id: 'A000000125206',
    brandName: '삼성',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0012/A00000012520601ko.png?l=ko',
    linkUrl: 'http://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000125206',
    price: 159500,
    productName: '갤럭시 버즈 블랙',
    rank: 1,
  },
  {
    id: 'A000000125267',
    brandName: '웰라쥬',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0012/A00000012526701ko.jpg?l=ko',
    linkUrl: 'http://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000125267',
    price: 17000,
    productName: '웰라쥬리얼히알루로닉 원데이키트 6개입 한정기획',
    rank: 2,
  },
]