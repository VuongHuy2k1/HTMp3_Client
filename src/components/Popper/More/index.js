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

import { useState } from 'react'
import { RiMoreLine, RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri'
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

  const removePlayList = async (e) => {
    // eslint-disable-next-line no-unused-vars
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
            <RiDeleteBinLine className={cx('icon')} />
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
            <RiEdit2Line className={cx('icon')} />
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
        <RiMoreLine className={cx('icon-li')} onClick={oneClick} />
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
