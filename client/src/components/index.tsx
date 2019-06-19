import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Routes from './routes'
import Layout from './Layout/Layout'
import MenuLayout from './Layout/MenuLayout'
import { MENU_LAYOUT_PARAM } from './Layout/menuConfig'
import { ifElse } from 'common/utils'
import 'moment/locale/ko'

const { hot } = require('react-hot-loader')

const App: React.SFC<RouteComponentProps<any>> = ({ location }) => {
  const pathName = location.pathname
  const showLayout = pathName.indexOf('/app/manage') > -1
  return (
    <>
      {ifElse(showLayout)(
        <Routes />,
        <Layout>
          <Routes />
        </Layout>,
      )}
    </>
  )
}

export default hot(module)(withRouter(App))
