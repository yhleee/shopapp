import * as React from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar } from 'antd'
import Notice from './notice'
import MenuList from './menu_list'
import StoreNotice from './store_notice'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './home.scss'

interface OwnProps {
  cx?: DynamicCx
}

const Home: React.FC<OwnProps> = ({ cx }) => {
  return (
    <>
      <StoreNotice />
      <Notice />
      <MenuList />
    </>
  )
}

export default styling(s)(Home)
