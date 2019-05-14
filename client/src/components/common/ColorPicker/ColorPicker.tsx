import * as React from 'react'
import { Color, SketchPicker } from 'react-color'
import { DynamicCx } from 'common/types'
import { styling } from 'common/utils'
import * as s from './ColorPicker.scss'

interface Props {
  cx?: DynamicCx
  onChange?: Function
  color?: string
}

interface State {
  displayColorPicker: boolean
  color?: Color
}

@styling(s)
export default class ColorPicker extends React.Component<Props, State> {
  defaultColor = '#000000'
  state = {
    displayColorPicker: false,
    color: this.props.color || this.defaultColor,
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.color !== prevProps.color) {
      this.setState({ color: this.props.color || this.defaultColor })
    }
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  }

  handleChange = color => {
    this.setState({ color: color.hex })
    this.props.onChange(color)
  }

  render() {
    const { cx } = this.props

    const showColor = {
      width: '36px',
      height: '14px',
      borderRadius: '2px',
      background: `${this.state.color}`,
    } as React.CSSProperties

    return (
      <div className={cx('picker-wrap')}>
        <div className={cx('picker-swatch')} onClick={this.handleClick}>
          <div style={showColor} />
        </div>
        {this.state.displayColorPicker ? (
          <div className={cx('picker-popover')}>
            <div className={cx('picker-cover')} onClick={this.handleClose} />
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    )
  }
}
