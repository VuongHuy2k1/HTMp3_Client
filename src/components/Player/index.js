import React from 'react'

import { useEffect, useRef, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import * as UserServices from '../../service/userService'
import {
  setPlayerState,
  selectSongById,
  selectedTurn,
  setVolume,
} from '../../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MiniSong from './MiniSong'
import Progress from '../Progress'
import {
  faPlayCircle,
  faRepeat,
  faPauseCircle,

} from '@fortawesome/free-solid-svg-icons'
import styles from './Player.module.scss'
import classNames from 'classnames/bind'
import { RiPlayListLine } from 'react-icons/ri'
const cx = classNames.bind(styles)

const Player = ({
  selectedSongPlay,
  playerState,
  selectSongById,
  volume,
  duration,
  currentLocation,
  selectList = [],
  selectedTurn,
}) => {
  const dispatch = useDispatch()
  const value = UserServices.isLog()
  const [shuffled, setShuffled] = useState(false)
  const [repeat, setRepeat] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [userPriority, setUserPriority] = useState(false)

  const [turn, setTurn] = useState(false)
  const audioRef = useRef()
  const songplay = selectList.findIndex((e) => e._id === selectedSongPlay._id)
  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(currentLocation * 100) / duration}% 100%`,
    }
  }

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

  useEffect(() => {
    if (playerState === 1) {
      dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 1 })
      audioRef.current.play()
      window.history.pushState({}, '', '')
    } else if (playerState === 0) {
      dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 0 })
      audioRef.current.pause()
      audioRef.current.onMusicPlay = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, songplay])

  useEffect(() => {
    // Đợi cho trang web được tải xong
    window.onload = () => {
      dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 0 })
      audioRef.current.pause()
    }
    // Xóa sự kiện onload khi component bị unmount
    return () => {
      window.onload = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const onMusicPlay = (e) => {
    e.preventDefault()

    if (!playerState) {
      audioRef.current.play()

      dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 1 })
    } else {
      audioRef.current.pause()
      dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 0 })
      audioRef.current.onMusicPlay = null
    }
  }
  //
  useEffect(() => {
    if (playerState === 1) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [playerState])
  const handleTimeSliderChange = ({ e }) => {
    const input = document.getElementById('play-position')
    audioRef.current.currentTime = Number(input?.value)

    // setTime(Number(input?.value))
    if (!playerState) {
      dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 1 })
      audioRef.current.play()
      audioRef.current.handleTimeSliderChange = null
    }
  }

  const onBackwardClick = () => {
    if (songplay > 0) {
      selectSongById(selectList[songplay - 1])
    }
    if (shuffled === true) {
      selectSongById(selectList[Math.round(Math.random() * selectList.length)])
    }
  }
  const onForwardClick = () => {
    if (songplay < selectList.length - 1) {
      selectSongById(selectList[songplay + 1])
    }
    if (shuffled === true) {
      selectSongById(selectList[Math.round(Math.random() * selectList.length)])
    }
  }
  const icon = () => {
    if (!playerState) {
      return <FontAwesomeIcon icon={faPlayCircle} />
    } else {
      return <FontAwesomeIcon icon={faPauseCircle} />
    }
  }

  const songUrl = () => {
    if (selectList.length <= 0) {
      return null
    } else {
      if (songplay < 0) {
        return selectList[0].url
      } else {
        return selectList[songplay].url
      }
    }
  }

  const nextSong = (e) => {
    e.preventDefault()
    if (songplay === selectList.length - 1 && shuffled === false) {
      audioRef.current.pause()
      dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 0 })
      return
    } else if (shuffled === true) {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause()
      }
      selectSongById(selectList[Math.round(Math.random() * selectList.length)])
    } else {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause()
      }

      selectSongById(selectList[songplay + 1])
    }
  }

  function formatTime(sec_num) {
    let hours = Math.floor(sec_num / 3600)
    let minutes = Math.floor((sec_num - hours * 3600) / 60)
    let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60)

    hours = hours < 10 ? (hours > 0 ? '0' + hours : 0) : hours

    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    return (hours !== 0 ? hours + ':' : '') + minutes + ':' + seconds
  }

  const showTime = () => {
    if (duration !== undefined) {
      return formatTime(duration)
    } else {
      return <div>00:00</div>
    }
  }
  const showCurrentTime = () => {
    if (currentLocation !== undefined) {
      return formatTime(currentLocation)
    } else {
      return <div>00:00</div>
    }
  }

  const pressTurn = () => {
    if (turn === false) {
      setTurn(true)
      selectedTurn(true)
    } else {
      setTurn(false)
      selectedTurn(false)
    }
  }

  return (
    <div id={cx('player')}>
      <div className={cx('player-left')}>
        {selectList[songplay] === undefined ? (
          <></>
        ) : (
          <MiniSong selectedSongPlay={selectList[songplay]} />
        )}
      </div>
      <div className={cx('player-center')}>
        <div className={cx('right-top')}>
          <div
            className={cx('control')}
            id={cx(shuffled === true ? `active` : '')}
            onClick={() => {
              setShuffled(!shuffled)
              setRepeat(false)
            }}
          >
            <svg
              role="img"
              height="22"
              width="22"
              viewBox="0 0 16 16"
              className=""
            >
              <path
                d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          <div className={cx('control')} onClick={onBackwardClick}>
            <svg
              role="img"
              height="22"
              width="22"
              viewBox="0 0 16 16"
              className=""
            >
              <path
                d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className={cx('main-control', 'control')} onClick={onMusicPlay}>
            {icon()}
          </div>
          <div className={cx('control')} onClick={onForwardClick}>
            <svg
              role="img"
              height="22"
              width="22"
              viewBox="0 0 16 16"
              className=""
            >
              <path
                d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          <div
            className={cx('control')}
            id={cx(repeat === true ? `active` : '')}
            onClick={() => {
              setShuffled(false)
              setRepeat(!repeat)
            }}
          >
            <FontAwesomeIcon icon={faRepeat} className={cx('reicon')} />
          </div>

          <audio
            id="main-track"
            src={songUrl()}
            preload="auto"
            loop={repeat}
            controls
            onEnded={nextSong}
            onLoadedMetadata={() => {
              dispatch({
                type: 'SET_DURATION',
                payload: audioRef.current.duration,
              })

              setInterval(() => {
                if (audioRef.current) {
                  dispatch({
                    type: 'SET_CURRENT_LOCATION',
                    payload: audioRef.current.currentTime,
                  })
                } else {
                  dispatch({
                    type: 'SET_CURRENT_LOCATION',
                    payload: 0,
                  })
                }
              }, 1000)
            }}
            ref={audioRef}
            hidden
          ></audio>
        </div>

        <div className={cx('right-bottom')}>
          <div className={cx('current-time')}>{showCurrentTime()}</div>

          <input
            className={cx('completed')}
            value={currentLocation}
            max={duration}
            onChange={(e) => handleTimeSliderChange(e)}
            type="range"
            name="playback-bar"
            id="play-position"
            style={getBackgroundSize()}
          />
          <div className={cx('current-time')}>{showTime()}</div>
        </div>
      </div>
      <div className={cx('player-right')}>
        <Progress />
        <button
          className={cx(turn === false ? 'btn-turn' : 'btn-turn-active')}
          onClick={pressTurn}
        >
          <RiPlayListLine className={cx('icon-turn')} />
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedSongPlay: state.selectedSongPlay,
    selectList: state.selectedSongList,
    playerState: state.playerState,
    songs: state.songs,
    volume: state.volume,
    duration: state.duration,
    currentLocation: state.currentLocation,
  }
}

export default connect(mapStateToProps, {
  setPlayerState,
  selectSongById,
  setVolume,
  selectedTurn,
})(Player)
