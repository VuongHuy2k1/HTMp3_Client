import ListItem from '../../../components/List/ListItem'
import { useState, useEffect } from 'react'

import * as searchApi from '../../../service/searchSrevice'
import classNames from 'classnames/bind'
import styles from './Style.module.scss'
import { useParams } from 'react-router-dom'
import { useDebounce } from '../../../hooks'
import HeaderBar from '../component/HeaderBar'

const cx = classNames.bind(styles)

function SearchAlbumLayout() {
  const { name } = useParams()

  const [searchResult, setSearchResult] = useState([])
  const debouncedValue = useDebounce(name, 10)
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([])
      return
    }

    const fetchApi = async () => {
      const result = await searchApi.search(debouncedValue, 0)

      setSearchResult(result.album)
    }

    fetchApi()
  }, [debouncedValue])

  return (
    <div className={cx('wrapper', 'scroll')}>
      <HeaderBar />

      {searchResult.length <= 0 ? (
        <>
          <h3 className={cx('no')}>Không có kết quả phù hợp</h3>
        </>
      ) : (
        <>
          <section className={cx('list-item')}>
            <ListItem albums={searchResult} typee={'Album'} sort="sort-row" />
          </section>
        </>
      )}
    </div>
  )
}

export default SearchAlbumLayout
