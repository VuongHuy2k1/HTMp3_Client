import React from 'react'
import SongList from '../../components/SongList'
import SongListHeader from '../../components/SongListHeader'
import SongDetail from '../../components/SongDetail'
import * as songsService from '../../service/songsService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Album.module.scss'
import Skeleton from 'react-loading-skeleton'
import SkeletonSong from '../../components/Skeleton/skeletonSong'
const cx = classNames.bind(styles)

function AlbumLayout() {
  const [songsList, setSongsList] = useState([])
  const [typeList, setTypeList] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      const songsFromAlbum = await songsService.getSongsFromAlbum(id)
      const songsFromSinger = await songsService.getSongsFromSinger(id)

      if (songsFromAlbum.length <= 0) {
        setSongsList(songsFromSinger)
        setTypeList('singer')
      } else {
        setSongsList(songsFromAlbum)
        setTypeList('album')
      }
      setLoading(false)
    }
    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <div className={cx('main-view-container')}>
        <div className={cx('pad-top')}></div>
        <div className={cx('main-view-top')}>
          <div className={cx('view-left')}>
            {loading ? (
              <div className={cx('pa')}>
                <Skeleton width={260} height={260} paddingTop={8} />
              </div>
            ) : (
              <SongDetail loading={loading} />
            )}
          </div>
          <div className={cx('view-right', 'scroll')}>
            <SongListHeader />
            {loading ? (
              <SkeletonSong num={16} />
            ) : (
              <SongList
                songs={songsList}
                typeSave={typeList}
                loading={loading}
              />
            )}
          </div>
        </div>
        <div className={cx('main-view-bottom')}>
          <section className={cx('list-item')}></section>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AlbumLayout
