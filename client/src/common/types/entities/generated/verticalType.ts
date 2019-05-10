export enum ServiceType {
  VERTICAL = 'VERTICAL',
  WINDO = 'WINDO',
}

export enum VerticalType {
  HOME = 'HOME',
  DEPARTMENT = 'DEPARTMENT',
  OUTLET = 'OUTLET',
  STYLE = 'STYLE',
  LIVING = 'LIVING',
  FRESH = 'FRESH',
  BEAUTY = 'BEAUTY',
  KIDS = 'KIDS',
  FOREIGN = 'FOREIGN',
  PLAY = 'PLAY',
  ART = 'ART',
  DESIGNER = 'DESIGNER',
  PET = 'PET',
  MY = 'MY',
  HOTDEAL = 'HOTDEAL',
  GIFT = 'GIFT',
  EXHIBITION = 'EXHIBITION',
  BEST = 'BEST',
}

interface VerticalConfig {
  text?: string
  type?: ServiceType
  color?: string
}

type VerticalConfigType = { [key in VerticalType]: VerticalConfig }

export const verticalConfig: VerticalConfigType = {
  HOME: {
    text: '쇼핑홈',
    type: ServiceType.VERTICAL,
  },
  DEPARTMENT: {
    text: '백화점윈도',
    type: ServiceType.WINDO,
    color: '#8452c7',
  },
  OUTLET: {
    text: '아울렛윈도',
    type: ServiceType.WINDO,
    color: '#6456d6',
  },
  STYLE: {
    text: '스타일윈도',
    type: ServiceType.WINDO,
    color: '#bd57e3',
  },
  LIVING: {
    text: '리빙윈도',
    type: ServiceType.WINDO,
    color: '#c7984f',
  },
  FRESH: {
    text: '푸드윈도',
    type: ServiceType.WINDO,
    color: '#74c23f',
  },
  BEAUTY: {
    text: '뷰티윈도',
    type: ServiceType.WINDO,
    color: '#e574c4',
  },
  KIDS: {
    text: '키즈윈도',
    type: ServiceType.WINDO,
    color: '#509bed',
  },
  FOREIGN: {
    text: '네이버 해외직구',
    type: ServiceType.WINDO,
    color: '#a04854',
  },
  PLAY: {
    text: '플레이윈도',
    type: ServiceType.WINDO,
    color: '#3682d5',
  },
  ART: {
    text: '아트윈도',
    type: ServiceType.WINDO,
    color: '#8db974',
  },
  DESIGNER: {
    text: '디자이너윈도',
    type: ServiceType.WINDO,
    color: '#405f81',
  },
  PET: {
    text: '펫윈도',
    type: ServiceType.WINDO,
    color: '#6876e0',
  },
  MY: {
    text: '쇼핑마이',
    type: ServiceType.VERTICAL,
  },
  HOTDEAL: {
    text: '핫딜',
    type: ServiceType.VERTICAL,
  },
  GIFT: {
    text: '선물',
    type: ServiceType.VERTICAL,
  },
  EXHIBITION: {
    text: '기획전',
    type: ServiceType.VERTICAL,
  },
  BEST: {
    text: '쇼핑베스트',
    type: ServiceType.VERTICAL,
  },
}
