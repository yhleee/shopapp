import * as React from 'react'
import { Form, Input } from 'antd'
import { styling } from 'common/utils'
import * as s from './work_report.css'
import { Resizable } from 'react-resizable'

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

  checkRequired = title => {
    return ['구분', '업무', '추진 경과 [상세]', '담당자', '일정', '완료 여부'].includes(title)
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
              required: this.checkRequired(title),
              message: `"${title}"는(은) 필수항목 입니다.`,
            },
          ],
          initialValue: record[dataIndex],
        })(
          title === '추진 경과 [상세]' || title === '비고' ? (
            <TextArea ref={this.input} onBlur={this.save} autoFocus={true} />
          ) : (
            <Input ref={this.input} onBlur={this.save} autoFocus={true} />
          ),
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 5, whiteSpace: 'pre-wrap', fontSize: '12px' }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    )
  }

  render() {
    const { editable, dataIndex, title, record, index, handleSave, children, ...restProps } = this.props
    const replaceRestProps = {
      className: restProps['className'],
      onClick: restProps['onClick'],
    }
    return (
      <td {...replaceRestProps} style={{ padding: '2px' }}>
        {editable ? <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer> : children}
      </td>
    )
  }
}

export const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  )
}
