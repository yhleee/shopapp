import { format, koLocale } from 'tz-date-fns'
import * as moment from 'moment'

export function dateFormat(date: Date | string | number, formatString = 'YYYY-MM-DD HH:mm:ss') {
  return format(date, formatString, { locale: koLocale })
}

export function dateFormatByMoment(date: Date | string | number, formatString = 'YYYY-MM-DD HH:mm:ss') {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}
