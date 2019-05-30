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
export const Ranking = createLoadable(() => import('./Ranking'))
export const RankingCategory = createLoadable(() => import('./Ranking/ranking_category'))
export const RankingAge = createLoadable(() => import('./Ranking/ranking_age'))
export const RankingBrand = createLoadable(() => import('./Ranking/ranking_brand'))
export const SearchResult = createLoadable(() => import('./Search/search_result'))
export const Search = createLoadable(() => import('./Search'))
export const StockList = createLoadable(() => import('./Stock/stock_list'))
export const Stock = createLoadable(() => import('./Stock'))

export const PageNotFound = createLoadable(() => import('./Error/PageNotFound'))

const Routes = () => {
  return (
    <>
      <Switch>
        <Redirect exact={true} from="/" to="/app/home" />
        <Redirect exact={true} from="/app" to="/app/home" />
        <Route path="/app/example" component={Example} />
        <Route path="/app/home" component={Home} />
        <Route path="/app/survey" component={Survey} />
        <Route path="/app/test/axios" component={TestAxios} />
        <Route path="/app/ranking/category" component={RankingCategory} />
        <Route path="/app/ranking/age" component={RankingAge} />
        <Route path="/app/ranking/brand" component={RankingBrand} />
        <Route path="/app/ranking" component={Ranking} />
        {/* <Route path="/app/search/result/:searchword&:category" component={SearchResult} /> */}
        <Route path="/app/search/result" component={SearchResult} />
        <Route path="/app/search" component={Search} />
        <Route path="/app/stock/list" component={StockList} />
        <Route path="/app/stock" component={Stock} />

        <Route component={PageNotFound} />
      </Switch>
    </>
  )
}

export default Routes
