import { combineReducers } from 'redux'
import testCount, { TestCountState } from 'components/Test/ducks/test'

export interface RootState {
  testCount: TestCountState
}

export default combineReducers({
  testCount,
})
