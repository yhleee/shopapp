import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { match } from 'react-router'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { getStoreStockList } from 'common/services/stock'
import { DynamicCx } from 'common/types'
import { Table } from 'antd'
import StoreDetail from './stock_storedetail'
import { styling } from 'common/utils'
import * as queryString from 'query-string'
import * as s from './stock.scss'

interface OwnProps {
  cx?: DynamicCx
  location?: Location
  match?: match
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

interface OwnState {
  storeList: any[]
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
    const queryParams = queryString.parse(location.search)
    const storeList = await getStoreStockList(queryParams['goodsCode'])
    this.setState({ storeList: this.state.storeList.concat(storeList) })
  }

  getStoreDetail = storeCode => {
    return <StoreDetail storeCode={storeCode} />
  }

  render() {
    const { cx, location } = this.props
    const { storeList } = this.state
    const queryParams = queryString.parse(location.search)

    return (
      <>
        <div className={cx('grid-head')}>
          <Table
            columns={columns}
            rowKey={'1'}
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
  }),
  {
    updateLayoutTile,
  },
)(styling(s)(StockList))
