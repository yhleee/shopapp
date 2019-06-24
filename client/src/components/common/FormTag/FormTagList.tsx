import * as React from 'react'
import { DynamicCx } from '../../../common/types'
import { BrandParams } from '../../../common/types/entities/brand'
import FormTag from './FormTag'

interface OwnProps {
  cx?: DynamicCx
  callback: Function
  brandList: BrandParams[]
}

interface OwnState {}

class FormTagList extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    const { brandList, callback } = this.props
    if (brandList.length !== 0) {
      return (
        <li>
          {brandList && brandList.map(brand => <FormTag key={brand.brandCode} brand={brand} callback={callback} />)}
        </li>
      )
    }
    return <></>
  }
}

export default FormTagList
