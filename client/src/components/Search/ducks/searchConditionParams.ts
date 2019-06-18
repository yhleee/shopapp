import { SearchForm } from 'common/types/entities/search'

export interface SearchConditionParamsState {
  searchForm: SearchForm
}

const initialState: SearchConditionParamsState = {
  searchForm: {
    searchword: '',
    categoryId: '',
    categoryName: '',
    brand: '',
    benefit: '',
    startValue: 0,
    endValue: 200000,
  },
}

const RESET = 'Layout/SearchConditionParams/RESET'
const UPDATE = 'Layout/SearchConditionParams/UPDATE'

export const resetSearchConditionParams = () => {
  return {
    type: RESET,
  }
}

export const updateSearchConditionParams = (searchConditionParams: SearchConditionParamsState) => dispatch => {
  dispatch({
    state: searchConditionParams,
    type: UPDATE,
  })
}

const searchConditionParams = (state = initialState, action) => {
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

export default searchConditionParams
