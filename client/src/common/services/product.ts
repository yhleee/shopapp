import { axios } from 'common/utils'
import { Product, ProductSearchParam } from 'common/types/entities/product'

export const getProductDetailHtml = async (goodsCode: string) => {
  const response = await axios.get(`/api/product/detail/parser/${goodsCode}`)
  return response && response
}

export const getProductDetailHtmlByBarcode = async (barcode: string) => {
  const response = await axios.get(`/api/product/barcode/${barcode}`)
  return response && response
}

export const getProductList = async (params: any) => {
  // const response = await getProductDummyList()
  // return response && response
  const response = await axios.get('/api/rank/mainList')
  console.log(response)
  return response.data
}

const getProductDummyList = () => {
  return dummyProducts
}

const dummyProducts: ({
  brandName: string
  price: number
  imageUrl: string
  linkUrl: string
  rank: number
  id: string
  productName: string
})[] = [
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
  {
    id: 'A000000125839',
    brandName: '닥터자르트',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0012/A00000012583902ko.jpg?l=ko',
    linkUrl: 'http://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000125839&dispCatNo=90000010001',
    price: 39200,
    productName: '닥터자르트 바이탈 하이드라 솔루션 바이옴 에센스 150ml 기획',
    rank: 3,
  },
]

export const productSearchOnlineMall = async (params: ProductSearchParam) => {
  const response = await axios.post('/api/product/online/search', params)
  console.log(response)
  return response && response.data
}
