import * as React from 'react'
import { Icon, Row, Col, Input, message } from 'antd'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './search.scss'

class SearchCond extends React.Component {
  static defaultProps = { menuTitle: 'Title' }

  render() {
    return (
      <div>
        <Input
          placeholder="검색어를 입력해주세요"
          suffix={<Icon type="barcode" style={{ color: 'rgba(0,0,0,.45)', paddingRight: 20, fontSize: 50 }} />}
          onPressEnter={() => message.success('Processing complete!')}
          style={{ paddingRight: 10, paddingLeft: 10, fontSize: 50, height: 80, marginBottom: '20px' }}
        />
      </div>
    )
  }
}
export default styling(s)(SearchCond)
