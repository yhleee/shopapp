import * as React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Carousel, Row, Col } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './home.scss'
import { identity } from 'lodash-es'

interface OwnProps {
  cx?: DynamicCx
}

const Notice: React.FC<OwnProps> = ({ cx }) => {
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
    <Carousel autoplay effect="fade">
      <Link to="/app/example">
        <Row type="flex" justify="start" className={cx('text')}>
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
        <Row type="flex" justify="start" className={cx('text')}>
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
  )
}

export default styling(s)(Notice)
