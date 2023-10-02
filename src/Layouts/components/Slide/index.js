import React, { useEffect, useState } from 'react'
import * as albumsSrevice from '../../../service/albumsSevrice'
import { Slide } from 'react-slideshow-image'
import classNames from 'classnames/bind'
import styles from './Slides.module.scss'
import 'react-slideshow-image/dist/styles.css'
import Skeleton from 'react-loading-skeleton'
const cx = classNames.bind(styles)

function Slides() {
  const [albumsList, setAlbumsList] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      const response = await albumsSrevice.getAllAlbum(0)
      var type = []
      if (response) {
        for (let i = 0; i < response.length; i++) {
          type[i] = response[i].img
        }
      }
      setAlbumsList([...type.slice(0, 6)])
      setTimeout(function () {
        setLoading(false)
      }, 1500)
    }
    fetchApi()
  }, [])

  return (
    <>
      {loading ? (
        <div className={cx('loading')}>
          <Skeleton height={200} width={800} />
        </div>
      ) : (
        <Slide
          slidesToScroll={3}
          slidesToShow={3}
          indicators={false}
          images={albumsList}
          duration={10000}
        >
          <div className="slide">
            <img src={albumsList[0]} alt="" className={cx('img')}></img>
          </div>
          <div className="slide">
            <img src={albumsList[1]} alt="" className={cx('img')}></img>
          </div>
          <div className="slide">
            <img src={albumsList[2]} alt="" className={cx('img')}></img>
          </div>
          <div className="slide">
            <img src={albumsList[3]} alt="" className={cx('img')}></img>
          </div>
          <div className="slide">
            <img src={albumsList[4]} alt="" className={cx('img')}></img>
          </div>
          <div className="slide">
            <img src={albumsList[5]} alt="" className={cx('img')}></img>
          </div>
        </Slide>
      )}
    </>
  )
}

export default Slides
