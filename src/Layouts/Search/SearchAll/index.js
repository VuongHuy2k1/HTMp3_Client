import ListSinger from '../../../components/ListSinger'
import ListItem from '../../../components/List/ListItem'
import { useState, useEffect } from 'react'

import SongList from '../../../components/SongList'

import * as searchApi from '../../../service/searchSrevice'
import classNames from 'classnames/bind'
import styles from './Style.module.scss'
import { useParams } from 'react-router-dom'

import { useDebounce } from '../../../hooks'

const cx = classNames.bind(styles)

function SearchAllLayout() {
  const { name } = useParams()
  const [searchResultSong, setSearchResultSong] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchResultAlbum, setSearchResultAlbum] = useState([])
  const [searchResultSinger, setSearchResultSinger] = useState([])
  const debouncedValue = useDebounce(name, 10)
  useEffect(() => {
    setLoading(true)
    if (!debouncedValue.trim()) {
      setSearchResultSong([])
      setSearchResultAlbum([])
      setSearchResultSinger([])
      return
    }

    const fetchApi = async () => {
      const result = await searchApi.search(debouncedValue)
      console.log(result)
      setSearchResultSong(result.songs.slice(0, 5))
      setSearchResultAlbum(result.albums.slice(0, 5))
      setSearchResultSinger(result.singers.slice(0, 5))
    }
    setLoading(false)
    fetchApi()
  }, [debouncedValue])

  return (
    <div className={cx('wrapper', 'scroll')}>
      {searchResultSong.length <= 0 ? (
        <></>
      ) : (
        <>
          <div className={cx('container-song')}>
            <h3 className={cx('title')}>Bài hát</h3>
            <div className={cx('content')}>

              <SongList
                songs={searchResultSong}
                typeSave="album"
                loading={loading}
              />

            </div>
          </div>
        </>
      )}

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
