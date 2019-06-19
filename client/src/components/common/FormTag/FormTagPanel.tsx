import * as React from 'react'
import { DynamicCx } from '../../../common/types'
import { BrandParams } from '../../../common/types/entities/brand'
import FormTagList from './FormTagList'

interface OwnProps {
  cx?: DynamicCx
  callback: Function
  brandList: BrandParams[]
}

interface OwnState {}

class FormTagPanel extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  genBrandArray = (brandList: BrandParams[]) => {
    let counter = 0
    const brandSliceList = []
    brandList.map((brand, index) => {
      if (index !== 0 && (index % 5 === 0 || index === brandList.length - 1)) {
        const sliceArr = brandList.slice(counter * 5, index)
        if (sliceArr !== null) {
          brandSliceList.push(sliceArr)
        }
        counter = counter + 1
      }
    })
    return brandSliceList
  }

  render() {
    const { brandList, callback } = this.props
    const brands = this.genBrandArray(brandList)
    if (brandList.length !== 0) {
      return (
        <div>
          <ul>
            {brands && brands.map((brand, index) => <FormTagList key={index} callback={callback} brandList={brand} />)}
          </ul>
        </div>
      )
    }
    return <></>
  }
}

export default FormTagPanel
