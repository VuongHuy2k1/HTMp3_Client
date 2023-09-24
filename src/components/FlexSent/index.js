import classNames from 'classnames/bind'
import styles from './Sentmail.module.scss'
import { useState } from 'react'
import { sentMail } from '../../service/userService'
import Message from '../Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
const cx = classNames.bind(styles)
const SentmailComponent = ({ close }) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const [user, setUser] = useState({
    username: '',
    userEmail: '',
  })
  const onChange = (e) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const submit = (e) => {
    e.preventDefault()

    sentMail(user).then((data) => {
      if (data.isSuccess === true) {
        setLoading(true)

        const timerRelod = setTimeout(() => {
          clearTimeout(timerRelod)
          setMessage({ msgBody: 'Gửi mã thành công', msgError: false })
        }, 2001)

        const timerLoading = setTimeout(() => {
          clearTimeout(timerLoading)
          setLoading(false)
        }, 3000)
      } else {
        setMessage({
          msgBody: 'Email hoặc tên tài khoản không đúng',
          msgError: true,
        })
      }
    })
  }
  return (
    <div className={cx('div')}>
      <div className={cx('popup')}>
        <FontAwesomeIcon
          icon={faXmark}
          className={cx('icon-close')}
          onClick={close}
        ></FontAwesomeIcon>
        <div className={cx('popup-container')}>
          <div className={cx('wrapper')}>
            <>
              <div className={cx('title')}>
                <h2>Nhận mã bảo vệ</h2>
              </div>
              {message ? <Message message={message} /> : null}
              <form
                id="forgot"
                className={cx('post-form')}
                noValidate="noValidate"
                onSubmit={submit}
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
                        <span>Email</span>
                      </label>
                    </div>
                    <input
                      id="email"
                      className={cx('input-value')}
                      type="text"
                      name="userEmail"
                      placeholder="Nhập email"
                      onChange={onChange}
                      value={user.userEmail}
                    ></input>
                  </div>
                </div>
                <div className={cx('btn-form')}>
                  <button type="submit" className={cx('btn-submit')}>
                    <div className={cx('btn-submit-title')}>Gửi</div>
                  </button>
                </div>
              </form>
            </>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SentmailComponent
