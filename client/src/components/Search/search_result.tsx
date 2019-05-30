import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './search.scss'
import { match } from 'react-router'
import { Product } from 'common/types/entities/product'
import ProductList from '../Product/product_list'
import { ListType } from 'common/types/enum/exposeType'
import * as queryString from 'query-string'

const searchProducts: Product[] = [
  {
    id: 'A000000125206',
    brandName: '삼성',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0012/A00000012520601ko.png?l=ko',
    linkUrl: 'http://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000125206',
    price: 159500,
    productName: '갤럭시 버즈 블랙',
    rank: 1,
  },
  {
    id: 'A000000125267',
    brandName: '웰라쥬',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0012/A00000012526701ko.jpg?l=ko',
    linkUrl: 'http://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000125267',
    price: 17000,
    productName: '웰라쥬리얼히알루로닉 원데이키트 6개입 한정기획',
    rank: 2,
  },
]
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

type Props = OwnProps & StateProps & DispatchProps

class SearchResult extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.updateLayoutTile('상품 검색')
  }

  render() {
    const { cx, match, location } = this.props
    const { params } = match

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
              {console.log('11111' + queryParams['benefit'] + '222')}
              <span>혜택1 : {queryParams['benefit']}</span>
              <br />
            </>
          ) : (
            <></>
          )}
          <span>
            {' '}
            가격대 :
            {queryParams['startValue'] === '0' && queryParams['endValue'] === '100000' ? (
              <>전체</>
            ) : (
              <>
                {queryParams['startValue'] !== '0' ? <>{queryParams['startValue']}원</> : <></>}
                {
                  <>
                    ~
                    {queryParams['endValue'] !== '100000' ? (
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
