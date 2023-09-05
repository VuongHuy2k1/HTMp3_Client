import React, { useEffect, useState } from 'react'

import * as albumsSrevice from '../../service/albumsSevrice'
import * as LastPlay from '../../service/playService'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import List from '../../components/List'

import { connect } from 'react-redux'
import { selectSong, selectSongByAlbum } from '../../actions'

import SkeletonCard from '../../components/Skeleton/skeletoncerd'
import Slides from '../../Layouts/components/Slide'
const cx = classNames.bind(styles)

const HomeLayout = ({ selectSong, selectSongByAlbum, selectList }) => {
  const [loading, setLoading] = useState(false)

  const [albumsList, setAlbumsList] = useState([])
  const [singerList, setSingerList] = useState([])
  const [typeAlbum, setTypeAlbum] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
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
      setLoading(false)
    }
    fetchApi()
  }, [])

  return (
    <div className={cx('main-view-container', 'scroll')}>
      <div className={cx('top-padding')}></div>

      <div className={cx('content')}>
        <div className={cx('slide')}>
          <Slides />
        </div>

        <div className={cx('top-padding')}></div>
        <section className={cx('list-item')}>
          {loading ? (
            <SkeletonCard num={6} />
          ) : (
            <List albums={albumsList} type={typeAlbum} />
          )}
        </section>
        {/* <section className={cx('list-item')}>
          {loading ? (
            <SkeletonCard num={6} />
          ) : (
            <ListSinger singers={singerList} content="Nghệ sĩ nổi bật" />
          )}
        </section> */}
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
