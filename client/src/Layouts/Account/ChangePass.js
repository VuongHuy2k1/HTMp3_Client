import classNames from 'classnames/bind'
import styles from './Account.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import * as UserService from '../../service/userService'
import Message from '../../components/Message'

const cx = classNames.bind(styles)
function ChangePassLayout() {
  const [user, setUser] = useState({
    oldpassword: '',
    newpassword: '',
    renewpassword: '',
  })
  const [message, setMessage] = useState(false)
  const navigate = useNavigate()

  const onChange = (e) => {
    e.preventDefault()
    const newUser = { ...user }
    newUser[e.target.name] = e.target.value
    setUser(newUser)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const variable = {
      oldPassword: user.oldpassword,
      newPassword: user.newpassword,
      reNewPassword: user.renewpassword,
    }
    if (variable.newPassword === variable.reNewPassword) {
      UserService.changePass(variable).then((mess) => {
        console.log(mess)
        if (mess.data.result === true) {
          setMessage({ msgBody: 'Đổi mật khẩu thành công', msgError: false })
          setTimeout(() => {
            navigate('/account/infor')
          }, 2000)
        } else {
          setMessage({
            msgBody: 'Mật khẩu hiện tại không đúng',
            msgError: true,
          })
        }
      })
    } else {
      setMessage({
        msgBody: 'Mật khẩu mới không khớp',
        msgError: true,
      })
    }

    // setTimeout(() => {
    //   navigate("/accout/infor");
    // }, 1000);
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <h1>Thay đổi mật khẩu</h1>
      </div>
      <div className={cx('content')}>
        {message ? <Message message={message} /> : null}
        <form
          className={cx('post-edit')}
          onSubmit={onSubmit}
          name="sentMessage"
          noValidate="noValidate"
        >
          <div className={cx('main-form')}>
            <div className={cx('group-main')}>
              <div className={cx('title-group')}>
                <label for="" className={cx('label-title')}>
                  <span>Mật khẩu hiện tại</span>
                </label>
              </div>
              <input
                className={cx('input-value')}
                type="password"
                name="oldpassword"
                value={user.oldpassword}
                onChange={onChange}
              ></input>
            </div>
            <div className={cx('group-main')}>
              <div className={cx('title-group')}>
                <label for="" className={cx('label-title')}>
                  <span>Mật khẩu mới</span>
                </label>
              </div>
              <input
                className={cx('input-value')}
                type="password"
                name="newpassword"
                value={user.newpassword}
                onChange={onChange}
              ></input>
            </div>
            <div className={cx('group-main')}>
              <div className={cx('title-group')}>
                <label for="" className={cx('label-title')}>
                  <span>Lặp lại khẩu mới</span>
                </label>
              </div>
              <input
                className={cx('input-value')}
                type="password"
                name="renewpassword"
                value={user.renewpassword}
                onChange={onChange}
              ></input>
            </div>
          </div>
          <div className={cx('btn-form')}>
            <Link to="/account/infor" class={cx('btn-remove')}>
              Hủy
            </Link>
            <button type="submit" class={cx('btn-submit')}>
              <div class={cx('btn-submit-title')}>Thay đổi</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassLayout
