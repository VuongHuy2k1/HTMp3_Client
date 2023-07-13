import Skeleton from 'react-loading-skeleton'
import classNames from 'classnames/bind'
import styles from '../../List/ListItem.module.scss'

const cx = classNames.bind(styles)
function SkeletonCard({ num }) {
  return Array(num)
    .fill(0)
    .map((item, index) => (
      <div className={cx('content')} key={index}>
        <>
          <div className={cx('top-list')}>
            <Skeleton height={30} width={120} />
          </div>
        </>

        <div className={cx('list', 'sort')}>
          <div className={cx('item')}>
            <div className={cx('warrper')}>
              <div className={cx('card')}>
                <Skeleton height={300} />
              </div>
            </div>
          </div>
          <div className={cx('item')}>
            <div className={cx('warrper')}>
              <div className={cx('card')}>
                <Skeleton height={300} />
              </div>
            </div>
          </div>
          <div className={cx('item')}>
            <div className={cx('warrper')}>
              <div className={cx('card')}>
                <Skeleton height={300} />
              </div>
            </div>
          </div>
          <div className={cx('item')}>
            <div className={cx('warrper')}>
              <div className={cx('card')}>
                <Skeleton height={300} />
              </div>
            </div>
          </div>
          <div className={cx('item')}>
            <div className={cx('warrper')}>
              <div className={cx('card')}>
                <Skeleton height={300} />
              </div>
            </div>
          </div>
          <div className={cx('item')}>
            <div className={cx('warrper')}>
              <div className={cx('card')}>
                <Skeleton height={300} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
}

export default SkeletonCard
