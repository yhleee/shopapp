import { isDev } from 'common/utils'

export const getBaseUrl = () => {
  // return isDev(devBaseUrl, '')
  if (process.env.NODE_ENV === 'development') {
    const config = require('../../../config').default
    const devBaseUrl = `${config.protocol}://${config.host}${config.port ? `:${config.port}` : ''}`
    return devBaseUrl
  }
  return ''
}
