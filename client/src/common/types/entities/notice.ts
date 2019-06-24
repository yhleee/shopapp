export interface Notice {
  storeId: string
  title: string
  subTitle: string
  logo: string
  linkUrl: string
}

export interface ShopNotice {
  id?: number
  strCd: string
  text?: string
  regUsrId?: string
  modUsrId?: string
  delYn?: string
}
