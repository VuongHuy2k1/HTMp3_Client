import classNames from 'classnames/bind'
import styles from './ListItem.module.scss'
import {
  selectAlbum,
  selectSong,
  selectSongByAlbum,
  setStatus,
} from '../../actions'
import * as songsService from '../../service/songsService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

import React from 'react'
import ReactDOM from 'react-dom'
const cx = classNames.bind(styles)

const Item = ({
  album,
  selectAlbum,
  selectSong,
  selectSongByAlbum,
  setStatus,
}) => {
  const [value, setValue] = useState(true)
  const id = value === false ? 'block' : ''

  const [songsList, setSongsList] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchApi = async () => {
      const response = await songsService.getSongsFromAlbum(album.name)

      setSongsList(response)
    }
    fetchApi()
  }, [])

  return (
    <div className={cx('item')}>
      <div
        className={cx('warrper')}
        onClick={() => {
          setStatus(true)
        }}
      >
        <div className={cx('card')}>
          <div className={cx('card-top')}>
            <div className={cx('img-card')}>
              <img className={cx('img', 'img-type-1')} src={album.img}></img>
              <form class={cx('hover-player')} id={cx(id)}>
                <div class={cx('hover-player-a')}>
                  <div
                    class={cx('player-btn')}
                    onClick={() => {
                      selectSongByAlbum(songsList)
                      selectSong(songsList[0])

                      dispatch({ type: 'PLAYER_STATE_SELECTED', payload: 1 })
                    }}
                  >
                    <span class={cx('player-btn-span')}>
                      <span class={cx('player-btn-span-a')}>
                        <FontAwesomeIcon
                          className={cx('icon-li')}
                          icon={faPlay}
                        />
                      </span>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={cx('card-bottom')}>
            <Link
              id={cx(id)}
              className={cx('card-name')}
              to={`/album/${album.name}`}
              onClick={() => {
                selectAlbum(album)
              }}
            >
              <div className={cx('name', 'name-text')}>{album.name}</div>
            </Link>
            <div className={cx('card-type')}>
              <span className={cx('type', 'type-text')}>
                {album.description}
              </span>
            </div>
          </div>
        </div>
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
export default connect(mapStateToProps, {
  selectAlbum,
  selectSong,
  selectSongByAlbum,
  setStatus,
})(Item)
