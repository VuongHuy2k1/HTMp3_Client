import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'
import { forgotPass } from '../../service/userService'

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
  const [nameButton, setNameButton] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const onChange = (e) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const variable = {
      username: user.username,
      userEmail: user.userEmail,
      password: user.password,
      rePassword: user.rePassword,
      code: user.code,
    }
    if (nameButton === 'forgot') {
      forgotPass(variable).then((data) => {
        if (data.isSuccess === true) {
          setMessage({ msgBody: 'Khôi phục thành công', msgError: false })

          const timerRelod = setTimeout(() => {
            clearTimeout(timerRelod)
            setLoading(true)
          }, 2001)

          const timerLoading = setTimeout(() => {
            clearTimeout(timerLoading)
            navigate('/user/login', { replace: true })
            setLoading(false)
          }, 3000)
        } else {
          setMessage({
            msgBody: 'Khôi phục lỗi',
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
              <h1>Khôi phục mật khẩu</h1>
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
                    id="email"
                    className={cx('input-value')}
                    type="text"
                    placeholder="Email"
                    name="userEmail"
                    autoFocus={true}
                    value={user.userEmail}
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
                    name="rePassword"
                    placeholder="Nhập lại mật khẩu"
                    onChange={onChange}
                    value={user.rePassword}
                  ></input>
                </div>
                <div className={cx('group-main')}>
                  <div className={cx('title-group')}>
                    <label htmlFor="code" className={cx('label-title')}>
                      <span>Mã bảo vệ</span>
                    </label>
                  </div>
                  <div className={cx('out')}>
                    <input
                      id="code"
                      className={cx('input-value')}
                      type="text"
                      name="code"
                      placeholder="Nhập mã bảo vệ"
                      onChange={onChange}
                      value={user.code}
                    ></input>

                    <Popup
                      modal
                      overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
                      trigger={
                        <button className={cx('btn-code', 'btt')}>
                          <div className={cx('btn-code-title')}>Lấy mã</div>
                        </button>
                      }
                    >
                      {(close) => (
                        <SentmailComponent
                          close={close}
                          name={user.username}
                          mail={user.userEmail}
                        />
                      )}
                    </Popup>
                  </div>
                </div>
              </div>
              <div className={cx('btn-form')}>
                <button
                  className={cx('btn-submit')}
                  onClick={(e) => setNameButton('forgot')}
                  type="submit"
                >
                  <div className={cx('btn-submit-title')}>Khôi phục</div>
                </button>
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
