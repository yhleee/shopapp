import { axios } from 'common/utils'

export const getStoreStockList = async (goodsCode: string) => {
  const response = await axios.get(`/api/stock/getStockStoreList?goodsCode=${goodsCode}`)
  return response && response.data
}

export const getStoreDetailInformation = async (storeCode: string) => {
  const response = await axios.get(`/api/stock/detail/parser?storeId=${storeCode}`)
  return response && response.data
}
