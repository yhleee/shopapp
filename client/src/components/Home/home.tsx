import * as React from 'react'
import { Layout, Card, Icon, List, Avatar, Carousel, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
const { Meta } = Card
interface OwnProps {}

interface OwnState {}

const { Header, Content } = Layout
class Olive extends React.Component<OwnProps, OwnState> {
  render() {
    const dividingStyle = {
      borderBottom: '1px solid lightgray',
      paddingBottom: 10,
      marginBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
    }
    const imgTagStyle = {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 10,
    }
    const textStyle = {
      color: 'black',
    }
    const listDataSample = [
      {
        title: '내 피부에 꼭 맞는 상품은?',
        icon: 'Home',
        desc: '문진을 통해 내 피부를 알아보세요',
        href: '/app/example',
      },
      {
        title: 'Best 상품',
        icon: 'Home',
        desc: '핵인싸의 길, 핵인싸템, 인싸 명소, 매장 Best 상품',
        href: '/app/survey',
      },
      {
        title: '상품 검색',
        icon: 'Home',
        desc: '올리브영에서 가장 먼저 만나는 신상!고객님 찾는 상품을 쉽고 빠르게 검색하자!',
        href: '/app/example',
      },
      {
        title: '타매장 재고 조회',
        icon: 'Home',
        desc: '<p>고객님이 찾는 재고가 없다구요? 걱정 노노~</p><p>근처매장에서 재고를 찾아보세요 :)</p>',
        href: '/app/survey',
      },
    ]

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
          <Carousel autoplay>
            <Link to="/app/example">
              <Row type="flex" justify="start" style={textStyle}>
                <Col
                  span={22}
                  style={{
                    fontSize: '30px',
                    paddingLeft: '20px',
                  }}
                >
                  공지사항 1
                </Col>
                <Col
                  span={2}
                  style={{
                    fontSize: '30px',
                    color: 'black',
                    textAlign: 'right',
                    paddingRight: '20px',
                  }}
                >
                  <Icon type="right" />
                </Col>
              </Row>
            </Link>
            <Link to="/app/test/axios">
              <Row type="flex" justify="start" style={textStyle}>
                <Col
                  span={22}
                  style={{
                    fontSize: '30px',
                    paddingLeft: '20px',
                  }}
                >
                  두번째 공지사항
                </Col>
                <Col
                  span={2}
                  style={{
                    fontSize: '30px',
                    color: 'black',
                    textAlign: 'right',
                    paddingRight: '20px',
                  }}
                >
                  <Icon type="right" />
                </Col>
              </Row>
            </Link>
          </Carousel>
          <List
            grid={{
              gutter: 16,
            }}
            size="large"
            itemLayout="horizontal"
            dataSource={listDataSample}
            renderItem={item => (
              <Link to={item.href}>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar width={50} height={50} src="/images/oylogo.png" />}
                    title={item.title}
                    description={item.desc}
                  />
                </List.Item>
              </Link>
            )}
          />
        </Content>
      </Layout>
    )
  }
}

export default Olive
