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
} from 'common/types/enum/searchOptions'

interface OwnProps {
  cx?: DynamicCx
  categorySearchParams?: CategoryFormResult
  ageSearchParams?: AgeFormResult
  brandSearchParams?: BrandFormResult
}

interface StateProps {
  layoutTitle: LayoutTitleState
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
    const { ageSearchParams, brandSearchParams, categorySearchParams, updateLayoutTile } = this.props
    if (ageSearchParams) updateLayoutTile('테마 RANKING')
    else if (brandSearchParams) updateLayoutTile('브랜드 RANKING')
    else if (categorySearchParams) updateLayoutTile('카테고리 RANKING')

    const productList = await getProductList(null)
    this.setState({ productList })
  }

  getSearchQuery = () => {
    const query = []
    const { ageSearchParams, brandSearchParams, categorySearchParams } = this.props
    if (ageSearchParams) {
      query.push(AgeGroupState.getAgeGroupState(ageSearchParams.age).text)
      query.push(GenderState.getGenderState(ageSearchParams.gender).text)
      query.concat(this.getCategorySearchQuery(ageSearchParams.category))
    } else if (brandSearchParams) {
      query.push(brandSearchParams.name)
      query.concat(this.getCategorySearchQuery(brandSearchParams.category))
    } else if (categorySearchParams) {
      query.concat(this.getCategorySearchQuery(categorySearchParams))
    }
    return query.join(' / ')
  }

  getCategorySearchQuery = (params: CategoryFormResult) => {
    const query = []
    query.push(SearchOptionRangeState.getSearchOptionRangeState(params.range).text)
    query.push(SearchOptionTermState.getSearchOptionTermState(params.term).text)
    params.firstCategoryName && query.push(params.firstCategoryName)
    params.secondCategoryName && query.push(params.secondCategoryName)
    params.thirdCategoryName && query.push(params.thirdCategoryName)
    return query.join
  }

  render() {
    const { cx } = this.props
    const { productList } = this.state
    const queryString = this.getSearchQuery()
    return (
      <>
        <div className={cx('message_wrap')}>
          {' '}
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
  }),
  {
    updateLayoutTile,
  },
)(styling(s)(RankingProductList))
