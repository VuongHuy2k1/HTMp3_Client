import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'
import { connect } from 'react-redux'
import {
  changePlaylist,
  setFocus,
  selectedUserPlayList,
  selectedMess,
  selectedLoad,
} from '../../../actions'
import Wrapper from '../Wrapper'
import styles from './List.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBarsStaggered,
  faChevronRight,
  faCircleMinus,
  faCirclePlus,
  faDownload,
  faEllipsis,
  faHeadphones,
} from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect, useRef } from 'react'
import Message from '../../Message'

import * as PlayListService from '../../../service/playListService'
import * as UserServices from '../../../service/userService'
const cx = classNames.bind(styles)

function List({
  type,
  userPlaylist,
  song,
  setFocus,
  playlistId,
  selectedUserPlayList,
  selectedMess,
  selectedLoad,
}) {
  const [showList, setShowList] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)

  const isAuthenticated = UserServices.isLog()

  const addSong = async (a, b) => {
    const response = await PlayListService.addSong(a, b)
  }

  const fepi = async (e) => {
    const response = await PlayListService.getSongPlayList(e)
    selectedUserPlayList(response)
  }

  const removeSong = async (a, b) => {
    const response = await PlayListService.removeSong(a, b)
  }
  const removeClick = () => {
    removeSong(playlistId, song._id)

    const timerId = setTimeout(() => {
      clearTimeout(timerId)
      selectedLoad(true)
      selectedMess({
        msgBody: 'Xóa khỏi danh sách phát thành công',
        msgError: false,
      })
      fepi(playlistId)
      setShowList(false)
    }, 700)
    const timerOff = setTimeout(() => {
      clearTimeout(timerOff)

      selectedLoad(false)
    }, 2000)
  }

  const onShow = () => {
    if (showPlaylist === false) {
      return setShowPlaylist(true)
    } else {
      return setShowPlaylist(false)
    }
  }

  const ListTag = userPlaylist.map((playList) => {
    const addClick = () => {
      addSong(playList._id, song._id)

      selectedLoad(true)
      selectedMess({
        msgBody: 'Thêm vào danh sách phát thành công',
        msgError: false,
      })
      const timerId = setTimeout(() => {
        clearTimeout(timerId)
        setShowList(false)
        selectedLoad(false)
      }, 2500)
    }

    if (isAuthenticated === true) {
      return (
        <li className={cx('menu-list-item')} onClick={addClick}>
          <FontAwesomeIcon icon={faBarsStaggered}></FontAwesomeIcon>
          <p> {playList.name}</p>
        </li>
      )
    }
  })

  const Id = showPlaylist === true ? 'active' : ''
  const renderResult = (attrs) => (
    <div className={cx('container-list')} tabIndex="-1" {...attrs}>
      <div className={cx('menu-playlist', Id)}>
        <li className={cx('menu-list-item', 'fist')} onClick={preAdd}>
          <div className={cx('add-icon')}></div>
          <p> Tạo playlist mới</p>
        </li>
        <ul className={cx('list-playlist', 'scroll')}>{ListTag}</ul>
      </div>
      <div className={cx('menu-list', 'scroll')}>
        <Wrapper className={cx('menu-popper')}>
          <div className={cx('menu-warpper')}>
            <div className={cx('song-infor')}>
              <img
                className={cx('song-img')}
                src={
                  song.links === undefined ? song.img : song.links.images[1].url
                }
                alt={song.name}
              ></img>
              <div className={cx('content-infor')}>
                <p className={cx('song-name')}>{song.name}</p>
                <p className={cx('views')}>
                  <FontAwesomeIcon icon={faHeadphones}></FontAwesomeIcon>
                  {song.views}
                </p>
              </div>
            </div>
            <ul className={cx('menu-body')}>
              {type === true ? (
                <li className={cx('menu-item')} onClick={removeClick}>
                  <FontAwesomeIcon
                    className={cx('menu-icon')}
                    icon={faCircleMinus}
                  ></FontAwesomeIcon>
                  <p className={cx('title')}>Xóa khỏi playlist</p>
                </li>
              ) : (
                <li
                  className={cx('menu-item')}
                  onClick={onShow}
                  onClickOutside={() => setShowList(false)}
                >
                  <FontAwesomeIcon
                    className={cx('menu-icon')}
                    icon={faCirclePlus}
                  ></FontAwesomeIcon>
                  <p className={cx('title')}>Thêm vào playlist</p>
                  <FontAwesomeIcon
                    className={cx('menu-more')}
                    icon={faChevronRight}
                  ></FontAwesomeIcon>
                </li>
              )}

              <li className={cx('')}>
                <a draggable="false" href={song.url} class={cx('menu-item')}>
                  <FontAwesomeIcon
                    className={cx('menu-icon')}
                    icon={faDownload}
                  ></FontAwesomeIcon>
                  <p className={cx('title')}>Tải xuống</p>
                </a>
              </li>
            </ul>
          </div>
        </Wrapper>
      </div>
    </div>
  )

  // Reset to first page
  const oneClick = () => {
    if (showList === false) {
      setShowList(true)
    } else {
      setShowList(false)
      setShowPlaylist(false)
    }
  }
  const preAdd = () => {
    setShowList(false)
    setFocus(1)
  }

  return (
    <Tippy
      interactive
      visible={showList}
      placement="bottom-end"
      render={renderResult}
      onClickOutside={() => {
        setShowList(false)
        setShowPlaylist(false)
      }}
    >
      <div class={cx('hover-like-icon')}>
        <FontAwesomeIcon
          className={cx('icon-li')}
          icon={faEllipsis}
          onClick={oneClick}
          onBlur={() => setShowList(false)}
        />
      </div>
    </Tippy>
  )
}

const mapStateToProps = (state) => {
  return {
    focus: state.focus,
    userPlaylist: state.userPlaylist,
    selectedSongPlay: state.selectedSongPlay,
    songAdd: state.songAdd,
  }
}

export default connect(mapStateToProps, {
  changePlaylist,
  setFocus,
  selectedUserPlayList,
  selectedMess,
  selectedLoad,
})(List)
