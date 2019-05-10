import * as React from 'react'
import * as HttpStatus from 'http-status-codes'
import { Button } from 'antd'
import { FormRow, Section } from 'components/common/'

import { axios, CustomAxiosRequestConfig, errorPopup } from 'common/utils'

interface OwnState {
  target: any
}

export default class Example extends React.Component<any, OwnState> {
  testConnectionError = () => axios.get('/api/vertical-type', { timeout: 1 })

  testGetError = () => axios.get('/api/store-categories?subVertical=xxx')

  testPatchError = () => axios.patch('/api/store-categories/9999999999', { order: 'noNumber' })

  testSelfErrorHandling = async () => {
    try {
      await axios.get('/api/vertical-types/noVertical', {
        onErrorHttpStatuses: [HttpStatus.BAD_REQUEST, HttpStatus.NOT_FOUND],
      } as CustomAxiosRequestConfig)
    } catch (response) {
      errorPopup('에러 직접 처리하기!! => ' + response.status)
    }
  }

  render() {
    return (
      <>
        <Section title="에러 얼럿">
          <FormRow title="Connection Error">
            <Button onClick={this.testConnectionError}>Test</Button>
          </FormRow>
          <FormRow title="GET Error">
            <Button onClick={this.testGetError}>Test</Button>
          </FormRow>
          <FormRow title="POST/PATCH Error">
            <Button onClick={this.testPatchError}>Test</Button>
          </FormRow>
          <FormRow title="GET Self Error Handling">
            <Button onClick={this.testSelfErrorHandling}>Test</Button>
          </FormRow>
        </Section>
      </>
    )
  }
}
