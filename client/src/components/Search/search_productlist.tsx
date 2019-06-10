import * as React from 'react'
import { Icon } from 'antd'
import { isEmpty } from 'lodash-es'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import ProductList from '../Product/product_list'
import { Product } from 'common/types/entities/product'
import { ListType } from 'common/types/enum/exposeType'
import { isScrollEnd } from '../../common/utils/browserUtils'
import * as s from './search.scss'
import { getSearchProductList } from '../../common/services/search'

let pageNumber = 0

interface OwnProps {
  cx?: DynamicCx
  searchQuery: String
}
interface OwnState {
  productList: Product[]
  callbackFlag: boolean
  page: number
  isLoading: boolean
}

class GetProductList extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      callbackFlag: false,
      page: 0,
      isLoading: false,
    }
    this.scrollEnd = this.scrollEnd.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollEnd)
    this.readMoreProduct()
  }

  scrollEnd() {
    if (isScrollEnd(10)) {
      if (!this.state.isLoading) {
        this.setState({ isLoading: true }, () => {
          this.readMoreProduct()
        })
      }
    }
  }

  async readMoreProduct() {
    pageNumber += 1
    this.setState({ ...this.state, page: pageNumber })
    const productList = await getSearchProductList(pageNumber)
    this.setState({
      ...this.state,
      productList: this.state.productList.concat(productList),
      callbackFlag: true,
      isLoading: false,
    })
  }

  render() {
    const { cx } = this.props
    const { productList } = this.state
    const flag = this.state.callbackFlag
    let loadingButton = null
    if (this.state.isLoading || !flag) {
      loadingButton = (
        <Icon type="loading" style={{ marginTop: '80px', display: 'block', fontSize: '100px', color: '#c2dd8d' }} />
      )
    } else {
      loadingButton = null
    }

    if (!isEmpty(productList)) {
      if (productList.length === 1) {
        return (window.location.href = `/app/product/detail/?pid=${this.state.productList[0].id}`)
      }
      if (productList.length > 1) {
        return (
          <>
            <ProductList {...{ listType: ListType.SEARCH, list: this.state.productList }} />
            {loadingButton}
          </>
        )
      }
      return (
        <>
          <div className={cx('serach-no-result-wrap')}>
            <Icon
              type="stop"
              theme="twoTone"
              twoToneColor="red"
              style={{ marginTop: '50px', display: 'block', textAlign: 'center', fontSize: '150px' }}
            />
            <h1 className={cx('stop-text')}>
              검색하신 <strong>"{this.props.searchQuery}"</strong>에 대한
            </h1>
            <h1 className={cx('stop-text')}>검색 결과가 없습니다.</h1>
            <h1 className={cx('stop-button')}>타매장 재고조회</h1>
          </div>
        </>
      )
    }
    if (isEmpty(productList) && flag) {
      return (
        <>
          <div className={cx('serach-no-result-wrap')}>
            <Icon
              type="stop"
              theme="twoTone"
              twoToneColor="red"
              style={{
                marginTop: '50px',
                display: 'block',
                textAlign: 'center',
                fontSize: '150px',
              }}
            />
            <h1 className={cx('stop-text')}>
              검색하신 <strong>"{this.props.searchQuery}"</strong>에 대한
            </h1>
            <h1 className={cx('stop-text')}>검색 결과가 없습니다.</h1>
            <h1 className={cx('stop-button')}>타매장 재고조회</h1>
          </div>
        </>
      )
    }
    return <>{loadingButton}</>
  }
}

export default styling(s)(GetProductList)
