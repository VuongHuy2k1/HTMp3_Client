import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'
import { login } from '../../service/userService'

import Popup from 'reactjs-popup'
import { selectSong, selectSongByAlbum } from '../../actions'
import classNames from 'classnames/bind'
import styles from './User.module.scss'
import Message from '../../components/Message'

import { connect } from 'react-redux'

import ScaleLoader from 'react-spinners/ScaleLoader'
import SentmailComponent from '../../components/FlexSent'
const cx = classNames.bind(styles)

function ForgotLayout({ props, selectSong, selectSongByAlbum }) {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    username: '',
    userEmail: '',
    password: '',
    rePassword: '',
    code: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const onChange = (e) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // const onSubmit = (e) => {
  //   e.preventDefault()

  //   login(user).then((data) => {
  //     if (data.isSuccess === true) {
  //       setLoading(true)

  //       const timerId = setTimeout(() => {
  //         clearTimeout(timerId)

  //         // navigate('/login', { replace: true })
  //       }, 2000)
  //       const timerRelod = setTimeout(() => {
  //         clearTimeout(timerRelod)
  //       }, 2001)
  //       setMessage({ msgBody: 'Khôi phục thành công', msgError: false })

  //       const timerLoading = setTimeout(() => {
  //         clearTimeout(timerLoading)
  //         setLoading(false)
  //       }, 3000)
  //     } else {
  //       setMessage({
  //         msgBody: 'Khôi phục lỗi',
  //         msgError: true,
  //       })
  //     }
  //   })
  // }

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
              <h1>Khôi phục mật khẩu</h1>
            </div>
            {message ? <Message message={message} /> : null}
            <form
              id="login"
              className={cx('post-form')}
              noValidate="noValidate"
              // onSubmit={onSubmit}
            >
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
                  ></input>
                </div>

                <div className={cx('group-main')}>
                  <div className={cx('title-group')}>
                    <label htmlFor="email" className={cx('label-title')}>
                      <span>Email </span>
                    </label>
                  </div>
                  <input
                    id="name"
                    className={cx('input-value')}
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoFocus={true}
                    value={user.email}
                    onChange={onChange}
                  ></input>
                </div>
                <div className={cx('group-main')}>
                  <div className={cx('title-group')}>
                    <label htmlFor="pass" className={cx('label-title')}>
                      <span>Nhập mật khẩu</span>
                    </label>
                  </div>
                  <input
                    id="pass"
                    className={cx('input-value')}
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    onChange={onChange}
                    value={user.password}
                  ></input>
                </div>
                <div className={cx('group-main')}>
                  <div className={cx('title-group')}>
                    <label htmlFor="repass" className={cx('label-title')}>
                      <span>Nhập lại mật khẩu</span>
                    </label>
                  </div>
                  <input
                    id="repass"
                    className={cx('input-value')}
                    type="password"
                    name="repassword"
                    placeholder="Nhập lại mật khẩu"
                    onChange={onChange}
                    value={user.repassword}
                  ></input>
                </div>
                <div className={cx('group-main')}>
                  <div className={cx('title-group')}>
                    <label htmlFor="code" className={cx('label-title')}>
                      <span>Mã bảo vệ</span>
                    </label>
                  </div>
                  <input
                    id="code"
                    className={cx('input-value')}
                    type="text"
                    name="code"
                    placeholder="Nhập mã bảo vệ"
                    onChange={onChange}
                    value={user.code}
                  ></input>
                </div>
              </div>
              <div className={cx('btn-form')}>
                <button type="submit" className={cx('btn-submit')}>
                  <div className={cx('btn-submit-title')}>Khôi phục</div>
                </button>
                <div className={cx('login-more')}>
                  <span>
                    Bạn chưa có mã bảo vệ?
                    <Popup
                      modal
                      overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
                      trigger={
                        <div className={cx('btn-remove')}>Nhận mã bảo vệ</div>
                      }
                    >
                      {(close) => <SentmailComponent close={close} />}
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
  ForgotLayout,
)
