import { StockSearchForm } from 'common/types/entities/store'

export interface StockSearchParamsState {
  stock: StockSearchForm
}

const initialState: StockSearchParamsState = {
  stock: {
    goodsCode: '',
    distance: '',
    address: '',
  },
}

const RESET = 'Layout/StockSearchParams/RESET'
const UPDATE = 'Layout/StockSearchParams/UPDATE'

export const resetStockSearchParams = () => {
  return {
    type: RESET,
  }
}

export const updateStockSearchParams = (stockSearchParams: StockSearchParamsState) => dispatch => {
  dispatch({
    state: stockSearchParams,
    type: UPDATE,
  })
}

const stockSearchParams = (state = initialState, action) => {
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

export default stockSearchParams
