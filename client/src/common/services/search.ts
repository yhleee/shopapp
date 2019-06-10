import { axios } from 'common/utils'

export const getSearchProductList = async (page: number) => {
  const response = await axios.get(`/api/search/product/${page}`)
  return response && response.data
}
