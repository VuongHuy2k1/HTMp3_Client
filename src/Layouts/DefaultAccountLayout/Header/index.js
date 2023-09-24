import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import images from '../../../assect/images'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)
function UserHeader() {
  return (
    <header className={cx('container')}>
      <div className={cx('logo')}>
        <Link to="#">
          <img className={cx('muzic-logo')} src={images.logo} alt="miuzzic" />
        </Link>
      </div>
      <div className={cx('account')}></div>
    </header>
  )
}

export default UserHeader
