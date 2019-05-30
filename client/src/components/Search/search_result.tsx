import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './search.scss'
import { match } from 'react-router'
import { Product } from 'common/types/entities/product'
import SearchList from './search_productlist'
import * as queryString from 'query-string'

interface OwnProps {
  cx?: DynamicCx
  match?: match
  location?: Location
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

interface OwnState {
  page: number
}
type Props = OwnProps & StateProps & DispatchProps

class SearchResult extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
    }
  }

  componentDidMount() {
    this.props.updateLayoutTile('상품 검색')
  }

  render() {
    const { cx, location } = this.props
    const { page } = this.state

    const queryParams = queryString.parse(location.search)
    console.log(queryParams)

    return (
      <div>
        <div style={{ backgroundColor: '#eee', fontSize: 25, paddingLeft: 15, paddingTop: 10, paddingBottom: 10 }}>
          {queryParams['searchword'] !== '' || queryParams['searchword'] ? (
            <>
              <span>
                검색어 : <strong>{queryParams['searchword']}</strong>
              </span>
              <br />
            </>
          ) : (
            <></>
          )}
          {queryParams['category'] !== '' || queryParams['category'] ? (
            <>
              <span>카테고리 : {queryParams['category']}</span>
              <br />
            </>
          ) : (
            <></>
          )}
          {queryParams['brand'] !== '' || queryParams['brand'] ? (
            <>
              <span>브랜드 : {queryParams['brand']}</span>
              <br />
            </>
          ) : (
            <></>
          )}
          {queryParams['benefit'] !== '' || queryParams['benefit'] ? (
            <>
              <span>혜택 : {queryParams['benefit']}</span>
              <br />
            </>
          ) : (
            <></>
          )}
          <span>
            {' '}
            가격대 :
            {queryParams['startValue'] === '0' && queryParams['endValue'] === '200000' ? (
              <>전체</>
            ) : (
              <>
                {queryParams['startValue'] !== '0' ? <>{queryParams['startValue']}원</> : <></>}
                {
                  <>
                    ~
                    {queryParams['endValue'] !== '200000' ? (
                      <>{queryParams['endValue']}원</>
                    ) : (
                      <>{queryParams['endValue']}원 이상</>
                    )}
                  </>
                }
              </>
            )}
          </span>
        </div>
        <SearchList searchQuery={queryParams['searchword']} page={page} />
      </div>
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
)(styling(s)(SearchResult))
