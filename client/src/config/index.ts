import { ProjectConfig } from 'common/types/config'

const config: ProjectConfig = {
  // "project" value should be same as src/{project} directory name.
  project: 'shopapp',
  ...require(`./${process.env.NODE_ENV}`).default,
}

export default config
