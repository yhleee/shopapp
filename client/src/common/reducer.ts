import { combineReducers } from 'redux'
import testCount, { TestCountState } from 'components/test/ducks/test'
import layoutTitle, { LayoutTitleState } from 'components/Layout/ducks/LayoutTitle'
import layoutButton, { LayoutButtonState } from 'components/Layout/ducks/LayoutButton'

export interface RootState {
  testCount: TestCountState
  layoutTitle: LayoutTitleState
  layoutButton: LayoutButtonState
}

export default combineReducers({
  testCount,
  layoutTitle,
  layoutButton,
})
