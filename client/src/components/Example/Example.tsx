import * as React from 'react'
import { Icon, Layout, Menu } from 'antd'
import { SelectParam } from 'antd/lib/menu'

const { Content, Sider } = Layout

interface OwnState {
  target: any
}

export default class Example extends React.Component<any, OwnState> {
  notice = <>컴포넌트 예제</>

  keys = {}

  constructor(props) {
    super(props)

    this.state = {
      target: this.notice,
    }
  }

  handleSelect = (param: SelectParam) => {
    if (param.key === 'Notice') {
      this.setState({
        target: this.notice,
      })
      return
    }
    this.setState({
      target: this.keys[param.key],
    })
  }

  render() {
    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu mode="inline" onSelect={this.handleSelect} defaultSelectedKeys={['Notice']} />
        </Sider>
        <Layout style={{ padding: '5px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 600 }}>{this.state.target}</Content>
        </Layout>
      </Layout>
    )
  }
}
