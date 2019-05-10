export enum TagType {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
}

interface TagConfig {
  text?: string
}

type TagConfigType = { [key in TagType]: TagConfig }

export const tagConfig: TagConfigType = {
  AUTO: {
    text: '자동태그',
  },
  MANUAL: {
    text: '수동태그',
  },
}
