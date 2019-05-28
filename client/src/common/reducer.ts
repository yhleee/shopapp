import { combineReducers } from 'redux'
import testCount, { TestCountState } from 'components/test/ducks/test'
import layoutTitle, { LayoutTitleState } from 'components/Layout/ducks/LayoutTitle'

export interface RootState {
  testCount: TestCountState
  layoutTitle: LayoutTitleState
}

export default combineReducers({
  testCount,
  layoutTitle,
})
