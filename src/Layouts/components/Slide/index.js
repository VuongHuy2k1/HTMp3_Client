import React from 'react'

import { Slide } from 'react-slideshow-image'
import classNames from 'classnames/bind'
import styles from './Slides.module.scss'
import 'react-slideshow-image/dist/styles.css'
const cx = classNames.bind(styles)
function Slides() {
  return (
    <Slide slidesToScroll={3} slidesToShow={3} indicators={false}>
      <div className="slide">
        <img
          src="https://photo-zmp3.zmdcdn.me/banner/7/c/c/f/7ccfa5ff84350e976f2f23d39b5d288d.jpg"
          alt=""
          className={cx('img')}
        ></img>
      </div>
      <div className="slide">
        <img
          src="https://photo-zmp3.zmdcdn.me/banner/7/c/c/f/7ccfa5ff84350e976f2f23d39b5d288d.jpg"
          alt=""
          className={cx('img')}
        ></img>
      </div>
      <div className="slide">
        <img
          src="https://photo-zmp3.zmdcdn.me/banner/d/3/5/5/d3551295f6c2423d5e914dff056b5267.jpg"
          alt=""
          className={cx('img')}
        ></img>
      </div>
      <div className="slide">
        <img
          src="https://photo-zmp3.zmdcdn.me/banner/c/8/e/5/c8e596828dd433a155837973fe33102c.jpg"
          alt=""
          className={cx('img')}
        ></img>
      </div>
    </Slide>
  )
}

export default Slides
