import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import * as songsService from '../../service/songsService'
import Popup from 'reactjs-popup'
import PopupComponent from '../Flexpreminum'
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
  charts,
  top,
  mini,
  setStatus,
}) => {
  const [songsList, setSongsList] = useState([])
  const [userPriority, setUserPriority] = useState(false)
  const [songPriority, setSongPriority] = useState(false)

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

    if (song.priority === 'vip') {
      setSongPriority(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (value === true) {
      const fetchApi = async () => {
        const songsFromAlbum = await songsService.getSongsFromAlbum(song.album)
        const songsFromSinger = await songsService.getSongsFromSinger(
          song.singer,
        )

        if (songsFromAlbum.length <= 0) {
          setSongsList(songsFromSinger)
        } else {
          setSongsList(songsFromAlbum)
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
        albumName: song.album,
        songId: song._id,
      })
    } else if (typeSave === 'singer') {
      // eslint-disable-next-line no-unused-vars
      const response = await PlayService.saveAlbum({
        singerName: song.singer,
        songId: song._id,
      })
    } else {
      // eslint-disable-next-line no-unused-vars
      const response = await PlayService.saveAlbum({
        songId: song._id,
        playlistId: playlistId,
      })
    }
  }

  const handleClick = () => {
    dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 1 })
    if (type === true) {
      if (userPriority === true) {
        selectSongByAlbum(selectedUserList)
      } else {
        const arr = selectedUserList.filter(function (item) {
          return item.priority !== 'vip'
        })

        selectSongByAlbum(arr)
      }
    } else {
      if (userPriority === true) {
        selectSongByAlbum(songsList)
      } else {
        const arr = songsList.filter(function (item) {
          return item.priority !== 'vip'
        })

        selectSongByAlbum(arr)
      }
    }

    savePlay()
    selectSong(song)
  }

  const dispatch = useDispatch()

  const now_selected = selectedSongPlay._id === song._id ? 'actie' : ''

  const animation = () => {
    return (
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
            <>
              {userPriority === false && songPriority === true ? (
                <Popup
                  modal
                  trigger={
                    <form className={cx('hover-play')} onClick={handleClick}>
                      <FontAwesomeIcon
                        icon={faPlay}
                        className={cx('icon-play')}
                      ></FontAwesomeIcon>
                    </form>
                  }
                  overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
                >
                  {(close) => <PopupComponent close={close} />}
                </Popup>
              ) : (
                <form className={cx('hover-play')} onClick={handleClick}>
                  <FontAwesomeIcon
                    icon={faPlay}
                    className={cx('icon-play')}
                  ></FontAwesomeIcon>
                </form>
              )}
            </>
          )}
        </div>
      </>
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
        <div className={cx('music-img')}>{animation()}</div>

        <div className={cx('name')}>
          <p>{song.name}</p>
          {songPriority === true ? <span>premium</span> : <></>}
        </div>
        {mini ? <></> : <div className={cx('author')}>{song.singer}</div>}

        <div className={cx('icon-dow')}>
          <List
            song={song}
            type={type}
            playlistId={playlistId}
            priority={
              userPriority === false && songPriority === true ? true : false
            }
          />
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
