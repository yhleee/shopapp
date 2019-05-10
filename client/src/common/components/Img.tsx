import * as React from 'react'

export const enum THUMB_TYPE {
  W336 = 'w336',
  F750_1000 = 'f750_1000',
  W720 = 'w720',
}

const noImage = 'http://static.checkout.naver.net/cnsv/p/im/hotdeal/no_image_244_v1.png'

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
