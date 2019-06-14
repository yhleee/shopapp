import * as React from 'react'
import { Icon, Input, Menu, Slider, Tag, Carousel } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import FormCategory from 'components/common/FormCategory'
import * as s from './search.scss'
import { SearchPage } from 'common/types/enum/searchOptions'
import { History } from 'history'
import {
  SearchConditionParamsState,
  updateSearchConditionParams,
  resetSearchConditionParams,
} from './ducks/searchConditionParams'
import { connect } from 'react-redux'
import { RootState } from '../../common/reducer'
import { CategoryFormResult } from '../../common/types/entities/search'

const SubMenu = Menu.SubMenu
const { CheckableTag } = Tag

const marks = {
  0: { style: { fontSize: 20 }, label: '0원' },
  50000: { style: { fontSize: 20 }, label: '5만원' },
  100000: { style: { fontSize: 20 }, label: '10만원' },
  150000: { style: { fontSize: 20 }, label: '15만원' },
  200000: { style: { fontSize: 20 }, label: '20만원 이상' },
}

interface OwnProps {
  cx?: DynamicCx
  history?: History
}

interface StateProps {
  searchConditionParams: SearchConditionParamsState
}

interface DispatchProps {
  resetSearchConditionParams: typeof resetSearchConditionParams
  updateSearchConditionParams: typeof updateSearchConditionParams
}

interface OwnState {}

type Props = OwnProps & StateProps & DispatchProps

class MyTag extends React.Component {
  state = { checked: false }

  handleChange = checked => {
    this.setState({ checked })
  }

  render() {
    return <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />
  }
}

class SearchCondition extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    }
  }

  componentDidMount() {
    this.props.searchConditionParams.searchForm.searchword = ''
    this.props.searchConditionParams.searchForm.categoryId = ''
    this.props.searchConditionParams.searchForm.benefit = ''
    this.props.searchConditionParams.searchForm.brand = ''
    this.props.searchConditionParams.searchForm.startValue = 0
    this.props.searchConditionParams.searchForm.endValue = 200000
    console.log(`1 = ${this.props.searchConditionParams.searchForm.searchword}`)
  }

  onPriceRangeChange = ([startVal, endVal]) => {
    this.props.searchConditionParams.searchForm.endValue = endVal
    this.props.searchConditionParams.searchForm.startValue = startVal
  }

  onChange = e => {
    this.props.searchConditionParams.searchForm.searchword = e.target.value
  }

  goResultPage = () => {
    const searchConditionParams = this.props.searchConditionParams
    this.props.updateSearchConditionParams(searchConditionParams)
    console.log(`Result = ${this.props.searchConditionParams.searchForm.categoryId}`)
    this.props.history.push('/app/search/result')
  }

  handleCategoryForm = (categorySearchParams: CategoryFormResult) => {
    const searchConditionParams = this.props.searchConditionParams

    if (categorySearchParams.thirdCategoryId != null) {
      searchConditionParams.searchForm.categoryId = categorySearchParams.thirdCategoryId
      searchConditionParams.searchForm.categoryName = categorySearchParams.thirdCategoryName
    } else if (categorySearchParams.secondCategoryId != null) {
      searchConditionParams.searchForm.categoryId = categorySearchParams.secondCategoryId
      searchConditionParams.searchForm.categoryName = categorySearchParams.secondCategoryName
    } else if (categorySearchParams.firstCategoryId != null) {
      searchConditionParams.searchForm.categoryId = categorySearchParams.firstCategoryId
      searchConditionParams.searchForm.categoryName = categorySearchParams.firstCategoryName
    } else {
      searchConditionParams.searchForm.categoryId = ''
      searchConditionParams.searchForm.categoryName = ''
    }
    this.props.updateSearchConditionParams(searchConditionParams)
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
              <Icon
                onClick={() => (window.location.href = '/app/search/barcode')}
                type="barcode"
                style={{ color: 'rgba(0,0,0,.45)', paddingRight: 20, fontSize: 50 }}
              />
            }
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

          {/* 카테고리 선택 영역(다중 선택 불가) */}
          <FormCategory type={SearchPage.SEARCH} handleParams={this.handleCategoryForm} />

          {/* 브랜드 선택 영역(다중 선택 가능) */}
          <Menu mode="inline" style={{ width: '100%', fontSize: 30, marginTop: 20, backgroundColor: '#e4ffaf' }}>
            <SubMenu title={<p style={{ fontSize: 25 }}>브랜드</p>}>
              <Carousel autoplay={true}>
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
            style={{
              width: '100%',
              height: 'auto',
              fontSize: 30,
              marginBottom: 200,
              marginTop: 20,
              backgroundColor: '#e4ffaf',
            }}
          >
            <SubMenu title={<span style={{ fontSize: 25 }}>가격대</span>}>
              <Menu.Item style={{ height: 'auto', marginRight: 50, fontSize: 30 }}>
                <Slider
                  range={true}
                  marks={marks}
                  defaultValue={[0, 200000]}
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

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    searchConditionParams: state.searchConditionParams,
  }),
  {
    resetSearchConditionParams,
    updateSearchConditionParams,
  },
)(styling(s)(SearchCondition))
