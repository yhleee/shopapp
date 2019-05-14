import * as React from 'react'
import { Button } from 'antd'

const CustomButton = ({ type, ...props }) => {
  const { style } = props

  const getButtonStyle = type => {
    switch (type) {
      case 'orange':
        return {
          backgroundColor: '#faad14',
          color: '#fff',
        }
      case 'gray':
        return {
          backgroundColor: '#8c8c8c',
          color: '#fff',
        }
      case 'green':
      default:
        return {
          backgroundColor: '#52c41a',
          color: '#fff',
        }
    }
  }

  const customStyle = getButtonStyle(type)

  return <Button {...props} style={{ ...style, ...customStyle }} />
}

export default CustomButton
