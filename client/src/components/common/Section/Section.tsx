import * as React from 'react'

import * as s from './Section.scss'
import { DynamicCx } from 'common/types/style'
import { styling } from 'common/utils'

interface OwnProps {
  cx?: DynamicCx
  children?: any
  title?: string
  subTitle?: string
}

const Section: React.SFC<OwnProps> = ({ title, subTitle, children, cx }) => (
  <section className={cx('page')}>
    <div className={cx('page-title')}>
      <h2>{title || 'Title'}</h2>
      {subTitle && <small className={cx('sub-title')}>{subTitle}</small>}
    </div>
    <div className={cx('page-content')}>{children}</div>
  </section>
)

const styled = styling(s)(Section)
export default styled
