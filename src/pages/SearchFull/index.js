import { useState, useEffect, Children } from 'react'

import classNames from 'classnames/bind'
import styles from './Search.module.scss'
import { useParams } from 'react-router-dom'

import { SearchAllLayout } from '../../Layouts/Search'
import { SearchAlbumLayout } from '../../Layouts/Search'
import { SearchSongsLayout } from '../../Layouts/Search'
import { SearchSingerLayout } from '../../Layouts/Search'

const cx = classNames.bind(styles)

function SearchFull() {
  const { name } = useParams()
  const [num, setNum] = useState(1)
  const [layout, setLayout] = useState(<SearchAllLayout />)
  const listMenu = [
    {
      id: 1,
      to: `/search/${name}/all`,
      title: 'TẤT CẢ',
      layout: <SearchAllLayout />,
    },
    {
      id: 2,
      to: `/search/${name}/song`,
      title: ' BÀI HÁT',
      layout: <SearchSongsLayout />,
    },
    {
      id: 3,
      to: `/search/${name}/album`,
      title: 'ALBUM',
      layout: <SearchAlbumLayout />,
    },
    {
      id: 4,
      to: `/search/${name}/singer`,
      title: 'NGHỆ SĨ',
      layout: <SearchSingerLayout />,
    },
  ]

  const tag = listMenu.map((item, index) => {
    if (item.id === num) {
      return (
        <div
          key={index}
          class={cx('tab-item', 'active')}
          onClick={() => {
            setNum(item.id)
            setLayout(item.layout)
          }}
        >
          <p>{item.title}</p>
        </div>
      )
    } else {
      return (
        <div
          key={index}
          class={cx('tab-item')}
          onClick={() => {
            setNum(item.id)
            setLayout(item.layout)
          }}
        >
          <p>{item.title}</p>
        </div>
      )
    }
  })
  return (
    <div className={cx('wrapper', 'scroll')}>
      <div className={cx('header-bar')}>
        <div class={cx('tabs')}>
          <div class={cx('title-headr-bar', 'tab-item')}>KẾT QUẢ TÌM KIẾM</div>
          {tag}
        </div>
      </div>

      <div className={cx('container')}>{layout}</div>
    </div>
  )
}

export default SearchFull
