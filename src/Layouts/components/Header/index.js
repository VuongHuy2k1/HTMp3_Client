import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useEffect, useState } from 'react'
import Search from './search'
import Menu from '../../../components/Popper/Menu'
import 'tippy.js/dist/tippy.css' // optional
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import * as UserServices from '../../../service/userService'
import { Link, useNavigate } from 'react-router-dom'
const cx = classNames.bind(styles)

function Header() {
  const value = UserServices.isLog()

  const [user, setUser] = useState({
    username: '',
  })

  const url = 'http://localhost:8989/img/'
  const [img, setImg] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchApi = async () => {
      const res = await UserServices.isAuthen()

      setUser({
        username: res.user.username,
      })
      setImg(res.user.img)
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
          <div className={cx('accout')}>
            <center>
              {img !== undefined ? (
                <>
                  <img class={cx('user-avatar')} src={url + img} alt="image" />
                </>
              ) : (
                <>
                  <img
                    class={cx('user-avatar')}
                    src="https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576"
                    alt="image"
                  />
                </>
              )}
            </center>
            <Menu>
              <span>{user.username}</span>
            </Menu>
          </div>
        </>
      ) : (
        <>
          <a
            href="/user/register"
            className={cx('top-bar-register-btn', 'accout-btn-rg')}
          >
            Đăng kí
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
