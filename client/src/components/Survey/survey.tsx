import * as React from 'react'
import { Layout, Steps, Button, message, List, Radio } from 'antd'
import { Link } from 'react-router-dom'

interface OwnProps {}

interface OwnState {
  current: number
}

const Step = Steps.Step
const RadioGroup = Radio.Group

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

const { Header, Content } = Layout
class Survey extends React.Component<OwnProps, OwnState> {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    }
  }

  next = () => {
    const current = this.state.current + 1
    this.setState({ current })
  }

  prev() {
    const current = this.state.current - 1
    this.setState({ current })
  }

  render() {
    const imgTagStyle = {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 10,
    }

    const { current } = this.state
    return (
      <Layout>
        <Header>
          <img
            src="http://image.oliveyoung.co.kr/pc-static-root/image/comm/h1_logo.png"
            alt="logo"
            style={imgTagStyle}
          />
        </Header>
        <Content>
          <div>
            <Steps current={current}>{steps.map(item => <Step key={item.title} title={item.title} />)}</Steps>
            <div className="steps-content">
              <p style={{ fontSize: '60px', textAlign: 'center' }}>{steps[current].subtitle}</p>
              <List
                grid={{
                  gutter: 16,
                }}
                size="large"
                itemLayout="horizontal"
                dataSource={steps[current].questions}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta title={item.title} />
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
            </div>
            <div className="steps-action">
              {current < steps.length - 1 && (
                <Button type="primary" href={'javascript:void(0)'} onClick={this.next}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" href={'javascript:void(0)'} onClick={message.success('Processing complete!')}>
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ marginLeft: 8 }} onClick={this.prev}>
                  Previous
                </Button>
              )}
            </div>
          </div>
          <div>
            <Button type="primary" href={'javascript:void(0)'} onClick={window.history.back}>
              뒤로가기
            </Button>
          </div>
        </Content>
      </Layout>
    )
  }
}

export default Survey
