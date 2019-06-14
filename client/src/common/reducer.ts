import { combineReducers } from 'redux'
import testCount, { TestCountState } from 'components/test/ducks/test'
import layoutTitle, { LayoutTitleState } from 'components/Layout/ducks/LayoutTitle'
import rankingSearchParams, { RankingSearchParamsState } from 'components/Ranking/ducks/rankingSearchParams'
import productCompare, { ProductCompareState } from 'components/Product/ducks/productCompare'
import userInfo, { UserInfoState } from 'components/Layout/ducks/UserInfo'

export interface RootState {
  testCount: TestCountState
  layoutTitle: LayoutTitleState
  rankingSearchParams: RankingSearchParamsState
  productCompare: ProductCompareState
  userInfo: UserInfoState
}

export default combineReducers({
  testCount,
  layoutTitle,
  rankingSearchParams,
  productCompare,
  userInfo,
})
