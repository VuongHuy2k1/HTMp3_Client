import React from 'react'
import {
  selectSongByAlbum,
  setStatus,
  setFocus,
  changePlaylist,
} from '../../actions'
import Header from '../components/Header'
import { connect } from 'react-redux'
import styles from './DefaultLayout.module.scss'
import Sidebar from '../components/Sidebar'
import Listbar from '../components/Listbar'
import Player from '../../components/Player'

import * as UserService from '../../service/userService'

import classNames from 'classnames/bind'

import FlexComponent from '../../components/FlexComponent'
const cx = classNames.bind(styles)

const DefaultLayout = ({
  children,
  selectedSongList,
  setStatus,
  status,
  focus,
  setFocus,
  changePlaylist,
  userPlaylist,
  playlistId,
}) => {
  const value = UserService.isLog()
  return (
    <React.Fragment>
      <div className={cx('warrper')}>
        <FlexComponent />

        <div className={cx('header', 'backgroung-color')}>
          <Header />
        </div>
        <nav className={cx('nav-bar')}>
          <Sidebar />
        </nav>
        <nav className={cx('nav-list')}>
          {value === false || selectedSongList === 0 ? (
            <>
              <div className={cx('apict')}>
                <img
                  class={cx('img')}
                  src="https://cdn1.vectorstock.com/i/thumb-large/67/85/music-party-black-poster-template-with-boombox-vector-24236785.jpg"
                ></img>
                <span></span>
              </div>
            </>
          ) : (
            <>
              <Listbar />
            </>
          )}
        </nav>
        <div className={cx('main-view')}>{children}</div>

        <div className={cx('playing-bar')}>
          <div className={cx('playlist')}>
            {value === false || selectedSongList === 0 ? (
              <></>
            ) : (
              <>
                <Player />
              </>
            )}

            <a href="#focused" id="focus-link" hidden>
              Go to playing element
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => {
  return {
    selectedSongList: state.selectedSongList,
    focus: state.focus,
    status: state.status,
    userPlaylist: state.userPlaylist,
    playlistId: state.playlistId,
  }
}

export default connect(mapStateToProps, {
  selectSongByAlbum,
  setStatus,
  setFocus,
  changePlaylist,
})(DefaultLayout)
