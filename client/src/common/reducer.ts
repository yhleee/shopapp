import { combineReducers } from 'redux'
import testCount, { TestCountState } from 'components/test/ducks/test'
import layoutTitle, { LayoutTitleState } from 'components/Layout/ducks/LayoutTitle'
import rankingSearchParams, { RankingSearchParamsState } from 'components/Ranking/ducks/rankingSearchParams'
import productCompare, { ProductCompareState } from 'components/Product/ducks/productCompare'
import searchConditionParams, { SearchConditionParamsState } from '../components/Search/ducks/searchConditionParams'
import stockSearchParams, { StockSearchParamsState } from '../components/Stock/ducks/stockSearchParams'
import surveyParams, { SurveyParamsState } from '../components/Survey/ducks/surveyParams'
import userInfo, { UserInfoState } from 'components/Layout/ducks/UserInfo'

export interface RootState {
  testCount: TestCountState
  layoutTitle: LayoutTitleState
  rankingSearchParams: RankingSearchParamsState
  searchConditionParams: SearchConditionParamsState
  stockSearchParams: StockSearchParamsState
  productCompare: ProductCompareState
  userInfo: UserInfoState
  surveyParams: SurveyParamsState
}

export default combineReducers({
  testCount,
  layoutTitle,
  rankingSearchParams,
  searchConditionParams,
  stockSearchParams,
  productCompare,
  userInfo,
  surveyParams,
})
