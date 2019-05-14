import { ArrayUtils, axios } from 'common/utils'
import { response } from 'express'

export const getSelectiveDatas = async () => {
  const apiUrl = 'http://localhost:9090/api/test/selective'
  const response = await axios.get(apiUrl)
  return response && response.data
}
