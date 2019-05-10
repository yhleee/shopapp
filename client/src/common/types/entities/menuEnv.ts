import { isDevEnv } from 'common/utils/logic/isDev'
import { isTestEnv } from 'common/utils/logic/isTest'

export enum MenuEnv {
  DEVELOPMENT = 'DEVELOPMENT',
  BETA = 'BETA',
  PRODUCTION = 'PRODUCTION',
}

export const findMenuEnvs = (): MenuEnv[] => {
  if (isDevEnv || isTestEnv) {
    return [MenuEnv.DEVELOPMENT]
  }
  return [MenuEnv.BETA, MenuEnv.PRODUCTION]
}

type MenuEnvConfig = {
  [key in MenuEnv]: {
    tagText: string
    color: string
  }
}

export const menuEnvConfig: MenuEnvConfig = {
  DEVELOPMENT: {
    tagText: 'DEV',
    color: 'blue',
  },
  BETA: {
    tagText: 'BETA',
    color: 'orange',
  },
  PRODUCTION: {
    tagText: 'PROD',
    color: 'red',
  },
}
