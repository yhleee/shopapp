import * as React from 'react'
import { List } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './ranking.scss'
import { RankingProduct } from 'common/types/entities/product'
import Img from 'common/components/Img'

interface OwnProps {
  cx?: DynamicCx
  listContents: RankingProduct[]
}

type Props = OwnProps

class RankingList extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    const { cx, listContents } = this.props
    return (
      <div className={cx('list_wrap')}>
        {listContents.map((content, index) => (
          <div className={cx('list_row')} key={index}>
            <div className={cx('rank_icon')}>{`rank${index + 1}`}</div>
            <div className={cx('product_image')}>
              <Img src={content.imageUrl} />
            </div>
            <div className={cx('product_desc')}>
              {content.brandName}
              <br />
              {content.productName}
            </div>
            <div className={cx('product_price')}>
              {content.volume && content.volume + ' / '}
              {content.price}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default styling(s)(RankingList)
