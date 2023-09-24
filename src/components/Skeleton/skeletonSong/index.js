import Skeleton from 'react-loading-skeleton'
import classNames from 'classnames/bind'
import styles from './style.module.scss'

const cx = classNames.bind(styles)
function SkeletonSong({ num }) {
  return Array(num)
    .fill(0)
    .map((item, index) => (
      <div className={cx('warrper')} key={index}>
        <div className={cx('song-item')}>
          <Skeleton width={50} height={50} duration={2} />

          <Skeleton width={1520} height={25} duration={2} />
        </div>
      </div>
    ))
}

export default SkeletonSong
