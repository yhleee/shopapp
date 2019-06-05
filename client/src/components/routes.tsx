import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Alert, Row, Spin } from 'antd'
import Loadable from 'react-loadable'

const Loading: React.SFC<any> = props => {
  return (
    <Spin tip="불러오는 중...">
      <Alert message="데이터를 불러오고 있어요!" description="가끔 서버가 응답을 하지 않으면... 하아..." type="info" />
    </Spin>
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
export const RankingSearch = createLoadable(() => import('./Ranking/ranking_search'))
export const SearchResult = createLoadable(() => import('./Search/search_result'))
export const BarcodeScan = createLoadable(() => import('./Search/search_barcode'))
export const Search = createLoadable(() => import('./Search'))
export const StockList = createLoadable(() => import('./Stock/stock_list'))
export const Stock = createLoadable(() => import('./Stock'))
export const ProductDetail = createLoadable(() => import('./Product/product_detail'))
export const RankingProductList = createLoadable(() => import('./Ranking/ranking_product_list'))

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
        <Route path="/app/ranking/products" component={RankingProductList} />
        <Route path="/app/ranking/search/:searchType/:brandName" component={RankingSearch} />
        <Route path="/app/ranking/search/:searchType" component={RankingSearch} />
        <Route path="/app/ranking" component={Ranking} />
        {/* <Route path="/app/search/result/:searchword&:category" component={SearchResult} /> */}
        <Route path="/app/search/result" component={SearchResult} />
        <Route path="/app/search/barcode" component={BarcodeScan} />
        <Route path="/app/search" component={Search} />
        <Route path="/app/stock/list" component={StockList} />
        <Route path="/app/stock" component={Stock} />
        <Route path="/app/product/detail/:pid" component={ProductDetail} />

        <Route component={PageNotFound} />
      </Switch>
    </>
  )
}

export default Routes
