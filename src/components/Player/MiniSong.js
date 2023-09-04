import classNames from 'classnames/bind'
import styles from './Player.module.scss'
import React from 'react'

const cx = classNames.bind(styles)

const MiniSong = ({ selectedSongPlay }) => {
  return (
    <div className={cx('song-detail')}>
      <div className={cx('player-img')}>
        {selectedSongPlay.links === undefined ? (
          <>
            <img
              src={selectedSongPlay.img}
              alt={selectedSongPlay.name}
              className={cx('icon-img')}
            />
          </>
        ) : (
          <>
            <img
              src={selectedSongPlay.links.images[1].url}
              alt={selectedSongPlay.name}
              className={cx('icon-img')}
            />
          </>
        )}
      </div>
      <div className={cx('artist-img')}>
        <div className={cx('header', 'pad')}>{selectedSongPlay.name}</div>
        <p className={cx('artist-name', 'pad')}>{selectedSongPlay.singer}</p>
      </div>
    </div>
  )
}

export default MiniSong
