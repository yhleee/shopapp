import * as React from 'react'
import { connect } from 'react-redux'
import { match } from 'react-router'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './product_detail.scss'
import { getProductDetailHtml, getProductDetailHtmlByBarcode } from 'common/services/product'
import { ProductCompareState, updateProductCompare } from './ducks/productCompare'
import { Button, Icon, Modal, message } from 'antd'
import { ProductDetailInfo } from 'common/types/entities/product'
import { Link } from 'react-router-dom'

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

interface OwnState {
  productDetailInfo: ProductDetailInfo
  visibleCompareOverCountModal: boolean
  loading: boolean
}

type Props = OwnProps & StateProps & DispatchProps

class ProductDetail extends React.Component<Props, OwnState> {
  iframe: React.RefObject<HTMLIFrameElement>

  constructor(props) {
    super(props)
    this.state = {
      productDetailInfo: null,
      visibleCompareOverCountModal: false,
      loading: false,
    }
    this.iframe = React.createRef()
  }

  async componentDidMount() {
    this.props.updateLayoutTile('상품정보')
    const { params } = this.props.match
    const pid = params['pid']
    const barcode = params['barcode']
    let productDetailInfo: ProductDetailInfo = null
    let response = null
    if (barcode) {
      response = await getProductDetailHtmlByBarcode(barcode)
    } else {
      response = await getProductDetailHtml(pid)
    }

    if (response && response.status === 200) {
      productDetailInfo = response.data && response.data.contents
    } else if (response && response.status === 204) {
      message.error('해당하는 상품이 없습니다.')
      setTimeout(() => {
        window && window.history.back()
      }, 3000)
    } else if (response && response.status === 400) {
      message.error('상품번호가 누락되었습니다.')
      setTimeout(() => {
        window && window.history.back()
      }, 3000)
    }

    if (productDetailInfo) {
      const { productCompare, updateProductCompare } = this.props
      productCompare.currentProduct = {
        pid: productDetailInfo.pid,
        name: productDetailInfo.name,
        brandName: productDetailInfo.brandName,
        imageUrl: productDetailInfo.imageUrl,
        price: productDetailInfo.price,
        salePrice: productDetailInfo.salePrice,
        volume: productDetailInfo.volume || null,
        reviewPoint: productDetailInfo.reviewPoint || null,
        reviewPollHtml: productDetailInfo.reviewPollHtml || null,
        reviewStarHtml: productDetailInfo.reviewStarHtml || null,
      }
      updateProductCompare(productCompare)
      this.setState({ productDetailInfo })
    }
  }

  componentWillUnmount() {
    const { productCompare, updateProductCompare } = this.props
    productCompare.currentProduct = null
    updateProductCompare(productCompare)
  }

  addCompareList = () => {
    const { productCompare, updateProductCompare } = this.props
    const { compareList, currentProduct } = productCompare
    let replaceCompareList = compareList
    if (compareList.length === 3) {
      replaceCompareList = compareList.slice(1)
    }
    replaceCompareList.push(currentProduct)
    productCompare.compareList = replaceCompareList
    updateProductCompare(productCompare)
    setTimeout(() => {
      this.setState({ loading: false, visibleCompareOverCountModal: false })
    }, 1000)
    message.success('상품이 비교함에 담겼습니다.')
  }

  handleAddCompareList = () => {
    const { productCompare } = this.props
    const { compareList, currentProduct } = productCompare
    let hasDuplicate = false
    console.log(`- curr : ${currentProduct.pid}`)
    compareList.forEach(product => {
      console.log(`-- now : ${product.pid}`)
      if (product.pid === currentProduct.pid) {
        hasDuplicate = true
      }
    })
    if (hasDuplicate) {
      message.warn('이미 비교함에 있는 상품 입니다.')
      return false
    }
    if (compareList.length === 3) {
      this.setState({ visibleCompareOverCountModal: true })
    } else {
      this.addCompareList()
    }
  }

  handleCancel = () => {
    message.info('취소하였습니다.')
    this.setState({ visibleCompareOverCountModal: false })
  }

  render() {
    const { cx, productCompare } = this.props
    const { productDetailInfo, visibleCompareOverCountModal, loading } = this.state
    const iframe = this.iframe.current
    if (iframe && iframe.contentWindow && productDetailInfo && productDetailInfo.html) {
      iframe.contentWindow.document.open()
      iframe.contentWindow.document.write(productDetailInfo.html)
      iframe.contentWindow.document.close()
    }
    return (
      <>
        <iframe ref={this.iframe} />
        <div className={cx('button_compare_cart')} onClick={this.handleAddCompareList}>
          <Icon type="shopping" style={{ zoom: '6' }} />
          <br />
          비교함
          <br />
          담기
        </div>
        <div className={cx('bottom_button_wrap')}>
          <Button.Group style={{ width: '100%' }}>
            <Button>재고조회</Button>
            <Link to="/app/product/compare/list">
              <Button>비교하기</Button>
            </Link>
          </Button.Group>
        </div>
        <Modal
          visible={visibleCompareOverCountModal}
          title="상품 비교함 담기"
          onOk={this.addCompareList}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              href="javascript:void(0)"
              onClick={this.addCompareList}
            >
              Submit
            </Button>,
          ]}
        >
          <span>비교함에 이미 세개의 상품이 담겨 있습니다.</span>
          <br />
          <span>계속 진행하시면, 처음 담긴 상품이 지워지게 됩니다.</span>
          <br />
          <br />
          {productCompare.compareList.map((product, index) => (
            <div key={`product_compare_list_${index}`}>
              <span>
                {index + 1}. {product.name}
              </span>
              <br />
            </div>
          ))}
        </Modal>
      </>
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
)(styling(s)(ProductDetail))
