import * as React from 'react'
import { Spin } from 'antd'
import { DynamicCx } from '../../common/types'
import { SurveyParamsState } from './ducks/surveyParams'
import { connect } from 'react-redux'
import { RootState } from '../../common/reducer'
import { styling } from '../../common/utils'
import { History } from 'history'
import * as s from './survey.scss'
import Icon from 'antd/lib/icon'

interface OwnProps {
  cx?: DynamicCx
  history?: History
}

interface StateProps {
  surveyParams: SurveyParamsState
}

interface DispatchProps {}

interface OwnState {}

type Props = OwnProps & StateProps & DispatchProps

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class SurveyLoading extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.surveyParams.survey.age)
    console.log(this.props.surveyParams.survey.gender)
    console.log(this.props.surveyParams.survey.score1)
    console.log(this.props.surveyParams.survey.score2)
    console.log(this.props.surveyParams.survey.score3)
    /*
      API 호출 & surveyResultProps에 셋팅
     */
    sleep(1500).then(() => {
      console.log('after sleep')
      // this.props.history.push('/app/home')
    })
  }

  render() {
    const { cx } = this.props
    const loadingBar = <Icon type="loading" style={{ fontSize: 50 }} spin={true} />

    return (
      <>
        <div className={cx('div-area')}>
          <Spin indicator={loadingBar} />
          <span className={cx('loading-text')}>피부타입 분석 중입니다</span>
        </div>
      </>
    )
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    surveyParams: state.surveyParams,
  }),
  {},
)(styling(s)(SurveyLoading))
