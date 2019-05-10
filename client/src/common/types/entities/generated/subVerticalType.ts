import { VerticalType } from './verticalType'

export enum SubVerticalType {
  DEPARTMENT = 'DEPARTMENT',
  OUTLET = 'OUTLET',
  STYLE = 'STYLE',
  HOME_LIVING = 'HOME_LIVING',
  HANDMADE = 'HANDMADE',
  STATIONERY = 'STATIONERY',
  DIRECT_FARM = 'DIRECT_FARM',
  LOCAL_FOOD = 'LOCAL_FOOD',
  TRADITIONAL_ALCOHOL = 'TRADITIONAL_ALCOHOL',
  HOME_MEAL = 'HOME_MEAL',
  BEAUTY = 'BEAUTY',
  KIDS = 'KIDS',
  FOREIGN = 'FOREIGN',
  PLAY = 'PLAY',
  ART = 'ART',
  DESIGNER = 'DESIGNER',
  FASHION_BRAND = 'FASHION_BRAND',
  PET = 'PET',
}

interface SubVerticalConfig {
  text?: string
  vertical?: VerticalType
}

type SubVerticalConfigType = { [key in SubVerticalType]: SubVerticalConfig }

export const subVerticalConfig: SubVerticalConfigType = {
  DEPARTMENT: {
    text: '백화점',
    vertical: VerticalType.DEPARTMENT,
  },
  OUTLET: {
    text: '아울렛',
    vertical: VerticalType.OUTLET,
  },
  STYLE: {
    text: '로드샵',
    vertical: VerticalType.STYLE,
  },
  HOME_LIVING: {
    text: '홈&데코',
    vertical: VerticalType.LIVING,
  },
  HANDMADE: {
    text: '창작공방',
    vertical: VerticalType.LIVING,
  },
  STATIONERY: {
    text: '문방구',
    vertical: VerticalType.LIVING,
  },
  DIRECT_FARM: {
    text: '산지직송',
    vertical: VerticalType.FRESH,
  },
  LOCAL_FOOD: {
    text: '지역명물',
    vertical: VerticalType.FRESH,
  },
  TRADITIONAL_ALCOHOL: {
    text: '전통주',
    vertical: VerticalType.FRESH,
  },
  HOME_MEAL: {
    text: '쿠킹박스',
    vertical: VerticalType.FRESH,
  },
  BEAUTY: {
    text: '뷰티',
    vertical: VerticalType.BEAUTY,
  },
  KIDS: {
    text: '키즈',
    vertical: VerticalType.KIDS,
  },
  FOREIGN: {
    text: '해외직구',
    vertical: VerticalType.FOREIGN,
  },
  PLAY: {
    text: '플레이',
    vertical: VerticalType.PLAY,
  },
  ART: {
    text: '아트',
    vertical: VerticalType.ART,
  },
  DESIGNER: {
    text: '디자이너',
    vertical: VerticalType.DESIGNER,
  },
  FASHION_BRAND: {
    text: '브랜드관',
    vertical: VerticalType.STYLE,
  },
  PET: {
    text: '펫',
    vertical: VerticalType.PET,
  },
}
