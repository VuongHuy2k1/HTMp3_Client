import React, { useEffect, useState } from 'react'
import * as albumsSrevice from '../../service/albumsSevrice'
import * as LastPlay from '../../service/playService'
import * as UserServices from '../../service/userService'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import List from '../../components/List'
import ListSinger from '../../components/ListSinger'
import { connect } from 'react-redux'
import { selectSong, selectSongByAlbum } from '../../actions'

const cx = classNames.bind(styles)

const HomeLayout = ({ selectSong, selectSongByAlbum, selectList }) => {
  const value = UserServices.isLog()
  const [albumsList, setAlbumsList] = useState([])
  const [singerList, setSingerList] = useState([])
  const [typeAlbum, setTypeAlbum] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const response = await albumsSrevice.getAllAlbum(0)
      const res = await albumsSrevice.getSingerAlbum(0)

      var type = []

      for (let i = 0; i < response.length; i++) {
        type[i] = response[i].type
      }
      const uniqueSet = new Set(type)
      const backToArray = [...uniqueSet]
      setSingerList(res)
      setAlbumsList(response)
      setTypeAlbum(backToArray)
    }
    fetchApi()
  }, [])
  useEffect(() => {
    if (value === true) {
      const fetchApi = async () => {
        const response = await LastPlay.getLastPlay()

        if (response !== undefined) {
          selectSongByAlbum(response.songLists)
          selectSong(response.song[0])
        }
      }
      fetchApi()
    }
  }, [])

  return (
    <div className={cx('main-view-container', 'scroll')}>
      <div className={cx('top-padding')}></div>
      <div className={cx('content')}>
        <section className={cx('list-item')}>
          <List albums={albumsList} type={typeAlbum} />
        </section>
        <section className={cx('list-item')}>
          <ListSinger singers={singerList} content="Nghệ sĩ nổi bật" />
        </section>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedSongPlay: state.selectedSongPlay,
    selectList: state.selectedSongList,
  }
}

export default connect(mapStateToProps, { selectSong, selectSongByAlbum })(
  HomeLayout,
)
