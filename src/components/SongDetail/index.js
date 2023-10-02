import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import {
  selectAlbum,
  setPlayerState,
  selectSong,
  selectSongByAlbum,
} from '../../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './SongDetail.module.scss'
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import * as PlayService from '../../service/playService'
import * as UserServices from '../../service/userService'
import { useState, useEffect } from 'react'
const cx = classNames.bind(styles)

const SongDetail = ({
  selectedAlbumId,
  playerState,
  selectedSongPlay,
  songs,
  typeSave,
  selectSong,
  selectSongByAlbum,
}) => {
  const dispatch = useDispatch()
  const [userPriority, setUserPriority] = useState(false)

  const value = UserServices.isLog()

  useEffect(() => {
    if (value === true) {
      const fetchApi = async () => {
        const res = await UserServices.isAuthen()

        if (res.priority === 'vip') {
          setUserPriority(true)
        }
      }
      fetchApi()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const savePlay = async () => {
    if (typeSave === 'album') {
      // eslint-disable-next-line no-unused-vars
      const response = await PlayService.saveAlbum({
        albumName: selectedAlbumId.name,
        songId: songs[0]._id,
      })
    } else if (typeSave === 'singer') {
      // eslint-disable-next-line no-unused-vars
      const response = await PlayService.saveAlbum({
        singerName: selectedAlbumId.name,
        songId: songs[0]._id,
      })
    } else {
      // eslint-disable-next-line no-unused-vars
      const response = await PlayService.saveAlbum({
        songId: selectedAlbumId.name,
        playlistId: songs[0]._id,
      })
    }
  }

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

  const icon = () => {
    if (
      selectedAlbumId.name === selectedSongPlay.album ||
      selectedAlbumId.name === selectedSongPlay.singer
    ) {
      if (playerState === 1) {
        return (
          <>
            <FontAwesomeIcon icon={faPause} /> TẠM DỪNG
          </>
        )
      } else {
        return (
          <>
            <FontAwesomeIcon icon={faPlay} /> TIẾP TỤC PHÁT
          </>
        )
      }
    } else {
      return (
        <>
          <FontAwesomeIcon icon={faPlay} /> PHÁT NGAY
        </>
      )
    }
  }

  const dateObject = new Date(selectedAlbumId.updatedAt)
  const onMusicPlay = (e) => {
    e.preventDefault()
    if (
      selectedAlbumId.name === selectedSongPlay.album ||
      selectedAlbumId.name === selectedSongPlay.singer
    ) {
      if (!playerState) {
        dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 1 })
      } else {
        dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 0 })
      }
    } else {
      dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 1 })
      if (userPriority === true) {
        selectSongByAlbum(songs)
      } else {
        const arr = songs.filter(function (item) {
          return item.priority !== 'vip'
        })

        selectSongByAlbum(arr)
      }
      savePlay()
      selectSong(songs[0])
    }
  }

  return (
    <div className={cx('song-detail')}>
      {playImg()}
      <div className={cx('artist-img')}>
        <div className={cx('header', 'pad')}>{selectedAlbumId.name}</div>
        <div className={cx('about')}>
          Cập nhật: {dateObject.getDate()}/{dateObject.getMonth()}/
          {dateObject.getFullYear()}
        </div>
        <div className={cx('about')}>{selectedAlbumId.singer}</div>
        <button className={cx('btn-play')} onClick={onMusicPlay}>
          {icon()}
        </button>
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
  selectAlbum,
  selectSong,
  selectSongByAlbum,
})(SongDetail)
