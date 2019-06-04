import { Product } from 'common/types/entities/product'

export interface ProductCompareState {
  currentProduct?: Product
  compareList?: Product[]
}

const initialState: ProductCompareState = {
  currentProduct: null,
  compareList: [],
}

const RESET = 'Product/ProductCompare/RESET'
const UPDATE = 'product/ProductCompare/UPDATE'

export const resetProductCompare = () => {
  return {
    type: RESET,
  }
}

export const updateProductCompare = (productCompare: ProductCompareState) => dispatch => {
  dispatch({
    state: productCompare,
    type: UPDATE,
  })
}

const productCompareReducer = (state = initialState, action) => {
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

export default productCompareReducer
