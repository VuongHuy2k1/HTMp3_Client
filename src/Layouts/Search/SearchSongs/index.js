import { useState, useEffect } from 'react'
import SongList from '../../../components/SongList'
import SkeletonSong from '../../../components/Skeleton/skeletonSong'
import * as searchApi from '../../../service/searchSrevice'
import classNames from 'classnames/bind'
import styles from './Style.module.scss'
import { useParams } from 'react-router-dom'
import { useDebounce } from '../../../hooks'

const cx = classNames.bind(styles)

function SearchSongsLayout() {
  const { name } = useParams()
  const [loading, setLoading] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  const debouncedValue = useDebounce(name, 10)
  useEffect(() => {
    setLoading(true)
    if (!debouncedValue.trim()) {
      setSearchResult([])
      return
    }

    const fetchApi = async () => {
      const result = await searchApi.search(debouncedValue)

      setSearchResult(result.songs)
    }
    setTimeout(function () {
      setLoading(false)
    }, 1000)

    fetchApi()
  }, [debouncedValue])
  return (
    <div className={cx('wrapper', 'scroll')}>
      {loading ? (
        <div className={cx('pa')}>
          <SkeletonSong num={searchResult.length} />
        </div>
      ) : (
        <>
          <div className={cx('container')}>
            {searchResult.length < 0 ? (
              <div className={cx('container-none')}>
                <i> </i>
                <span>Không có kết quả phù hợp</span>
              </div>
            ) : (
              <>
                <h3 className={cx('title')}>Bài hát</h3>
                <div className={cx('content')}>
                  <SongList songs={searchResult} typeSave="album" />
                </div>
              </>
            )}
          </div>
          <section className={cx('list-item')}></section>
        </>
      )}
    </div>
  )
}

export default SearchSongsLayout
