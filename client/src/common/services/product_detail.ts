import { axios } from 'common/utils'

export const getProductDetailHtml = async (pid: string) => {
  const response = await axios.get(`/api/product/detail/parser?pid=${pid}`)
  return response && response.data
}
