import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './product_list.scss'
import { Product } from 'common/types/entities/product'
import Img from 'common/components/Img'
import { ListType } from 'common/types/enum/exposeType'
import { Link } from 'react-router-dom'
import { ProductCompareState, updateProductCompare } from './ducks/productCompare'
import { History } from 'history'

interface OwnProps {
  cx?: DynamicCx
  list: Product[]
  listType: ListType
  history?: History
}

interface StateProps {
  productCompare: ProductCompareState
}

interface DispatchProps {
  updateProductCompare: typeof updateProductCompare
}

type Props = OwnProps & StateProps & DispatchProps

class ProductList extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  handleClickProduct = (product: Product) => () => {
    const { history, updateProductCompare, productCompare } = this.props
    productCompare.currentProduct = product
    updateProductCompare(productCompare)

    history.push(`/app/product/detail/${product.id}`)
  }

  render() {
    const { cx, list, listType } = this.props
    return (
      <div className={cx('list_wrap')}>
        {list.map((product, index) => (
          <div className={cx('list_row')} key={index}>
            <div className={cx('list_text')} onClick={this.handleClickProduct(product)}>
              {listType === ListType.RANKING && (
                <div
                  className={cx(
                    'rank_icon',
                    `${product.rank === 1 ? 'gold' : product.rank === 2 ? 'silver' : 'bronze'}`,
                  )}
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
                {product.volume && `${product.volume}/`}
                {product.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    productCompare: state.productCompare,
  }),
  {
    updateProductCompare,
  },
)(styling(s)(ProductList))
