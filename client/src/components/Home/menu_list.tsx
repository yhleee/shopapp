import * as React from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './home.scss'

interface OwnProps {
  cx?: DynamicCx
}

const listDataSample = [
  {
    title: '내 피부에 꼭 맞는 상품은?',
    icon: 'Home',
    desc: '문진을 통해 내 피부를 알아보세요',
    href: '/app/survey',
  },
  {
    title: 'Best 상품',
    icon: 'Home',
    desc: '핵인싸의 길, 핵인싸템, 인싸 명소, 매장 Best 상품',
    href: '/app/ranking',
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

const MenuList: React.FC<OwnProps> = ({ cx }) => {
  return (
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
              avatar={<Avatar size={50} src="/images/oylogo.png" />}
              title={item.title}
              description={item.desc}
            />
          </List.Item>
        </Link>
      )}
    />
  )
}

export default styling(s)(MenuList)
