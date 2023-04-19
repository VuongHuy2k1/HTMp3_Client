import { useState } from 'react'
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { selectSong } from '../../../actions'
import * as PlayService from '../../../service/playService'
import classNames from 'classnames/bind'
import styles from './Item.module.scss'
const cx = classNames.bind(styles)

const Item = ({
  song,

  selectSong,
  selectedSongPlay,
  playerState,
}) => {
  const [, setHovered] = useState(false)
  const dispatch = useDispatch()

  const savePlay = async () => {
    const response = await PlayService.saveAlbum({
      songId: song._id,
    })
  }
  const handleClick = () => {
    savePlay()

    selectSong(song)
    dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 1 })
  }

  // Set song as active
  const now_selected = selectedSongPlay._id === song._id ? 'active' : ''

  // set the gif

  const phaser = () => {
    if (selectedSongPlay._id === song._id && playerState) {
      return (
        <div>
          <img
            alt=""
            src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
            id={cx('focused')}
          />
        </div>
      )
    } else {
      return (
        <div>
          {song.links === undefined ? (
            <>
              <img src={song.img} alt={song.name} className={cx('icon-img')} />
            </>
          ) : (
            <>
              <img
                src={song.links.images[1].url}
                alt={song.name}
                className={cx('icon-img')}
              />
            </>
          )}
        </div>
      )
    }
  }

  return (
    <div
      id={cx(now_selected)}
      className={cx('song-item')}
      onClick={handleClick}
    >
      {phaser()}
      <div className={cx('right')}>
        <div className={cx('name')}>{song.name}</div>
        <div className={cx('singer')}>{song.singer}</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedSongPlay: state.selectedSongPlay,
    playerState: state.playerState,
  }
}

export default connect(mapStateToProps, { selectSong })(Item)
