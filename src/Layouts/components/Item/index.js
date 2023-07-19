import { useState } from 'react'
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
import { faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons'
import List from '../../../components/Popper/List'
const cx = classNames.bind(styles)

const Item = ({
  song,
  selectSong,
  selectedSongPlay,
  playerState,
  setStatus,
}) => {
  const value = UserServices.isLog()

  const dispatch = useDispatch()
  const [showList, setShowList] = useState(false)
  const [showListE, setShowListE] = useState(false)
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
          {song.links === undefined ? (
            <>
              <img src={song.img} alt={song.name} className={cx('icon-img')} />
              <div className={cx('flex-img')}>
                <div class={cx('img-play')}>
                  <img
                    alt=""
                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                    id={cx('focused')}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <img
                src={song.links.images[1].url}
                alt={song.name}
                className={cx('icon-img')}
              />
              <div className={cx('flex-img')}>
                <div class={cx('img-play')}>
                  <img
                    alt=""
                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                    id={cx('focused')}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )
    } else {
      return (
        <div>
          {song.links === undefined ? (
            <>
              <img src={song.img} alt={song.name} className={cx('icon-img')} />
              <div className={cx('flex-img')}>
                <form class={cx('hover-play')} onClick={handleClick}>
                  <FontAwesomeIcon
                    icon={faPlay}
                    className={cx('icon-play')}
                  ></FontAwesomeIcon>
                </form>
              </div>
            </>
          ) : (
            <>
              <img
                src={song.links.images[1].url}
                alt={song.name}
                className={cx('icon-img')}
              />
              <div className={cx('flex-img')}>
                <form class={cx('hover-play')} onClick={handleClick}>
                  <FontAwesomeIcon
                    icon={faPlay}
                    className={cx('icon-play')}
                  ></FontAwesomeIcon>
                </form>
              </div>
            </>
          )}
        </div>
      )
    }
  }
  const oneClick = () => {
    if (showList === false) {
      setShowListE(true)
    } else {
      setShowListE(false)
      // setShowPlaylist(false)
    }
  }
  const show = () => {
    if (showList === true || showListE === true) {
      return <List song={song} type={false} />
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
            <div className={cx('name')}>{song ? song.name : <Skeleton />}</div>
            <div className={cx('singer')}>
              {song ? song.singer : <Skeleton />}
            </div>
          </div>

          {/* <div className={cx('ba-icon')}>
            <FontAwesomeIcon
                icon={faEllipsis}
                className={cx('more-icon')}
              ></FontAwesomeIcon>
            {show()}
          </div> */}
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
            <div className={cx('name')}>{song.name}</div>
            <div className={cx('singer')}>{song.singer}</div>
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
