import ListItem from '../../../components/List/ListItem'
import { useState, useEffect } from 'react'
import SkeletonCard from '../../../components/Skeleton/skeletoncerd'
import * as searchApi from '../../../service/searchSrevice'
import classNames from 'classnames/bind'
import styles from './Style.module.scss'
import { useParams } from 'react-router-dom'
import { useDebounce } from '../../../hooks'

const cx = classNames.bind(styles)

function SearchAlbumLayout() {
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
      const result = await searchApi.search(debouncedValue, 0)

      setSearchResult(result.albums)
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
          <SkeletonCard num={6} />
        </div>
      ) : (
        <>
          {searchResult.length <= 0 ? (
            <div className={cx('container-none')}>
              <i> </i>
              <span>Không có kết quả phù hợp</span>
            </div>
          ) : (
            <>
              <section className={cx('list-item')}>
                <ListItem
                  albums={searchResult}
                  typee={'Album'}
                  sort="sort-row"
                />
              </section>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default SearchAlbumLayout
