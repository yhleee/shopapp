import * as React from 'react'
import { axios } from '../../common/utils/ajax/axios'
import { isEmpty } from 'lodash-es'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import ProductList from 'components/common/ProductList'
import { ListType } from 'common/types/enum/exposeType'
import * as s from './search.scss'
import { Icon } from 'antd';

const apiUrl = '/api/search/db/selectSearchProductList235235/?page=1'

interface OwnProps {
  cx?: DynamicCx
}
interface OwnState {
  productList: any[]
}

class GetProductList extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
    }
  }

  async componentDidMount() {
    const { data: productList } = await axios.get(apiUrl)
    this.setState({ productList })
    console.log(this.state.productList)
  }

  render() {
    const { cx } = this.props
    const { productList } = this.state

    if (!isEmpty(productList)) {
      if(productList.length == 1) {
        return(
          window.location.href = this.state.productList[0].linkUrl
        )
      } else {
        return (
          <>
            <ProductList {...{ listType: ListType.SEARCH, list: this.state.productList }} />
          </>
        )
      }
    } else {
      return(
        <div className={cx('serach-no-result')}>
          <Icon type='stop' theme='twoTone' twoToneColor='red' style={{padding: 'auto', textAlign: 'center', fontSize: '80px', }}/>

        </div>
      )
    }
  }
}

export default styling(s)(GetProductList)
