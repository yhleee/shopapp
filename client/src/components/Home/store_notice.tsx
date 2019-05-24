import * as React from 'react'
import { Carousel } from 'antd'
import axios from 'axios'
import { isEmpty } from 'lodash-es'
import { styling } from 'common/utils'
import * as s from './home.scss'

const apiUrl = 'http://localhost:9090/api/test/db/noticeList55'

interface OwnProps {}
interface OwnState {
  noticeList: []
}

class getStoreNoticeList extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      noticeList: [],
    }
  }

  async componentDidMount() {
    let { data: noticeList } = await axios.get(apiUrl)
    this.setState({ noticeList })
  }

  render() {
    const { noticeList } = this.state

    if (!isEmpty(noticeList)) {
      return (
        <Carousel autoplay dots={false}>
          {this.state.noticeList.map(noticeList => <p>{noticeList.text}</p>)}
        </Carousel>
      )
    } else {
      return <></>
    }
  }
}

export default styling(s)(getStoreNoticeList)
