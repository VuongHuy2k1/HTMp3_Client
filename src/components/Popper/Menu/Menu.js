import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'
import { connect } from 'react-redux'
import { selectSong, selectSongByAlbum } from '../../../actions'
import Wrapper from '../Wrapper'
import styles from './Menu.module.scss'
import * as UserServices from '../../../service/userService'
import * as albumsSrevice from '../../../service/albumsSevrice'
import * as songsService from '../../../service/songsService'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPencilSquare,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function Menu({ selectSong, role, selectSongByAlbum }) {
  const [showList, setShowList] = useState(false)
  const [songsList, setSongsList] = useState([])
  const navigate = useNavigate()
  const [img, setImg] = useState()
  const [user, setUser] = useState({
    username: '',
  })
  const url = 'http://localhost:8989/img/'
  useEffect(() => {
    const fetchApi = async () => {
      const res = await UserServices.isAuthen()

      setUser({
        username: res?.username,
      })

      setImg(res.img)
    }
    fetchApi()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumResponse = await albumsSrevice.getAllAlbum(0)
        const firstAlbumName = albumResponse[0].name
        const songsFromAlbum = await songsService.getSongsFromAlbum(
          firstAlbumName,
        )

        setSongsList(songsFromAlbum)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  const onLogout = () => {
    selectSong(0)

    Cookies.remove('access_token')
    Cookies.remove('userId')

    const timerId = setTimeout(() => {
      clearTimeout(timerId)
      selectSongByAlbum(songsList)
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
                  <img className={cx('user-avatar')} src={url + img} alt="" />
                </>
              ) : (
                <>
                  <img
                    className={cx('user-avatar')}
                    src="https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576"
                    alt=""
                  />
                </>
              )}
            </div>
            <div className={cx('name')}>
              <p>{user?.username}</p>
              <div className={cx('type-use')}>{role}</div>
            </div>
          </div>

          <button className={cx('update-btn')}>
            <Link to="/upgrade" target="_blank">
              Nâng cấp tài khoản
            </Link>
          </button>

          <div className={cx('line')}></div>
          <div className={cx('edit')}>
            <h3 className={cx('content')}>Cá nhân</h3>

            <Link to="/account/infor" target="_blank" className={cx('btn')}>
              <FontAwesomeIcon
                className={cx('icon')}
                icon={faPencilSquare}
              ></FontAwesomeIcon>
              <p className={cx('title')}>Thay đổi thông tin</p>
            </Link>
          </div>
          <div className={cx('line')}></div>
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
      onClickOutside={() => setShowList(false)}
    >
      <div>
        <center onClick={oneClick} onBlur={() => setShowList(false)}>
          {img !== undefined ? (
            <>
              <img className={cx('img-avatar')} src={url + img} alt="" />
            </>
          ) : (
            <>
              <img
                className={cx('img-avatar')}
                src="https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576"
                alt=""
              />
            </>
          )}
        </center>
      </div>
    </Tippy>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedSongPlay: state.selectedSongPlay,
    playerState: state.playerState,
  }
}

export default connect(mapStateToProps, { selectSong, selectSongByAlbum })(Menu)
