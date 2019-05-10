import * as React from 'react'
import { Button, Form, Icon, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { SearchBrand, SearchChannel } from '../common/AutoComplete/Search'
import { SearchFormBrand, SearchFormChannel } from '../common/AutoComplete/SearchForm'

const FormItem = Form.Item

interface OwnProps {}

interface OwnState {
  channelIds: string[]
  brandIds: string[]
}

type Props = OwnProps & FormComponentProps

class ExampleSearch extends React.Component<Props, OwnState> {
  constructor(props) {
    super(props)

    this.state = {
      channelIds: ['1000008990', '1000009011'],
      brandIds: ['15313'],
    }
  }

  handleSubmit = () => {
    const m = JSON.stringify(this.props.form.getFieldsValue())
    message.info(m)
  }

  handleChange = () => {
    this.setState({
      channelIds: [],
      brandIds: ['15313'],
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <>
        <Button onClick={this.handleChange}>변경</Button>
        <div style={{ marginTop: '10px' }}>
          <h3>
            <Icon type="right-circle-o" /> 채널 검색
          </h3>
          <SearchChannel placeholder={'채널명'} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <h3>
            <Icon type="right-circle-o" /> 브랜드 검색
          </h3>
          <SearchBrand />
        </div>
        <div style={{ marginTop: '10px' }}>
          <h3>
            <Icon type="right-circle-o" /> 채널/브랜드 폼
          </h3>
          <Form onSubmit={() => false}>
            <FormItem>
              {getFieldDecorator('channelIds')(
                <SearchFormChannel title={'채널'} placeholder={'채널명'} ids={this.state.channelIds} />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('brandIds')(<SearchFormBrand title={'브랜드'} ids={this.state.brandIds} />)}
            </FormItem>
          </Form>
          <Button style={{ float: 'right' }} type="primary" size={'small'} onClick={this.handleSubmit}>
            Value
          </Button>
        </div>
      </>
    )
  }
}

export default Form.create()(ExampleSearch)
