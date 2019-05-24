import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, resetLayoutTitle } from '../Layout/ducks/LayoutTitle'
import Notice from './notice'
import MenuList from './menu_list'
import StoreNotice from './store_notice'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './home.scss'

interface OwnProps {
  cx?: DynamicCx
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  resetLayoutTitle: typeof resetLayoutTitle
}

type Props = OwnProps & StateProps & DispatchProps

const Home: React.FC<Props> = ({ cx, resetLayoutTitle }) => {
  resetLayoutTitle()
  return (
    <>
      <StoreNotice />
      <Notice />
      <MenuList />
    </>
  )
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    layoutTitle: state.layoutTitle,
  }),
  {
    resetLayoutTitle,
  },
)(styling(s)(Home))
