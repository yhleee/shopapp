import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { Row, Col } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './ranking.scss'
import { Product } from 'common/types/entities/product'
import ProductList from '../Product/product_list'
import { ListType } from 'common/types/enum/exposeType'
import { Link } from 'react-router-dom'
import { SearchType } from 'common/types/enum/searchOptions'
import { getProductList } from 'common/services/product'

interface OwnProps {
  cx?: DynamicCx
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

interface OwnState {
  categoryProductList: Product[]
  brandProductList: Product[]
  ageProductList: Product[]
}

type Props = OwnProps & StateProps & DispatchProps

class Ranking extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      categoryProductList: [],
      brandProductList: [],
      ageProductList: [],
    }
  }

  async componentDidMount() {
    this.props.updateLayoutTile('RANKING')
    const productList = await getProductList(null)
    if (productList) {
      this.setState({
        categoryProductList: productList,
        brandProductList: productList,
        ageProductList: productList,
      })
    }
  }

  render() {
    const { cx } = this.props
    const { categoryProductList, brandProductList, ageProductList } = this.state
    return (
      <div>
        <div className={cx('top_menu_wrap')}>
          <Row>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Link to={`/app/ranking/search/${SearchType.CATEGOTY}`}>
                <img src="/images/cosmetic_icon.png" />
                <br />
                <span>카테고리 별</span>
              </Link>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Link to={`/app/ranking/search/${SearchType.AGE}`}>
                <img src="/images/beauty_face_icon.png" />
                <br />
                <span>연령대 별</span>
              </Link>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <Link to={`/app/ranking/search/${SearchType.BRAND}`}>
                <img src="/images/shop_icon.png" />
                <br />
                <span>브랜드 별</span>
              </Link>
            </Col>
          </Row>
        </div>
        <div>
          <div className={cx('product_list_title')}>카테고리 별 RANKING</div>
          <ProductList {...{ listType: ListType.RANKING, list: categoryProductList }} />
          <div className={cx('product_list_title')}>연령대 & 성 별 RANKING</div>
          <ProductList {...{ listType: ListType.RANKING, list: ageProductList }} />
          <div className={cx('product_list_title')}>브랜드 별 RANKING</div>
          <ProductList {...{ listType: ListType.RANKING, list: brandProductList }} />
        </div>
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
)(styling(s)(Ranking))
