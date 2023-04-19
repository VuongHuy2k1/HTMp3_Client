import React from 'react'
import { connect } from 'react-redux'

import { setVolume } from '../../actions'

import styles from './ProgressBar.module.scss'
import classNames from 'classnames/bind'
import { color } from '@mui/system'
const cx = classNames.bind(styles)

class ProgressBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showTooltip: false }
  }

  render() {
    return (
      <div className={cx('progress')}>
        <input
          type="range"
          min="0"
          max="100"
          style={{ backgroundSize: `${(this.props.volume * 100) / 100}% 100%` }}
          value={this.props.volume}
          onChange={(e) => this.props.setVolume(e.target.value)}
          onMouseEnter={() => this.setState({ showTooltip: true })}
          onMouseLeave={() => this.setState({ showTooltip: false })}
        />
        {this.state.showTooltip ? (
          <span className={cx('tooltip')}>{this.props.volume}</span>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    volume: state.volume,
  }
}

export default connect(mapStateToProps, { setVolume })(ProgressBar)
