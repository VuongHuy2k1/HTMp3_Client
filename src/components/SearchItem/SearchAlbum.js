import classNames from 'classnames/bind'
import styles from './SearchItem.module.scss'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

function SearchAlbum({ albums }) {
  return (
    <>
      <Link to={`/search/${albums.name}`}>
        <div className={cx('wrapper')}>
          <img className={cx('avatar')} src={albums.img} alt="Hoaa" />
          <div className={cx('info')}>
            <h4 className={cx('name')}>
              <span>{albums.name}</span>
            </h4>

            <span className={cx('username')}>{albums.type}</span>
          </div>
        </div>
      </Link>
    </>
  )
}

export default SearchAlbum
