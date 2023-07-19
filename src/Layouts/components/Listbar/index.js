import classNames from 'classnames/bind'
import Item from '../Item'
import styles from './Listbar.module.scss'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { selectSongByAlbum } from '../../../actions'
const cx = classNames.bind(styles)
const Listbar = ({ selectedSongList, turn }) => {
  const [listSong, setListSong] = useState([])
  useEffect(() => {
    setListSong(selectedSongList)
  }, [selectedSongList])
  console.log(selectedSongList)
  const songTags = listSong.map((song, index) => {
    return <Item song={song} key={index} index={index} />
  })

  return (
    <div className={cx('warrper', turn)}>
      <div className={cx('header-bar')}>
        <h1 className={cx('titel', 'backgroud')}>Danh sách phát</h1>
      </div>

      <div className={cx('list-bar')}>{songTags}</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedSongList: state.selectedSongList,
    selectedSongPlay: state.selectedSongPlay,
    selectedType: state.selectedType,
  }
}

export default connect(mapStateToProps, {
  selectSongByAlbum,
})(Listbar)
