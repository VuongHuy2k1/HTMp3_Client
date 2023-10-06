import classNames from 'classnames/bind'
import styles from './Sentmail.module.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { sentVerify } from '../../service/userService'
import Message from '../Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { PacmanLoader } from 'react-spinners'
const cx = classNames.bind(styles)
const VerifyComponent = ({ close, name, mail, code, onClose, reg }) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const [user, setUser] = useState({
    username: name,
    userEmail: mail,
    code: code,
  })
  const navigate = useNavigate()
  const [nameButton, setNameButton] = useState('')
  const onChange = (e) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const submit = (e) => {
    e.preventDefault()
    console.log(reg)
    setLoading(true)
    if (nameButton === 'sentmail') {
      sentVerify(user).then((data) => {
        if (data.isSuccess === true) {
          setMessage({ msgBody: 'Xác nhận thành công', msgError: false })
          if (reg === true) {
            const timerLoading = setTimeout(() => {
              clearTimeout(timerLoading)
              setLoading(false)
              onClose()
              navigate('/user/login', { replace: true })
            }, 3000)
          } else {
            const timerLoading = setTimeout(() => {
              clearTimeout(timerLoading)
              setLoading(false)
              onClose()
            }, 3000)
          }
        } else {
          const timerLoading = setTimeout(() => {
            clearTimeout(timerLoading)
          }, 2000)

          const time = setTimeout(() => {
            clearTimeout(time)
            setMessage({
              msgBody: 'Xác nhận thất bại',
              msgError: true,
            })
            setLoading(false)
          }, 3000)
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
                <h2>Xác nhận tài khoản</h2>
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
                  <div className={cx('group-main')}>
                    <div className={cx('title-group')}>
                      <label htmlFor="code" className={cx('label-title')}>
                        <span>Mã xác nhận</span>
                      </label>
                    </div>
                    <input
                      id="email"
                      className={cx('input-value')}
                      type="text"
                      name="code"
                      placeholder="Nhập mã xác nhận"
                      onChange={onChange}
                      value={user.code}
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
                      'Xác nhận'
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

export default VerifyComponent
