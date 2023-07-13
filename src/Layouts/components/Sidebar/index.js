import React, { useState } from 'react'
import { setFocus, changePlaylist, getPlayListId } from '../../../actions'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import images from '../../../assect/images'
import * as PlayListService from '../../../service/playListService'
import * as UserServices from '../../../service/userService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import More from '../../../components/Popper/More'
import { faChartLine, faHouse, faPlus } from '@fortawesome/free-solid-svg-icons'
import Message from '../../../components/Message'
import { connect } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
const cx = classNames.bind(styles)
function Sidebar({ setFocus, changePlaylist, userPlaylist }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const [num, setNum] = useState(1)

  const listMenu = [
    { id: 1, to: '/', icon: faHouse, title: 'Khám phá' },
    {
      id: 2,
      to: '/chart',
      icon: faChartLine,
      title: 'BXH',
    },
  ]

  const isAuthenticated = UserServices.isLog()

  const fepi = async () => {
    const response = await PlayListService.getPlayList()
    changePlaylist(response)
  }

  const ListMenu = listMenu.map((item, index) => {
    if (item.id === num) {
      console.log(num)
      console.log(item.id)
      return (
        <li className={cx('content', 'active')} key={index}>
          <NavLink
            className={cx('content-link')}
            to={item.to}
            onClick={() => setNum(item.id)}
          >
            <FontAwesomeIcon className={cx('icon-li')} icon={item.icon} />
            <span className={cx('titel')}>{item.title}</span>
          </NavLink>
        </li>
      )
    } else
      return (
        <li className={cx('content')} id="" key={index}>
          <NavLink
            className={cx('content-link')}
            to={item.to}
            onClick={() => setNum(item.id)}
          >
            <FontAwesomeIcon className={cx('icon-li')} icon={item.icon} />
            <span className={cx('titel')}>{item.title}</span>
          </NavLink>
        </li>
      )
  })

  const ListTag = userPlaylist.map((playList) => {
    if (isAuthenticated === true || userPlaylist.leght > 0) {
      return (
        <>
          <div className={cx('list-name')}>
            <NavLink
              to={`/playlist/${playList._id}/${playList.name}`}
              activeClassName={cx('active')}
            >
              <li className={cx('content')}>
                <h6 className={cx('titel')}>{playList.name}</h6>
              </li>
            </NavLink>
            <form className={cx('icon-delete')}>
              <More playList={playList} />
            </form>
          </div>
        </>
      )
    } else {
      return <></>
    }
  })

  return (
    <nav className={cx('warrper')}>
      <div className={cx('logo')}>
        <NavLink to="/" id={cx()}>
          <img
            className={cx('muzic-logo')}
            src={images.logoBlack}
            alt="miuzzic"
          />
        </NavLink>
      </div>

      <div className={cx('content-list')}>{ListMenu}</div>

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
              <span className={cx('album-list-titel')}>Tạo playlist</span>
            </button>
          </div>
        </div>
      </div>

      <div className={cx('album-list')}>{ListTag}</div>
      {loading ? (
        <>
          <div className={cx('mess')}>
            <Message message={message} />
          </div>
        </>
      ) : (
        <></>
      )}
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
