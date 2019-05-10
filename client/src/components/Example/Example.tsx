import * as React from 'react'
import { Icon, Layout, Menu } from 'antd'
import { SelectParam } from 'antd/lib/menu'

import ExampleCategorySelector from './ExampleCategorySelector'
import ExamplePhotoUploader from './ExamplePhotoUploader'
import ExampleCategoryPicker from './ExampleCategoryPicker'
import ExampleSearch from './ExampleSearch'
import ExampleThumbnailPhotoUploader from './ExampleThumbnailPhotoUploader'

const { Content, Sider } = Layout

interface OwnState {
  target: any
}

export default class Example extends React.Component<any, OwnState> {
  notice = <>컴포넌트 예제</>

  keys = {
    CategoryPicker: <ExampleCategoryPicker />,
    CategorySelector: <ExampleCategorySelector />,
    PhotoUploader: <ExamplePhotoUploader />,
    ExampleSearch: <ExampleSearch />,
    ThumbnailPhotoUploader: <ExampleThumbnailPhotoUploader />,
  }

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
          <Menu mode="inline" onSelect={this.handleSelect} defaultSelectedKeys={['Notice']}>
            <Menu.Item key="Notice">
              <Icon type="exclamation-circle" />
              <span>Notice</span>
            </Menu.Item>
            <Menu.Item key="ExampleSearch">
              <span>채널/브랜드 검색</span>
            </Menu.Item>
            <Menu.Item key="CategorySelector">
              <span>카테고리 셀렉터</span>
            </Menu.Item>
            <Menu.Item key="CategoryPicker">
              <span>카테고리 Picker</span>
            </Menu.Item>
            <Menu.Item key="PhotoUploader">
              <span>이미지 업로더</span>
            </Menu.Item>
            <Menu.Item key="ThumbnailPhotoUploader">
              <span>썸네일 이미지 업로더</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '5px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 600 }}>{this.state.target}</Content>
        </Layout>
      </Layout>
    )
  }
}
