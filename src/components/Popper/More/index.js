import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'
import { connect, useDispatch } from 'react-redux'
import { changePlaylist, setFocus, getPlayListId } from '../../../actions'
import Wrapper from '../Wrapper'
import styles from './More.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import * as PlayListService from '../../../service/playListService'
import * as UserServices from '../../../service/userService'
const cx = classNames.bind(styles)

function More({ playList, changePlaylist, getPlayListId, setFocus }) {
  const [showList, setShowList] = useState(false)

  const removePlayList = async (e) => {
    const response = await PlayListService.removePlayList(e)
  }
  const fepi = async () => {
    const response = await PlayListService.getPlayList()

    changePlaylist(response)
  }
  const removeClick = () => {
    removePlayList(playList._id)

    const timerLoading = setTimeout(() => {
      clearTimeout(timerLoading)

      setShowList(false)
      fepi()
    }, 100)
  }

  const renderResult = (attrs) => (
    <div className={cx('menu-list', 'scroll')} tabIndex="-1" {...attrs}>
      <Wrapper className={cx('menu-popper')}>
        <ul className={cx('menu-body')}>
          <li className={cx('menu-item')} onClick={removeClick}>
            Xóa
          </li>
          <li
            className={cx('menu-item')}
            onClick={() => {
              setShowList(false)
              setFocus(2)
              getPlayListId(playList)
            }}
          >
            Sửa đổi
          </li>
        </ul>
      </Wrapper>
    </div>
  )

  // Reset to first page

  return (
    <Tippy
      interactive
      visible={showList}
      placement="right-start"
      render={renderResult}
    >
      <div class={cx('hover-like-icon')}>
        <FontAwesomeIcon
          className={cx('icon-li')}
          icon={faBars}
          onClick={() => {
            setShowList(true)
          }}
          onDoubleClick={() => {
            setShowList(false)
          }}
        />
      </div>
    </Tippy>
  )
}

const mapStateToProps = (state) => {
  return {
    userPlaylist: state.userPlaylist,

    userPlaylist: state.userPlaylist,
  }
}

export default connect(mapStateToProps, {
  changePlaylist,
  setFocus,
  getPlayListId,
})(More)
