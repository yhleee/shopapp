import * as React from 'react'
import { DynamicCx } from 'common/types'
import { CategoryFormResult } from 'common/types/entities/search'
import { Category } from 'common/types/entities/category'
import { Tag, Card, Radio, Divider } from 'antd'
import { SearchOptionRange, SearchOptionTerm, SearchPage } from 'common/types/enum/searchOptions'
import { ListType } from 'common/types/enum/exposeType'
import { getCategoryList } from '../../../common/services/category'

const { CheckableTag } = Tag

interface OwnProps {
  cx?: DynamicCx
  type: string
  handleParams: Function
}

interface OwnState {
  selectForm: CategoryFormResult
  categories: Category[]
}

type Props = OwnProps

class FormCategory extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    let initCategoryId = '1'
    let initCategoryName = '기초화장품'
    if (this.props.type !== SearchPage.RANKING) {
      initCategoryId = ''
      initCategoryName = ''
    }
    this.state = {
      selectForm: {
        range: SearchOptionRange.COMPANY,
        term: SearchOptionTerm.WEEK,
        firstCategoryId: initCategoryId,
        firstCategoryName: initCategoryName,
        secondCategoryId: null,
        secondCategoryName: null,
        thirdCategoryId: null,
        thirdCategoryName: null,
      },
      categories: [],
    }
  }

  async componentDidMount() {
    this.props.handleParams(this.state.selectForm)
    const categoryList = await getCategoryList()
    this.setState({ ...this.state, categories: this.state.categories.concat(categoryList) })
  }

  handleSearchRange = (event: any) => {
    const selectForm = this.state.selectForm
    selectForm.range = event.target.value
    this.props.handleParams(selectForm)
    this.setState({ selectForm })
  }

  handleSearchTerm = (event: any) => {
    const selectForm = this.state.selectForm
    selectForm.term = event.target.value
    this.props.handleParams(selectForm)
    this.setState({ selectForm })
  }

  handleFirstCategoryChange = (id: string, name: string) => () => {
    const selectForm = this.state.selectForm
    if (this.props.type !== SearchPage.RANKING && selectForm.firstCategoryId === id) {
      selectForm.firstCategoryId = null
      selectForm.firstCategoryName = null
    } else {
      selectForm.firstCategoryId = id
      selectForm.firstCategoryName = name
    }
    selectForm.secondCategoryId = null
    selectForm.secondCategoryName = null
    selectForm.thirdCategoryId = null
    selectForm.thirdCategoryName = null
    this.props.handleParams(selectForm)
    this.setState({ selectForm })
  }

  handleSecondCategoryChange = (id: string, name: string) => () => {
    const selectForm = this.state.selectForm
    if (selectForm.secondCategoryId === id) {
      selectForm.secondCategoryId = null
      selectForm.secondCategoryName = null
    } else {
      selectForm.secondCategoryId = id
      selectForm.secondCategoryName = name
    }
    selectForm.thirdCategoryId = null
    selectForm.thirdCategoryName = null
    this.props.handleParams(selectForm)
    this.setState({ selectForm })
  }

  handleThirdCategoryChange = (id: string, name: string) => () => {
    const selectForm = this.state.selectForm
    if (selectForm.thirdCategoryId === id) {
      selectForm.thirdCategoryId = null
      selectForm.thirdCategoryName = null
    } else {
      selectForm.thirdCategoryId = id
      selectForm.thirdCategoryName = name
    }
    this.props.handleParams(selectForm)
    this.setState({ selectForm })
  }

  render() {
    const { cx } = this.props
    const { selectForm } = this.state
    const { term, range, firstCategoryId, secondCategoryId, thirdCategoryId } = selectForm
    let secondCategories: Category[] = null
    this.state.categories.forEach(category => {
      if (category.categoryId === firstCategoryId) {
        secondCategories = category['category']
      }
    })
    let thirdCategories: Category[] = null
    secondCategories &&
      secondCategories.forEach(category => {
        if (category.categoryId === secondCategoryId) {
          thirdCategories = category['category']
        }
      })

    return (
      <div style={{ zoom: 2 }}>
        {this.props.type === ListType.RANKING && (
          <>
            <Divider>조회 범위</Divider>
            <div style={{ width: '100%', padding: '8px 10px', textAlign: 'center' }}>
              <Radio.Group defaultValue={range} buttonStyle="solid" size="large" onChange={this.handleSearchRange}>
                <Radio.Button value={SearchOptionRange.COMPANY}>전사</Radio.Button>
                <Radio.Button value={SearchOptionRange.SHOP}>매장</Radio.Button>
              </Radio.Group>
              &nbsp;|&nbsp;
              <Radio.Group defaultValue={term} buttonStyle="solid" size="large" onChange={this.handleSearchTerm}>
                <Radio.Button value={SearchOptionTerm.WEEK}>주간</Radio.Button>
                <Radio.Button value={SearchOptionTerm.MONTH}>월간</Radio.Button>
              </Radio.Group>
            </div>
          </>
        )}
        <Divider>대분류 카테고리</Divider>
        <div style={{ width: 'max-contents', overflowX: 'scroll', overflowY: 'hidden', display: 'flex' }}>
          {this.state.categories.map((category, index) => (
            <Card
              hoverable
              style={{
                width: 120,
                backgroundColor: `${selectForm.firstCategoryId === category.categoryId ? '#1890ff' : ''}`,
              }}
              cover={<img alt={category.categoryName} src={category.categoryImage} style={{ width: '100px' }} />}
              key={`${category.categoryId}_${index}`}
              onClick={this.handleFirstCategoryChange(category.categoryId, category.categoryName)}
            >
              <span style={{ fontSize: '10px' }}>{category.categoryName}</span>
            </Card>
          ))}
        </div>
        {secondCategories && <Divider>중분류 카테고리</Divider>}
        <div style={{ padding: '5px 8px', lineHeight: '30px' }}>
          {secondCategories &&
            secondCategories.map((category: Category, index: number) => (
              <CheckableTag
                key={`${category.categoryId}_${index}`}
                checked={secondCategoryId === category.categoryId}
                onChange={this.handleSecondCategoryChange(category.categoryId, category.categoryName)}
              >
                {category.categoryName}
              </CheckableTag>
            ))}
        </div>

        {thirdCategories && <Divider>소분류 카테고리</Divider>}
        <div style={{ padding: '5px 8px', lineHeight: '30px' }}>
          {thirdCategories &&
            thirdCategories.map((category: Category, index: number) => (
              <CheckableTag
                key={`${category.categoryId}_${index}`}
                checked={thirdCategoryId === category.categoryId}
                onChange={this.handleThirdCategoryChange(category.categoryId, category.categoryName)}
              >
                {category.categoryName}
              </CheckableTag>
            ))}
        </div>
      </div>
    )
  }
}

export default FormCategory
