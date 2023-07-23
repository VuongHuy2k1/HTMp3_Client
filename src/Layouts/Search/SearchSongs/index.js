import { useState, useEffect } from 'react'
import SongList from '../../../components/SongList'

import * as searchApi from '../../../service/searchSrevice'
import classNames from 'classnames/bind'
import styles from './Style.module.scss'
import { useParams } from 'react-router-dom'
import { useDebounce } from '../../../hooks'

const cx = classNames.bind(styles)

function SearchSongsLayout() {
  const { name } = useParams()

  const [searchResult, setSearchResult] = useState([])
  const debouncedValue = useDebounce(name, 10)
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([])
      return
    }

    const fetchApi = async () => {
      const result = await searchApi.search(debouncedValue)

      setSearchResult(result.song)
    }

    fetchApi()
  }, [debouncedValue])

  return (
    <div className={cx('wrapper', 'scroll')}>
      <div className={cx('container')}>
        <h3 className={cx('title')}>Bài hát</h3>

        <div className={cx('content')}>
          <SongList songs={searchResult} typeSave="album" />
        </div>
      </div>
      <section className={cx('list-item')}></section>
    </div>
  )
}

export default SearchSongsLayout
