import classNames from 'classnames/bind'

import styles from './DefaultUpgradeLayout.module.scss'

import UpdateHeader from './Header'
const cx = classNames.bind(styles)
function DefaultUpgradeLayout({ children }) {
  return (
    <div className={cx('wrapper', 'scroll')}>
      <div className={cx('header')}>
        <UpdateHeader />
      </div>
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  )
}

export default DefaultUpgradeLayout
