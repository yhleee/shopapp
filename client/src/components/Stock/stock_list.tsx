import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as queryString from 'query-string'
import * as s from './stock.scss'

interface OwnProps {
  cx?: DynamicCx
  location?: Location
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

type Props = OwnProps & StateProps & DispatchProps

class StockList extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.updateLayoutTile('재고조회')
  }

  render() {
    const { cx, location } = this.props

    const queryParams = queryString.parse(location.search)
    console.log(queryParams)

    return (
      <>
        <div className={cx('test-class')}>
          <p>{queryParams['distance']}</p>
          <p>{queryParams['address']}</p>
          <p>{queryParams['searchword']}</p>
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
