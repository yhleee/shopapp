import * as React from 'react'
import { Icon } from 'antd'
import { axios } from '../../common/utils/ajax/axios'
import { isEmpty } from 'lodash-es'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import ProductList from '../Product/product_list'
import { ListType } from 'common/types/enum/exposeType'
import { isScrollEnd } from '../../common/utils/browserUtils'
import * as s from './search.scss'

const apiUrl = '/api/search/db/selectSearchProductList/?page='
let pageNumber = 0

interface OwnProps {
  cx?: DynamicCx
  searchQuery: String
}
interface OwnState {
  productList: any[]
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
    if (isScrollEnd(100)) {
      if (!this.state.isLoading) {
        this.setState({ isLoading: true }, () => {
          this.readMoreProduct()
        })
      }
    }
  }

  async readMoreProduct() {
    pageNumber += 1
    console.log('readProduct : ' + pageNumber)
    this.setState({ ...this.state, page: pageNumber })
    let { data: productList } = await axios.get(apiUrl + pageNumber)
    productList = this.state.productList.concat(productList)
    this.setState({ ...this.state, productList: productList, callbackFlag: true, isLoading: false })
  }

  render() {
    const { cx } = this.props
    const { productList } = this.state
    const flag = this.state.callbackFlag

    if (!isEmpty(productList)) {
      if (productList.length == 1) {
        return (window.location.href = this.state.productList[0].linkUrl)
      } else if (productList.length > 1) {
        return (
          <>
            <ProductList {...{ listType: ListType.SEARCH, list: this.state.productList }} />
          </>
        )
      } else {
        ;<>
          <div className={cx('serach-no-result-wrap')}>
            <Icon
              type="stop"
              theme="twoTone"
              twoToneColor="red"
              style={{ marginTop: '50px', display: 'block', textAlign: 'center', fontSize: '150px' }}
            />
            <h1 className={cx('stop-text')}>
              검색하신 <strong>"{this.props.searchQuery}"</strong>에 대한{' '}
            </h1>
            <h1 className={cx('stop-text')}>검색 결과가 없습니다.</h1>
            <h1 className={cx('stop-button')}>타매장 재고조회</h1>
          </div>
        </>
      }
    } else {
      if (flag) {
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
                검색하신 <strong>"{this.props.searchQuery}"</strong>에 대한{' '}
              </h1>
              <h1 className={cx('stop-text')}>검색 결과가 없습니다.</h1>
              <h1 className={cx('stop-button')}>타매장 재고조회</h1>
            </div>
          </>
        )
      } else {
        return (
          <>
            <Icon type="loading" style={{ marginTop: '80px', display: 'block', fontSize: '100px', color: '#c2dd8d' }} />
          </>
        )
      }
    }
  }
}

export default styling(s)(GetProductList)
