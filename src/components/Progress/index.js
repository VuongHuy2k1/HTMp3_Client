import React from 'react'
import { connect } from 'react-redux'

import { setVolume } from '../../actions'

import styles from './ProgressBar.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

class ProgressBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showTooltip: false }
  }

  render() {
    return (
      <div className={cx('progress')}>
        <FontAwesomeIcon
          icon={this.props.volume <= 0 ? faVolumeXmark : faVolumeHigh}
        />

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
