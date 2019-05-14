export const MENU_LAYOUT_PARAM = 'menuLayout=true'

interface Menu {
  title: string
  key?: string
  icon?: string
  path?: string
  menus?: Menu[]
}

const KEY_DELIMETER = ':'

export const parseKey = (menu: Menu) => {
  const indexs = menu.key.split(KEY_DELIMETER)
  return {
    navigation: indexs[0],
    menuGroup: indexs.length > 1 && indexs.slice(0, 2).join(KEY_DELIMETER),
    menu: indexs.length > 2 && indexs.slice(0, 3).join(KEY_DELIMETER),
  }
}

export const getNavigationList = () => {
  return menuConfig.menus
}

export const findMenu = (key: string) => {
  let target = null
  walk(menuConfig, menu => {
    if (menu.key === key) target = menu
  })
  return target
}

export const findMenuByPath = (path: string) => {
  let target = null
  walk(menuConfig, menu => {
    if (menu.path === path) target = menu
  })
  return target
}

const setAutoKey = (menuConfig: Menu) => {
  walk(menuConfig, (menu, index, parents) => {
    const pk = parents.map(p => p.index + KEY_DELIMETER).join('')
    menu.index = index
    menu.key = pk + index
  })
  return menuConfig
}

const walk = (menu: Menu, func: Function, parents = []) => {
  if (!menu || !menu.menus) return

  menu.menus.forEach((subMenu, index) => {
    subMenu.menus && walk(subMenu, func, [...parents, { ...subMenu, index }])
    func(subMenu, index, parents)
  })
}

const menuConfig: Menu = setAutoKey({
  title: '메뉴',
  menus: [],
})
