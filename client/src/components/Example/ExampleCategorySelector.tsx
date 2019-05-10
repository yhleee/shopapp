import * as React from 'react'
import { Icon, Button } from 'antd'
import logger from 'common/logger'
import VerticalSelectBox from '../common/Category/VerticalSelectBox'
import { StoreCategorySelectBox, ProductCategorySelectBox, MenuSelectBox } from '../common/Category/CategorySelectBox'
import { VerticalType, SubVerticalType } from 'common/types/entities/generated'

class ExampleCategorySelector extends React.Component<any, any> {
  constructor(props) {
    super(props)

    this.state = {
      vertical: VerticalType.STYLE,
      subVertical: SubVerticalType.FASHION_BRAND,
      categoryId: '10048',
      productCategoryId: '50001100',
    }
  }

  handleCategory = result => {
    logger.debug('onChanged', result)
  }

  handleVertical = result => {
    logger.debug('onChanged', result)
  }

  handleChange = () => {
    this.setState({
      vertical: VerticalType.LIVING,
      subVertical: SubVerticalType.HOME_LIVING,
      categoryId: '10033004',
      productCategoryId: '50004007',
    })
  }

  render() {
    return (
      <>
        <Button onClick={this.handleChange}>변경</Button>

        <div style={{ marginTop: '10px' }}>
          <h3>
            <Icon type="right-circle-o" /> 버티컬 셀렉터
          </h3>
          <VerticalSelectBox onChange={this.handleVertical} />
        </div>

        <div style={{ marginTop: '10px' }}>
          <h3>
            <Icon type="right-circle-o" /> 스토어카테고리 셀렉터
          </h3>
          <StoreCategorySelectBox onChange={this.handleCategory} categoryId={this.state.categoryId} />
        </div>

        <div style={{ marginTop: '10px' }}>
          <h3>
            <Icon type="right-circle-o" /> 버티컬 > 스토어카테고리 셀렉터
          </h3>
          <StoreCategorySelectBox
            onChange={this.handleCategory}
            useSelectVertical={true}
            vertical={this.state.vertical}
            subVertical={this.state.subVertical}
            categoryId={this.state.categoryId}
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <h3>
            <Icon type="right-circle-o" /> 상품카테고리 셀렉터
          </h3>
          <ProductCategorySelectBox onChange={this.handleCategory} categoryId={this.state.productCategoryId} />
        </div>

        <div style={{ marginTop: '10px' }}>
          <h3>
            <Icon type="right-circle-o" /> 버티컬 > 상품카테고리 셀렉터
          </h3>
          <ProductCategorySelectBox onChange={this.handleCategory} useSelectVertical={true} />
        </div>

        <div style={{ marginTop: '10px' }}>
          <h3>
            <Icon type="right-circle-o" /> 메뉴
          </h3>
          <MenuSelectBox onChange={this.handleCategory} useSelectVertical={true} />
        </div>
      </>
    )
  }
}

export default ExampleCategorySelector
