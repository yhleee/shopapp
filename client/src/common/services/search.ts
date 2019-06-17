import { axios } from 'common/utils'
import { SearchForm } from '../types/entities/search'

export const getSearchProductList = async (searchForm: SearchForm, page: number) => {
  const response = await axios.get(
    `/api/search/product?searchword=${searchForm.searchword}&category=${searchForm.categoryId}&brand=${
      searchForm.brand
    }&benefit=${searchForm.benefit}&startValue=${searchForm.startValue}&endValue=${searchForm.endValue}&page=${page}`,
  )
  return response && response.data
}

export const getSearchBrandList = async (depth: string) => {
  const response = await axios.get(`/api/search/params/brand?searchword=${depth}`)
  return response && response.data
}
