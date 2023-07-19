import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'
import { connect } from 'react-redux'
import { selectSong, selectSongByAlbum } from '../../../actions'
import Wrapper from '../Wrapper'
import styles from './Menu.module.scss'
import * as UserServices from '../../../service/userService'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPencilSquare,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function Menu({ selectSong }) {
  const [showList, setShowList] = useState(false)
  const navigate = useNavigate()
  const [img, setImg] = useState()
  const [user, setUser] = useState({
    username: '',
  })
  const url = 'https://music-x8ce.onrender.com/img/'
  useEffect(() => {
    const fetchApi = async () => {
      const res = await UserServices.isAuthen()

      setUser({
        username: res.user.username,
      })
      setImg(res.user.img)
    }
    fetchApi()
  }, [])

  const onLogout = () => {
    selectSong(0)

    Cookies.remove('access_token')
    Cookies.remove('userId')

    const timerId = setTimeout(() => {
      clearTimeout(timerId)
      navigate('/')
    }, 1000)
    const timerRelod = setTimeout(() => {
      clearTimeout(timerRelod)
      window.location.reload()
    }, 1001)
    const timerLoading = setTimeout(() => {
      clearTimeout(timerLoading)
    }, 3000)
  }
  const renderResult = (attrs) => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <Wrapper className={cx('menu-popper')}>
        <div className={cx('menu-warpper')}>
          <div className={cx('infor')}>
            <div className={cx('avatar')}>
              {img !== undefined ? (
                <>
                  <img class={cx('user-avatar')} src={url + img} alt="" />
                </>
              ) : (
                <>
                  <img
                    class={cx('user-avatar')}
                    src="https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576"
                    alt=""
                  />
                </>
              )}
            </div>
            <div className={cx('name')}>
              <p>{user.username}</p>
            </div>
          </div>
          <line></line>
          <div className={cx('edit')}>
            <h3 className={cx('content')}>Cá nhân</h3>

            <Link to="/account/infor" className={cx('btn')}>
              <FontAwesomeIcon
                className={cx('icon')}
                icon={faPencilSquare}
              ></FontAwesomeIcon>
              <p className={cx('title')}>Thay đổi thông tin</p>
            </Link>
          </div>
          <line></line>
          <div className={cx('btn')} onClick={onLogout}>
            <FontAwesomeIcon
              className={cx('icon')}
              icon={faRightFromBracket}
            ></FontAwesomeIcon>
            <p className={cx('title')}>Đăng Xuất</p>
          </div>
        </div>
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
      placement="bottom-end"
      render={renderResult}
    >
      <center onClick={oneClick}>
        {img !== undefined ? (
          <>
            <img class={cx('img-avatar')} src={url + img} alt="" />
          </>
        ) : (
          <>
            <img
              class={cx('img-avatar')}
              src="https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576"
              alt=""
            />
          </>
        )}
      </center>
    </Tippy>
  )
}

const mapStateToProps = (state) => {
  return {
    selectSongByAlbum: state.selectSongByAlbum,
    selectedSongPlay: state.selectedSongPlay,
    playerState: state.playerState,
  }
}

export default connect(mapStateToProps, { selectSong, selectSongByAlbum })(Menu)
