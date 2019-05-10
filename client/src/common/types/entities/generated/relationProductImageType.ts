export enum RelationProductImageType {
  REPRESENT = 'REPRESENT',
  OPTIONAL = 'OPTIONAL',
}

interface RelationProductImageConfig {
  text?: string
}

type RelationProductImageConfigType = { [key in RelationProductImageType]: RelationProductImageConfig }

export const relationProductImageConfig: RelationProductImageConfigType = {
  REPRESENT: {
    text: '대표이미지',
  },
  OPTIONAL: {
    text: '추가이미지',
  },
}
