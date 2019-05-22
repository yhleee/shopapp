import * as React from 'react'
import { Layout, Row, Col, Card } from 'antd'
import { Link } from 'react-router-dom'
const { Meta } = Card

interface OwnProps {}

interface OwnState {}

const { Header, Content } = Layout
class Olive extends React.Component<OwnProps, OwnState> {
  render() {
    const imgTagStyle = {
      marginLeft: 'auto',
      display: 'block',
      marginRight: 'auto',
      marginBottom: 10,
    }
    const cardImgStyle = {
      padding: 30,
    }
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
          <Row gutter={16}>
            <Col span={12}>
              <Link to="/app/home">
                <Card
                  style={cardImgStyle}
                  cover={
                    <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                  }
                >
                  <Meta title="Card title" description="This is the description" />
                </Card>
              </Link>
            </Col>
            <Col span={12}>
              <Link to="/app/survey">
                <Card
                  style={cardImgStyle}
                  cover={
                    <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                  }
                >
                  <Meta title="Card title" description="This is the description" />
                </Card>
              </Link>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Olive
