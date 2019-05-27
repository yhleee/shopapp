import * as React from 'react'
import { Carousel } from 'antd'
import { axios } from '../../common/utils/ajax/axios'
import { isEmpty } from 'lodash-es'
import { styling } from 'common/utils'
import * as s from './home.scss'

const apiUrl = '/api/test/db/noticeList'

interface OwnProps {}
interface OwnState {
  noticeList: string[]
}

class GetStoreNoticeList extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      noticeList: [],
    }
  }

  async componentDidMount() {
    const { data: noticeList } = await axios.get(apiUrl)
    this.setState({ noticeList })
  }

  render() {
    const { noticeList } = this.state

    if (!isEmpty(noticeList)) {
      return (
        <Carousel autoplay dots={false}>
          {this.state.noticeList.map(noticeList => <p key="storeNoti">1{noticeList.text}</p>)}
        </Carousel>
      )
    } else {
      return <></>
    }
  }
}

export default styling(s)(GetStoreNoticeList)
