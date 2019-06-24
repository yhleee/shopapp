import * as React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './simple_notice.scss'

interface OwnProps {
  cx?: DynamicCx
}

const SimpleNotice: React.FC<OwnProps> = ({ cx }) => {
  const noticeList = [
      {
          title: '6월 12일 Pending POG 신상품 진열 이슈 상품 공지',
          date: '2019.06.14',
          link: '/app/example',
      },
      {
          title: '6월 4차 정규반품',
          date: '2019.06.14',
          link: '/app/example',
      },
      {
          title: 'MATE 수습 운영 안내의 件(19년 4월 입사자 대상)',
          date: '2019.06.14',
          link: '/app/example',
      },
      {
          title: '유통기한기준변경 전산반영 공지',
          date: '2019.06.13',
          link: '/app/example',
      },
  ]

  return (
      <div style={{zoom: 2, padding: '5px 10px'}}>
          <List
              size="small"
              dataSource={noticeList}
              renderItem={notice => (
                  <List.Item>
                      <Link to={notice.link} style={{width: '100%'}}>
                          <div className={cx('title')}>{notice.title}</div>
                          <div className={cx('date')}>{notice.date}</div>
                      </Link>
                  </List.Item>
              )}
          />
      </div>
  )
}

export default styling(s)(SimpleNotice)
