import * as React from 'react'

export const enum THUMB_TYPE {}

const noImage = '' // add default no-image

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  thumbType?: THUMB_TYPE
  fallbackSrc?: string
}

export default class Img extends React.Component<Props, {}> {
  static defaultProps: Partial<Props> = {
    fallbackSrc: noImage,
  }

  handleError = e => {
    e.target.src = this.props.fallbackSrc
  }

  getThumbQuery(thumbType) {
    if (thumbType) return `?type=${thumbType}`
    return ''
  }

  render() {
    const { src, thumbType, fallbackSrc, ...restProps } = this.props
    return (
      <img src={`${src || fallbackSrc}${this.getThumbQuery(thumbType)}`} {...restProps} onError={this.handleError} />
    )
  }
}
