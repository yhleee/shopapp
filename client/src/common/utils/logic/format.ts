// import { format } from 'date-fns-tz'
import * as moment from 'moment'

// export function dateFormat(date: Date | string | number, formatString = 'YYYY-MM-DD HH:mm:ss') {
//   return format(date, formatString)
// }

export function dateFormatByMoment(date: Date | string | number, formatString = 'YYYY-MM-DD HH:mm:ss') {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}
