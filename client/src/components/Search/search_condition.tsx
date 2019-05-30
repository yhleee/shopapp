import * as React from 'react'
import { Icon, Input, Menu, Slider, Tag, Carousel } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import { Link } from 'react-router-dom'
import FormCategory from 'components/common/FormCategory'
import * as s from './search.scss'

const SubMenu = Menu.SubMenu
const { CheckableTag } = Tag

const marks = {
  0: { style: { fontSize: 20 }, label: '0원' },
  50000: { style: { fontSize: 20 }, label: '5만원' },
  100000: { style: { fontSize: 20 }, label: '10만원' },
  150000: { style: { fontSize: 20 }, label: '15만원' },
  200000: { style: { fontSize: 20 }, label: '20만원 이상' },
}

const searchResultUrl = '/app/search/result/?'

interface OwnProps {
  cx?: DynamicCx
}

interface OwnState {
  priceStrtVal: number
  priceEndVal: number
  searchword: string
  category: string
  brand: string[]
  benefit: string[]
  checked: boolean
}

class MyTag extends React.Component {
  state = { checked: false }

  handleChange = checked => {
    this.setState({ checked })
  }

  render() {
    return <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />
  }
}

class SearchCondition extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      priceStrtVal: 0,
      priceEndVal: 200000,
      searchword: null,
      category: null,
      brand: null,
      benefit: null,
      checked: false,
    }
  }

  onPriceRangeChange = ([strtVal, endVal]) => {
    this.setState({
      ...this.state,
      priceStrtVal: strtVal,
      priceEndVal: endVal,
    })
  }
  onChange = e => {
    this.setState({ ...this.state, searchword: e.target.value })
  }

  goResultPage = () => {
    let params = ''
    params = params + 'searchword=' + (this.state.searchword ? this.state.searchword : '')
    params = params + '&category=' + (this.state.searchword ? '010101' /*this.state.category */ : '')
    params =
      params + '&brand=' + (this.state.searchword === '!@$!@#!@$!@$!@$!' ? 'brand' /*this.state.brandList */ : '')
    params =
      params + '&benefit=' + (this.state.searchword === '!@$!#@^#@^@!#^@#^' ? 'benefit' /*this.state.benefit */ : '')
    params = params + '&startValue=' + (this.state.priceStrtVal >= 0 ? this.state.priceStrtVal : '')
    params = params + '&endValue=' + (this.state.priceEndVal ? this.state.priceEndVal : '')
    params = params + '&page=1'
    window.location.href = searchResultUrl + params
  }

  render() {
    const { cx } = this.props
    return (
      <>
        <div>
          {/* 검색어 입력 영역 */}
          <Input
            placeholder="검색어를 입력해주세요"
            suffix={
              <Link to="/app/home">
                <Icon type="barcode" style={{ color: 'rgba(0,0,0,.45)', paddingRight: 20, fontSize: 50 }} />
              </Link>
            }
            value={this.state.searchword}
            onChange={this.onChange}
            style={{
              paddingRight: 20,
              paddingLeft: 20,
              fontSize: 50,
              height: '80px',
              lineHeight: '80px',
              marginBottom: '30px',
            }}
          />

          {/* 카테고리 선택 영역 */}
          <FormCategory type="SEARCH" />

          <Menu mode="inline" style={{ width: '100%', fontSize: 30, marginTop: 20, backgroundColor: '#e4ffaf' }}>
            <SubMenu title={<p style={{ fontSize: 25 }}>브랜드</p>}>
              <Carousel autoplay>
                <div>
                  <li style={{ textAlign: 'center' }}>
                    <MyTag>아이소이</MyTag>
                    <MyTag>녹스</MyTag>
                    <MyTag>피지오겔</MyTag>
                    <MyTag>마몽드</MyTag>
                    <MyTag>비욘드</MyTag>
                  </li>
                  <li style={{ textAlign: 'center' }}>
                    <MyTag>닥터자르트</MyTag>
                    <MyTag>하다라보</MyTag>
                    <MyTag>한율</MyTag>
                    <MyTag>크리니크</MyTag>
                    <MyTag>오리진스</MyTag>
                  </li>
                  <li style={{ textAlign: 'center' }}>
                    <MyTag>아이소이</MyTag>
                    <MyTag>녹스</MyTag>
                    <MyTag>피지오겔</MyTag>
                    <MyTag>마몽드</MyTag>
                    <MyTag>비욘드</MyTag>
                  </li>
                  <li style={{ textAlign: 'center' }}>
                    <MyTag>닥터자르트</MyTag>
                    <MyTag>하다라보</MyTag>
                    <MyTag>한율</MyTag>
                    <MyTag>크리니크</MyTag>
                    <MyTag>오리진스</MyTag>
                  </li>
                  <li style={{ textAlign: 'center' }}>
                    <MyTag>아이소이</MyTag>
                    <MyTag>녹스</MyTag>
                    <MyTag>피지오겔</MyTag>
                    <MyTag>마몽드</MyTag>
                    <MyTag>비욘드</MyTag>
                  </li>
                </div>
                <div>
                  <li style={{ textAlign: 'center' }}>
                    <MyTag>아이소이1</MyTag>
                    <MyTag>녹스</MyTag>
                    <MyTag>피지오겔</MyTag>
                    <MyTag>마몽드</MyTag>
                    <MyTag>비욘드</MyTag>
                  </li>
                  <li style={{ textAlign: 'center' }}>
                    <MyTag>닥터자르트2</MyTag>
                    <MyTag>하다라보</MyTag>
                    <MyTag>한율</MyTag>
                    <MyTag>크리니크</MyTag>
                    <MyTag>오리진스</MyTag>
                  </li>
                  <li style={{ textAlign: 'center' }}>
                    <MyTag>아이소이3</MyTag>
                    <MyTag>녹스</MyTag>
                    <MyTag>피지오겔</MyTag>
                    <MyTag>마몽드</MyTag>
                    <MyTag>비욘드</MyTag>
                  </li>
                  <li style={{ textAlign: 'center' }}>
                    <MyTag>닥터자르트4</MyTag>
                    <MyTag>하다라보</MyTag>
                    <MyTag>한율</MyTag>
                    <MyTag>크리니크</MyTag>
                    <MyTag>오리진스</MyTag>
                  </li>
                  <li style={{ textAlign: 'center' }}>
                    <MyTag>아이소이</MyTag>
                    <MyTag>녹스</MyTag>
                    <MyTag>피지오겔</MyTag>
                    <MyTag>마몽드</MyTag>
                    <MyTag>비욘드</MyTag>
                  </li>
                </div>
              </Carousel>
            </SubMenu>
          </Menu>
          <Menu mode="inline" style={{ width: '100%', fontSize: 30, marginTop: 20, backgroundColor: '#e4ffaf' }}>
            <SubMenu title={<p style={{ fontSize: 25, height: '80px' }}>혜택</p>}>
              <li style={{ textAlign: 'center' }}>
                <MyTag key="benefit_all">전체</MyTag>
                <MyTag key="benefit_coupon">쿠폰상품</MyTag>
                <MyTag key="benefit_sale">세일상품</MyTag>
                <MyTag key="benefit_gift">증정상품</MyTag>
              </li>
              <li style={{ textAlign: 'center' }}>
                <MyTag key="benefit_oneplus">1+1</MyTag>
                <MyTag key="benefit_twoplus">2+1</MyTag>
                <MyTag key="benefit_today">오늘드림</MyTag>
              </li>
            </SubMenu>
          </Menu>

          <Menu
            mode="inline"
            style={{ width: '100%', height: 'auto', fontSize: 30, marginTop: 20, backgroundColor: '#e4ffaf' }}
          >
            <SubMenu
              title={
                <span style={{ fontSize: 25, }}>
                  가격대
                </span>
              }
            >
              <Menu.Item style={{ height: 'auto', marginRight: 50, fontSize: 30 }}>
                <Slider
                  range
                  marks={marks}
                  defaultValue={[this.state.priceStrtVal, this.state.priceEndVal]}
                  onAfterChange={this.onPriceRangeChange}
                  max={200000}
                  step={10000}
                  style={{ marginRight: 50, fontSize: 50 }}
                />
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className={cx('footer-wrap')} onClick={this.goResultPage}>
          <div className={cx('search-button')}>조회</div>
        </div>
      </>
    )
  }
}
export default styling(s)(SearchCondition)
