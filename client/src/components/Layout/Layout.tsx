import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { fetchLayoutTitle, LayoutTitleState, updateLayoutTile } from './ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import { Drawer } from 'antd'
import * as s from './Layout.scss'
import PageNotFound from '../Error/PageNotFound'

interface OwnProps {
  cx?: DynamicCx
  children?: any
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  fetchLayoutTitle: typeof fetchLayoutTitle
  updateLayoutTile: typeof updateLayoutTile
}

interface OwnState {
  visible: boolean
}

type Props = StateProps & OwnProps & DispatchProps

class Layout extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  openMenu = () => {
    this.setState({ visible: true })
  }

  closeMenu = () => {
    this.setState({ visible: false })
  }

  toggleMenu = () => {
    const { visible } = this.state
    if (visible) this.closeMenu()
    this.openMenu()
  }

  render() {
    const { cx, children, layoutTitle } = this.props
    return (
      <>
        <div className={cx('header_wrap')}>
          <div className={cx('logo_wrap')}>
            {layoutTitle && layoutTitle.title ? (
              <span className={cx('text_title')}>{layoutTitle.title}</span>
            ) : (
              <img src="/images/logo_title.png" alt="logo" />
            )}
          </div>
          <div className={cx('menu')} onClick={this.toggleMenu} />
          <Drawer title="MENU" placement="left" closable={false} onClose={this.closeMenu} visible={this.state.visible}>
            <p>menu1</p>
            <p>menu2</p>
            <p>menu3</p>
            <p>menu4</p>
            <p>menu5</p>
          </Drawer>
          <div style={{ width: '20%' }} />
        </div>
        <div className={cx('content_wrap')}>{children ? children : <PageNotFound />}</div>
      </>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    layoutTitle: state.layoutTitle,
  }),
  {
    fetchLayoutTitle,
    updateLayoutTile,
  },
)(styling(s)(Layout))
