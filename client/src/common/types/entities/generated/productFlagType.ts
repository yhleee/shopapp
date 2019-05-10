export enum ProductFlagType {
  PB = 'PB',
  ONEPLUS1 = 'ONEPLUS1',
  TWOPLUS1 = 'TWOPLUS1',
  PRESENT = 'PRESENT',
  EXCLUSIVE = 'EXCLUSIVE',
  SPECIAL_DEAL = 'SPECIAL_DEAL',
  SOLDOUT = 'SOLDOUT',
}

interface ProductFlagConfig {
  text?: string
}

type ProductFlagConfigType = { [key in ProductFlagType]: ProductFlagConfig }

export const productFlagConfig: ProductFlagConfigType = {
  PB: {
    text: 'PB',
  },
  ONEPLUS1: {
    text: '1+1',
  },
  TWOPLUS1: {
    text: '2+1',
  },
  PRESENT: {
    text: '증정',
  },
  EXCLUSIVE: {
    text: '초특가',
  },
  SPECIAL_DEAL: {
    text: '네이버단독',
  },
  SOLDOUT: {
    text: '품절',
  },
}
