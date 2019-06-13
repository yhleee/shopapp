import { axios } from 'common/utils'

export const getCategoryList = async () => {
  const response = await axios.get(`/api/category/search`)
  return response && response.data
}
