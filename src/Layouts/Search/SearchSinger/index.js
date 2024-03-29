import ListSinger from '../../../components/ListSinger'

import { useState, useEffect } from 'react'

import * as searchApi from '../../../service/searchSrevice'
import classNames from 'classnames/bind'
import styles from './Style.module.scss'
import { useParams } from 'react-router-dom'
import { useDebounce } from '../../../hooks'

const cx = classNames.bind(styles)

function SearchSingerLayout() {
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

      setSearchResult(result.singers)
    }

    fetchApi()
  }, [debouncedValue])

  return (
    <div className={cx('wrapper', 'scroll')}>
      {searchResult.length <= 0 ? (
        <>
          <h3 className={cx('no')}>Không có kết quả phù hợp</h3>
        </>
      ) : (
        <>
          <section className={cx('list-item')}>
            <ListSinger
              singers={searchResult}
              content="Nghệ sĩ"
              sort="sort-row"
            />
          </section>
        </>
      )}
    </div>
  )
}

export default SearchSingerLayout
