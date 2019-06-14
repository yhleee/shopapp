import * as React from 'react'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { UserInfoState } from '../Layout/ducks/UserInfo'
import { getShopNotice, putShopNotice } from 'common/services/notice'
import * as s from './store_notice.scss'
import { message, Input, Icon, Button } from 'antd'
import { ShopNotice } from 'common/types/entities/notice'
import { ResponseResult } from 'common/types/enum/response'
import { getDisplaySize } from 'common/utils/browserUtils'

interface OwnProps {
  cx?: DynamicCx
}

interface StateProps {
  userInfo: UserInfoState
}

interface DispatchProps {}

interface OwnState {
  shopNotice: ShopNotice
}

type Props = OwnProps & StateProps & DispatchProps

class StoreNotice extends React.Component<Props, OwnState> {
  storeNoticeEl: React.RefObject<HTMLSpanElement>
  storeNoticeWriteEl: React.RefObject<HTMLDivElement>
  currentInputText: string
  styleZoomValue: number
  styleMarginLeft: number
  scrollTransitionDuration: string
  intervalRefreshNotice: any
  intervalNoticeScroll: any

  constructor(props) {
    super(props)
    this.state = {
      shopNotice: null,
    }
    this.storeNoticeEl = React.createRef()
    this.storeNoticeWriteEl = React.createRef()
    this.currentInputText = ''
    this.styleZoomValue = 2
    this.styleMarginLeft = 50
    this.scrollTransitionDuration = '2s'
  }

  setNotice = async () => {
    const { storeCode } = this.props.userInfo
    if (storeCode) {
      const response = await getShopNotice(storeCode)
      if (response.result === ResponseResult.SUCCESS && response.contents) {
        const shopNotice = response.contents
        this.setState({ shopNotice })
      }
    }
  }

  addNotice = async (text: string) => {
    const { storeCode, id } = this.props.userInfo
    if (storeCode && id && text) {
      const response = await putShopNotice(storeCode, text, id)
      if (response && (response.status === 201 || response.status === 200)) {
        const shopNotice = await getShopNotice(storeCode)
        this.setState({ shopNotice })
        return true
      }
    }
    return false
  }

  getNoticeElementOffsetWidth = () => {
    try {
      return this.storeNoticeEl.current.offsetWidth
    } catch (e) {}
    return 0
  }

  getMaxMarginLeft = (clientWidth: number, offsetWidth: number) => {
    if (!offsetWidth || offsetWidth === 0) {
      return 0
    }
    try {
      const elWidth = offsetWidth * this.styleZoomValue
      return (clientWidth - elWidth) / this.styleZoomValue - this.styleMarginLeft
    } catch (e) {}
    return 0
  }

  scrollStoreNotice = () => {
    const displayInfo = getDisplaySize()
    const clientWidth = displayInfo.clientWidth
    try {
      const maxMarginLeft = this.getMaxMarginLeft(clientWidth, this.getNoticeElementOffsetWidth())
      this.storeNoticeEl.current.style.marginLeft = `${maxMarginLeft}px`
    } catch (e) {}
    let marginLeft = 0
    this.intervalNoticeScroll = setInterval(() => {
      try {
        this.storeNoticeEl.current.style.marginLeft = `${marginLeft}px`
        if (marginLeft === 0) {
          marginLeft = this.getMaxMarginLeft(clientWidth, this.getNoticeElementOffsetWidth())
        } else {
          marginLeft = 0
        }
      } catch (e) {
        console.log(e)
      }
    }, 3000)
  }

  toggleStoreNoticeWrite = () => {
    const inputWrapEl = this.storeNoticeWriteEl.current
    const display = inputWrapEl.style.display
    if (display === 'block') {
      inputWrapEl.style.marginTop = '-70px'
      inputWrapEl.style.opacity = '0'
      setTimeout(() => {
        inputWrapEl.style.display = 'none'
      }, 850)
    } else {
      inputWrapEl.style.display = 'block'
      setTimeout(() => {
        inputWrapEl.style.marginTop = '8px'
        inputWrapEl.style.opacity = '1'
      }, 100)
    }
  }

  handleChangeNoticeWrite = event => {
    this.currentInputText = event.target['value']
  }

  handleClickWrite = async () => {
    const text = this.currentInputText
    if (!text || (text != null && text.length === 0)) {
      message.error('매장공지를 작성 해 주세요.')
      return
    }
    if (await this.addNotice(text)) {
      message.success('등록되었습니다.')
      this.toggleStoreNoticeWrite()
    }
  }

  componentDidMount() {
    this.setNotice()
    this.intervalRefreshNotice = setInterval(() => {
      this.setNotice()
    }, 10000)
    this.scrollStoreNotice()
  }

  componentWillUnmount() {
    clearInterval(this.intervalRefreshNotice)
    clearInterval(this.intervalNoticeScroll)
  }

  render() {
    const { shopNotice } = this.state
    if (!shopNotice || !shopNotice.text) {
      return <div />
    }
    return (
      <div style={{ padding: '5px 10px', zoom: 2 }}>
        <div
          onClick={this.toggleStoreNoticeWrite}
          style={{
            width: '100%',
            overflow: 'hidden',
            border: 'solid grey 1px',
            borderRadius: '5px',
            padding: '5px 8px',
          }}
        >
          <span style={{ float: 'left' }}>
            <Icon type="notification" />
          </span>
          <div
            style={{
              float: 'left',
              width: '95%',
              overflow: 'hidden',
              marginLeft: '2px',
            }}
          >
            <span
              ref={this.storeNoticeEl}
              style={{
                width: 'max-content',
                whiteSpace: 'nowrap',
                padding: '5px 8px',
                transitionDuration: this.scrollTransitionDuration,
              }}
            >
              {shopNotice && shopNotice.text}
            </span>
          </div>
        </div>
        <div
          ref={this.storeNoticeWriteEl}
          style={{
            display: 'none',
            margin: '-70px 0 8px 0',
            textAlign: 'right',
            opacity: 0,
            transitionDuration: '1s',
          }}
        >
          <Input
            addonBefore={<Icon type="edit" />}
            placeholder="매장공지 작성"
            onChange={this.handleChangeNoticeWrite}
            style={{ zIndex: 2000 }}
          />
          <Button
            type="primary"
            block={true}
            href="javascript:void(0)"
            style={{
              marginTop: '5px',
            }}
            onClick={this.handleClickWrite}
          >
            매장공지 등록
          </Button>
        </div>
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    userInfo: state.userInfo,
  }),
  {},
)(styling(s)(StoreNotice))
