import * as React from 'react'
import * as s from './work_report.css'
import { Table, Divider, Button, message } from 'antd'
import { getWorkReportList, upsertWorkReport } from 'common/services/manage'
import { EditableCell, EditableFormRow } from './editable_cell'
import ReactExport from 'react-export-excel'
import { weekNumberByMonth } from 'common/utils/stringUtils'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

export enum WorkReportType {
  COMMON = '일상',
  PROJECT = '과제',
}

export enum WorkReportState {
  DONE = '완료',
  GOING = '진행중',
}

export interface WorkReportItem {
  no: number
  type: WorkReportType
  task: string
  detail: string
  owner: string
  schedule: string
  state: WorkReportState
  etc: string
  remove: any
}

interface OwnProps {}

interface OwnState {
  list: WorkReportItem[]
  listCount: number
  ownerFilters: Filter[]
  taskFilters: Filter[]
  scheduleFilters: Filter[]
  showSaveNewButton: boolean
}

interface Filter {
  text: string
  value: string
}

type Props = OwnProps

class WorkReport extends React.Component<Props, OwnState> {
  columns: Object[]

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      listCount: 0,
      ownerFilters: [],
      taskFilters: [],
      scheduleFilters: [],
      showSaveNewButton: false,
    }
  }

  getColumns = () => {
    const { scheduleFilters, taskFilters, ownerFilters } = this.state
    return [
      {
        title: '구분',
        dataIndex: 'type',
        key: 'type',
        filters: [{ text: '과제', value: WorkReportType.PROJECT }, { text: '일상', value: WorkReportType.COMMON }],
        onFilter: (value, record) => record.type === value,
        editable: true,
      },
      {
        title: '업무',
        dataIndex: 'task',
        key: 'task',
        filters: taskFilters,
        onFilter: (value, record) => record.task === value,
        editable: true,
      },
      {
        title: '추진 경과 [상세]',
        dataIndex: 'detail',
        key: 'detail',
        editable: true,
      },
      {
        title: '담당자',
        dataIndex: 'owner',
        key: 'owner',
        filters: ownerFilters,
        onFilter: (value, record) => record.owner === value,
        editable: true,
        required: false,
      },
      {
        title: '일정',
        dataIndex: 'schedule',
        key: 'schedule',
        filters: scheduleFilters,
        onFilter: (value, record) => record.schedule === value,
        editable: true,
        required: false,
      },
      {
        title: '완료 여부',
        dataIndex: 'state',
        key: 'state',
        filters: [{ text: '진행중', value: WorkReportState.GOING }, { text: '완료', value: WorkReportState.DONE }],
        onFilter: (value, record) => record.state === value,
        editable: true,
        required: false,
      },
      {
        title: '비고',
        dataIndex: 'etc',
        key: 'etc',
        editable: true,
        required: false,
      },
      {
        title: '삭제',
        dataIndex: 'remove',
        key: 'remove',
        editable: false,
        required: false,
      },
    ]
  }

  async componentDidMount() {
    await this.generateList()
  }

  componentWillUnmount() {}

  generateList = async () => {
    const list: WorkReportItem[] = await getWorkReportList(null)
    if (list) {
      const owners = {}
      const tasks = {}
      const schedules = {}

      const datasource = []
      list.forEach((item, index) => {
        datasource.push({
          ...item,
          remove: (
            <Button href="javascript:void(0)" onClick={this.handleDelete(item.no)} type="danger">
              D
            </Button>
          ),
        })

        owners[item.owner] = owners[item.owner] ? owners[item.owner] + 1 : 1
        tasks[item.task] = tasks[item.task] ? tasks[item.task] + 1 : 1
        schedules[item.schedule] = schedules[item.schedule] ? schedules[item.schedule] + 1 : 1
      })

      const ownerFilters: Filter[] = []
      const taskFilters: Filter[] = []
      const scheduleFilters: Filter[] = []

      Object.keys(owners).forEach(owner => {
        const filter = {
          text: owner,
          value: owner,
        }
        ownerFilters.push(filter)
      })
      Object.keys(tasks).forEach(task => {
        const filter = {
          text: task,
          value: task,
        }
        taskFilters.push(filter)
      })
      Object.keys(schedules).forEach(schedule => {
        const filter = {
          text: schedule,
          value: schedule,
        }
        scheduleFilters.push(filter)
      })

      this.setState({
        ownerFilters,
        taskFilters,
        scheduleFilters,
        list: datasource,
        listCount: list.length,
        showSaveNewButton: false,
      })
    }
  }

  handleDelete = no => async () => {
    const list = [...this.state.list]
    if (!no) {
      this.setState({
        list: list.filter(item => item.no !== no),
        showSaveNewButton: false,
      })
      return
    }
    const filterList = list.filter(item => item.no === no)
    if (filterList && filterList.length > 0) {
      const removeItem = filterList[0]
      const response = await upsertWorkReport({
        ...removeItem,
        remove: 'Y',
      })
      if (response && response.status === 200) {
        message.success('삭제 되었습니다.')
        this.generateList()
      }
      return
    }
    message.error('리스트 상에 등록된 내용이 없습니다.')
  }

  handleAdd = () => {
    const { listCount, list } = this.state
    const newData = {
      no: null,
      type: null,
      task: null,
      detail: null,
      owner: null,
      schedule: null,
      state: null,
      etc: null,
      remove: (
        <Button href="javascript:void(0)" size={'small'} onClick={this.handleDelete(null)} type="danger">
          D
        </Button>
      ),
    }
    this.setState({
      list: [...list, newData],
      listCount: listCount + 1,
      showSaveNewButton: true,
    })
  }

  handleUpdate = async row => {
    if (row.no === null) {
      const newData = [...this.state.list]
      const index = newData.findIndex(item => row.no === item.no)
      const item = newData[index]
      newData.splice(index, 1, {
        ...item,
        ...row,
      })
      this.setState({ list: newData })
      return
    }
    this.handleSave(row)
  }

  handleNewRowSave = async () => {
    const dataList = [...this.state.list]
    const row = dataList.filter(data => data.no === null)
    if (!row || row.length === 0) {
      message.warn('새로운 데이터가 없습니다.')
      return
    }
    row.forEach(async item => {
      await this.handleSave(item)
    })
  }

  validateData = (data: WorkReportItem) => {
    return (
      data.type !== null &&
      data.task !== null &&
      data.detail !== null &&
      data.owner !== null &&
      data.schedule !== null &&
      data.state !== null
    )
  }

  handleSave = async item => {
    // const newData = [...this.state.list]
    // const index = newData.findIndex(item => row.no === item.no)
    // const item = newData[index]
    item.remove = 'N'
    if (!this.validateData(item)) {
      message.error('필수항목을 모두 입력 해 주세요.')
      return
    }
    const updateRes = await upsertWorkReport(item)
    if (updateRes && (updateRes.status === 200 || updateRes.status === 201)) {
      message.success('갱신 되었습니다.')
      await this.generateList()
    }
  }

  generateSheetDatas = () => {
    const dataSource = this.state.list
    const datas: WorkReportItem[] = []
    dataSource.filter(data => data.no !== null).forEach((data, index) => {
      datas.push({
        ...data,
        remove: 'N',
        detail: data.detail.replace('\n', '\r\n'),
      })
    })
    return datas
  }

  render() {
    const { list, showSaveNewButton } = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }
    const columns = this.getColumns().map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleUpdate,
        }),
      }
    })

    const weekOfMonthInfo = weekNumberByMonth(new Date())
    const weekOfMonth = `${weekOfMonthInfo.year}년${weekOfMonthInfo.month}월${weekOfMonthInfo.weekNo}주차`

    const excelDatas = []
    list.forEach(data => {
      excelDatas.push([
        { value: data.type, style: { alignment: { vertical: 'center' } } },
        { value: data.task, style: { alignment: { vertical: 'center' } } },
        { value: data.detail, style: { alignment: { wrapText: true, vertical: 'center' } } },
        { value: data.owner, style: { alignment: { vertical: 'center' } } },
        { value: data.schedule, style: { alignment: { vertical: 'center' } } },
        { value: data.state, style: { alignment: { vertical: 'center' } } },
        { value: data.etc, style: { alignment: { wrapText: true, vertical: 'center' } } },
      ])
    })
    const multiDataSet = [
      {
        columns: ['구분', '업무', '추진 경과 [상세]', '담당자', '일정', '완료 여부', '비고'],
        data: excelDatas,
      },
    ]

    return (
      <div style={{ padding: '20px 10px' }}>
        <div>
          <div style={{ display: 'table-cell' }}>
            <h2>■ 정보전략팀 업무보고</h2>
          </div>
        </div>
        <Divider style={{ marginTop: '-10px' }} />
        <Table
          components={components}
          columns={columns}
          dataSource={list}
          pagination={false}
          rowClassName={() => 'editable-row'}
        />
        <div style={{ padding: '20px 20px', width: '100%', textAlign: 'right' }}>
          <Button
            href="javascript:void(0)"
            onClick={this.handleNewRowSave}
            type="primary"
            style={{ marginBottom: 16, display: `${showSaveNewButton ? 'block' : 'none'}` }}
          >
            새로운 데이터 저장
          </Button>
          &nbsp;
          <Button href="javascript:void(0)" onClick={this.handleAdd} type="default" style={{ marginBottom: 16 }}>
            신규 데이터 추가
          </Button>
          &nbsp;
          <ExcelFile
            element={
              <Button type="default" href="javascript:void(0)">
                엑셀 다운로드
              </Button>
            }
            filename={`정보전략팀_주간보고_${weekOfMonth}`}
          >
            <ExcelSheet dataSet={multiDataSet} name={weekOfMonth} />
          </ExcelFile>
        </div>
      </div>
    )
  }
}

export default WorkReport
