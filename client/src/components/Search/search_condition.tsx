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
import { getSearchBrandList } from '../../common/services/search'
import { BrandParams } from '../../common/types/entities/brand'
import FormTagPanel from '../common/FormTag/FormTagPanel'
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

interface OwnState {
  brandList: any[]
  brandSliceList: any[]
}

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
      brandList: [],
      brandSliceList: [],
    }
  }

  genBrandArray = (brandList: BrandParams[]) => {
    let counter = 0
    const brandSliceList = []
    brandList.map((brand, index) => {
      if (index !== 0 && (index % 25 === 0 || index === brandList.length - 1)) {
        const sliceArr = brandList.slice(counter * 25, index)
        if (sliceArr !== null) {
          brandSliceList.push(sliceArr)
        }
        counter = counter + 1
      }
    })
    return brandSliceList
  }

  async componentDidMount() {
    this.props.searchConditionParams.searchForm.searchword = ''
    this.props.searchConditionParams.searchForm.categoryId = ''
    this.props.searchConditionParams.searchForm.brand = ''
    this.props.searchConditionParams.searchForm.brandName = ''
    this.props.searchConditionParams.searchForm.benefit = ''
    this.props.searchConditionParams.searchForm.benefitName = ''
    this.props.searchConditionParams.searchForm.startValue = 0
    this.props.searchConditionParams.searchForm.endValue = 200000

    const brand = await getSearchBrandList('00')

    this.setState({
      brandList: brand,
      brandSliceList: this.genBrandArray(brand),
    })
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

  handleBrandForm = (brandParams: BrandParams) => {
    const searchConditionParams = this.props.searchConditionParams
    if (brandParams.checked) {
      if (searchConditionParams.searchForm.brand === '') {
        searchConditionParams.searchForm.brand = `${brandParams.brandCode},`
        searchConditionParams.searchForm.brandName = `${brandParams.brandName},`
      } else {
        searchConditionParams.searchForm.brand = `${searchConditionParams.searchForm.brand}${brandParams.brandCode},`
        searchConditionParams.searchForm.brandName = `${searchConditionParams.searchForm.brandName}${
          brandParams.brandName
        },`
      }
    } else {
      searchConditionParams.searchForm.brand = searchConditionParams.searchForm.brand.replace(
        `${brandParams.brandCode},`,
        ``,
      )
      searchConditionParams.searchForm.brandName = searchConditionParams.searchForm.brandName.replace(
        `${brandParams.brandName},`,
        ``,
      )
    }
    this.props.updateSearchConditionParams(searchConditionParams)
  }

  render() {
    const { cx } = this.props
    const { brandSliceList } = this.state

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

          <Menu mode="inline" style={{ width: '100%', fontSize: 30, marginTop: 20, marginBottom: 200 }}>
            <SubMenu title={<p style={{ fontSize: 25, marginBottom: 30 }}>브랜드</p>}>
              {/* 브랜드 선택 영역(다중 선택 가능) */}
              {brandSliceList.map((brand, index) => (
                <FormTagPanel key={index} callback={this.handleBrandForm} brandList={brand} />
              ))}
            </SubMenu>
            <SubMenu title={<p style={{ fontSize: 25 }}>혜택</p>}>
              {/* 혜택 영역(다중 선택 가능) */}
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
            <SubMenu title={<span style={{ fontSize: 25 }}>가격대</span>}>
              {/* 가격대 선택 영역(시작,종료 값) */}
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
