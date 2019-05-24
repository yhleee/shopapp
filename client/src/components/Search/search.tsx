import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { LayoutButtonState, updateLayoutButton } from '../Layout/ducks/LayoutButton'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import SearchCond from './searchCond'
import * as s from './search.scss'

interface OwnProps {
  cx?: DynamicCx
}

interface StateProps {
  layoutTitle: LayoutTitleState
  layoutButton: LayoutButtonState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
  updateLayoutButton: typeof updateLayoutButton
}

type Props = OwnProps & StateProps & DispatchProps

class Search extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.updateLayoutTile('상품 검색')
    this.props.updateLayoutButton('조회', '/app/search/result/TEST&기초화장품')
  }

  render() {
    return (
      <>
        <SearchCond />
      </>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    layoutTitle: state.layoutTitle,
    layoutButton: state.layoutButton,
  }),
  {
    updateLayoutTile,
    updateLayoutButton,
  },
)(styling(s)(Search))
