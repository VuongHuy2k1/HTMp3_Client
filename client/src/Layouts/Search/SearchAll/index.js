import ListSinger from '../../../components/ListSinger'
import ListItem from '../../../components/List/ListItem'
import { useState, useEffect } from 'react'

import SongList from '../../../components/SongList'

import * as searchApi from '../../../service/searchSrevice'
import classNames from 'classnames/bind'
import styles from './Style.module.scss'
import { useParams } from 'react-router-dom'

import { useDebounce } from '../../../hooks'
import HeaderBar from '../component/HeaderBar'

const cx = classNames.bind(styles)

function SearchAllLayout() {
  const { name } = useParams()
  const [searchResultSong, setSearchResultSong] = useState([])
  const [searchResultAlbum, setSearchResultAlbum] = useState([])
  const [searchResultSinger, setSearchResultSinger] = useState([])
  const debouncedValue = useDebounce(name, 10)
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResultSong([])
      setSearchResultAlbum([])
      setSearchResultSinger([])
      return
    }

    const fetchApi = async () => {
      const result = await searchApi.search(debouncedValue)

      setSearchResultSong(result.song)
      setSearchResultAlbum(result.album)
      setSearchResultSinger(result.singer)
    }

    fetchApi()
  }, [debouncedValue])

  return (
    <div className={cx('wrapper', 'scroll')}>
      <HeaderBar />
      <div className={cx('container')}>
        <h3 className={cx('title')}>Bài hát</h3>
        <div className={cx('content')}>
          <SongList songs={searchResultSong} typeSave="album" />
        </div>
      </div>

      {searchResultAlbum.length <= 0 ? (
        <></>
      ) : (
        <>
          <section className={cx('list-item')}>
            <ListItem albums={searchResultAlbum} typee={'Album'} />
          </section>
        </>
      )}

      {searchResultSinger.length <= 0 ? (
        <></>
      ) : (
        <>
          <section className={cx('list-item')}>
            <ListSinger
              singers={searchResultSinger}
              content="Nghệ sĩ"
              sort="none"
            />
          </section>
        </>
      )}
    </div>
  )
}

export default SearchAllLayout
