import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Alert, Row, Spin } from 'antd'
import Loadable from 'react-loadable'

const Loading: React.SFC<any> = props => {
  return (
    <div>
      <Row style={{ marginTop: 25 }}>
        <Spin />
      </Row>
    </div>
  )
}

function createLoadable(componentImport) {
  return Loadable({
    loader: componentImport,
    loading: Loading,
  })
}

export const Example = createLoadable(() => import('./Example/Example'))
export const TestAxios = createLoadable(() => import('./test/naverSelectiveList'))
export const Home = createLoadable(() => import('./Home/home'))
export const Survey = createLoadable(() => import('./Survey/survey'))

export const PageNotFound = createLoadable(() => import('./Error/PageNotFound'))

const Routes = () => {
  return (
    <>
      <Switch>
        <Redirect exact={true} from="/" to="/app/home" />
        <Route path="/app/example" component={Example} />
        <Route path="/app/home" component={Home} />
        <Route path="/app/survey" component={Survey} />
        <Route path="/app/test/axios" component={TestAxios} />

        <Route component={PageNotFound} />
      </Switch>
    </>
  )
}

export default Routes
