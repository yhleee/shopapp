import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { match } from 'react-router'
import { Button, message } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './ranking.scss'
import { SearchType } from 'common/types/enum/searchOptions'
import RankingCategory from './ranking_category'
import RankingAge from './ranking_age'
import RankingBrand from './ranking_brand'
import { CategoryFormResult, AgeFormResult, BrandFormResult } from 'common/types/entities/search'
import { getBrandInfo } from 'common/services/search_brand'
import { Brand } from 'common/types/entities/brand'
import { Link } from 'react-router-dom'
import {
  RankingSearchParamsState,
  resetRankingSearchParams,
  updateRankingSearchParams,
} from './ducks/rankingSearchParams'

interface OwnProps {
  cx?: DynamicCx
  match?: match
}

interface StateProps {
  rankingSearchParams: RankingSearchParamsState
}

interface DispatchProps {
  resetRankingSearchParams: typeof resetRankingSearchParams
  updateRankingSearchParams: typeof updateRankingSearchParams
}

interface OwnState {
  preSelectBrand: Brand
}

type Props = OwnProps & StateProps & DispatchProps

class Ranking extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      preSelectBrand: null,
    }
  }

  async componentDidMount() {
    const preSelectBrand = this.state.preSelectBrand
    const { match } = this.props
    const searchType = match.params['searchType']
    const brandName = match.params['brandName']
    const rankingSearchParams = this.props.rankingSearchParams
    rankingSearchParams.currentPageType = searchType
    this.props.updateRankingSearchParams(rankingSearchParams)
    if (searchType === SearchType.BRAND && brandName && !preSelectBrand) {
      const brandList = await getBrandInfo(brandName)
      if (brandList) {
        this.setState({ preSelectBrand: brandList[0] })
      }
    }
  }

  handleCategorySearchParams = (categorySearchParams: CategoryFormResult) => {
    const rankingSerchParams = this.props.rankingSearchParams
    rankingSerchParams.categorySearchParams = categorySearchParams
    this.props.updateRankingSearchParams(rankingSerchParams)
    console.log(this.props.rankingSearchParams)
  }

  handleAgeSearchParams = (ageSearchParams: AgeFormResult) => {
    const rankingSerchParams = this.props.rankingSearchParams
    rankingSerchParams.ageSearchParams = ageSearchParams
    this.props.updateRankingSearchParams(rankingSerchParams)
  }

  handleBrandSearchParams = (brandSearchParams: BrandFormResult) => {
    const rankingSerchParams = this.props.rankingSearchParams
    rankingSerchParams.brandSearchParams = brandSearchParams
    this.props.updateRankingSearchParams(rankingSerchParams)
  }

  isSearchable = () => {
    const { match } = this.props
    const { categorySearchParams, ageSearchParams, brandSearchParams } = this.props.rankingSearchParams
    const searchType = match.params['searchType']
    return (
      (searchType === SearchType.CATEGOTY && (categorySearchParams && categorySearchParams.firstCategoryId)) ||
      (searchType === SearchType.BRAND && (brandSearchParams && brandSearchParams.category)) ||
      (searchType === SearchType.AGE && (ageSearchParams && ageSearchParams.category))
    )
  }

  render() {
    const { cx, match } = this.props
    const searchType = match.params['searchType']
    const { preSelectBrand } = this.state
    return (
      <>
        <div>
          {searchType === SearchType.CATEGOTY && <RankingCategory handleParams={this.handleCategorySearchParams} />}
          {searchType === SearchType.AGE && <RankingAge handleParams={this.handleAgeSearchParams} />}
          {searchType === SearchType.BRAND && (
            <RankingBrand handleParams={this.handleBrandSearchParams} brand={preSelectBrand} />
          )}
        </div>
        {this.isSearchable() && (
          <div className={cx('button_search_wrap')}>
            <Link to="/app/ranking/products">
              <Button icon="search" type="primary" block href="javascript:void(0)">
                조회
              </Button>
            </Link>
          </div>
        )}
      </>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    rankingSearchParams: state.rankingSearchParams,
  }),
  {
    resetRankingSearchParams,
    updateRankingSearchParams,
  },
)(styling(s)(Ranking))
