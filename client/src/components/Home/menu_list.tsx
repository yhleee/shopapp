import * as React from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import { Notice } from '../../common/types/entities/notice'
import { isEmpty } from 'lodash-es'
import { getHomeMenuList } from '../../common/services/home'
import * as s from './home.scss'

interface OwnProps {
  cx?: DynamicCx
}
interface OwnState {
  menuList: Notice[]
}

class GetHomeMenuList extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      menuList: [],
    }
  }

  async componentDidMount() {
    const menuList = await getHomeMenuList()
    this.setState({ menuList })
  }

  render() {
    const { menuList } = this.state

    if (!isEmpty(menuList)) {
      return (
        <List
          size="large"
          itemLayout="horizontal"
          dataSource={menuList}
          renderItem={item => (
            <Link to={item.linkUrl}>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size={50} src={item.logo} />}
                  style={{ marginLeft: '10px', marginRight: '10px', padding: '10px', height: '150px', zoom: 1.5 }}
                  title={item.title}
                  description={item.subTitle}
                />
              </List.Item>
            </Link>
          )}
        />
      )
    }
    return <></>
  }
}

export default styling(s)(GetHomeMenuList)
