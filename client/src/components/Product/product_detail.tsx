import * as React from 'react'
import { connect } from 'react-redux'
import { match } from 'react-router'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './product_detail.scss'
import { getProductDetailHtml } from 'common/services/product_detail'

interface OwnProps {
  cx?: DynamicCx
  match?: match
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

interface OwnState {
  html: string
}

type Props = OwnProps & StateProps & DispatchProps

class ProductDetail extends React.Component<Props, OwnState> {
  iframe: React.RefObject<HTMLIFrameElement>

  constructor(props) {
    super(props)
    this.state = {
      html: null,
    }
    this.iframe = React.createRef()
  }

  async componentDidMount() {
    this.props.updateLayoutTile('상품정보')
    const { params } = this.props.match
    const pid = params['pid']
    const html = await getProductDetailHtml(pid)
    this.setState({ html })
  }

  render() {
    const { html } = this.state
    const iframe = this.iframe.current
    if (iframe && iframe.contentWindow && html) {
      iframe.contentWindow.document.open()
      iframe.contentWindow.document.write(html)
      iframe.contentWindow.document.close()
    }
    return <iframe ref={this.iframe} />
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    layoutTitle: state.layoutTitle,
  }),
  {
    updateLayoutTile,
  },
)(styling(s)(ProductDetail))
