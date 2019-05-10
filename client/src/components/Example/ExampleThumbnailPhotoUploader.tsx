import * as React from 'react'
import { Button } from 'antd'
import logger from 'common/logger'

import ThumbnailPhotoUploader from '../common/Uploader/ThumbnailPhotoUploader'

class ExampleThumbnailPhotoUploader extends React.Component<any, any> {
  state = {
    fileList: [
      {
        url:
          'http://beta.shop1.phinf.naver.net/20180209_67/showindowCommon_1518144683972mtbaI_JPEG/10265127513276622_2039959537.jpg',
      },
      {
        url:
          'http://beta.shop1.phinf.naver.net/20180209_57/showindowCommon_1518142585413SoXNr_JPEG/10263028952849985_-1395929385.jpg',
      },
    ],
  }

  handleChange = result => {
    logger.debug('onChanged', result)
    this.setState({
      fileList: result,
    })
  }

  getImageList = () => {
    logger.info('getImageList', this.state.fileList)
  }

  render() {
    return (
      <>
        <span>
          - thumbnail 노출 <br />
          - 이미지 업로드 개수 지정 <br />
          - 업로드 제한 설정 (image size, width, height)<br />
        </span>
        <br />

        <ThumbnailPhotoUploader
          onChange={this.handleChange}
          fileList={this.state.fileList}
          uploadLimit={3}
          validOption={{ width: 158 }}
        />
        <Button style={{ float: 'right' }} type="primary" size={'small'} onClick={this.getImageList}>
          업로드된 이미지 목록
        </Button>
      </>
    )
  }
}

export default ExampleThumbnailPhotoUploader
