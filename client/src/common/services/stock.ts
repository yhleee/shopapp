import { axios } from 'common/utils'

export const getStoreStockList = async (goodsCode: any) => {
  const response = await axios.get(`/api/stock/stores/list/${goodsCode}`)
  return response && response.data
}

export const getStoreDetailInformation = async (storeCode: string) => {
  const response = await axios.get(`/api/stock/stores/detail/parser/${storeCode}`)
  return response && response.data
}
