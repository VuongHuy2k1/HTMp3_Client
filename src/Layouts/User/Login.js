import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import React from 'react'
import { login } from '../../service/userService'

import { selectSong, selectSongByAlbum } from '../../actions'
import classNames from 'classnames/bind'
import styles from './User.module.scss'
import Message from '../../components/Message'

import GoogleLogin from 'react-google-login'

import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import ScaleLoader from 'react-spinners/ScaleLoader'
const cx = classNames.bind(styles)

function LoginLayout({ props, selectSong, selectSongByAlbum }) {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const onChange = (e) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    login(user).then((data) => {
      Cookies.set('userId', data.userId, {
        path: '/',
      })
      Cookies.set('access_token', data.access_token, {
        path: '/',
      })
      if (data.isAuthen === true) {
        setLoading(true)
        Cookies.set('userId', data.userId, {
          path: '/',
        })
        Cookies.set('access_token', data.access_token, {
          path: '/',
        })
        const timerData = setTimeout(() => {
          clearTimeout(timerData)
        }, 1000)

        const timerId = setTimeout(() => {
          clearTimeout(timerId)

          navigate('/', { replace: true })
        }, 2000)
        const timerRelod = setTimeout(() => {
          clearTimeout(timerRelod)
          window.location.reload()
        }, 2001)
        setMessage({ msgBody: 'Đăng nhập thành công', msgError: false })
        const timerLoading = setTimeout(() => {
          clearTimeout(timerLoading)

          setLoading(false)
        }, 3000)
      } else {
        setMessage({
          msgBody: 'Mật khẩu hoặc tên tài khoản không đúng',
          msgError: true,
        })
      }
    })
  }
  //lOGIN GOOGLE

  const clientId =
    '440209034208-85452ve5cm4hvmj27ph3seo736h9ngqg.apps.googleusercontent.com'
  const responseGoogle = (response) => {
    console.log(response)
  }
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj)
  }
  const onFail = (res) => {
    console.log('[Login failed] res:', res)
  }

  return (
    <div class={cx('div')}>
      {loading ? (
        <div className={cx('loading-page')}>
          <ScaleLoader loading={loading} color={'#1ed760'} size={300} />
        </div>
      ) : (
        <div className={cx('wrapper')}>
          <>
            <div className={cx('title')}>
              <h1>Đăng nhập và trải nghiệm</h1>
            </div>
            {message ? <Message message={message} /> : null}
            <form
              id="login"
              className={cx('post-form')}
              noValidate="noValidate"
              onSubmit={onSubmit}
            >
              <div className={cx('main-form')}>
                <div className={cx('group-main')}>
                  <div className={cx('title-group')}>
                    <label for="" className={cx('label-title')}>
                      <span>Tên đăng nhập </span>
                    </label>
                  </div>
                  <input
                    className={cx('input-value')}
                    type="text"
                    placeholder="Tên đăng nhập"
                    name="username"
                    autoFocus={true}
                    value={user.username}
                    onChange={onChange}
                  ></input>
                </div>

                <div className={cx('group-main')}>
                  <div className={cx('title-group')}>
                    <label for="" className={cx('label-title')}>
                      <span>Nhập mật khẩu</span>
                    </label>
                  </div>
                  <input
                    className={cx('input-value')}
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    onChange={onChange}
                    value={user.password}
                  ></input>
                </div>
              </div>
              <div className={cx('btn-form')}>
                <button type="submit" class={cx('btn-submit')}>
                  <div class={cx('btn-submit-title')}>Đăng nhập</div>
                </button>
                <span>
                  Bạn chưa có tài khoản
                  <Link to="/user/register" class={cx('btn-remove')}>
                    Đăng ký
                  </Link>
                </span>
              </div>
            </form>
          </>
        </div>
      )}

      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFail}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return
}

export default connect(mapStateToProps, { selectSong, selectSongByAlbum })(
  LoginLayout,
)
