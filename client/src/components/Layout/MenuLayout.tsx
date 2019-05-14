import * as React from 'react'
import { withRouter, Link } from 'react-router-dom'
import * as H from 'history'
import { Button, Icon, Layout, Menu } from 'antd'
const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

import PageNotFound from '../Error/PageNotFound'
import { MENU_LAYOUT_PARAM, findMenu, findMenuByPath, getNavigationList, parseKey } from './menuConfig'

interface OwnProps {
  children?: any
  location?: H.Location
}

interface OwnState {
  navigationKey: string
  menuGroupKey: string
  menuKey: string
  path: string
}

class MenuLayout extends React.Component<any, OwnState> {
  unlisten = null

  constructor(props: any) {
    super(props)
    this.state = {
      navigationKey: null,
      menuGroupKey: null,
      menuKey: null,
      path: null,
    }

    if (location.pathname === '/' || location.pathname === '/app/') {
      this.props.history.push(this.getMenuInfoFromPath(null).path + location.search)
    }
  }

  componentWillUnmount() {
    this.unlisten()
  }

  componentDidMount() {
    const { history, location } = this.props

    this.setState({
      ...this.getMenuInfoFromPath(location.pathname),
    })

    this.unlisten = history.listen((location, action) => {
      if (action === 'PUSH' && location.search.indexOf(MENU_LAYOUT_PARAM) < 0) {
        history.replace(location.pathname + (location.search.indexOf('?') >= 0 ? '&' : '?') + MENU_LAYOUT_PARAM)
      } else {
        this.setState({
          ...this.getMenuInfoFromPath(location.pathname),
        })
      }
    })
  }

  getMenuInfoFromPath(path) {
    const menu = findMenuByPath(path) || findMenu('0:0:0')
    const keys = parseKey(menu)

    return {
      navigationKey: keys.navigation,
      menuGroupKey: keys.menuGroup,
      menuKey: keys.menu,
      path: menu.path,
    }
  }

  handleSelectNavigation = event => {
    this.setState({
      ...this.state,
      navigationKey: event.key,
    })
  }

  handleOpenMenuGroup = openKeys => {
    if (openKeys.length > 0) {
      this.setState({
        ...this.state,
        menuGroupKey: openKeys[1],
      })
    }
  }

  handleMoveFullScreen = () => {
    window.location.href = this.state.path
  }

  render() {
    const { navigationKey, menuKey } = this.state

    if (!navigationKey || !menuKey) {
      return ''
    }

    const navigationList = getNavigationList().map(navigation => (
      <Menu.Item key={navigation.key}>{navigation.title}</Menu.Item>
    ))

    const getMenu = menu => (
      <Menu.Item key={menu.key}>
        <Link to={menu.path}>{menu.title}</Link>
      </Menu.Item>
    )
    const getMenuGroup = menuGroup => (
      <SubMenu
        key={menuGroup.key}
        title={
          <span>
            <Icon type="user" />
            {menuGroup.title}
          </span>
        }
      >
        {menuGroup.menus.map(getMenu)}
      </SubMenu>
    )

    const navigation = findMenu(navigationKey)
    const menuGroupList = navigation.menus.map(getMenuGroup)

    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[navigationKey]}
            style={{ lineHeight: '64px' }}
            onClick={this.handleSelectNavigation}
          >
            {navigationList}
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              selectedKeys={[menuKey]}
              defaultOpenKeys={navigation.menus.map(m => m.key)}
              openKeys={navigation.menus.map(m => m.key)}
              // onOpenChange={this.handleOpenMenuGroup}
              style={{ height: '100%', borderRight: 0 }}
            >
              {menuGroupList}
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Button
              style={{ margin: '10px 0px', width: 180, background: '#c1c1c1' }}
              onClick={this.handleMoveFullScreen}
            >
              전체화면 보기
            </Button>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 680 }}>
              {this.props.children ? this.props.children : <PageNotFound />}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(MenuLayout)
