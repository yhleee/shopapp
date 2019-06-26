import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { fetchLayoutTitle, LayoutTitleState, updateLayoutTile } from './ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import { Drawer } from 'antd'
import { History } from 'history'
import * as s from './Layout.scss'
import PageNotFound from '../Error/PageNotFound'
import { sclog } from 'common/clickLog'
import { fetchUserInfo, resetUserInfo, UserInfoState } from './ducks/UserInfo'

interface OwnProps {
  cx?: DynamicCx
  children?: any
  history?: History
}

interface StateProps {
  layoutTitle: LayoutTitleState
  userInfo: UserInfoState
}

interface DispatchProps {
  fetchLayoutTitle: typeof fetchLayoutTitle
  updateLayoutTile: typeof updateLayoutTile
  fetchUserInfo: typeof fetchUserInfo
  resetUserInfo: typeof resetUserInfo
}

interface OwnState {
  visible: boolean
}

type Props = StateProps & OwnProps & DispatchProps

class Layout extends React.Component<Props, OwnState> {
  intervalRefreshUserInfo: any

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  componentDidMount() {
    this.props.fetchUserInfo()
    this.intervalRefreshUserInfo = setInterval(() => {
      this.props.fetchUserInfo()
    }, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalRefreshUserInfo)
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
    const { cx, children, layoutTitle } = this.props
    return (
      <>
        <div className={cx('header_wrap')}>
          <div className={cx('logo_wrap')}>
            {layoutTitle && layoutTitle.title ? (
              <span className={cx('text_title')}>{layoutTitle.title}</span>
            ) : (
              <img src="/images/logo_title.png" alt="logo" onClick={sclog('layout.title')} />
            )}
          </div>
          {layoutTitle && layoutTitle.title && <div className={cx('back_button')} onClick={this.backButtonHandler} />}

          {layoutTitle && layoutTitle.title && layoutTitle.title === '셀프 문진' ? (
            <div className={cx('survey_end')}>
              <button
                className={cx('end_btn')}
                onClick={() => (confirm('피부 분석을 중단 하시겠어요?') ? this.props.history.push('/app/home') : <></>)}
              >
                분석 종료
              </button>
            </div>
          ) : (
            <div className={cx('menu')} onClick={this.toggleMenu} />
          )}
          <Drawer title="MENU" placement="right" closable={false} onClose={this.closeMenu} visible={this.state.visible}>
            <div className={cx('menu_list')}>
              <p>
                <Link to="/app/home" onClick={this.closeMenu}>
                  홈
                </Link>
              </p>
              <p>
                <Link to="/app/survey" onClick={this.closeMenu}>
                  셀프 문진
                </Link>
              </p>
              <p>
                <Link to="/app/ranking" onClick={this.closeMenu}>
                  랭킹
                </Link>
              </p>
              <p>
                <Link to="/app/search" onClick={this.closeMenu}>
                  상품 검색
                </Link>
              </p>
              <p>
                <Link to="/app/stock" onClick={this.closeMenu}>
                  재고 조회
                </Link>
              </p>
            </div>
          </Drawer>
        </div>
        <div className={cx('content_wrap')}>{children ? children : <PageNotFound />}</div>
      </>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    layoutTitle: state.layoutTitle,
    userInfo: state.userInfo,
  }),
  {
    fetchLayoutTitle,
    updateLayoutTile,
    fetchUserInfo,
    resetUserInfo,
  },
)(styling(s)(withRouter(Layout)))
