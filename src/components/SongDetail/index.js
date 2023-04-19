import { connect, useDispatch } from 'react-redux'

import { selectAlbum, setPlayerState } from '../../actions'

import { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './SongDetail.module.scss'
import React from 'react'
import ReactDOM from 'react-dom'
const cx = classNames.bind(styles)

const SongDetail = ({ selectedAlbumId, playerState, selectedSongPlay }) => {
  const playImg = () => {
    if (
      (playerState === 1 && selectedAlbumId.name === selectedSongPlay.album) ||
      selectedAlbumId.name === selectedSongPlay.singer
    ) {
      return (
        <div className={cx('album-img')}>
          <img
            src={selectedAlbumId.img}
            alt={selectedAlbumId.name}
            className={cx('play-img')}
          />
        </div>
      )
    } else {
      return (
        <div className={cx('album-img')}>
          <img
            src={selectedAlbumId.img}
            alt={selectedAlbumId.name}
            className={cx('pause-img')}
          />
        </div>
      )
    }
  }

  return (
    <div className={cx('song-detail')}>
      {playImg()}
      <div className={cx('artist-img')}>
        <div className={cx('header', 'pad')}>{selectedAlbumId.name}</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedAlbumId: state.selectedAlbumId,
    playerState: state.playerState,
    selectedSongPlay: state.selectedSongPlay,
  }
}
export default connect(mapStateToProps, {
  setPlayerState,
  selectAlbum: selectAlbum,
})(SongDetail)
