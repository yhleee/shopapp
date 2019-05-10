import { WeekDayOffType, WeekDayType } from './weekType'

export interface SalesTime {
  weekDayBeginHour?: string
  weekDayBeginMin?: string
  weekDayFinishHour?: string
  weekDayFinishMin?: string
  weekEndBeginHour?: string
  weekEndBeginMin?: string
  weekEndFinishHour?: string
  weekEndFinishMin?: string
  useClosed?: boolean
  closedType?: WeekDayOffType
  closedDays?: WeekDayType[]
}
