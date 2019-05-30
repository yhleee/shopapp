import * as React from 'react'
import { match } from 'react-router'
import { Button } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './ranking.scss'
import { SearchType } from 'common/types/enum/searchOptions'
import RankingCategory from './ranking_category'
import RankingAge from './ranking_age'
import RankingBrand from './ranking_brand'
import { CategoryFormResult, AgeFormResult } from 'common/types/entities/search'

interface OwnProps {
  cx?: DynamicCx
  match?: match
}

interface OwnState {
  categorySearchParams: CategoryFormResult
  ageSearchParams: AgeFormResult
}

type Props = OwnProps

class Ranking extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      categorySearchParams: {},
      ageSearchParams: {},
    }
  }

  componentDidMount() {}

  handleCategorySearchParams = (categorySearchParams: CategoryFormResult) => {
    this.setState({ categorySearchParams })
  }

  handleAgeSearchParams = (ageSearchParams: AgeFormResult) => {
    this.setState({ ageSearchParams })
  }

  handleSearchClick = () => {
    console.log(this.state)
  }

  render() {
    const { cx, match } = this.props
    const searchType = match.params['searchType']
    return (
      <>
        <div>
          {searchType === SearchType.CATEGOTY && <RankingCategory handleParams={this.handleCategorySearchParams} />}
          {searchType === SearchType.AGE && <RankingAge handleParams={this.handleAgeSearchParams} />}
          {searchType === SearchType.BRAND && <RankingBrand />}
        </div>
        <div className={cx('button_search_wrap')}>
          <Button icon="search" type="primary" block href="javascript:void(0)" onClick={this.handleSearchClick}>
            조회
          </Button>
        </div>
      </>
    )
  }
}

export default styling(s)(Ranking)
