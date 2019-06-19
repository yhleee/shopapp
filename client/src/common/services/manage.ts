import { axios } from '../utils'
import { WorkReportItem, WorkReportType } from '../../components/Manage/work_report'

export const getWorkReportList = async (type: WorkReportType) => {
  const response = await axios.post('/api/manage/team/work/report/list', {
    type,
  })
  return response && response.data && response.data.contents
}

export const upsertWorkReport = async (reprot: WorkReportItem) => {
  const response = await axios.post('/api/manage/team/work/report/upsert', reprot)
  return response && response
}
