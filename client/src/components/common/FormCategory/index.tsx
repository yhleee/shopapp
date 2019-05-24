import * as React from 'react'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import { Category, CategoryFormResult } from 'common/types/entities/category'
import { Card, Radio, Divider } from 'antd'
import { SearchOptionRange, SearchOptionTerm } from 'common/types/enum/searchOptions'

const { Meta } = Card

interface OwnProps {
  cx?: DynamicCx
}

interface OwnState {
  selectForm: CategoryFormResult
}

type Props = OwnProps

const upperCategory: Category[] = [
  {
    id: '1',
    name: '기초화장품',
    imageUrl: 'http://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0000/A00000000330801ko.jpg?l=ko',
    defaut: true,
    subCategory: [
      {
        id: '6',
        name: '스킨케어',
        subCategory: [
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
    this.state = {
      selectForm: {
        range: null,
        term: null,
        firstCategoryId: null,
        secondCategoryId: null,
        thirdCategoryId: null,
      },
    }
  }

  handleSearchRange = (selectRange: SearchOptionRange) => {
    const selectForm = this.state.selectForm
    selectForm.range = selectRange
    this.setState({ selectForm })
  }

  handleSearchTerm = (selectTerm: SearchOptionTerm) => {
    const selectForm = this.state.selectForm
    selectForm.term = selectTerm
  }

  render() {
    const { cx } = this.props

    return (
      <div style={{ zoom: 2 }}>
        <Divider>조회 범위</Divider>
        <div style={{ width: '100%', padding: '8px 10px', textAlign: 'center' }}>
          <Radio.Group defaultValue={SearchOptionRange.COMPANY} buttonStyle="solid" size="large">
            <Radio.Button value={SearchOptionRange.COMPANY}>전사</Radio.Button>
            <Radio.Button value={SearchOptionRange.SHOP}>매장</Radio.Button>
          </Radio.Group>
          &nbsp;|&nbsp;
          <Radio.Group defaultValue={SearchOptionTerm.WEEK} buttonStyle="solid" size="large">
            <Radio.Button value={SearchOptionTerm.WEEK}>주간</Radio.Button>
            <Radio.Button value={SearchOptionTerm.MONTH}>월간</Radio.Button>
          </Radio.Group>
        </div>
        <Divider>대분류 카테고리</Divider>
        <div style={{ width: 'max-contents', overflowX: 'scroll', overflowY: 'hidden', display: 'flex' }}>
          {upperCategory.map((category, index) => (
            <Card
              hoverable
              style={{ width: 120 }}
              cover={<img alt={category.name} src={category.imageUrl} style={{ width: '100px' }} />}
              key={`${category.id}_${index}`}
            >
              <span style={{ fontSize: '10px' }}>{category.name}</span>
            </Card>
          ))}
        </div>
        <Divider>중분류 카테고리</Divider>

        <Divider>소분류 카테고리</Divider>
      </div>
    )
  }
}

export default FormCategory
