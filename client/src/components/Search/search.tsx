import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import SearchCondition from './search_condition'
import * as s from './search.scss'

interface OwnProps {
  cx?: DynamicCx
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

type Props = OwnProps & StateProps & DispatchProps

class Search extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.updateLayoutTile('상품 검색')
  }

  render() {
    return (
      <>
        <SearchCondition />
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
)(styling(s)(Search))
