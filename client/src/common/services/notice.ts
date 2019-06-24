import { axios } from 'common/utils'
import { ShopNotice } from '../types/entities/notice'

export const getShopNotice = async (storeCode: string) => {
  const response = await axios.get(`/api/notice/shop/${storeCode}`)
  return response && response.data
}

export const putShopNotice = async (storeCode: string, text: string, userId: string) => {
  const params: ShopNotice = {
    text,
    strCd: storeCode,
    regUsrId: userId,
    modUsrId: userId,
  }
  const response = await axios.put('/api/notice/shop/insert', params)
  return response && response
}
