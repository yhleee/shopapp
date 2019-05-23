export interface TestCountState {
  count: number
}

const initialState: TestCountState = {
  count: 0,
}

const FETCH = 'test/test/FETCH'
const RESET = 'test/test/reset'

export const fetch = (count: number) => dispatch => {
  if (!count) return

  dispatch({
    state: {
      count,
    },
    type: FETCH,
  })
}

export const reset = () => {
  return {
    type: RESET,
  }
}

const testCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
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

export default testCountReducer
