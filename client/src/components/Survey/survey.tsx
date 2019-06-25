import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import { History } from 'history'
import * as s from './survey.scss'
import SurveyLogin from './survey_login'

interface OwnProps {
  cx?: DynamicCx
  history?: History
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

type Props = OwnProps & StateProps & DispatchProps

class Survey extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.updateLayoutTile('셀프 문진')
  }

  render() {
    const { cx, history } = this.props
    return (
      <>
        <SurveyLogin {...{ history }} />
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
)(styling(s)(Survey))
