import * as React from 'react'
import { Steps } from 'antd'
import { DynamicCx } from '../../common/types'
import { SurveyParamsState } from './ducks/surveyParams'
import { connect } from 'react-redux'
import { RootState } from '../../common/reducer'
import { styling } from '../../common/utils'
import { History } from 'history'
import * as s from './survey.scss'
import { getSurveyQuestions } from '../../common/services/survey'

interface OwnProps {
  cx?: DynamicCx
  history?: History
}

interface StateProps {
  surveyParams: SurveyParamsState
}

interface DispatchProps {}

interface OwnState {
  page: number
}

type Props = OwnProps & StateProps & DispatchProps

const Step = Steps.Step

const steps = [
  {
    title: 'STEP1',
    content: 'First-content',
    subtitle: '01 유수분 체크하기',
    questions: [
      {
        number: '1-1',
        title: '세안 후 아무것도 안바르면 피부가 당겨요',
      },
      {
        number: '1-2',
        title: '피부각질이 자주 일어나는 편이에요',
      },
      {
        number: '1-3',
        title: '스킨케어 제품을 발라도 3~4시간 후면 피부가 건조해요',
      },
      {
        number: '1-4',
        title: '오후가 되면 이마와 볼 부분이 번들거려요',
      },
    ],
  },
  {
    title: 'STEP2',
    content: 'Second-content',
    subtitle: '02 민감도 체크하기',
    questions: [
      {
        number: '2-1',
        title: '화장품을 바꾸면 트러블이 생겨요',
      },
      {
        number: '2-2',
        title: '생리 전후나 스트레스 받을 때 뾰류지가 나요',
      },
      {
        number: '2-3',
        title: '자외선, 미세먼지, 환절기 등 외부 환경 요인에 따라 피부가 가렵거나 따가울 때가 있어요',
      },
    ],
  },
  {
    title: 'STEP3',
    content: 'Last-content',
    subtitle: '03 피부탄력 체크하기',
    questions: [
      {
        number: '3-1',
        title: '피부가 얇고 탄력이 없는 편이에요',
      },
      {
        number: '3-2',
        title: '눈가나 입가에 잔주름이 있어요',
      },
      {
        number: '3-3',
        title: '턱선이 쳐지거나, 얼굴라인이 무너진 느낌이에요',
      },
    ],
  },
]

class SurveyList extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
    }
  }

  async componentDidMount() {
    console.log(this.props.surveyParams.survey.age)
    console.log(this.props.surveyParams.survey.gender)

    // const surveyQuestions = await getSurveyQuestions('1')
  }

  next = () => {
    const page = this.state.page + 1
    this.setState({ page })
  }

  prev() {
    const page = this.state.page - 1
    this.setState({ page })
  }

  goResultPage = () => {
    this.props.history.push('/app/survey/loading')
  }

  render() {
    const { page } = this.state
    const { cx } = this.props

    return (
      <>
        <Steps current={page}>{steps.map(item => <Step key={item.title} title={item.title} />)}</Steps>
        <div className="steps-content">
          <p style={{ fontSize: '60px', textAlign: 'center' }}>{steps[page].subtitle}</p>

          {/*
          <List
            size="large"
            itemLayout="horizontal"
            dataSource={steps[page].questions}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={item.title} style={{display: 'block'}}/>

                <RadioGroup name={item.number} defaultValue={null}>
                  <Radio value={1}>1</Radio>
                  <Radio value={2}>2</Radio>
                  <Radio value={3}>3</Radio>
                  <Radio value={4}>4</Radio>
                  <Radio value={5}>5</Radio>
                </RadioGroup>
              </List.Item>
            )}
          />
          */}
        </div>
        <div className={cx('footer-wrap')} onClick={this.goResultPage}>
          <div className={cx('search-button')}>다음</div>
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
)(styling(s)(SurveyList))
