import * as React from 'react'
import { axios } from '../../common/utils/ajax/axios'
import { isEmpty } from 'lodash-es'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import ProductList from '../Product/product_list'
import { ListType } from 'common/types/enum/exposeType'
import * as s from './search.scss'
import { Icon } from 'antd'

const apiUrl = '/api/search/db/selectSearchProductList/?page='

interface OwnProps {
  cx?: DynamicCx
  searchQuery: String
  page: number
}
interface OwnState {
  productList: any[]
  callbackFlag: boolean
}

class GetProductList extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      callbackFlag: false,
    }
  }

  async componentDidMount() {
    const { data: productList } = await axios.get(apiUrl + this.props.page)
    console.log('1' + this.state.callbackFlag)
    this.setState({ productList })
    this.setState({ callbackFlag: true })
    console.log('2' + this.state.callbackFlag)
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
