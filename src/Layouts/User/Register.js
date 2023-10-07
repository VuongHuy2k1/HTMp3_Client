import { Link } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'
import { register } from '../../service/userService'
import Popup from 'reactjs-popup'
import VerifyComponent from '../../components/FlexVerify'
import classNames from 'classnames/bind'
import styles from './User.module.scss'
import Message from '../../components/Message'
import { PacmanLoader } from 'react-spinners'
const cx = classNames.bind(styles)

function RegisterLayout(props) {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    gender: '',
    dayOfBirth: '',
    nation: '',
  })
  const [nameButton, setNameButton] = useState('')
  const [isPopupOpen, setPopupOpen] = useState(false)
  const [message, setMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const onChange = (e) => {
    e.preventDefault()
    const newUser = { ...user }
    newUser[e.target.name] = e.target.value
    setUser(newUser)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (nameButton === 're') {
      setLoading(true)
      const variable = {
        username: user.username,
        password: user.password,
        rePassword: user.passwordConfirmation,
        email: user.email,
        gender: user.gender,
        dayOfBirth: user.birth,
        nation: user.countrty,
      }

      if (user.password === user.passwordConfirmation) {
        register(variable).then((data) => {
          if (data.isSuccess === true) {
            setTimeout(() => {
              setMessage({ msgBody: 'Đăng ký thành công', msgError: false })
            }, 2000)
            setTimeout(() => {
              setPopupOpen(true)
              setLoading(false)
            }, 4000)
          } else {
            setMessage({ msgBody: data.errors.message, msgError: true })
            setLoading(false)
          }
        })
      } else {
        setMessage({ msgBody: 'Mat khau khong khop', msgError: true })
        setLoading(false)
      }
    }
  }

  return (
    <div className={cx('wrapper', 'scroll')}>
      <div className={cx('title')}>
        <h1>Đăng ký và trải nghiệm</h1>
      </div>
      {message ? <Message message={message} /> : null}
      <form
        className={cx('post-form')}
        name="sentMessage"
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
              placeholder="Từ 3 dến 16 ký tự"
              name="username"
              autoFocus={true}
              value={user.username}
              onChange={onChange}
            ></input>
          </div>

          <div className={cx('group-main')}>
            <div className={cx('title-group')}>
              <label htmlFor="pass" className={cx('label-title')}>
                <span>Tạo mật khẩu</span>
              </label>
            </div>
            <input
              id="pass"
              className={cx('input-value')}
              type="password"
              name="password"
              placeholder="Tối thiểu nhất 6 ký tự"
              onChange={onChange}
              value={user.password}
            ></input>
          </div>
          <div className={cx('group-main')}>
            <div className={cx('title-group')}>
              <label htmlFor="repass" className={cx('label-title')}>
                <span>Xác nhận mật khẩu</span>
              </label>
            </div>
            <input
              id="repass"
              className={cx('input-value')}
              name="passwordConfirmation"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={user.passwordConfirmation}
              onChange={onChange}
            ></input>
          </div>
          <div className={cx('group-main')}>
            <div className={cx('title-group')}>
              <label htmlFor="email" className={cx('label-title')}>
                <span>Email</span>
              </label>
            </div>
            <input
              id="email"
              className={cx('input-value')}
              name="email"
              type="email"
              placeholder="Email của bạn"
              value={user.email}
              onChange={onChange}
            ></input>
          </div>
          <div className={cx('group-main')}>
            <div className={cx('title-group')}>
              <label htmlFor="sex" className={cx('label-title')} type="text">
                <span>Giới tính</span>
              </label>
            </div>
            <div className={cx('select-sex')}>
              <select
                id="sex"
                className={cx('input-value')}
                name="gender"
                value={user.gender}
                onChange={onChange}
              >
                <option disabled="" value="NOT_SET">
                  - không chọn -
                </option>
                <option value="NEUTRAL">Giới tính trung lập</option>
                <option value="FEMALE">Nữ</option>
                <option value="MALE">Nam</option>
              </select>
            </div>
          </div>
          <div className={cx('group-main')}>
            <div className={cx('title-group')}>
              <label htmlFor="bith" className={cx('label-title')} type="text">
                <span>Ngày sinh</span>
              </label>
            </div>
            <div className={cx('labels-inputs')}>
              <div className={cx('pad-rig')}>
                <label htmlFor="dob-date" className={cx('lable-1')}>
                  Date
                </label>
                <input
                  required=""
                  type="date"
                  id="dob-date"
                  disabled=""
                  name="birth"
                  value={user.birth}
                  onChange={onChange}
                  className={cx('input-value')}
                ></input>
              </div>
            </div>
          </div>
          <div className={cx('group-main')}>
            <div className={cx('title-group')}>
              <label htmlFor="co" className={cx('label-title')}>
                <span>Quốc gia</span>
              </label>
            </div>
            <input
              id="co"
              className={cx('input-value')}
              type="text"
              name="country"
              value={user.country}
              onChange={onChange}
            ></input>
          </div>
          <Popup
            modal
            overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
            open={isPopupOpen}
            onClose={() => setPopupOpen(false)}
          >
            <VerifyComponent
              name={user.username}
              mail={user.userEmail}
              reg={true}
              onClose={() => setPopupOpen(false)}
            />
          </Popup>
        </div>
        <div className={cx('btn-form')}>
          <button
            type="submit"
            className={cx('btn-submit')}
            onClick={(e) => setNameButton('re')}
          >
            <div className={cx('btn-submit-title')}>
              {loading ? <PacmanLoader color={'#FFF'} size={10} /> : 'Đăng ký'}
            </div>
          </button>
          <span>
            Bạn đã có tài khoản?
            <Link to="/user/login" className={cx('btn-remove')}>
              Đăng nhập
            </Link>
          </span>
        </div>
      </form>
    </div>
  )
}

export default RegisterLayout
