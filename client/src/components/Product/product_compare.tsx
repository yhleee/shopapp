import * as React from 'react'
import { connect } from 'react-redux'
import { match } from 'react-router'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './product_compare.scss'
import { ProductCompareState, updateProductCompare } from './ducks/productCompare'
import { Button, Empty, Table } from 'antd'

interface OwnProps {
  cx?: DynamicCx
  match?: match
}

interface StateProps {
  layoutTitle: LayoutTitleState
  productCompare: ProductCompareState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
  updateProductCompare: typeof updateProductCompare
}

interface OwnState {}

type Props = OwnProps & StateProps & DispatchProps

class ProductCompareList extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.updateLayoutTile('비교하기')
  }

  rearrangeCompareList = () => {
    const { productCompare } = this.props
    const { compareList } = productCompare
    const productTable = []
    const names = {}
    const brands = {}
    const prices = {}
    const volumes = {}
    const salePrices = {}
    const images = {}
    const reviewPoints = {}
    const reviewStarHtmls = {}
    const reviewPollHtmls = {}
    const manageButons = {}

    names['name'] = '상품명'
    brands['name'] = '브랜드'
    prices['name'] = '판매가'
    salePrices['name'] = '판매가'
    volumes['name'] = '용량 및 중량'
    images['name'] = '상품이미지'
    reviewPoints['name'] = '평점'
    reviewStarHtmls['name'] = '평점'
    reviewPollHtmls['name'] = '상품평'
    manageButons['name'] = '관리'

    compareList.forEach((product, index) => {
      names[`value${index + 1}`] = product.name
      brands[`value${index + 1}`] = product.brandName
      prices[`value${index + 1}`] = product.price
      salePrices[`value${index + 1}`] = product.salePrice
      images[`value${index + 1}`] = <img src={product.imageUrl} style={{ width: '20%' }} />
      reviewPoints[`value${index + 1}`] = product.reviewPoint
      reviewStarHtmls[`value${index + 1}`] = <div dangerouslySetInnerHTML={{ __html: product.reviewStarHtml }} />
      reviewPollHtmls[`value${index + 1}`] = <div dangerouslySetInnerHTML={{ __html: product.reviewPollHtml }} />
      volumes[`value${index + 1}`] = product.volume
      manageButons[`value${index + 1}`] = (
        <Button
          icon="delete"
          size="large"
          href="javascript:void(0)"
          onClick={this.handleRemoveCompare(index)}
          block={true}
          type="danger"
        >
          비교함에서 삭제
        </Button>
      )
    })

    // productTable.push(names)
    productTable.push(manageButons)
    productTable.push(images)
    productTable.push(brands)
    // productTable.push(prices)
    productTable.push(salePrices)
    productTable.push(volumes)
    // productTable.push(reviewPoints)
    productTable.push(reviewStarHtmls)
    productTable.push(reviewPollHtmls)

    return productTable
  }

  handleRemoveCompare = (selectIndex: number) => () => {
    const { productCompare, updateProductCompare } = this.props
    const { compareList } = productCompare
    const resultCompareList = []
    compareList.forEach((product, index) => {
      if (index !== selectIndex) {
        resultCompareList.push(product)
      }
    })
    productCompare.compareList = resultCompareList
    updateProductCompare(productCompare)
  }

  render() {
    const { productCompare } = this.props
    const { compareList } = productCompare
    console.log(compareList)
    if (!compareList || compareList.length === 0) {
      return (
        <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
          <Empty />
        </div>
      )
    }
    const tableDatas = this.rearrangeCompareList()
    const columns = [
      {
        title: '항목',
        dataIndex: 'name',
        key: 'name',
      },
    ]
    compareList.forEach((product, index) => {
      columns.push({
        title: product.name,
        dataIndex: `value${index + 1}`,
        key: `value${index + 1}`,
      })
    })
    console.log(tableDatas)
    return (
      <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
        <Table dataSource={tableDatas} columns={columns} pagination={false} />
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    layoutTitle: state.layoutTitle,
    productCompare: state.productCompare,
  }),
  {
    updateLayoutTile,
    updateProductCompare,
  },
)(styling(s)(ProductCompareList))
