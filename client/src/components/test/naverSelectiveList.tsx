import * as React from 'react'
import { getSelectiveDatas } from 'common/services/naverSelective'
import { Card } from 'antd'

const { Meta } = Card

const NaverSelective: React.FC<any> = ({}) => {
  const selectiveData = getSelectiveDatas()
  const listData = selectiveData.list

  return (
    <div>
      {listData.map((data, index) => {
        if (!data.representImagePathForWest) return
        return (
          <Card
            hoverable
            style={{ width: '90%', marginBottom: '10px' }}
            cover={<img alt={data.urlId} src={data.representImagePathForWest} />}
          >
            <Meta title={data.urlId} description="NAVER Selective Item" />
          </Card>
        )
      })}
    </div>
  )
}

export default NaverSelective
