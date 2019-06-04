import * as React from 'react'
import { Carousel } from 'antd'
import { axios } from '../../common/utils/ajax/axios'
import { isEmpty } from 'lodash-es'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './home.scss'

const apiUrl = '/api/test/db/noticeList'

interface OwnProps {
  cx?: DynamicCx
}
interface OwnState {
  noticeList: any[]
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
    const { cx } = this.props
    const { noticeList } = this.state

    if (!isEmpty(noticeList)) {
      return (
        <Carousel autoplay={true} dots={false}>
          {this.state.noticeList.map(noticeList => <p key="storeNoti">{noticeList.text}</p>)}
        </Carousel>
      )
    }
    return <></>
  }
}

export default styling(s)(GetStoreNoticeList)
