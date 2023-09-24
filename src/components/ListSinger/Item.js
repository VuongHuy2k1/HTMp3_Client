import classNames from 'classnames/bind'
import styles from './ListSinger.module.scss'
import { selectAlbum } from '../../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import React from 'react'

const cx = classNames.bind(styles)

const Item = ({ singer, selectAlbum }) => {
  return (
    <div className={cx('item')}>
      <div className={cx('warrper')}>
        <div className={cx('card')}>
          <div className={cx('card-top')}>
            <div className={cx('img-card')}>
              <img
                className={cx('img', 'img-type-1')}
                src={singer.img}
                alt=""
              ></img>
              <form className={cx('hover-player')}>
                <div className={cx('hover-player-a')}>
                  <button className={cx('player-btn')}>
                    <span className={cx('player-btn-span')}>
                      <span className={cx('player-btn-span-a')}>
                        <FontAwesomeIcon
                          className={cx('icon-li')}
                          icon={faPlay}
                        />
                      </span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={cx('card-bottom')}>
            <Link
              className={cx('card-name')}
              to={`/album/${singer.name}`}
              onClick={() => {
                selectAlbum(singer)
              }}
            >
              <div className={cx('name', 'name-text')}>{singer.name}</div>
            </Link>
            <div className={cx('card-type')}>
              <span className={cx('type', 'type-text')}>
                {singer.description}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    selectAlbum: state.selectedAlbum,
  }
}
export default connect(mapStateToProps, { selectAlbum })(Item)
