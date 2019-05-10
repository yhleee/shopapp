import { combineReducers } from 'redux'

import templateForm, { TemplateFormState } from '../components/TemplateManager/ducks/form'
import templateInstanceList, { TemplateInstanceListState } from '../components/TemplateManager/ducks/instanceList'
import templateInstance, { TemplateInstanceState } from '../components/TemplateManager/ducks/instanceForm'
import storeCategory, { StoreCategoryState } from '../components/StoreCategory/ducks/storeCategory'
import templateSearch, { TemplateSearch } from '../components/TemplateManager/ducks/search'
import templateList, { TemplateListState } from '../components/TemplateManager/ducks/list'
import verticalCategoryMapper, {
  VerticalCategoryMapperState,
} from '../components/VerticalCategoryMapper/ducks/verticalCategoryMapper'
import menuSearch, { MenuSearchState } from '../components/Menu/ducks/search'
import relationProducts, { RelationProductsState } from '../components/RelationProduct/ducks/relationProducts'
import relationProduct, { RelationProductState } from '../components/RelationProduct/ducks/relationProduct'
import relationProductsSearch, { RelationProductsSearchState } from '../components/RelationProduct/ducks/searchPanel'
import storeMenuSearch, { StoreMenuSearchState } from 'components/StoreMenu/ducks/search'
import tagpick from 'components/Tagpick/ducks/tagpick'
import tagpicks from 'components/Tagpick/ducks/tagpicks'
import { TagPick } from 'common/types/entities/tagPick'

export interface RootState {
  templateForm: TemplateFormState
  templateSearch: TemplateSearch
  templateList: TemplateListState
  templateInstanceList: TemplateInstanceListState
  templateInstance: TemplateInstanceState
  storeCategory: StoreCategoryState
  verticalCategoryMapper: VerticalCategoryMapperState
  menuSearch: MenuSearchState
  relationProducts: RelationProductsState
  relationProduct: RelationProductState
  relationProductsSearch: RelationProductsSearchState
  storeMenuSearch: StoreMenuSearchState
  tagpick: TagPick
  tagpicks: TagPick[]
}

export default combineReducers({
  templateForm,
  templateSearch,
  templateList,
  templateInstanceList,
  templateInstance,
  storeCategory,
  verticalCategoryMapper,
  menuSearch,
  relationProducts,
  relationProduct,
  relationProductsSearch,
  storeMenuSearch,
  tagpick,
  tagpicks,
})
