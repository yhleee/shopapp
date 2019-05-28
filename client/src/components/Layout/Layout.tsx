import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { fetchLayoutTitle, LayoutTitleState, updateLayoutTile } from './ducks/LayoutTitle'
import { fetchLayoutButton, LayoutButtonState, updateLayoutButton } from './ducks/LayoutButton'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import { Drawer } from 'antd'
import * as s from './Layout.scss'
import PageNotFound from '../Error/PageNotFound'
import { clog, getDisplaySize, DisplayInfo } from 'common/clickLog'

interface OwnProps {
  cx?: DynamicCx
  children?: any
}

interface StateProps {
  layoutTitle: LayoutTitleState
  layoutButton: LayoutButtonState
}

interface DispatchProps {
  fetchLayoutTitle: typeof fetchLayoutTitle
  updateLayoutTile: typeof updateLayoutTile
  fetchLayoutButton: typeof fetchLayoutButton
  updateLayoutButton: typeof updateLayoutButton
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

  backButtonHandler = () => {
    window && window.history.back()
  }

  render() {
    const { cx, children, layoutTitle, layoutButton } = this.props
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
          {layoutTitle && layoutTitle.title && <div className={cx('back_button')} onClick={this.backButtonHandler} />}
          <div className={cx('menu')} onClick={this.toggleMenu} />
          <Drawer title="MENU" placement="right" closable={false} onClose={this.closeMenu} visible={this.state.visible}>
            <div className={cx('menu_list')}>
              <p>
                <Link to="/app/home">홈</Link>
              </p>
              <p>
                <Link to="/app/survey">셀프 문진</Link>
              </p>
              <p>
                <Link to="/app/ranking">랭킹</Link>
              </p>
              <p>
                <Link to="/app/search">상품 검색</Link>
              </p>
              <p>
                <Link to="/app/example">재고 조회</Link>
              </p>
            </div>
          </Drawer>
          {layoutButton && layoutButton.title ? (
            <div className={cx('footer_wrap')}>
              <div onClick={() => (location.href = layoutButton.url)} className={cx('bottom_btn')}>
                <strong>{layoutButton.title}</strong>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={cx('content_wrap')}>{children ? children : <PageNotFound />}</div>
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
    fetchLayoutTitle,
    updateLayoutTile,
    fetchLayoutButton,
    updateLayoutButton,
  },
)(styling(s)(Layout))
