import React from 'react'
import styles from './HearderBar.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { useState } from 'react'

const cx = classNames.bind(styles)

const HeaderBar = () => {
  const { name } = useParams()
  const [active, setActive] = useState()
  const id1 = 1 === active ? 'active' : ''
  const id2 = 2 === active ? 'active' : ''
  const id3 = 3 === active ? 'active' : ''

  return (
    <div className={cx('warrper')}>
      <div className={cx('header-bar')}>
        <div class={cx('tabs')}>
          <div class={cx('tab-item', 'title-headr-bar')}>KẾT QUẢ TÌM KIẾM</div>
          <Link to={`/search/${name}/all`}>
            <div
              class={cx('tab-item', 'active')}
              id={cx(id1)}
              onClick={() => {
                setActive(1)
              }}
            >
              TẤT CẢ
            </div>
          </Link>
          <Link to={`/search/${name}/song`}>
            <div
              class={cx('tab-item')}
              id={cx(id2)}
              onClick={() => {
                setActive(2)
              }}
            >
              BÀI HÁT
            </div>
          </Link>
          <Link to={`/search/${name}/album`}>
            <div
              class={cx('tab-item')}
              id={cx(id3)}
              onClick={() => {
                setActive(3)
              }}
            >
              ALBUM
            </div>
          </Link>
          <Link to={`/search/${name}/singer`}>
            <div class={cx('tab-item')}>NGHỆ SĨ</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default HeaderBar
