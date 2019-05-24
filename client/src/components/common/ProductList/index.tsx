import * as React from 'react'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './productList.scss'
import { Product } from 'common/types/entities/product'
import Img from 'common/components/Img'
import { ListType } from 'common/types/enum/exposeType'

interface OwnProps {
  cx?: DynamicCx
  list: Product[]
  listType: ListType
}

type Props = OwnProps

class ProductList extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    const { cx, list, listType } = this.props
    return (
      <div className={cx('list_wrap')}>
        {list.map((product, index) => (
          <div className={cx('list_row')} key={index}>
            {listType === ListType.RANKING && (
              <div
                className={cx('rank_icon', `${product.rank === 1 ? 'gold' : product.rank === 2 ? 'silver' : 'bronze'}`)}
              />
            )}
            <div className={cx('product_image')}>
              <Img src={product.imageUrl} />
            </div>
            <div className={cx('product_desc')}>
              {product.brandName}
              <br />
              {product.productName}
            </div>
            <div className={cx('product_price')}>
              {product.volume && product.volume + ' / '}
              {product.price}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default styling(s)(ProductList)
