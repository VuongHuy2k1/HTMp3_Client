import classNames from 'classnames/bind'
import styles from './ListItem.module.scss'
import Item from './Item'
import { Link } from 'react-router-dom'
import React from 'react'

import { selectType } from '../../actions'
import { connect } from 'react-redux'

const cx = classNames.bind(styles)

const ListItem = ({ albums = [], typee, selectType, sort, search }) => {
  // eslint-disable-next-line array-callback-return
  const albumTags = albums.map((album, index) => {
    if (album.type === typee) {
      return <Item album={album} key={index} index={index} />
    }
    if (typee === 'Album') {
      return <Item album={album} key={index} index={index} />
    }
  })
  return (
    <div className={cx('content')}>
      <>
        <div className={cx('top-list')}>
          <div className={cx('top-list-left')}>
            <p className={cx('titel-list', 'titel-type')}>{typee}</p>
          </div>
          {search === true ? (
            <></>
          ) : (
            <Link className={cx('top-list-right')} to={`/album/${typee}/all`}>
              <span
                className={cx('more-list')}
                onClick={() => {
                  selectType(typee)
                }}
              >
                Xem tất cả
              </span>
            </Link>
          )}
        </div>
      </>

      <div className={cx('list', 'sort', sort)}>{albumTags}</div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {}
}
export default connect(mapStateToProps, {
  selectType,
})(ListItem)
