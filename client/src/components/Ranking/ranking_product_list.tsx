import * as React from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './ranking.scss'
import { CategoryFormResult, AgeFormResult, BrandFormResult } from 'common/types/entities/search'
import { Product } from 'common/types/entities/product'
import { getProductList } from 'common/services/product'
import ProductList from 'components/Product/product_list'
import { ListType } from 'common/types/enum/exposeType'
import { LayoutTitleState, updateLayoutTile } from 'components/Layout/ducks/LayoutTitle'
import {
  SearchOptionRangeState,
  SearchOptionTermState,
  AgeGroupState,
  GenderState,
  SearchType,
} from 'common/types/enum/searchOptions'
import { RankingSearchParamsState } from './ducks/rankingSearchParams'

interface OwnProps {
  cx?: DynamicCx
}

interface StateProps {
  layoutTitle: LayoutTitleState
  rankingSearchParams: RankingSearchParamsState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

interface OwnState {
  productList: Product[]
}

type Props = OwnProps & StateProps & DispatchProps

class RankingProductList extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      productList: null,
    }
  }

  async componentDidMount() {
    const { rankingSearchParams, updateLayoutTile } = this.props
    const { currentPageType } = rankingSearchParams
    if (currentPageType === SearchType.AGE) updateLayoutTile('데모 RANKING')
    else if (currentPageType === SearchType.BRAND) updateLayoutTile('브랜드 RANKING')
    else if (currentPageType === SearchType.CATEGOTY) updateLayoutTile('카테고리 RANKING')

    const productList = await getProductList(null)
    this.setState({ productList })
  }

  getSearchQuery = () => {
    let result = null
    const rankingSearchParams = this.props.rankingSearchParams
    const { ageSearchParams, brandSearchParams, categorySearchParams, currentPageType } = rankingSearchParams
    if (currentPageType === SearchType.AGE) {
      const query = []
      query.push(AgeGroupState.getAgeGroupState(ageSearchParams.age).text)
      query.push(GenderState.getGenderState(ageSearchParams.gender).text)
      result = query.concat(this.getCategorySearchQuery(ageSearchParams.category))
    } else if (currentPageType === SearchType.BRAND) {
      const query = []
      query.push(brandSearchParams.name)
      result = query.concat(this.getCategorySearchQuery(brandSearchParams.category))
    } else if (currentPageType === SearchType.CATEGOTY) {
      result = this.getCategorySearchQuery(categorySearchParams)
    }
    return result.join(' / ')
  }

  getCategorySearchQuery = (params: CategoryFormResult) => {
    const query = []
    query.push(SearchOptionRangeState.getSearchOptionRangeState(params.range).text)
    query.push(SearchOptionTermState.getSearchOptionTermState(params.term).text)
    params.firstCategoryName && query.push(params.firstCategoryName)
    params.secondCategoryName && query.push(params.secondCategoryName)
    params.thirdCategoryName && query.push(params.thirdCategoryName)
    return query
  }

  render() {
    const { cx } = this.props
    const { productList } = this.state
    const queryString = this.getSearchQuery()
    return (
      <>
        <div className={cx('message_wrap')}>
          <Icon type="search" /> {queryString}
        </div>
        {productList && <ProductList list={productList} listType={ListType.RANKING} />}
      </>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    layoutTitle: state.layoutTitle,
    rankingSearchParams: state.rankingSearchParams,
  }),
  {
    updateLayoutTile,
  },
)(styling(s)(RankingProductList))
