import * as React from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar } from 'antd'
import { axios } from '../../common/utils/ajax/axios'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import { Notice } from '../../common/types/entities/notice'
import { isEmpty } from 'lodash-es'
import * as s from './home.scss'

const apiUrl = '/api/test/db/homeMenuList'

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
    const { data: menuList } = await axios.get(apiUrl)
    this.setState({ menuList })
  }

  render() {
    const { menuList } = this.state

    if (!isEmpty(menuList)) {
      return (
        <List
          grid={{
            gutter: 16,
          }}
          size="large"
          itemLayout="horizontal"
          dataSource={menuList}
          renderItem={item => (
            <Link to={item.linkUrl}>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size={50} src={item.logo} />}
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
