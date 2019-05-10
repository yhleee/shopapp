import * as React from 'react'
import CategoryPicker from '../common/CategoryPicker/CategoryPicker'
import { Category, CategoryType } from 'common/types'
import { mergeCategories, subtractCategories } from 'common/utils'
import { SubVerticalType } from '../../common/types/entities/generated'

interface OwnState {
  categories: Category[]
}

class ExampleCategoryPicker extends React.Component<any, OwnState> {
  constructor(props) {
    super(props)

    this.state = {
      categories: [],
    }
  }

  handleAddCategories = (selectedCategory, wholeCategories, categoryType) => {
    const categories = mergeCategories(this.state.categories, wholeCategories)
    this.setState({
      categories,
    })
  }

  handleRemoveCategories = (ids, categoryType) => {
    const categories = subtractCategories(this.state.categories, ids)
    this.setState({
      categories,
    })
  }

  render() {
    return (
      <>
        <CategoryPicker
          categoryType={CategoryType.PRODUCT}
          pickedCategories={this.state.categories}
          onAddCategories={this.handleAddCategories}
          onRemoveCategories={this.handleRemoveCategories}
        />
      </>
    )
  }
}

export default ExampleCategoryPicker
