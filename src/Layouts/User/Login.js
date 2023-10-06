import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'
import { login } from '../../service/userService'
import * as LastPlay from '../../service/playService'
import * as UserServices from '../../service/userService'
import { selectSong, selectSongByAlbum } from '../../actions'
import classNames from 'classnames/bind'
import styles from './User.module.scss'
import Message from '../../components/Message'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import ScaleLoader from 'react-spinners/ScaleLoader'
import * as songsService from '../../service/songsService'
import VerifyComponent from '../../components/FlexVerify'
import Popup from 'reactjs-popup'
const cx = classNames.bind(styles)

function LoginLayout({ props, selectSong, selectSongByAlbum }) {
  const navigate = useNavigate()
  const [userPriority, setUserPriority] = useState('')

  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [isPopupOpen, setPopupOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [songsList, setSongsList] = useState([])
  const [nameButton, setNameButton] = useState('')
  const onChange = (e) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const fetchApi = async () => {
      const songsFromAlbum = await songsService.getSongsFromAlbum('NCS')
      setSongsList(songsFromAlbum)
    }
    fetchApi()
  }, [])
  const fetchApi = async () => {
    const res = await UserServices.isAuthen()
    setUserPriority(res.priority)
  }
  const getMusic = async () => {
    const response = await LastPlay.getLastPlay()

    if (response !== undefined && response !== null) {
      if (userPriority === 'vip') {
        selectSongByAlbum(response.songList)
        selectSong(response.song)
      } else {
        const arr = response.songList.filter(function (item) {
          return item.priority !== 'vip'
        })

        selectSongByAlbum(arr)

        selectSong(response.song)
      }
    } else {
      selectSongByAlbum(songsList)

      selectSong(songsList[0])
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (nameButton === 'login') {
      login(user).then((data) => {
        Cookies.set('userId', data.userId, {
          path: '/',
        })
        Cookies.set('access_token', data.access_token, {
          path: '/',
        })
        if (data.isSuccess === true) {
          if (data.item.role !== 'unknow') {
            setLoading(true)

            Cookies.set('userId', data.item.userId, {
              path: '/',
            })
            Cookies.set('access_token', data.item.access_token, {
              path: '/',
            })
            fetchApi()

            setMessage({ msgBody: 'Đăng nhập thành công', msgError: false })
            const time = setTimeout(() => {
              clearTimeout(time)
            }, 1000)
            getMusic()
            const timerLoading = setTimeout(() => {
              clearTimeout(timerLoading)
            }, 2000)
            const timerId = setTimeout(() => {
              clearTimeout(timerId)
              navigate('/', { replace: true })
              setLoading(false)
              window.location.reload()
            }, 3000)
          } else {
            setMessage({
              msgBody: 'Tài khoản của bạn chưa xác thực',
              msgError: true,
            })
          }
        } else {
          setMessage({
            msgBody: 'Mật khẩu hoặc tên tài khoản không đúng',
            msgError: true,
          })
        }
      })
    }
  }

  return (
    <div className={cx('div')}>
      {loading ? (
        <div className={cx('loading-page')}>
          <ScaleLoader loading={loading} color={'#8D22C3'} size={300} />
        </div>
      ) : (
        <div className={cx('wrapper')}>
          <>
            <div className={cx('title')}>
              <h1>Đăng nhập và trải nghiệm</h1>
            </div>
            {message ? <Message message={message} /> : null}
            <form id="login" className={cx('post-form')} onSubmit={onSubmit}>
              <div className={cx('main-form')}>
                <div className={cx('group-main')}>
                  <div className={cx('title-group')}>
                    <label htmlFor="name" className={cx('label-title')}>
                      <span>Tên đăng nhập </span>
                    </label>
                  </div>
                  <input
                    id="name"
                    className={cx('input-value')}
                    type="text"
                    placeholder="Tên đăng nhập"
                    name="username"
                    autoFocus={true}
                    value={user.username}
                    onChange={onChange}
                    required
                  ></input>
                </div>

                <div className={cx('group-main')}>
                  <div className={cx('title-group')}>
                    <label htmlFor="pass" className={cx('label-title')}>
                      <span>Nhập mật khẩu</span>
                    </label>
                  </div>
                  <div className={cx('out')}>
                    <input
                      id="pass"
                      className={cx('input-value')}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Nhập mật khẩu"
                      onChange={onChange}
                      value={user.password}
                      required
                    ></input>
                    <button
                      className={cx('show-pass')}
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                    </button>
                  </div>
                </div>
              </div>
              <div className={cx('btn-form')}>
                <button
                  type="submit"
                  className={cx('btn-submit')}
                  onClick={(e) => setNameButton('login')}
                >
                  <div className={cx('btn-submit-title')}>Đăng nhập</div>
                </button>

                <div className={cx('login-more')}>
                  <span>
                    Bạn quên mật khẩu?
                    <Link to="/user/forgot" className={cx('btn-remove')}>
                      Khôi phục mật khẩu
                    </Link>
                  </span>
                  <span>
                    Bạn chưa có tài khoản
                    <Link to="/user/register" className={cx('btn-remove')}>
                      Đăng ký tài khoản mới
                    </Link>
                  </span>
                  <span>
                    Bạn chưa xác nhận tài khoản
                    <div
                      className={cx('btn-remove')}
                      onClick={() => setPopupOpen(true)}
                    >
                      Xác nhận tài khoản
                    </div>
                    <Popup
                      modal
                      overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
                      open={isPopupOpen}
                      onClose={() => setPopupOpen(false)}
                    >
                      {(close) => (
                        <VerifyComponent
                          close={close}
                          name={user.username}
                          mail={user.userEmail}
                          onClose={() => setPopupOpen(false)}
                        />
                      )}
                    </Popup>
                  </span>
                </div>
              </div>
            </form>
          </>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return
}

export default connect(mapStateToProps, { selectSong, selectSongByAlbum })(
  LoginLayout,
)
