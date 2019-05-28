import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import { match } from 'react-router'
import { Product } from 'common/types/entities/product'
import ProductList from 'components/common/ProductList'
import { ListType } from 'common/types/enum/exposeType'

import * as s from './search.scss'

const apiUrl = '/api/search/searchList'

const searchProducts: Product[] = [
  {
    id: 'A000000125206',
    brandName: '삼성',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0012/A00000012520601ko.png?l=ko',
    linkUrl: 'http://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000125206',
    price: 159500,
    volume: '800g',
    productName: '갤럭시 버즈 블랙',
    rank: 1,
  },
  {
    id: 'A000000125267',
    brandName: '웰라쥬',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0012/A00000012526701ko.jpg?l=ko',
    linkUrl: 'http://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000125267',
    price: 17000,
    volume: '1kg',
    productName: '웰라쥬리얼히알루로닉 원데이키트 6개입 한정기획',
    rank: 2,
  },
]
interface OwnProps {
  cx?: DynamicCx
  match?: match
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

type Props = OwnProps & StateProps & DispatchProps

class SearchResult extends React.Component<Props, {}> {
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
          <span>
            검색어 : <strong>{this.props.match.params.searchword}</strong>
          </span>
          {this.props.match.params.category && this.props.match.params.category !== 'Nan' ? (
            <>
              <br />
              <span>카테고리 : {this.props.match.params.category}</span>
            </>
          ) : (
            <></>
          )}
          {this.props.match.params.brand && this.props.match.params.brand !== 'Nan' ? (
            <>
              <br />
              <span>브랜드 : {this.props.match.params.brand}</span>
            </>
          ) : (
            <></>
          )}
          {this.props.match.params.benefit && this.props.match.params.benefit !== 'Nan' ? (
            <>
              <br />
              <span>혜택 : {this.props.match.params.benefit}</span>
            </>
          ) : (
            <></>
          )}
          {
            <>
              <br />
              <span>
                가격대 :
                {this.props.match.params.priceStartVal === '0' && this.props.match.params.priceEndVal === '100000' ? (
                  <> 전체</>
                ) : (
                  <>
                    &nbsp;{this.props.match.params.priceStartVal}원 ~
                    {this.props.match.params.priceEndVal}원
                    {this.props.match.params.priceEndVal === '100000' ? <> 이상</> : <></>}
                  </>
                )}
              </span>
            </>
          }
        </div>
        <ProductList {...{ listType: ListType.SEARCH, list: searchProducts }} />
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
