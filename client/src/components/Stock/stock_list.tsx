import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { match } from 'react-router'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { getStoreStockList } from 'common/services/stock'
import { Store } from 'common/types/entities/store'
import { DynamicCx } from 'common/types'
import { Table } from 'antd'
import StoreDetail from './stock_storedetail'
import { StockSearchParamsState } from './ducks/stockSearchParams'
import { styling } from 'common/utils'
import * as s from './stock.scss'

interface OwnProps {
  cx?: DynamicCx
  match?: match
}

interface StateProps {
  layoutTitle: LayoutTitleState
  stockSearchParamsState: StockSearchParamsState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

interface OwnState {
  storeList: Store[]
}

type Props = OwnProps & StateProps & DispatchProps

const columns = [
  { title: '매장코드/명', dataIndex: 'exposeStoreName', key: 'exposeStoreName' },
  { title: '전화번호', dataIndex: 'phoneNumber', key: 'phoneNumber' },
  { title: '거리', dataIndex: 'distance', key: 'distance' },
  { title: '가용수량', dataIndex: 'remainStock', key: 'remainStock' },
]
class StockList extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      storeList: [],
    }
  }

  async componentDidMount() {
    this.props.updateLayoutTile('재고조회')
    if (this.props.match && this.props.match.params && this.props.match.params['goodsCode']) {
      this.props.stockSearchParamsState.stock.goodsCode = this.props.match.params['goodsCode']
      this.props.stockSearchParamsState.stock.distance = '30'
    }

    console.log(`goods = ${this.props.stockSearchParamsState.stock.goodsCode}`)
    console.log(`distance = ${this.props.stockSearchParamsState.stock.distance}`)
    console.log(`address = ${this.props.stockSearchParamsState.stock.address}`)

    const storeList = await getStoreStockList(this.props.stockSearchParamsState.stock)
    this.setState({ storeList: this.state.storeList.concat(storeList) })
  }

  getStoreDetail = storeCode => {
    return <StoreDetail storeCode={storeCode} />
  }

  render() {
    const { cx } = this.props
    const { storeList } = this.state

    return (
      <>
        <div className={cx('grid-head')}>
          <Table
            columns={columns}
            rowKey={record => record.storeCode}
            pagination={false}
            expandedRowRender={record => this.getStoreDetail(record.storeCode)}
            dataSource={storeList}
          />
        </div>
      </>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    layoutTitle: state.layoutTitle,
    stockSearchParamsState: state.stockSearchParams,
  }),
  {
    updateLayoutTile,
  },
)(styling(s)(StockList))
