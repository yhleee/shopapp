import * as React from 'react'
import * as s from './Panel.scss'
import { styling } from 'common/utils'
import { DynamicCx } from 'common/types/style'
import { Form, Button } from 'antd'

interface OwnProps {
  cx?: DynamicCx
  style?: object
  border?: boolean
  children?: any
  title?: string
  headerRight?: any
  handleForm?: Function
  isLayoutInline: boolean
  footerButtons?: any[]
  footerButtonsAlign?: 'center' | 'end' | 'justify' | 'left' | 'match-parent' | 'right' | 'start'
}

/**
 * border: default는 true.
 * children: 패널 안에 들어올 section
 * title: 제목
 * headerRight: 제목 우측에 나올 엘리먼트 (필요한 경우)
 * handleForm: form submit 함수
 * footerButtons: 하단에 나올 버튼 배열
 * buttonAlign : 하단에 나올 버튼 정렬 (left, center, right)
 *
 * ex)
 * <FormPanel
 *     title="제목"
 *     border="false" // border 여부 (default는 true)
 *     handleForm={this.handleSave}
 *     headerRight={[
 *         <Button type="button" key="button">우측에 들어갈 것이 있으면 element추가</Button>,
 *     ]}
 *     footerButtons={[
 *         { text: 'Save', type: 'primary', htmlType: 'submit', onClick: this.handleSave,},
 *         { text: 'Cancel', onClick: this.handleCancel },
 *     ]}>
 *     {children}
 * </FormPanel>
 */
const FormPanel: React.SFC<OwnProps> = ({
  cx,
  style,
  border,
  children,
  title,
  headerRight,
  handleForm,
  isLayoutInline = false,
  footerButtons = [],
  footerButtonsAlign,
}) => {
  const customStyle: React.CSSProperties = {
    textAlign: footerButtonsAlign,
  }
  return (
    <div className={cx('panel-wrap')}>
      <div className={cx({ panel: true, 'no-border': border === false })} style={style}>
        <div className={cx('panel-heading')}>
          <div className={cx('align-left')}>
            <h2 className={cx('panel-title')}>{title}</h2>
          </div>
          {headerRight && <div className={cx('align-right')}>{headerRight}</div>}
        </div>
        <div className={cx('panel-body')}>
          <Form layout={isLayoutInline ? 'inline' : null}>
            {children}
            <div className={cx('panel-footer')} style={customStyle}>
              {footerButtons.map((button, index) => {
                return (
                  <Button key={`button-${index}`} {...button}>
                    {button.text}
                  </Button>
                )
              })}
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

const styled = styling(s)(FormPanel)
export default styled
