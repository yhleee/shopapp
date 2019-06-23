import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './search.scss'
import { match } from 'react-router'
import { SearchConditionParamsState } from './ducks/searchConditionParams'
import SearchList from './search_productlist'

interface OwnProps {
  cx?: DynamicCx
  match?: match
  location?: Location
}

interface StateProps {
  layoutTitle: LayoutTitleState
  searchConditionParams: SearchConditionParamsState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

interface OwnState {}
type Props = OwnProps & StateProps & DispatchProps

class SearchResult extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.updateLayoutTile('상품 검색')
  }

  render() {
    const { cx } = this.props

    return (
      <div>
        <div style={{ backgroundColor: '#eee', fontSize: 25, paddingLeft: 15, paddingTop: 10, paddingBottom: 10 }}>
          {this.props.searchConditionParams.searchForm.searchword ? (
            <>
              <span>
                검색어 : <strong>{this.props.searchConditionParams.searchForm.searchword}</strong>
              </span>
              <br />
            </>
          ) : (
            <></>
          )}
          {this.props.searchConditionParams.searchForm.categoryId ? (
            <>
              <span>카테고리 : {this.props.searchConditionParams.searchForm.categoryName}</span>
              <br />
            </>
          ) : (
            <></>
          )}
          {this.props.searchConditionParams.searchForm.brand ? (
            <>
              <span>브랜드 : {this.props.searchConditionParams.searchForm.brandName}</span>
              <br />
            </>
          ) : (
            <></>
          )}
          {this.props.searchConditionParams.searchForm.benefit ? (
            <>
              <span>혜택 : {this.props.searchConditionParams.searchForm.benefitName}</span>
              <br />
            </>
          ) : (
            <></>
          )}
          <span>
            가격대 :
            {this.props.searchConditionParams.searchForm.startValue === 0 &&
            this.props.searchConditionParams.searchForm.endValue === 200000 ? (
              <>전체</>
            ) : (
              <>
                {this.props.searchConditionParams.searchForm.startValue !== 0 ? (
                  <>{this.props.searchConditionParams.searchForm.startValue}원</>
                ) : (
                  <></>
                )}
                {
                  <>
                    ~
                    {this.props.searchConditionParams.searchForm.endValue !== 200000 ? (
                      <>{this.props.searchConditionParams.searchForm.endValue}원</>
                    ) : (
                      <>{this.props.searchConditionParams.searchForm.endValue}원 이상</>
                    )}
                  </>
                }
              </>
            )}
          </span>
        </div>
        <SearchList searchForm={this.props.searchConditionParams.searchForm} />
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    layoutTitle: state.layoutTitle,
    searchConditionParams: state.searchConditionParams,
  }),
  {
    updateLayoutTile,
  },
)(styling(s)(SearchResult))
