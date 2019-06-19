import * as React from 'react'
import * as s from './work_report.css'
import { Table, Divider, Tag, Form, InputNumber, Input } from 'antd'
import { getWorkReportList } from 'common/services/manage'
import { EditableCell, EditableFormRow } from './editable_table'
import Button from 'antd/lib/button'

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
  remove: string
}

interface OwnProps {}

interface OwnState {
  list: WorkReportItem[]
  listCount: number
  ownerFilters: Filter[]
  taskFilters: Filter[]
  scheduleFilters: Filter[]
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
            <Button href="javascript:void(0)" onClick={this.handleDelete} type="danger">
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
      })
    }
  }

  handleDelete = no => {
    const list = [...this.state.list]
    this.setState({ list: list.filter(item => item.no !== no) })
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
      remove: 'N',
    }
    this.setState({
      list: [...list, newData],
      listCount: listCount + 1,
    })
  }

  handleSave = row => {
    const newData = [...this.state.list]
    const index = newData.findIndex(item => row.no === item.no)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    this.setState({ list: newData })
  }

  render() {
    const { list } = this.state
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
          handleSave: this.handleSave,
        }),
      }
    })

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
          <Button href="javascript:void(0)" onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
            Add a row
          </Button>
        </div>
      </div>
    )
  }
}

export default WorkReport
