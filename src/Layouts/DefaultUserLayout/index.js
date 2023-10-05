import classNames from 'classnames/bind'
import styles from './DefaultUserLayout.module.scss'
import imagesblack from '../../assect/imagesblack'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

function DefaultUserLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('logo')}>
          <Link to="/">
            <img
              className={cx('muzic-logo')}
              src={imagesblack.logo}
              alt="miuzzic"
            />
          </Link>
        </div>
      </div>
      <div className={cx('main-view', 'scroll')}>{children}</div>
    </div>
  )
}

export default DefaultUserLayout
