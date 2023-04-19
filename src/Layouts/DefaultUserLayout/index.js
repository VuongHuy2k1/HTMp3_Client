import classNames from 'classnames/bind'
import styles from './DefaultUserLayout.module.scss'
import imagesblack from '../../assect/imagesblack'
const cx = classNames.bind(styles)

function DefaultUserLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('logo')}>
          <img
            className={cx('muzic-logo')}
            src={imagesblack.logo}
            alt="miuzzic"
          />
        </div>
      </div>
      <div className={cx('main-view')}>{children}</div>
    </div>
  )
}

export default DefaultUserLayout
