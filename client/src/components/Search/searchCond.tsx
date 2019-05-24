import * as React from 'react'
import { Icon, Row, Col, Input, message, Button, Menu, Slider, Tag, Carousel } from 'antd'
import { DynamicCx } from 'common/types'
import { styling, createCx } from 'common/utils'
import { Link } from 'react-router-dom'
import * as s from './search.scss'

const ButtonGroup = Button.Group
const SubMenu = Menu.SubMenu
const { CheckableTag } = Tag

const buttonStyle = {
  marginLeft: 5,
  marginRight: 5,
  height: 'auto',
  width: 'auto',
}

const iconTextStyle = {
  fontSize: 20,
}

const marks = {
  10000: { style: { fontSize: 14 }, label: '1만원' },
  20000: { style: { fontSize: 14 }, label: '2만원' },
  30000: { style: { fontSize: 14 }, label: '3만원' },
  40000: { style: { fontSize: 14 }, label: '4만원' },
  50000: { style: { fontSize: 14 }, label: '5만원' },
  60000: { style: { fontSize: 14 }, label: '6만원' },
  70000: { style: { fontSize: 14 }, label: '7만원' },
  80000: { style: { fontSize: 14 }, label: '8만원' },
  90000: { style: { fontSize: 14 }, label: '9만원' },
  100000: { style: { fontSize: 14 }, label: '10만원 이상' },
}

interface OwnProps {
  cx?: DynamicCx
}

interface OwnState {
  priceStrtVal: number
  priceEndVal: number
  checked: boolean
}

class MyTag extends React.Component {
  state = { checked: false }

  handleChange = checked => {
    this.setState({ checked })
  }

  render() {
    return (
      <CheckableTag
        style={{
          marginTop: 10,
          margintLeft: 15,
          width: 'auto',
          paddingLeft: 15,
          paddingRight: 15,
          height: '40px',
          lineHeight: '40px',
          fontSize: 30,
          textAlign: 'center',
        }}
        {...this.props}
        checked={this.state.checked}
        onChange={this.handleChange}
      />
    )
  }
}

class SearchCond extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      priceStrtVal: 0,
      priceEndVal: 100000,
      checked: false,
    }
  }

  onChange = ([strtVal, endVal]) => {
    this.setState({
      priceStrtVal: strtVal,
      priceEndVal: endVal,
    })
  }

  render() {
    return (
      <div>
        <Input
          placeholder="검색어를 입력해주세요"
          suffix={
            <Link to="/app/home">
              <Icon type="barcode" style={{ color: 'rgba(0,0,0,.45)', paddingRight: 20, fontSize: 50 }} />
            </Link>
          }
          onPressEnter={() => message.success('Processing complete!')}
          style={{
            paddingRight: 20,
            paddingLeft: 20,
            fontSize: 50,
            height: '80px',
            lineHeight: '80px',
            marginBottom: '30px',
          }}
        />
        <Row style={{ backgroundColor: '#e4ffaf' }}>
          <Col span={24}>
            <ButtonGroup>
              <Button className="test" style={buttonStyle}>
                <img src="/images/oylogo_icon.png" />
                <p style={iconTextStyle}>기초화장품</p>
              </Button>
              <Button style={buttonStyle}>
                <img src="/images/oylogo_icon.png" />
                <p style={iconTextStyle}>색조화장품</p>
              </Button>
              <Button style={buttonStyle}>
                <img src="/images/oylogo_icon.png" />
                <p style={iconTextStyle}>바디용품</p>
              </Button>
              <Button style={buttonStyle}>
                <img src="/images/oylogo_icon.png" />
                <p style={iconTextStyle}>헤어용품</p>
              </Button>
              <Button style={buttonStyle}>
                <img src="/images/oylogo_icon.png" />
                <p style={iconTextStyle}>프레그런스</p>
              </Button>
            </ButtonGroup>
          </Col>
        </Row>

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
              <p style={{ fontSize: 25 }}>
                가격대{this.state.priceStrtVal} ~ {this.state.priceEndVal}
              </p>
            }
          >
            <Menu.Item style={{ height: 'auto', marginRight: 50, fontSize: 30 }}>
              <Slider
                range
                marks={marks}
                defaultValue={[this.state.priceStrtVal, this.state.priceEndVal]}
                onAfterChange={this.onChange}
                max={100000}
                step={1000}
                style={{ marginRight: 50, fontSize: 50 }}
              />
            </Menu.Item>
          </SubMenu>
        </Menu>
        <Button
          style={{
            width: '100%',
            fontSize: 40,
            position: 'fixed',
            bottom: '0',
            height: '10%',
            backgroundColor: '#c2dd8d',
          }}
        >
          조회
        </Button>
      </div>
    )
  }
}
export default styling(s)(SearchCond)
