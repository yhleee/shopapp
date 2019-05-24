import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { Row, Col } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './ranking.scss'
import RankingList from './ranking_list'
import { RankingProduct } from 'common/types/entities/product'

const rankingProducts: RankingProduct[] = [
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
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

type Props = OwnProps & StateProps & DispatchProps

class Ranking extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.updateLayoutTile('RANKING')
  }

  render() {
    const { cx } = this.props
    return (
      <div>
        <div className={cx('top_menu_wrap')}>
          <Row>
            <Col span={8} style={{ textAlign: 'center' }}>
              <img src="/images/cosmetic_icon.png" />
              <br />
              <span>카테고리 별</span>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <img src="/images/beauty_face_icon.png" />
              <br />
              <span>연령대 별</span>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <img src="/images/shop_icon.png" />
              <br />
              <span>브랜드 별</span>
            </Col>
          </Row>
        </div>
        <div>
          <div className={cx('product_list_title')}>카테고리 별 RANKING</div>
          <RankingList {...{ listContents: rankingProducts }} />
          <div className={cx('product_list_title')}>연령대 & 성별 별 RANKING</div>
          <RankingList {...{ listContents: rankingProducts }} />
          <div className={cx('product_list_title')}>브랜드 별 RANKING</div>
          <RankingList {...{ listContents: rankingProducts }} />
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
