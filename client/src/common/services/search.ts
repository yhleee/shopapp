import { axios } from 'common/utils'

export const getSearchProductList = async (page: number) => {
  const response = await axios.get(`/api/search/selectSearchProductList/?page=${page}`)
  return response && response.data
}
