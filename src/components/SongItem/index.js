import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import * as songsService from '../../service/songsService'
import * as PlayListService from '../../service/playListService'
import {
  selectSong,
  selectSongByAlbum,
  setFocus,
  addSong,
  selectedUserPlayList,
  selectedTypeSave,
  setStatus,
} from '../../actions'
import classNames from 'classnames/bind'
import styles from './SongItem.module.scss'
import List from '../Popper/List'
import * as PlayService from '../../service/playService'
import * as UserServices from '../../service/userService'
import { faMusic, faPlay } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)

const SongItem = ({
  song,
  type,
  typeSave,
  selectedSongPlay,
  playerState,
  selectSong,
  selectSongByAlbum,
  selectedUserList,
  playlistId,
  selectedUserPlayList,
  charts,
  top,
  mini,
  setStatus,
}) => {
  const [songsList, setSongsList] = useState([])
  const value = UserServices.isLog()
  useEffect(() => {
    const fetchApi = async () => {
      const songsFromAlbum = await songsService.getSongsFromAlbum(song.album)
      const songsFromSinger = await songsService.getSongsFromSinger(song.singer)

      if (songsFromAlbum.length <= 0) {
        setSongsList(songsFromSinger)
      } else {
        setSongsList(songsFromAlbum)
      }
    }
    fetchApi()
  }, [])

  const fepi = async (e) => {
    const response = await PlayListService.getSongPlayList(e)

    selectedUserPlayList(response)
  }

  const removeSong = async (a, b) => {
    const response = await PlayListService.removeSong(a, b)
  }

  const savePlay = async () => {
    if (typeSave === 'album') {
      const response = await PlayService.saveAlbum({
        albumName: song.album,
        songId: song._id,
      })
    } else if (typeSave === 'singer') {
      const response = await PlayService.saveAlbum({
        singerName: song.singer,
        songId: song._id,
      })
    } else {
      const response = await PlayService.saveAlbum({
        songId: song._id,
        playlistId: playlistId,
      })
    }
  }

  const removeClick = () => {
    removeSong(playlistId, song._id)
    const timerId = setTimeout(() => {
      clearTimeout(timerId)

      fepi(playlistId)
    }, 100)
  }

  const handleClick = () => {
    dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 1 })
    if (type === true) {
      selectSongByAlbum(selectedUserList)
    } else {
      selectSongByAlbum(songsList)
    }

    savePlay()
    selectSong(song)
  }

  const dispatch = useDispatch()

  const now_selected = selectedSongPlay._id === song._id ? 'actie' : ''

  const animation = () => {
    return (
      <div>
        <>
          <img
            src={song.links === undefined ? song.img : song.links.images[1].url}
            alt={song.name}
            className={cx('icon-img')}
          />
          <div className={cx('flex-img')}>
            {selectedSongPlay._id === song._id &&
            playerState &&
            value === true ? (
              <div className={cx('img-play')}>
                <img
                  alt=""
                  src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                  id={cx('focused')}
                />
              </div>
            ) : (
              <form className={cx('hover-play')} onClick={handleClick}>
                <FontAwesomeIcon
                  icon={faPlay}
                  className={cx('icon-play')}
                ></FontAwesomeIcon>
              </form>
            )}
          </div>
        </>
      </div>
    )
  }

  const color = () => {
    if (top + 1 === 1) {
      return 'top-1'
    }
    if (top + 1 === 2) {
      return 'top-2'
    }
    if (top + 1 === 3) {
      return 'top-3'
    } else {
      return 'top-out'
    }
  }

  const iconStart = () => {
    return (
      <>
        {charts ? (
          <div className={cx('chart-content')}>
            <div className={cx('chart-top', color())}>
              <span>{top + 1}</span>
            </div>
            <div className={cx('growth')}></div>
          </div>
        ) : (
          <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
        )}
      </>
    )
  }
  return (
    <>
      <div
        id={cx(now_selected)}
        className={mini ? cx('song-item-mini') : cx('song-item')}
        onClick={() => {
          if (value !== true) {
            setStatus(true)
          }
        }}
      >
        <div className={cx('music-icon')}>{iconStart()}</div>

        {animation()}
        <div className={cx('name')}>{song.name}</div>
        {mini ? <></> : <div className={cx('author')}>{song.singer}</div>}

        <div className={cx('icon-dow')}>
          <List song={song} type={type} playlistId={playlistId} />
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedSongPlay: state.selectedSongPlay,
    playerState: state.playerState,
    selectedUserList: state.selectedUserList,
  }
}

export default connect(mapStateToProps, {
  selectSong,
  selectSongByAlbum,
  setFocus,
  selectedTypeSave,
  addSong,
  selectedUserPlayList,
  setStatus,
})(SongItem)
