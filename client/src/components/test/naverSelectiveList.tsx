import * as React from 'react'
import { connect } from 'react-redux'
import { getSelectiveDatas } from 'common/services/naverSelective'
import { Card } from 'antd'
import { fetch, reset, TestCountState } from './ducks/test'
import { RootState } from 'common/reducer'

const { Meta } = Card

interface StateProps {
  testCount: TestCountState
}

interface DispatchProps {
  fetch: typeof fetch
  reset: typeof reset
}

interface OwnState {
  selectiveData: Object
}

type Props = StateProps & DispatchProps

class NaverSelective extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)
    this.state = { selectiveData: {} }
  }

  async componentDidMount() {
    await this.setData()
  }

  async componentDidUpdate() {
    await this.setData()
  }

  setData = async () => {
    const selectiveData = await getSelectiveDatas()
    if (selectiveData) {
      this.setState({ selectiveData })
    }
  }

  handleCountUp = () => {
    const { fetch, testCount } = this.props
    let count = testCount.count
    fetch(count + 1)
  }

  handleCountReset = () => {
    const { reset } = this.props
    reset()
  }

  render() {
    const listData = this.state.selectiveData && this.state.selectiveData['list']
    return (
      <div>
        {listData &&
          listData.map((data, index) => {
            if (!data.representImagePathForWest) return
            return (
              <Card
                hoverable
                style={{ width: '90%', marginBottom: '10px' }}
                cover={<img alt={data.urlId} src={data.representImagePathForWest} />}
                key={`selective_data_${index}`}
              >
                <Meta title={data.urlId} description="NAVER Selective Item" />
              </Card>
            )
          })}
      </div>
    )
  }
}

export default connect<StateProps, DispatchProps, {}>(
  (state: RootState) => ({
    testCount: state.testCount,
  }),
  {
    fetch,
    reset,
  },
)(NaverSelective)
