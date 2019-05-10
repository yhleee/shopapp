import * as React from 'react'
import { Row, Button, Upload, message } from 'antd'

import { FormRow, Section } from 'components/common/'
import { FileDownloadButton } from 'components/common'
import * as productCategory from 'common/services/productCategory'
import * as storeCategory from 'common/services/storeCategory'
import { getBaseUrl } from 'common/utils'

interface OwnState {
  target: any
}

export default class Example extends React.Component<any, OwnState> {
  onChange = info => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  render() {
    const props = {
      name: 'file',
      action: `${getBaseUrl()}/api/vertical-category-mapper/excel/upload`,
      onChange: this.onChange,
    }

    return (
      <>
        <Section title="엑셀 다운로드" subTitle="카테고리 목록">
          <FormRow title="상품 카테고리">
            <FileDownloadButton fileName="상품_카테고리_목록" fetchData={productCategory.downloadExcel}>
              Download
            </FileDownloadButton>
          </FormRow>
          <FormRow title="스토어 카테고리">
            <FileDownloadButton fileName="스토어_카테고리_목록" fetchData={storeCategory.downloadExcel}>
              Download
            </FileDownloadButton>
          </FormRow>
        </Section>
        <Section title="엑셀 업로드" subTitle="버티컬-카테고리 설정">
          <FormRow title="템플릿">
            <FileDownloadButton
              fileName="버티컬_카테고리_설정_템플릿"
              fetchData={productCategory.downloadExcelTemplate}
            >
              Template Download
            </FileDownloadButton>
          </FormRow>
          <FormRow title="업로드">
            <Upload {...props}>
              <Button>Upload</Button>
            </Upload>
          </FormRow>
        </Section>
      </>
    )
  }
}
