import React, { useEffect, useState } from 'react'
import { setStatus, setFocus, changePlaylist } from '../../actions'
import Header from '../components/Header'
import { connect } from 'react-redux'
import styles from './DefaultLayout.module.scss'
import Sidebar from '../components/Sidebar'
import Listbar from '../components/Listbar'
import Player from '../../components/Player'
import Message from '../../components/Message'
import * as UserService from '../../service/userService'

import classNames from 'classnames/bind'

import FlexComponent from '../../components/FlexComponent'
const cx = classNames.bind(styles)

const DefaultLayout = ({
  children,
  selectedSongList,
  selectedMess,
  loading,
  turn,
}) => {
  const value = UserService.isLog()

  const [off, setOff] = useState(false)
  useEffect(() => {
    setOff(turn)
  }, [turn])

  const ID = off === true ? 'off' : ''
  const IDD = off === true ? 'none' : ''
  return (
    <React.Fragment>
      <div className={cx('warrper')}>
        <FlexComponent />

        <div className={cx('header')}>
          <Header />
        </div>
        <nav className={cx('nav-bar')}>
          <Sidebar />
        </nav>
        <nav className={cx('nav-list', ID)}>
          {selectedSongList === 0 ? (
            <></>
          ) : (
            <>
              <Listbar turn={IDD} />
            </>
          )}
        </nav>
        <div className={cx('main-view')}>{children}</div>

        <div className={cx('playing-bar')}>
          <div className={cx('messi')}>
            {loading ? <Message message={selectedMess} /> : <></>}
          </div>
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
    selectedMess: state.selectedMess,
    loading: state.selectedLoad,
    turn: state.selectedTurn,
  }
}

export default connect(mapStateToProps, {
  setStatus,
  setFocus,
  changePlaylist,
})(DefaultLayout)
