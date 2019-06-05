import * as React from 'react'
import { getStoreDetailInformation } from 'common/services/stock'
import { styling } from 'common/utils'
import * as s from './stock.scss'

interface OwnProps {
  storeCode?: string
}
interface OwnState {
  html: string
}

class StoreDetail extends React.Component<OwnProps, OwnState> {
  iframe: React.RefObject<HTMLIFrameElement>

  constructor(props) {
    super(props)
    this.state = {
      html: null,
    }
    this.iframe = React.createRef()
  }

  async componentDidMount() {
    const storeCode = this.props.storeCode
    const html = await getStoreDetailInformation(storeCode)
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
    return <iframe width="600px" height="400px" ref={this.iframe} />
  }
}

export default styling(s)(StoreDetail)
