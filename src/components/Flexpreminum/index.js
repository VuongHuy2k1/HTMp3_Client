import classNames from 'classnames/bind'
import styles from './Popup.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)
const PopupComponent = ({ close }) => {
  return (
    <div className={cx('popup')}>
      <FontAwesomeIcon
        icon={faXmark}
        className={cx('icon-close')}
        onClick={close}
      ></FontAwesomeIcon>
      <div className={cx('popup-container')}>
        <p className={cx('popup-content')}>Dành Cho Tài Khoản PREMIUM</p>
        <h3>
          Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản PREMIUM để
          nghe bài hát này.
        </h3>
        <button className={cx('popup-btn')}>
          <Link to="/upgrade" target="_blank">
            NÂNG CẤP TÀI KHOẢN
          </Link>
        </button>
      </div>
    </div>
  )
}

export default PopupComponent
