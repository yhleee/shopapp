import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './ranking.scss'
import { BrandFormResult } from 'common/types/entities/search'
import { Button, Radio, Input, message } from 'antd'
import FormCategory from 'components/common/FormCategory'
import { SearchPage } from 'common/types/enum/searchOptions'
import { getBrandInfo } from 'common/services/search_brand'
import { Brand } from 'common/types/entities/brand'

const Search = Input.Search

interface OwnProps {
  cx?: DynamicCx
  handleParams: Function
  brand?: Brand
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

interface OwnState {
  searchParams: BrandFormResult
  brandList: Brand[]
}

type Props = OwnProps & StateProps & DispatchProps

class RankingBrand extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      searchParams: {
        name: null,
        brand: null,
        category: {},
      },
      brandList: null,
    }
  }

  componentDidMount() {
    const { updateLayoutTile } = this.props
    updateLayoutTile('브랜드 RANKING')
  }

  componentDidUpdate() {
    const { brand } = this.props
    const { searchParams } = this.state
    if (brand && !searchParams['brand']) {
      searchParams['brand'] = brand
      searchParams['name'] = brand.name
      this.setState({ searchParams })
    }
  }

  handleFormParams = event => {
    const searchParams = this.state.searchParams
    searchParams.name = event.target.value
    this.props.handleParams(searchParams)
    this.setState({ searchParams })
  }

  handleCategoryFormParams = categoryParams => {
    const searchParams = this.state.searchParams
    searchParams.category = categoryParams
    this.props.handleParams(searchParams)
    this.setState({ searchParams })
  }

  handleBrandSearchButton = async value => {
    if (!value) {
      message.error('브랜드 이름을 입력 해 주세요.')
      return
    }
    const brandList: Brand[] = await getBrandInfo(value)
    if (brandList) {
      this.setState({ brandList })
    }
  }

  handleClickBrand = (index: number) => () => {
    const { brandList, searchParams } = this.state
    const selectBrand = brandList[index]
    searchParams['brand'] = selectBrand
    searchParams['name'] = selectBrand.name
    this.setState({ searchParams })
  }

  render() {
    const { cx } = this.props
    const { searchParams, brandList } = this.state
    return (
      <>
        {!searchParams.brand && (
          <div style={{ zoom: '2' }}>
            <Search
              placeholder="브랜드 이름을 입력 하세요. "
              onSearch={value => this.handleBrandSearchButton(value)}
              enterButton
            />
            <div className={cx('message_wrap')}>관심 있는 브랜드의 BEST 제품을 확인 해 보세요.</div>
            {brandList &&
              brandList.map((brand, index) => (
                <div
                  key={`ranking_brand_list_${index}`}
                  style={{ padding: '10px 8px', fontSize: '30px' }}
                  onClick={this.handleClickBrand(index)}
                >
                  <img src={brand.imageUrl} style={{ width: '10%' }} />&nbsp;{brand.name}
                </div>
              ))}
          </div>
        )}
        {searchParams.brand && (
          <div style={{ width: '100%', padding: '10px 8px', textAlign: 'center' }}>
            <img src={searchParams.brand.imageUrl} />
            <br />
            <span style={{ fontSize: '30px' }}>{searchParams.brand.name}</span>
          </div>
        )}

        {searchParams.brand && <FormCategory type={SearchPage.RANKING} handleParams={this.handleCategoryFormParams} />}
      </>
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
)(styling(s)(RankingBrand))
