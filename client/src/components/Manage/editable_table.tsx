import * as React from 'react'
import { Form, Input } from 'antd'
import { styling } from 'common/utils'
import * as s from './work_report.css'

const { TextArea } = Input
const EditableContext = React.createContext({})

export const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

export const EditableFormRow = Form.create()(EditableRow)

interface OwnProps {
  record: any
  handleSave: any
  dataIndex: any
  title: string
  editable: boolean
  index: number
}

interface OwnState {
  editing: boolean
}

type Props = OwnProps

@styling(s)
export class EditableCell extends React.Component<Props, OwnState> {
  input: React.LegacyRef<any>
  form: any

  constructor(props) {
    super(props)
    this.state = {
      editing: false,
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({ editing })
  }

  save = e => {
    const { record, handleSave } = this.props
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return
      }
      this.toggleEdit()
      handleSave({ ...record, ...values })
    })
  }

  renderCell = form => {
    this.form = form
    const { children, dataIndex, record, title } = this.props
    const { editing } = this.state
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<TextArea ref={this.input} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 5, whiteSpace: 'pre-wrap' }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    )
  }

  render() {
    const { editable, dataIndex, title, record, index, handleSave, children, ...restProps } = this.props
    return (
      <td {...restProps}>
        {editable ? <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer> : children}
      </td>
    )
  }
}
