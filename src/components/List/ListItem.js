import classNames from 'classnames/bind'
import styles from './ListItem.module.scss'
import Item from './Item'
import { Link, useParams } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import { selectType } from '../../actions'
import { connect } from 'react-redux'

const cx = classNames.bind(styles)

const ListItem = ({ albums = [], typee, selectType, sort }) => {
  const { type } = useParams()

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
      {type === undefined && typee !== 'Album' ? (
        <>
          <div className={cx('top-list')}>
            <div className={cx('top-list-left')}>
              <h2 className={cx('titel-list', 'titel-type')}>{typee}</h2>
            </div>
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
          </div>
        </>
      ) : (
        <>
          <div className={cx('top-list')}>
            <div className={cx('top-list-left')}>
              <h2 className={cx('titel-list', 'titel-type')}>{typee}</h2>
            </div>
          </div>
        </>
      )}

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
