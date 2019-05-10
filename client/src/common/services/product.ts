import { axios } from 'common/utils'
import Product from '../types/entities/product'
import { PageResponse } from '../types/entities/pageResponse'

export async function findById(id: string): Promise<Product> {
  const resposne = await axios.get(`/api/product/${id}`)
  return resposne && resposne.data
}

// todo: page관련 param은  interface로 변경 예정
export async function findBySubVertical(
  subVertical: string,
  page: number,
  size: number,
  sort: string,
): Promise<PageResponse<Product[]>> {
  const resposne = await axios.get(`/api/product`, {
    params: {
      subVertical,
      page,
      size,
      sort,
    },
  })

  if (resposne) {
    return {
      data: resposne.data,
      totalCount: Number(resposne.headers['x-total-count']),
    }
  }
  return {
    data: [],
    totalCount: 0,
  }
}
