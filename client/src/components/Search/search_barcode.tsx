import * as React from 'react'
import { styling } from 'common/utils'
import * as s from './search.scss'

const searchResultUrl = '/app/search/result/?'

interface OwnProps {}

interface OwnState {}

class SearchBarcode extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
  }

  goResultPage = barcodeValue => {
    const param = `searchword=${barcodeValue}`
    window.location.href = searchResultUrl + param
  }

  render() {
    return <></>
  }
}
export default styling(s)(SearchBarcode)
