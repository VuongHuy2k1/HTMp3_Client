import React, { useState } from 'react'
import { setFocus, changePlaylist, getPlayListId } from '../../../actions'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import images from '../../../assect/images'

import * as UserServices from '../../../service/userService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import More from '../../../components/Popper/More'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { RiLineChartLine, RiCompass3Line } from 'react-icons/ri'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
const cx = classNames.bind(styles)
function Sidebar({ setFocus, userPlaylist }) {
  const [num, setNum] = useState(1)

  const listMenu = [
    {
      id: 1,
      to: '/',
      icon: <RiCompass3Line className={cx('icon-li')} />,
      title: 'Khám phá',
    },
    {
      id: 2,
      to: '/chart',
      icon: <RiLineChartLine className={cx('icon-li')} />,
      title: 'Bảng xếp hạng',
    },
  ]

  const isAuthenticated = UserServices.isLog()

  const ListMenu = listMenu.map((item, index) => {
    return (
      <li
        className={cx('content', item.id === num ? 'active' : '')}
        key={index}
      >
        <NavLink
          className={cx('content-link')}
          to={item.to}
          onClick={() => setNum(item.id)}
        >
          {item.icon}
          <span className={cx('titel')}>{item.title}</span>
        </NavLink>
      </li>
    )
  })

  // eslint-disable-next-line array-callback-return
  const ListTag = userPlaylist.map((playList, index) => {
    if (isAuthenticated === true || userPlaylist.leght > 0) {
      return (
        <div className={cx('list-name')} key={index}>
          <NavLink
            to={`/playlist/${playList._id}/${playList.name}`}
            onClick={() => setNum(0)}
            className={cx('co')}
          >
            <li className={cx('content')}>
              <span className={cx('titel')}>{playList.name}</span>
            </li>
          </NavLink>
          <form className={cx('icon-delete')}>
            <More playList={playList} />
          </form>
        </div>
      )
    }
  })

  return (
    <nav className={cx('warrper')}>
      <div className={cx('logo')}>
        <NavLink to="/" onClick={() => setNum(1)}>
          <img
            className={cx('muzic-logo')}
            src={images.logoBlack}
            alt="miuzzic"
          />
        </NavLink>
      </div>

      <div className={cx('content-list')}>{ListMenu}</div>
      <div className={cx('poster')}>
        <p>Nghe nhạc không quảng cáo cùng kho nhạc PREMIUM</p>
        <button>
          <NavLink to="/upgrade" target="_blank">
            NÂNG CẤP TÀI KHOẢN
          </NavLink>
        </button>
      </div>

      <div className={cx('line')}></div>
      <div className={cx('album-list')}>{ListTag}</div>

      <div className={cx('album')}>
        <div className={cx('album-list-content')}>
          <div className={cx('album-content')}>
            <button className={cx('album-btn')}>
              <FontAwesomeIcon
                className={cx('icon-albu')}
                icon={faPlus}
                onClick={() => {
                  setFocus(1)
                }}
              />
              <span className={cx('album-list-titel')}>Tạo playlist mới</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
const mapStateToProps = (state) => {
  return {
    userPlaylist: state.userPlaylist,
  }
}

export default connect(mapStateToProps, {
  setFocus,
  changePlaylist,
  getPlayListId,
})(Sidebar)
