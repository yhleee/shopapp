export enum SearchOptionRange {
  COMPANY = 'company',
  SHOP = 'shop',
}

export namespace SearchOptionRangeState {
  type searchOptionRangeConfig = {
    [key in SearchOptionRange]?: {
      value: string
      text: string
    }
  }

  export const searchOptionRangeTypeConfig: searchOptionRangeConfig = {
    company: {
      value: 'COMPANY',
      text: '전사',
    },
    shop: {
      value: 'SHOP',
      text: '매장',
    },
  }

  export const getSearchOptionRangeState = (state: SearchOptionRange) => {
    return searchOptionRangeTypeConfig[state]
  }
}

export enum SearchOptionTerm {
  WEEK = 'week',
  MONTH = 'month',
}

export namespace SearchOptionTermState {
  type searchOptionTermConfig = {
    [key in SearchOptionTerm]?: {
      value: string
      text: string
    }
  }

  export const searchOptionTermTypeConfig: searchOptionTermConfig = {
    month: {
      value: 'MONTH',
      text: '월간',
    },
    week: {
      value: 'WEEK',
      text: '주간',
    },
  }

  export const getSearchOptionTermState = (state: SearchOptionTerm) => {
    return searchOptionTermTypeConfig[state]
  }
}

export enum SearchType {
  CATEGOTY = 'category',
  AGE = 'age',
  BRAND = 'brand',
}

export enum AgeGroup {
  ALL = 'all',
  TEENAGER = 'teenager',
  TWENTIES = 'twenties',
  THIRTIES = 'thirties',
  FORTIES = 'forties',
}

export namespace AgeGroupState {
  type ageGroupConfig = {
    [key in AgeGroup]?: {
      value: string
      text: string
    }
  }

  export const ageGroupTypeConfig: ageGroupConfig = {
    all: {
      value: 'ALL',
      text: '전체 연령',
    },
    teenager: {
      value: '10',
      text: '10대',
    },
    twenties: {
      value: '20',
      text: '20대',
    },
    thirties: {
      value: '30',
      text: '30대',
    },
    forties: {
      value: '40',
      text: '40대 이상',
    },
  }

  export const getAgeGroupState = (state: AgeGroup) => {
    return ageGroupTypeConfig[state]
  }
}

export enum Gender {
  ALL = 'all',
  WOMEN = 'women',
  MEN = 'men',
}

export namespace GenderState {
  type genderConfig = {
    [key in Gender]?: {
      value: string
      text: string
    }
  }

  export const genderTypeConfig: genderConfig = {
    all: {
      value: 'ALL',
      text: '전체 성별',
    },
    men: {
      value: 'MEN',
      text: '남성',
    },
    women: {
      value: 'WOMEN',
      text: '여성',
    },
  }

  export const getGenderState = (state: Gender) => {
    return genderTypeConfig[state]
  }
}

export enum SearchPage {
  RANKING = 'ranking',
  SEARCH = 'search',
}

export enum OnlineMallGoodsSort {
  POPULAR = 'RNK/DESC',
  RECENT = 'DATE/DESC',
  SALE_COUNT = 'SALE_QTY/DESC',
  PRICE_ASC = 'SALE_PRC/ASC',
  PRICE_DESC = 'SALE_PRC/DESC',
}

export enum OnlineMallBenefit {
  COUPON = 'CPN_YN',
  DISCOUNT = 'DSCNT_YN',
  PRESENT = 'PRST_YN',
  FREE_DELIVERY = 'FREE_DLV_YN',
  ONE_PLUS_ONE = 'ASSOC_PROMT_STD_CNT_1',
  TWO_PLUS_ONE = 'ASSOC_PROMT_STD_CNT_2',
}
