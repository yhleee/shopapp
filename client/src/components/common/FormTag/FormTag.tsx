import * as React from 'react'
import CheckableTag from 'antd/lib/tag/CheckableTag'
import { DynamicCx } from '../../../common/types'
import { BrandParams } from '../../../common/types/entities/brand'

interface OwnProps {
  cx?: DynamicCx
  callback?: Function
  brand?: BrandParams
}

interface OwnState {}

class TagComponent extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.callback(this.props.brand)
  }

  handleChange = (checked: boolean) => {
    const brandParams = this.props.brand
    brandParams.checked = checked
    this.props.callback(this.props.brand)
  }

  render() {
    const { brand } = this.props
    return (
      <CheckableTag key={brand.brandCode} checked={brand.checked} onChange={this.handleChange}>
        {brand.brandName}
      </CheckableTag>
    )
  }
}
export default TagComponent
