import * as React from 'react'
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

interface OwnProps {
  cx?: DynamicCx
  match?: match
}

interface OwnState {
  categorySearchParams: CategoryFormResult
  ageSearchParams: AgeFormResult
  brandSearchParams: BrandFormResult
  preSelectBrand: Brand
}

type Props = OwnProps

class Ranking extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      categorySearchParams: {},
      ageSearchParams: {},
      brandSearchParams: {},
      preSelectBrand: null,
    }
  }

  async componentDidMount() {
    const preSelectBrand = this.state.preSelectBrand
    const { match } = this.props
    const searchType = match.params['searchType']
    const brandName = match.params['brandName']
    if (searchType === SearchType.BRAND && brandName && !preSelectBrand) {
      const brandList = await getBrandInfo(brandName)
      if (brandList) {
        this.setState({ preSelectBrand: brandList[0] })
      }
    }
  }

  handleCategorySearchParams = (categorySearchParams: CategoryFormResult) => {
    this.setState({ categorySearchParams })
  }

  handleAgeSearchParams = (ageSearchParams: AgeFormResult) => {
    this.setState({ ageSearchParams })
  }

  handleBrandSearchParams = (brandSearchParams: BrandFormResult) => {
    this.setState({ brandSearchParams })
  }

  handleSearchClick = () => {
    if (!this.isSearchable()) {
      message.error('상품조회 조건을 완성 해 주세요.')
      return
    }
    this.context.router.push('/app/ranking/products')
  }

  isSearchable = () => {
    const { match } = this.props
    const { categorySearchParams, ageSearchParams, brandSearchParams } = this.state
    const searchType = match.params['searchType']
    return (
      (searchType === SearchType.CATEGOTY && categorySearchParams.firstCategoryId) ||
      (searchType === SearchType.BRAND && brandSearchParams.category) ||
      (searchType === SearchType.AGE && ageSearchParams.category)
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
            <Button icon="search" type="primary" block href="javascript:void(0)" onClick={this.handleSearchClick}>
              조회
            </Button>
          </div>
        )}
      </>
    )
  }
}

export default styling(s)(Ranking)
