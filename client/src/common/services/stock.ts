import { axios } from 'common/utils'
import { StockSearchForm } from '../types/entities/store'

export const getStoreStockList = async (stockSearchForm: StockSearchForm) => {
  const response = await axios.get(
    `/api/stock/stores/list?goodsCode=${stockSearchForm.goodsCode}&distance=${stockSearchForm.distance}&address=${
      stockSearchForm.address
    }`,
  )
  return response && response.data
}

export const getStoreDetailInformation = async (storeCode: string) => {
  const response = await axios.get(`/api/stock/stores/detail/parser/${storeCode}`)
  return response && response.data
}
