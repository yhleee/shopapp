import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Alert, Row, Spin } from 'antd'
import Loadable from 'react-loadable'

const Loading: React.SFC<any> = props => {
  return (
    <div>
      <Row>
        <Alert message="잠시만 기다려 주세요..." type="info" showIcon={true} />
      </Row>
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

export const PageNotFound = createLoadable(() => import('./Error/PageNotFound'))

const Routes = () => {
  return (
    <>
      <Switch>
        <Redirect exact={true} from="/" to="/example" />
        <Route path="/example" component={Example} />
        <Route path="/test/axios" component={TestAxios} />

        <Route component={PageNotFound} />
      </Switch>
    </>
  )
}

export default Routes
