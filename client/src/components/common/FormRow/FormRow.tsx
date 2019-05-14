import * as React from 'react'
import { Row, Col, Divider } from 'antd'

import * as s from './FormRow.scss'
import { styling } from 'common/utils'

const FormRow = ({ title, children, cx }) => (
  <div className={cx('form-row')}>
    <Row gutter={24} className={cx('row')}>
      <Col span={6} key={1}>
        {title}
      </Col>
      <Col span={18} key={3}>
        {children}
      </Col>
    </Row>
    <Divider style={{ margin: '8px 0 0 0' }} />
  </div>
)

const styled = styling(s)(FormRow)
export default styled
