import * as React from 'react'
import { Icon, Row, Col, Input, Divider } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './stock.scss'
import { match } from 'react-router'

const searchResultUrl = '/app/stock/list/?'

interface OwnProps {
  cx?: DynamicCx
  match?: match
  goodsCode?: string
}

interface OwnState {
  searchWord: string
  distance: string
  address: string
}

class StockSearch extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
    const { goodsCode } = this.props
    this.state = {
      searchWord: goodsCode || null,
      distance: '0',
      address: '',
    }
  }

  componentDidMount() {
    const { params } = this.props.match && this.props.match
    if (params) {
      const goodsCode = params['goodsCode']
      this.setState({ searchWord: goodsCode })
    }
  }

  onProductInputChange = e => {
    this.setState({ ...this.state, searchWord: e.target.value })
  }

  onAddressInputChange = e => {
    this.setState({ ...this.state, address: e.target.value })
  }

  goListPage = () => {
    let params = ''
    params = `${params}distance=${this.state.distance ? this.state.distance : ''}`
    params = `${params}&address=${this.state.address ? this.state.address : ''}`
    params = `${params}&searchword=${this.state.searchWord ? this.state.searchWord : ''}`
    params = `${params}&goodsCode=8809535802408`

    window.location.href = searchResultUrl + params
  }

  handleChange = e => {
    console.log(e.target.value)
    this.setState({ ...this.state, distance: e.target.value })
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
              <select className={cx('select-distance')} onChange={this.handleChange} defaultValue="0">
                <option className={cx('option')} value="0">
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
                value={this.state.address}
                onChange={this.onAddressInputChange}
              />
            </Col>
          </Row>
          {/* 검색어 입력 영역 */}
          <Divider>상품</Divider>
          <div className={cx('title')}>상품</div>
          <Input
            placeholder="검색어를 입력해주세요"
            suffix={
              <Icon
                onClick={() => (window.location.href = '/app/search/barcode')}
                type="barcode"
                style={{ color: 'rgba(0,0,0,.45)', paddingRight: 20, fontSize: 50 }}
              />
            }
            value={this.state.searchWord}
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
export default styling(s)(StockSearch)
