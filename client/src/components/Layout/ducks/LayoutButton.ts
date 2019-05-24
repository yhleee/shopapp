export interface LayoutButtonState {
  title: string
  url: string
}

const initialState: LayoutButtonState = {
  title: null,
  url: null,
}

const FETCH = 'Layout/LayoutButton/FETCH'
const RESET = 'Layout/LayoutButton/RESET'
const UPDATE = 'Layout/LayoutButton/UPDATE'

export const fetchLayoutButton = () => {
  return {
    type: FETCH,
  }
}

export const resetLayoutButton = () => {
  return {
    type: RESET,
  }
}

export const updateLayoutButton = (title: string, url: string) => dispatch => {
  if (!title) return

  dispatch({
    state: {
      title,
      url,
    },
    type: UPDATE,
  })
}

const LayoutButtonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return state
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

export default LayoutButtonReducer
