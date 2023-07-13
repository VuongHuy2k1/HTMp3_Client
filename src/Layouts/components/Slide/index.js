import React, { useEffect, useState } from 'react'
import * as albumsSrevice from '../../../service/albumsSevrice'
import { Slide } from 'react-slideshow-image'
import classNames from 'classnames/bind'
import styles from './Slides.module.scss'
import 'react-slideshow-image/dist/styles.css'
const cx = classNames.bind(styles)
function Slides() {
  const [loading, setLoading] = useState(false)

  const [albumsList, setAlbumsList] = useState([])
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      const response = await albumsSrevice.getAllAlbum(0)
      const res = await albumsSrevice.getSingerAlbum(0)

      var type = []

      for (let i = 0; i < response.length; i++) {
        type[i] = response[i].type
      }
      const uniqueSet = new Set(type)
      const backToArray = [...uniqueSet]

      setAlbumsList(response)
      setLoading(false)
    }
    fetchApi()
  }, [])
  const items = albumsList.slice(0, 9).map((item, index) => {
    return (
      <div className="slide" key={index}>
        <img src={item.img} alt="" className={cx('img')}></img>
      </div>
    )
  })

  return (
    <Slide slidesToScroll={2} slidesToShow={3} indicators={true}>
      {items}
    </Slide>
  )
}

export default Slides
