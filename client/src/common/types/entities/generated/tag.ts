import { TagType } from './tagType'

export interface Tag {
  serialVersionUID? : number,
  id? : string,
  name? : string,
  type? : TagType,
  dic? : string,
}

