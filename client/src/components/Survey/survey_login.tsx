import * as React from 'react'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './survey.scss'
import { match } from 'react-router'
import { History } from 'history'
import { Col, Row } from 'antd'
import { sclog } from '../../common/clickLog'
import { SurveyParamsState, resetSurveyParams, updateSurveyParams } from './ducks/surveyParams'
import { connect } from 'react-redux'
import { RootState } from '../../common/reducer'

interface OwnProps {
  cx?: DynamicCx
  match?: match
  history?: History
}

interface StateProps {
  surveyParams: SurveyParamsState
}

interface DispatchProps {
  resetSurveyParams: typeof resetSurveyParams
  updateSurveyParams: typeof updateSurveyParams
}

type Props = OwnProps & StateProps & DispatchProps

interface OwnState {}

class SurveyLogin extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.surveyParams.survey.age = 0
    this.props.surveyParams.survey.gender = 'n'
    this.props.surveyParams.survey.score1 = 0
    this.props.surveyParams.survey.score2 = 0
    this.props.surveyParams.survey.score3 = 0
  }

  handleAgeChange = e => {
    this.props.surveyParams.survey.age = e.target.value
  }

  handleGenderChange = e => {
    this.props.surveyParams.survey.gender = e.target.value
  }

  goListPage = () => {
    console.log(`age = ${this.props.surveyParams.survey.age}`)
    console.log(`gen = ${this.props.surveyParams.survey.gender}`)
    if (this.props.surveyParams.survey.age < 10 || this.props.surveyParams.survey.gender === 'n') {
      alert('나이와 성별은 필수 값 입니다.')
      return
    }
    this.props.history.push('/app/survey/page/1')
  }

  render() {
    const { cx } = this.props
    const age = []
    for (let i = 10; i < 61; i = i + 1) {
      age.push(i)
    }
    return (
      <>
        <div className={cx('content-wrap')}>
          <div className={cx('logo-wrap')}>
            <img src="/images/logo_title.png" alt="logo" onClick={sclog('layout.title')} />
          </div>

          <div className={cx('title-area')}>
            <p className={cx('title')}>내 피부에 꼭 맞는 상품은?</p>
            <p className={cx('subtitle')}>문진을 통해 내 피부를 알아보세요</p>
          </div>

          <Row>
            <Col span={12}>
              <p className={cx('div-name')}>나이</p>
              <select className={cx('select-box')} onChange={this.handleAgeChange} defaultValue={'0'}>
                <option key="default" className={cx('option')} value={'0'}>
                  선택
                </option>
                {age.map((age, i) => (
                  <option key={i} className={cx('option')} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </Col>
            <Col span={12}>
              <p className={cx('div-name')}>성별</p>
              <select className={cx('select-box')} onChange={this.handleGenderChange} defaultValue="n">
                <option className={cx('option')} value="n">
                  선택
                </option>
                <option className={cx('option')} value="f">
                  여자
                </option>
                <option className={cx('option')} value="m">
                  남자
                </option>
              </select>
            </Col>
          </Row>
          <div className={cx('footer-wrap')} onClick={this.goListPage}>
            <div className={cx('search-button')}>조회</div>
          </div>
        </div>
      </>
    )
  }
}
export default connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    surveyParams: state.surveyParams,
  }),
  {
    resetSurveyParams,
    updateSurveyParams,
  },
)(styling(s)(SurveyLogin))
