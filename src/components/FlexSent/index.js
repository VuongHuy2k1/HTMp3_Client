import classNames from 'classnames/bind'
import styles from './Sentmail.module.scss'
import { useState } from 'react'
import { sentMail } from '../../service/userService'
import Message from '../Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { PacmanLoader } from 'react-spinners'
const cx = classNames.bind(styles)
const SentmailComponent = ({ close, name, mail, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const [user, setUser] = useState({
    username: name,
    userEmail: mail,
  })

  const [nameButton, setNameButton] = useState('')
  const onChange = (e) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)

    if (nameButton === 'sentmail') {
      sentMail(user).then((data) => {
        if (data.isSuccess === true) {
          const time = setTimeout(() => {
            clearTimeout(time)
            setMessage({ msgBody: 'Gửi mã thành công', msgError: false })
          }, 3000)

          const timerLoading = setTimeout(() => {
            clearTimeout(timerLoading)
            setLoading(false)
            onClose()
          }, 5000)
        } else {
          const timerLoading = setTimeout(() => {
            clearTimeout(timerLoading)
            setMessage({
              msgBody: data.errors.message,
              msgError: true,
            })
          }, 3000)
          const time = setTimeout(() => {
            clearTimeout(time)
            setLoading(false)
          }, 5000)
        }
      })
    }
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
              {loading ? <Message message={message} /> : null}
              <form id="forgot" className={cx('post-form')} onSubmit={submit}>
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
                      required
                    ></input>
                  </div>
                </div>
                <div className={cx('btn-form')}>
                  <button
                    type="submit"
                    onClick={(e) => setNameButton('sentmail')}
                    className={cx('btn-submit-title')}
                  >
                    {loading ? (
                      <PacmanLoader color={'#FFF'} size={10} />
                    ) : (
                      ' Lấy mã'
                    )}
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
