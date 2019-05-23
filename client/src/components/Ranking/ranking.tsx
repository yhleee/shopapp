import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { Row, Col } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './ranking.scss'

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
