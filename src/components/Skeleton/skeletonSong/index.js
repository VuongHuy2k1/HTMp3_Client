import Skeleton from 'react-loading-skeleton'
import classNames from 'classnames/bind'
import styles from './style.module.scss'

const cx = classNames.bind(styles)
function SkeletonSong({ num }) {
  return Array(num)
    .fill(0)
    .map((item, index) => (
      <div className={cx('warrper')}>
        <div className={cx('song-item')}>
          <Skeleton width={50} height={50} />

          <Skeleton width={1200} height={25} />
        </div>
      </div>
    ))
}

export default SkeletonSong
