import { CategoryFormResult, AgeFormResult, BrandFormResult } from 'common/types/entities/search'
import { SearchType } from 'common/types/enum/searchOptions'

export interface RankingSearchParamsState {
  currentPageType: SearchType
  categorySearchParams?: CategoryFormResult
  ageSearchParams?: AgeFormResult
  brandSearchParams?: BrandFormResult
}

const initialState: RankingSearchParamsState = {
  currentPageType: null,
  categorySearchParams: null,
  ageSearchParams: null,
  brandSearchParams: null,
}

const RESET = 'Layout/RankingSearchParams/RESET'
const UPDATE = 'Layout/RankingSearchParams/UPDATE'

export const resetRankingSearchParams = () => {
  return {
    type: RESET,
  }
}

export const updateRankingSearchParams = (rankingSearchParams: RankingSearchParamsState) => dispatch => {
  dispatch({
    state: rankingSearchParams,
    type: UPDATE,
  })
}

const rankingSearchParamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.state,
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

export default rankingSearchParamsReducer
