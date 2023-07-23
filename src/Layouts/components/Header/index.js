import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
  faGear,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useEffect, useState } from 'react'
import Search from './search'
import Menu from '../../../components/Popper/Menu'
import 'tippy.js/dist/tippy.css' // optional
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import * as UserServices from '../../../service/userService'
import { Link, useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Adjust from '../../../components/Popper/Adjust'
const cx = classNames.bind(styles)

function Header() {
  const value = UserServices.isLog()
  const [loading, setLoading] = useState(false)
  const [img, setImg] = useState()
  const [user, setUser] = useState({
    username: '',
  })

  const url = 'https://music-x8ce.onrender.com/img/'
  const navigate = useNavigate()

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      const res = await UserServices.isAuthen()

      setUser({
        username: res.user.username,
      })
      setImg(res.user.img)
      setLoading(false)
    }
    fetchApi()
  }, [])

  const goBack = (e) => {
    navigate(-1)
  }
  const goNext = (e) => {
    navigate(1)
  }

  return (
    <header className={cx('menu', 'menu-type')}>
      <div className={cx('move')}>
        <button className={cx('top-bar-back-btn', 'move-btn')} onClick={goBack}>
          <FontAwesomeIcon className={cx('icon-li')} icon={faAngleLeft} />
        </button>
        <button
          className={cx('top-bar-forward-btn', 'move-btn')}
          onClick={goNext}
        >
          <FontAwesomeIcon className={cx('icon-li')} icon={faAngleRight} />
        </button>
      </div>

      <div className={cx('search')}>
        <Search />
      </div>

      {value ? (
        <>
          <button className={cx('edit-btn')}>
            <Adjust />
          </button>

          {loading ? (
            <Skeleton width={40} />
          ) : (
            <div className={cx('accout')}>
              <Menu></Menu>
            </div>
          )}
        </>
      ) : (
        <>
          <a
            href="/user/register"
            className={cx('top-bar-register-btn', 'accout-btn-rg')}
          >
            <span className={cx('accout-btn-lg-titel')}>Đăng ký</span>
          </a>
          <Link
            to="/user/login"
            className={cx('top-bar-login-btn', 'accout-btn-lg')}
          >
            <span className={cx('accout-btn-lg-titel')}>Đăng nhập</span>
          </Link>
        </>
      )}
    </header>
  )
}

export default Header
