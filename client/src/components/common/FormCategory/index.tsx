import * as React from 'react'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import { CategoryFormResult } from 'common/types/entities/search'
import { Category } from 'common/types/entities/category'
import { Tag, Card, Radio, Divider } from 'antd'
import { SearchOptionRange, SearchOptionTerm, SearchPage } from 'common/types/enum/searchOptions'
import { ListType } from 'common/types/enum/exposeType'
import { first } from 'lodash-es'

const { CheckableTag } = Tag

interface OwnProps {
  cx?: DynamicCx
  type: string
  handleParams: Function
}

interface OwnState {
  selectForm: CategoryFormResult
}

type Props = OwnProps

const categories: Category[] = [
  {
    id: '1',
    name: '기초화장품',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0000/A00000000330801ko.jpg?l=ko',
    defaut: true,
    subCategories: [
      {
        id: '6',
        name: '스킨케어',
        subCategories: [
          {
            id: '12',
            name: '스킨',
          },
          {
            id: '13',
            name: '로션',
          },
          {
            id: '14',
            name: '크림',
          },
          {
            id: '15',
            name: '에센스',
          },
        ],
      },
      {
        id: '7',
        name: '클렌징',
      },
      {
        id: '8',
        name: '마스크팩',
      },
      {
        id: '9',
        name: '썬케어',
      },
      {
        id: '10',
        name: '기초화장품',
      },
      {
        id: '11',
        name: '기타',
      },
    ],
  },
  {
    id: '2',
    name: '색조화장품',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0012/A00000012388101ko.jpg?l=ko',
    defaut: true,
  },
  {
    id: '3',
    name: '바디용품',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0012/A00000012483201ko.jpg?l=ko',
    defaut: true,
  },
  {
    id: '4',
    name: '헤어용품',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0001/A00000001630904ko.jpg?l=ko',
    defaut: true,
  },
  {
    id: '5',
    name: '프래그런스',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0012/A00000012470701ko.jpg?l=ko',
    defaut: true,
  },
]

class FormCategory extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    let initCateId = '1'
    if (this.props.type !== SearchPage.RANKING) {
      initCateId = ''
    }
    this.state = {
      selectForm: {
        range: SearchOptionRange.COMPANY,
        term: SearchOptionTerm.WEEK,
        firstCategoryId: initCateId,
        secondCategoryId: null,
        thirdCategoryId: null,
      },
    }
  }

  componentDidMount() {
    this.props.handleParams(this.state.selectForm)
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

  handleFirstCategoryChange = (id: string) => () => {
    const selectForm = this.state.selectForm
    if (this.props.type !== 'RANKING' && selectForm.firstCategoryId === id) {
      selectForm.firstCategoryId = ''
    } else {
      selectForm.firstCategoryId = id
    }
    selectForm.secondCategoryId = null
    selectForm.thirdCategoryId = null
    this.props.handleParams(selectForm)
    this.setState({ selectForm })
  }

  handleSecondCategoryChange = (id: string) => () => {
    const selectForm = this.state.selectForm
    selectForm.secondCategoryId = id
    selectForm.thirdCategoryId = null
    this.props.handleParams(selectForm)
    this.setState({ selectForm })
  }

  handleThirdCategoryChange = (id: string) => () => {
    const selectForm = this.state.selectForm
    selectForm.thirdCategoryId = id
    this.props.handleParams(selectForm)
    this.setState({ selectForm })
  }

  render() {
    const { cx } = this.props
    const { selectForm } = this.state
    const { term, range, firstCategoryId, secondCategoryId, thirdCategoryId } = selectForm
    let secondCategories: Category[] = null
    categories.forEach(category => {
      if (category.id === firstCategoryId) {
        secondCategories = category['subCategories']
      }
    })
    let thirdCategories: Category[] = null
    secondCategories &&
      secondCategories.forEach(category => {
        if (category.id === secondCategoryId) {
          thirdCategories = category['subCategories']
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
        <div style={{ width: 'max-contents', overflowX: 'scroll', overflowY: 'hidden', display: 'flex' }}>
          {categories.map((category, index) => (
            <Card
              hoverable
              style={{ width: 120, backgroundColor: `${selectForm.firstCategoryId === category.id ? '#1890ff' : ''}` }}
              cover={<img alt={category.name} src={category.imageUrl} style={{ width: '100px' }} />}
              key={`${category.id}_${index}`}
              onClick={this.handleFirstCategoryChange(category.id)}
            >
              <span style={{ fontSize: '10px' }}>{category.name}</span>
            </Card>
          ))}
        </div>
        {secondCategories && <Divider>중분류 카테고리</Divider>}
        <div style={{ padding: '5px 8px', lineHeight: '30px' }}>
          {secondCategories &&
            secondCategories.map((category: Category, index: number) => (
              <CheckableTag
                key={`${category.id}_${index}`}
                checked={secondCategoryId === category.id}
                onChange={this.handleSecondCategoryChange(category.id)}
              >
                {category.name}
              </CheckableTag>
            ))}
        </div>

        {thirdCategories && <Divider>소분류 카테고리</Divider>}
        <div style={{ padding: '5px 8px', lineHeight: '30px' }}>
          {thirdCategories &&
            thirdCategories.map((category: Category, index: number) => (
              <CheckableTag
                key={`${category.id}_${index}`}
                checked={thirdCategoryId === category.id}
                onChange={this.handleThirdCategoryChange(category.id)}
              >
                {category.name}
              </CheckableTag>
            ))}
        </div>
      </div>
    )
  }
}

export default FormCategory
