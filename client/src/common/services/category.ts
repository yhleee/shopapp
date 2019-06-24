import { axios } from 'common/utils'

export const getCategoryList = async () => {
  const response = await axios.get(`/api/search/params/category`)
  return response && response.data
}
