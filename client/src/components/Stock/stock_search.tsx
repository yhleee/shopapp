import * as React from 'react'
import { Icon, Row, Col, Input, Divider } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './stock.scss'
import { match } from 'react-router'
import { History } from 'history'
import { StockSearchParamsState, resetStockSearchParams, updateStockSearchParams } from './ducks/stockSearchParams'
import { connect } from 'react-redux'
import { RootState } from '../../common/reducer'

interface OwnProps {
  cx?: DynamicCx
  match?: match
  goodsCode?: string
  history?: History
}

interface StateProps {
  stockSearchParams: StockSearchParamsState
}

interface DispatchProps {
  resetStockSearchParams: typeof resetStockSearchParams
  updateStockSearchParams: typeof updateStockSearchParams
}

type Props = OwnProps & StateProps & DispatchProps

interface OwnState {}

class StockSearch extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.stockSearchParams.stock.address = ''
    this.props.stockSearchParams.stock.distance = '30'
    this.props.stockSearchParams.stock.goodsCode = ''
  }

  onProductInputChange = e => {
    this.props.stockSearchParams.stock.goodsCode = e.target.value
    // this.setState({ ...this.state, searchWord: e.target.value })
  }

  onAddressInputChange = e => {
    this.props.stockSearchParams.stock.address = e.target.value
  }

  goListPage = () => {
    /* 개발서버 결과 확인용 코드 */
    this.props.stockSearchParams.stock.goodsCode = '8809535802408'
    this.props.history.push('/app/stock/list')
  }

  handleChange = e => {
    this.props.stockSearchParams.stock.distance = e.target.value
  }

  render() {
    const { cx } = this.props
    return (
      <>
        <div>
          {/* 시/군/구 입력 영역 */}
          <div className={cx('title')}>거리(km) / 구</div>
          <Row>
            <Col span={12}>
              <select className={cx('select-distance')} onChange={this.handleChange} defaultValue="30">
                <option className={cx('option')} value="30">
                  전체
                </option>
                <option className={cx('option')} value="1">
                  1km
                </option>
                <option className={cx('option')} value="3">
                  3km
                </option>
                <option className={cx('option')} value="5">
                  5km
                </option>
                <option className={cx('option')} value="10">
                  10km
                </option>
                <option className={cx('option')} value="20">
                  20km
                </option>
              </select>
            </Col>
            <Col span={12}>
              <input
                className={cx('input-address')}
                placeholder="ex)강남, 강남구"
                onChange={this.onAddressInputChange}
              />
            </Col>
          </Row>
          {/* 검색어 입력 영역 */}
          <div className={cx('title')}>상품코드</div>
          <Input
            placeholder="상품코드를 입력해주세요"
            suffix={
              <Icon
                onClick={() => (window.location.href = '/app/stock/barcode')}
                type="barcode"
                style={{ color: 'rgba(0,0,0,.45)', paddingRight: 20, fontSize: 50 }}
              />
            }
            onChange={this.onProductInputChange}
            style={{
              paddingRight: 20,
              paddingLeft: 20,
              fontSize: 50,
              height: '80px',
              lineHeight: '80px',
              marginBottom: '30px',
            }}
          />
        </div>
        <div className={cx('footer-wrap')} onClick={this.goListPage}>
          <div className={cx('search-button')}>조회</div>
        </div>
      </>
    )
  }
}
export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    stockSearchParams: state.stockSearchParams,
  }),
  {
    resetStockSearchParams,
    updateStockSearchParams,
  },
)(styling(s)(StockSearch))
