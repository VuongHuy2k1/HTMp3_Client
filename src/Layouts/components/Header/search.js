import { Link } from 'react-router-dom'
import HeadlessTippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css' // optional
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as searchApi from '../../../service/searchSrevice'
import { useDebounce } from '../../../hooks'

import { SearchSong, SearchAlbum } from '../../../components/SearchItem'
import { Wrapper as PopperWrapper } from './../../../components/Popper'
import styles from './Header.module.scss'
import {
  faCircleXmark,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'

import { useEffect, useState, useRef } from 'react'

const cx = classNames.bind(styles)

function Search() {
  const [searchResultSong, setSearchResultSong] = useState([])
  const [searchResultAlbum, setSearchResultAlbum] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showResult, setShowResult] = useState(true)
  const debouncedValue = useDebounce(searchValue, 500)

  const inputRef = useRef()

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResultSong([])
      setSearchResultAlbum([])
      return
    }

    const fetchApi = async () => {
      const result = await searchApi.search(debouncedValue)

      setSearchResultSong(result.song)
      setSearchResultAlbum(result.album)
    }

    fetchApi()
  }, [debouncedValue])

  const handlInput = () => {
    setSearchValue('')
    inputRef.current.focus()
    setSearchResultSong([])
    setSearchResultAlbum([])
  }
  const handleOut = () => {
    setShowResult(false)
  }
  return (
    <HeadlessTippy
      interactive
      visible={
        showResult &&
        searchResultSong.length > 0 &&
        searchResultAlbum.length > 0
      }
      render={(attrs) => (
        <div className={cx('search-result')} {...attrs}>
          <PopperWrapper>
            <div className={cx('search-titel-top')}>
              <h4 className={cx('search-titel')}> Từ khóa liên quan </h4>
              {searchResultSong.map((resultt) => (
                <SearchSong songs={resultt} />
              ))}
            </div>
            <div className={cx('search-titel-bottom')}>
              <h4 className={cx('search-titel')}> Gợi ý kết quả </h4>

              {searchResultAlbum.map((result) => (
                <SearchAlbum albums={result} />
              ))}
            </div>
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleOut}
    >
      <div className={cx('warrper')}>
        <input
          placeholder="Tìm kiếm ..."
          spellCheck={false}
          ref={inputRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowResult(true)}
        ></input>

        {!!searchValue && (
          <button className={cx('clear-btn')} onClick={handlInput}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        <button className={cx('search-btn')} onClick={handleOut}>
          <Link to={`/search/${searchValue}/all`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </button>
      </div>
    </HeadlessTippy>
  )
}

export default Search
