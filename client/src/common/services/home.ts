import { axios } from 'common/utils'

export const getStoreNoticeList = async () => {
  const response = await axios.get(`/api/home/notice/store`)
  return response && response.data
}

export const getHomeMenuList = async () => {
  const response = await axios.get(`/api/home/menu`)
  return response && response.data
}
