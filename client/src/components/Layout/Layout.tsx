import * as React from 'react'

import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './Layout.scss'
import PageNotFound from '../Error/PageNotFound'

interface OwnProps {
  cx?: DynamicCx
  children?: any
}

const Layout: React.SFC<OwnProps> = ({ cx, children }) => {
  return <div className={cx('wrap')}>{children ? children : <PageNotFound />}</div>
}

export default styling(s)(Layout)
