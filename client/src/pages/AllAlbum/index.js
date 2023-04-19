import React, { useEffect, useState } from 'react'
import * as albumsSrevice from '../../service/albumsSevrice'
import classNames from 'classnames/bind'
import styles from './AllAlbum.module.scss'
import { useParams } from 'react-router-dom'
import ListItem from '../../components/List/ListItem'
const cx = classNames.bind(styles)
function AllAlbumLayout() {
  const { type } = useParams()

  const [albumsList, setAlbumsList] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const response = await albumsSrevice.getAlbumType(type, 0)

      var albums = []

      for (let i = 0; i < response.length; i++) {
        if (response[i].type === type) {
          albums[i] = response[i]
        }
      }

      setAlbumsList(response)
    }

    fetchApi()
  }, [])

  return (
    <div className={cx('main-view-container', 'scroll')}>
      <div className={cx('top-padding')}></div>
      <div className={cx('content')}>
        <section className={cx('list-item')}>
          <ListItem albums={albumsList} typee={type} sort="sort-row" />
        </section>
      </div>
    </div>
  )
}

export default AllAlbumLayout
