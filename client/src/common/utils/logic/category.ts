import { Category, RootParentId } from 'common/types'

export const findCategory = (id: string, hierarchyCategories: Category[]): Category => {
  return hierarchyCategories
    .map(c => {
      const found = c.children && findCategory(id, c.children)
      return found ? found : c.id === id && c
    })
    .find(c => !!c)
}

export const getAncestorCategories = (parentId: string, hierarchyCategories: Category[]): Category[] => {
  if (Number(parentId) === RootParentId) return []
  const category = findCategory(parentId, hierarchyCategories)
  return category ? [...getAncestorCategories(category.parentId, hierarchyCategories), category] : []
}

export const getDescendantCategories = (id: string, hierarchyCategories: Category[]) => {
  const category = findCategory(id, hierarchyCategories)
  return category && category.children ? convertHierarchyToFlatList(category.children) : []
}

export const convertHierarchyToFlatList = (hierarchyCategories: Category[]): Category[] => {
  if (!hierarchyCategories) return []
  return hierarchyCategories.flatMap(category => {
    const children = convertHierarchyToFlatList(category.children)
    return [category, ...children]
  })
}

export const convertFlatListToHierarchy = (flatCategories: Category[]) => {
  flatCategories.sort((a, b) => (a.wholeIds.join() > b.wholeIds.join() ? 1 : -1))
  return flatCategories.reduce((hierarchCategories, category) => {
    category.children = null

    if (Number(category.parentId) === RootParentId) {
      hierarchCategories.push(category)
    } else {
      const parent = findCategory(category.parentId, hierarchCategories)
      if (parent) {
        parent.children ? parent.children.push(category) : (parent.children = [category])
      }
    }
    return hierarchCategories
  }, [])
}

export const mergeCategories = (targetCategories: Category[], appendCategories: Category[]) => {
  const targetCategoryIds = targetCategories.map(category => category.id)
  return targetCategories.concat(subtractCategories(appendCategories, targetCategoryIds))
}

export const subtractCategories = (targetCategories: Category[], subtractCategoryIds: string[]) => {
  const subtractCategoryIdSet = new Set<any>(subtractCategoryIds)
  return targetCategories.filter(category => !subtractCategoryIdSet.has(category.id))
}
