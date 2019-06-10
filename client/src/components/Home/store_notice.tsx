import * as React from 'react'
import { Carousel } from 'antd'
import { isEmpty } from 'lodash-es'
import { Notice } from 'common/types/entities/notice'
import { getStoreNoticeList } from '../../common/services/home'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './home.scss'

interface OwnProps {
  cx?: DynamicCx
}
interface OwnState {
  noticeList: Notice[]
}

class GetStoreNoticeList extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      noticeList: [],
    }
  }

  async componentDidMount() {
    const noticeList = await getStoreNoticeList()
    this.setState({ noticeList })
  }

  render() {
    const { noticeList } = this.state

    if (!isEmpty(noticeList)) {
      return (
        <Carousel autoplay={true} dots={false}>
          {this.state.noticeList.map(noticeList => <p key="storeNoti">{noticeList.title}</p>)}
        </Carousel>
      )
    }
    return <></>
  }
}

export default styling(s)(GetStoreNoticeList)
