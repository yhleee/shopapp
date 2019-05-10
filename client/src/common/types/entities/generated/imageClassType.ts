export enum ImageClassType {
  BRAND_LOGO_WHITE = 'BRAND_LOGO_WHITE',
  BRAND_LOGO_BLACK = 'BRAND_LOGO_BLACK',
  STOREVIEW_IMAGE = 'STOREVIEW_IMAGE',
  STORE_PRODUCT_IMAGE = 'STORE_PRODUCT_IMAGE',
  NEW_ITEM_LAYOUT_IMAGE = 'NEW_ITEM_LAYOUT_IMAGE',
  STORE_NEWS = 'STORE_NEWS',
  SALE_EVENT = 'SALE_EVENT',
  PRODUCT = 'PRODUCT',
  JOIN_INSPECTION_IMAGE = 'JOIN_INSPECTION_IMAGE',
  BUSINESS_NO = 'BUSINESS_NO',
  COMMUNICATION_SALE_NO = 'COMMUNICATION_SALE_NO',
  BRAND_MANAGE_LICENSE = 'BRAND_MANAGE_LICENSE',
  CLOUD_IMAGE = 'CLOUD_IMAGE',
  FRESH_ITEM = 'FRESH_ITEM',
  THEME_CONTENTS = 'THEME_CONTENTS',
  BARCODE = 'BARCODE',
  SPECIAL_LIST_IMAGE = 'SPECIAL_LIST_IMAGE',
  SPECIAL_HOME_BANNER = 'SPECIAL_HOME_BANNER',
  SERVICE_NEWS_BANNER = 'SERVICE_NEWS_BANNER',
  SERVICE_BANNER = 'SERVICE_BANNER',
  USER_DEFINITION = 'USER_DEFINITION',
  MALL_PC_REPRESENTATIVE = 'MALL_PC_REPRESENTATIVE',
  MALL_MOBILE_REPRESENTATIVE = 'MALL_MOBILE_REPRESENTATIVE',
  MALL_LOGO = 'MALL_LOGO',
  BELONG_STORE_LOGO = 'BELONG_STORE_LOGO',
  BELONG_STORE_REPRESENTATIVE = 'BELONG_STORE_REPRESENTATIVE',
  LIST_A = 'LIST_A',
  LIST_B = 'LIST_B',
  BRAND_LIST = 'BRAND_LIST',
  STORE_INNER_FRONT = 'STORE_INNER_FRONT',
  STORE_INNER_LEFT = 'STORE_INNER_LEFT',
  STORE_INNER_RIGHT = 'STORE_INNER_RIGHT',
  STORE_ENTRANCE = 'STORE_ENTRANCE',
  PRODUCT_LIST = 'PRODUCT_LIST',
  SEARCH_QUERY_KEYWORD = 'SEARCH_QUERY_KEYWORD',
  BRAND_MOBILE_HOME_1 = 'BRAND_MOBILE_HOME_1',
  BRAND_MOBILE_HOME_2 = 'BRAND_MOBILE_HOME_2',
  BRAND_MOBILE_HOME_3 = 'BRAND_MOBILE_HOME_3',
  BRAND_PC_HOME_1 = 'BRAND_PC_HOME_1',
  BRAND_PC_HOME_2 = 'BRAND_PC_HOME_2',
  BRAND_TRPC_LOGO = 'BRAND_TRPC_LOGO',
  MY_PET = 'MY_PET',
  PET_KIND = 'PET_KIND',
  SE3_EXTRACT_IMAGE = 'SE3_EXTRACT_IMAGE',
}

interface ImageClassConfig {
  text?: string
}

type ImageClassConfigType = { [key in ImageClassType]: ImageClassConfig }

export const imageClassConfig: ImageClassConfigType = {
  BRAND_LOGO_WHITE: {
    text: '브랜드로고',
  },
  BRAND_LOGO_BLACK: {
    text: '브랜드로고',
  },
  STOREVIEW_IMAGE: {
    text: '스토어 뷰 이미지',
  },
  STORE_PRODUCT_IMAGE: {
    text: '상점상품 이미지',
  },
  NEW_ITEM_LAYOUT_IMAGE: {
    text: '신상품 레이아웃 이미지',
  },
  STORE_NEWS: {
    text: '스토어 뉴스이미지',
  },
  SALE_EVENT: {
    text: '세일/이벤트 이미지',
  },
  PRODUCT: {
    text: '상품 이미지',
  },
  JOIN_INSPECTION_IMAGE: {
    text: '기타 심사자료',
  },
  BUSINESS_NO: {
    text: '사업자 등록증',
  },
  COMMUNICATION_SALE_NO: {
    text: '통신판매업 신고증',
  },
  BRAND_MANAGE_LICENSE: {
    text: '브랜드계약서',
  },
  CLOUD_IMAGE: {
    text: '이미지 클라우드 이미지',
  },
  FRESH_ITEM: {
    text: '산지아이템정보',
  },
  THEME_CONTENTS: {
    text: '테마컨텐츠',
  },
  BARCODE: {
    text: '바코드',
  },
  SPECIAL_LIST_IMAGE: {
    text: '특별행사장리스트이미지',
  },
  SPECIAL_HOME_BANNER: {
    text: '특별행사장홈배너이미지',
  },
  SERVICE_NEWS_BANNER: {
    text: '지점소식',
  },
  SERVICE_BANNER: {
    text: '서비스 배너',
  },
  USER_DEFINITION: {
    text: '사용자 정의 이미지',
  },
  MALL_PC_REPRESENTATIVE: {
    text: '지점 전경 피시 이미지',
  },
  MALL_MOBILE_REPRESENTATIVE: {
    text: '지점 전경 모바일 이미지',
  },
  MALL_LOGO: {
    text: '지점 로고 이미지',
  },
  BELONG_STORE_LOGO: {
    text: '스토어 로고 이미지',
  },
  BELONG_STORE_REPRESENTATIVE: {
    text: '스토어 전경 이미지',
  },
  LIST_A: {
    text: '스타List',
  },
  LIST_B: {
    text: '루키List',
  },
  BRAND_LIST: {
    text: '홈브랜드',
  },
  STORE_INNER_FRONT: {
    text: '매장 내 정면',
  },
  STORE_INNER_LEFT: {
    text: '매장 내 좌측',
  },
  STORE_INNER_RIGHT: {
    text: '매장 내 우측',
  },
  STORE_ENTRANCE: {
    text: '매장 내 입구 방향',
  },
  PRODUCT_LIST: {
    text: '홈상품',
  },
  SEARCH_QUERY_KEYWORD: {
    text: '검색쿼리키워드',
  },
  BRAND_MOBILE_HOME_1: {
    text: '모바일홈1',
  },
  BRAND_MOBILE_HOME_2: {
    text: '모바일홈2',
  },
  BRAND_MOBILE_HOME_3: {
    text: '모바일홈3',
  },
  BRAND_PC_HOME_1: {
    text: 'PC홈/모바일기타1',
  },
  BRAND_PC_HOME_2: {
    text: 'PC홈/모바일기타2',
  },
  BRAND_TRPC_LOGO: {
    text: '투명로고',
  },
  MY_PET: {
    text: '펫 이미지',
  },
  PET_KIND: {
    text: '펫품종이미지',
  },
  SE3_EXTRACT_IMAGE: {
    text: 'SE3추출이미지',
  },
}
