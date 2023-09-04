import classNames from 'classnames/bind'
import Item from '../Item'
import styles from './Listbar.module.scss'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { selectSongByAlbum } from '../../../actions'
import * as albumsSrevice from '../../../service/albumsSevrice'
import * as songsService from '../../../service/songsService'
const cx = classNames.bind(styles)
const Listbar = ({ selectedSongList, turn }) => {
  const [album, setAlbum] = useState('')
  const [songs, setSongs] = useState([])
  const [listSong, setListSong] = useState([])
  useEffect(() => {
    const fetchApi = async () => {
      const response = await albumsSrevice.getAllAlbum(0)
      if (response) {
        const name = response[0]?.name
        setAlbum(name)
      }
    }
    fetchApi()
  }, [])
  useEffect(() => {
    if (album !== '' && album !== undefined) {
      const Api = async () => {
        const songsFromAlbum = await songsService.getSongsFromAlbum(album)
        setSongs(songsFromAlbum)
      }
      Api()
    }
  }, [album])
  useEffect(() => {
    setListSong(selectedSongList)
  }, [selectedSongList])

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
