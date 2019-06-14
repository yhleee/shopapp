import { axios } from 'common/utils'

export const getCategoryList = async () => {
  const response = await axios.get(`/api/category/search`)
  // const response = await axios.get(`/api/search/params`)
  return response && response.data
}
