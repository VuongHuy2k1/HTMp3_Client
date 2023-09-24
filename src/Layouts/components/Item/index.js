import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect, useDispatch } from 'react-redux'
import { selectSong } from '../../../actions'
import * as PlayService from '../../../service/playService'
import classNames from 'classnames/bind'
import * as UserServices from '../../../service/userService'
import { setStatus } from '../../../actions'
import styles from './Item.module.scss'
import Skeleton from 'react-loading-skeleton'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

const Item = ({
  song,
  selectSong,
  selectedSongPlay,
  playerState,
  setStatus,
}) => {
  const { id } = useParams()
  const value = UserServices.isLog()

  const dispatch = useDispatch()
  const [showList, setShowList] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [showListE, setShowListE] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [userPriority, setUserPriority] = useState(false)
  const [songPriority, setSongPriority] = useState(false)

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
    const fetchSongPreminum = async () => {
      if (song.priority === 'vip') {
        setSongPriority(true)
      }
    }
    fetchSongPreminum()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songPriority, song, id])

  const savePlay = async () => {
    // eslint-disable-next-line no-unused-vars
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
          <>
            <img
              src={
                song.links === undefined ? song.img : song.links.images[1].url
              }
              alt={song.name}
              className={cx('icon-img')}
            />
            <div className={cx('flex-img')}>
              <div className={cx('img-play')}>
                {value === true ? (
                  <img
                    alt=""
                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                    id={cx('focused')}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        </div>
      )
    } else {
      return (
        <div>
          <>
            <img
              src={
                song.links === undefined ? song.img : song.links.images[1].url
              }
              alt={song.name}
              className={cx('icon-img')}
            />
            <div className={cx('flex-img')}>
              <form className={cx('hover-play')} onClick={handleClick}>
                <FontAwesomeIcon
                  icon={faPlay}
                  className={cx('icon-play')}
                ></FontAwesomeIcon>
              </form>
            </div>
          </>
        </div>
      )
    }
  }
  const oneClick = () => {
    if (showList === false) {
      setShowListE(true)
    } else {
      setShowListE(false)
    }
  }

  return (
    <>
      {value === true ? (
        <div
          id={cx(now_selected)}
          className={cx('song-item')}
          onClick={oneClick}
          onMouseOver={() => setShowList(true)}
          onMouseOut={() => setShowList(false)}
        >
          {phaser()}
          <div className={cx('right')}>
            <div className={cx('name')}>
              {song ? (
                <>
                  <p>{song.name}</p>
                  {/* {songPriority === true ? <span>premium</span> : <></>} */}
                </>
              ) : (
                <Skeleton />
              )}
            </div>
            <div className={cx('singer')}>
              {song ? song.singer : <Skeleton />}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cx('song-item')}
          onClick={() => {
            setStatus(true)
          }}
        >
          {phaser()}
          <div className={cx('right')}>
            <div className={cx('name')}>
              <p>{song.name}</p>
              {songPriority === true ? <span>premium</span> : <></>}
            </div>
            <div className={cx('singer')}>
              {song ? song.singer : <Skeleton />}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedSongPlay: state.selectedSongPlay,
    playerState: state.playerState,
  }
}

export default connect(mapStateToProps, { selectSong, setStatus })(Item)
