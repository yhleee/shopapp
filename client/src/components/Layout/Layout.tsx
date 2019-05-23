import * as React from 'react'

import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import { Icon, Button, Drawer } from 'antd'
import * as s from './Layout.scss'
import PageNotFound from '../Error/PageNotFound'

interface OwnProps {
  cx?: DynamicCx
  children?: any
}

interface OwnState {
  visible: boolean
}

class Layout extends React.Component<OwnProps, OwnState> {
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
    const { cx, children } = this.props
    return (
      <>
        <div className={cx('header_wrap')}>
          <div className={cx('logo_wrap')}>
            <img src="/images/logo_title.png" alt="logo" />
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

export default styling(s)(Layout)
