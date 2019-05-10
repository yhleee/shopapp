import { isDev } from 'common/utils'
const config = require(`../../../config`).default

export const getBaseUrl = () => isDev(`${config.protocol}://${config.host}${config.port ? `:${config.port}` : ''}`, '')
