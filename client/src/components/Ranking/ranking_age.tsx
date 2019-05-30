import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './ranking.scss'
import { AgeFormResult } from 'common/types/entities/search'
import { Button, Radio } from 'antd'
import FormCategory from 'components/common/FormCategory'
import { SearchPage, AgeGroup, Gender } from 'common/types/enum/searchOptions'

enum ParameterType {
  AGE = 'AGE',
  GENDER = 'GENDER',
}

interface OwnProps {
  cx?: DynamicCx
  handleParams: Function
}

interface StateProps {
  layoutTitle: LayoutTitleState
}

interface DispatchProps {
  updateLayoutTile: typeof updateLayoutTile
}

interface OwnState {
  searchParams: AgeFormResult
}

type Props = OwnProps & StateProps & DispatchProps

class RankingAge extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      searchParams: {
        age: AgeGroup.ALL,
        gender: Gender.ALL,
        category: {},
      },
    }
  }

  componentDidMount() {
    this.props.updateLayoutTile('그룹 RANKING')
  }

  handleFormParams = (type: ParameterType) => event => {
    const searchParams = this.state.searchParams
    if (type === ParameterType.AGE) {
      searchParams.age = event.target.value
    } else if (type === ParameterType.GENDER) {
      searchParams.gender = event.target.value
    }
    this.props.handleParams(searchParams)
    this.setState({ searchParams })
  }

  handleCategoryFormParams = categoryParams => {
    const searchParams = this.state.searchParams
    searchParams.category = categoryParams
    this.props.handleParams(searchParams)
    this.setState({ searchParams })
  }

  render() {
    const { cx } = this.props
    const { searchParams } = this.state
    return (
      <>
        <div style={{ textAlign: 'center', zoom: '2' }}>
          <Radio.Group value={searchParams.age} onChange={this.handleFormParams(ParameterType.AGE)}>
            <Radio.Button value={AgeGroup.ALL}>전체</Radio.Button>
            <Radio.Button value={AgeGroup.TEENAGER}>10대</Radio.Button>
            <Radio.Button value={AgeGroup.TWENTIES}>20대</Radio.Button>
            <Radio.Button value={AgeGroup.THIRTIES}>30대</Radio.Button>
            <Radio.Button value={AgeGroup.FORTIES}>40대↑</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{ textAlign: 'center', zoom: '2', margin: '10px 0' }}>
          <Radio.Group value={searchParams.gender} onChange={this.handleFormParams(ParameterType.GENDER)}>
            <Radio.Button value={Gender.ALL}>전체</Radio.Button>
            <Radio.Button value={Gender.WOMEN}>여성</Radio.Button>
            <Radio.Button value={Gender.MEN}>남성</Radio.Button>
          </Radio.Group>
        </div>
        <FormCategory type={SearchPage.RANKING} handleParams={this.handleCategoryFormParams} />
      </>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    layoutTitle: state.layoutTitle,
  }),
  {
    updateLayoutTile,
  },
)(styling(s)(RankingAge))
