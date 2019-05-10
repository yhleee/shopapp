export enum WeekDayOffType {
  WEEKLY_EVERY = 'WEEKLY_EVERY',
  WEEKLY_INTERVAL = 'WEEKLY_INTERVAL',
}

interface WeekDayOffConfig {
  text?: string
}

type WeekDayOffConfigType = { [key in WeekDayOffType]: WeekDayOffConfig }

export const weekDayOffConfig: WeekDayOffConfigType = {
  WEEKLY_EVERY: {
    text: '매주',
  },
  WEEKLY_INTERVAL: {
    text: '격주',
  },
}

export enum WeekDayType {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

interface WeekDayConfig {
  text?: string
}

type WeekDayConfigType = { [key in WeekDayType]: WeekDayConfig }

export const weekDayConfig: WeekDayConfigType = {
  SUNDAY: {
    text: '일요일',
  },
  MONDAY: {
    text: '월요일',
  },
  TUESDAY: {
    text: '화요일',
  },
  WEDNESDAY: {
    text: '수요일',
  },
  THURSDAY: {
    text: '목요일',
  },
  FRIDAY: {
    text: '금요일',
  },
  SATURDAY: {
    text: '토요일',
  },
}
