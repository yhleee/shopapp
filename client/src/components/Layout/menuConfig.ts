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
  title: '어드민 메뉴',
  menus: [
    {
      title: '프론트 매니저',
      menus: [
        {
          title: '프론트 매니저',
          menus: [
            {
              title: '템플릿 리스트',
              path: '/app/template-manager/template',
            },
            {
              title: '템플릿 추가/수정',
              path: '/app/template-manager/template-form',
            },
            {
              title: '데이터 리스트',
              path: '/app/template-manager/instance',
            },
          ],
        },
      ],
    },
    {
      title: 'VMD',
      menus: [
        {
          title: '검수',
          menus: [
            {
              title: 'VMD 검수',
              path: '/app/relation-products/vmd',
            },
          ],
        },
      ],
    },
    {
      title: '카테고리',
      menus: [
        {
          title: '카테고리 관리',
          menus: [
            {
              title: '버티컬-카테고리 매핑 관리',
              path: '/app/vertical-category-mapper',
            },
            {
              title: '스토어-카테고리 관리',
              path: '/app/store-category',
            },
            {
              title: '상품-카테고리 관리',
              path: '/app/product-category',
            },
            {
              title: '메뉴 관리',
              path: '/app/menu-manager',
            },
            {
              title: '스토어메뉴 관리',
              path: '/app/store-menu',
            },
          ],
        },
      ],
    },
    {
      title: 'Excel',
      menus: [
        {
          title: '스토어',
          menus: [
            {
              title: '상품검수 리포트',
              path: '/app/excel/inspection-count',
            },
          ],
        },
        {
          title: '메뉴',
          menus: [
            {
              title: '일괄 업로드',
              path: '/app/excel/upload-menu',
            },
          ],
        },
      ],
    },
    {
      title: 'Tag Pick',
      menus: [
        {
          title: 'Tag 관리',
          menus: [
            {
              title: 'Tag 속성관리',
              path: '/app/tagpick',
            },
          ],
        },
      ],
    },
    {
      title: '개발자 메뉴',
      menus: [
        {
          title: '컴포넌트 가이드',
          menus: [
            {
              title: 'Panel',
              path: '/app/guide/panel',
            },
            {
              title: 'View',
              path: '/app/guide/view',
            },
          ],
        },
        {
          title: '예제',
          menus: [
            {
              title: '공통 얼럿',
              path: '/app/example/common-alert',
            },
            {
              title: '엑셀 업로드/다운로드',
              path: '/app/example/excel',
            },
            {
              title: '이미지 업로드',
              path: '/app/example/photo-uploader',
            },
            {
              title: '카테고리 셀렉터',
              path: '/app/example/category-selector',
            },
          ],
        },
        {
          title: '개발지원',
          menus: [
            {
              title: '엑셀 다운로드',
              path: '/app/collection-search',
            },
          ],
        },
      ],
    },
  ],
})
