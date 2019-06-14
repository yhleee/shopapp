export interface UserInfoState {
  id: string
  name: string
  storeCode: string
}

const initialState: UserInfoState = {
  id: null,
  name: null,
  storeCode: null,
}

const FETCH = 'Layout/User/FETCH'
const RESET = 'Layout/User/RESET'

export const fetchUserInfo = () => dispatch => {
  const userInfo: UserInfoState = {
    id: 'vitokim',
    name: '김정환',
    storeCode: 'DB67',
  }
  dispatch({
    state: userInfo,
    type: FETCH,
  })
}

export const resetUserInfo = () => {
  return {
    type: RESET,
  }
}

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return action.state
    case RESET:
      return initialState
    default:
      return state
  }
}

export default userInfoReducer
