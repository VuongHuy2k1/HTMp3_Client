import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'
import { connect } from 'react-redux'
import {
  changePlaylist,
  setFocus,
  getPlayListId,
  selectedMess,
  selectedLoad,
} from '../../../actions'
import Wrapper from '../Wrapper'
import styles from './More.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

import { useRef, useState, useEffect } from 'react'

import * as PlayListService from '../../../service/playListService'
const cx = classNames.bind(styles)

function More({
  playList,
  changePlaylist,
  getPlayListId,
  setFocus,
  selectedMess,
  selectedLoad,
}) {
  const [showList, setShowList] = useState(false)
  const [show, setShow] = useState(false)

  const removePlayList = async (e) => {
    const response = await PlayListService.removePlayList(e)
  }
  const fepi = async () => {
    const response = await PlayListService.getPlayList()

    changePlaylist(response)
  }
  const removeClick = () => {
    removePlayList(playList._id)
    selectedLoad(true)
    selectedMess({
      msgBody: 'Xóa danh sách phát thành công',
      msgError: false,
    })
    setShowList(false)
    const timerLoading = setTimeout(() => {
      clearTimeout(timerLoading)
      fepi()
      selectedLoad(false)
    }, 1000)
  }

  const renderResult = (attrs) => (
    <div
      className={cx('menu-list')}
      tabIndex="-1"
      {...attrs}
      onMouseOver={() => setShowList(true)}
      onMouseOut={() => setShowList(false)}
    >
      <Wrapper>
        <ul className={cx('menu-body')}>
          <li className={cx('menu-item')} onClick={removeClick}>
            <FontAwesomeIcon
              className={cx('icon')}
              icon={faTrash}
            ></FontAwesomeIcon>
            Xóa playlist
          </li>
          <li
            className={cx('menu-item')}
            onClick={() => {
              setShowList(false)
              setFocus(2)
              getPlayListId(playList)
            }}
          >
            <FontAwesomeIcon
              className={cx('icon')}
              icon={faPen}
            ></FontAwesomeIcon>
            Chỉnh sửa playlist
          </li>
        </ul>
      </Wrapper>
    </div>
  )

  const oneClick = () => {
    if (showList === false) {
      return setShowList(true)
    } else {
      return setShowList(false)
    }
  }

  return (
    <Tippy
      interactive
      visible={showList}
      placement="right-start"
      render={renderResult}
      onClickOutside={() => setShowList(false)}
    >
      <div className={cx('hover-like-icon')}>
        <FontAwesomeIcon
          className={cx('icon-li')}
          icon={faEllipsis}
          onClick={oneClick}
        />
      </div>
    </Tippy>
  )
}

const mapStateToProps = (state) => {
  return {
    userPlaylist: state.userPlaylist,
  }
}

export default connect(mapStateToProps, {
  changePlaylist,
  setFocus,
  getPlayListId,
  selectedMess,
  selectedLoad,
})(More)
