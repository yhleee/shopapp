import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/reducer'
import { LayoutTitleState, updateLayoutTile } from '../Layout/ducks/LayoutTitle'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './ranking.scss'
import { BrandFormResult } from 'common/types/entities/search'
import { Button, Radio } from 'antd'
import FormCategory from 'components/common/FormCategory'
import { SearchPage } from 'common/types/enum/searchOptions'

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
  searchParams: BrandFormResult
}

type Props = OwnProps & StateProps & DispatchProps

class RankingBrand extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      searchParams: {
        name: null,
        brand: null,
        category: {},
      },
    }
  }

  componentDidMount() {
    this.props.updateLayoutTile('브랜드 RANKING')
  }

  handleFormParams = event => {
    const searchParams = this.state
    // this.props.handleParams(searchParams)
    // this.setState({ searchParams })
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
)(styling(s)(RankingBrand))
