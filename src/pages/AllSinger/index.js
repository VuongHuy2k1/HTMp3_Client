import React, { useEffect, useState } from 'react'
import * as albumsSrevice from '../../service/albumsSevrice'
import classNames from 'classnames/bind'
import styles from './AllSinger.module.scss'
import ListSinger from '../../components/ListSinger'

const cx = classNames.bind(styles)

function AllSingerLayout() {
  const [singersList, setSingersList] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const response = await albumsSrevice.getSingerAlbum(0)

      setSingersList(response)
    }

    fetchApi()
  }, [])

  return (
    <div className={cx('main-view-container', 'scroll')}>
      <div className={cx('top-padding')}></div>
      <div className={cx('content')}>
        <section className={cx('list-item')}>
          <ListSinger
            singers={singersList}
            sort="sort-row"
            content="Tất cả nghệ sĩ"
          />
        </section>
      </div>
    </div>
  )
}

export default AllSingerLayout
