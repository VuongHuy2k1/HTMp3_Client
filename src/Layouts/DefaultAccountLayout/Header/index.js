import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import images from '../../../assect/images'
import Menu from '../../../components/Popper/Menu'
import { Link } from 'react-router-dom'
import * as UserServices from '../../../service/userService'
import { useEffect, useState } from 'react'
const cx = classNames.bind(styles)

function UserHeader() {
  const url = 'http://localhost:8989/img/'
  const [img, setImg] = useState()
  useEffect(() => {
    const fetchApi = async () => {
      const res = await UserServices.isAuthen()

      setImg(res.user.img)
    }
    fetchApi()
  }, [])
  return (
    <header className={cx('container', 'wrapper')}>
      <div className={cx('logo')}>
        <Link to="/">
          <img className={cx('muzic-logo')} src={images.logo} alt="miuzzic" />
        </Link>
      </div>
      <div className={cx('account')}>
        <Menu>
          <center>
            {img !== undefined ? (
              <>
                <img class={cx('user-avatar')} src={url + img} alt="image" />
              </>
            ) : (
              <>
                <img
                  class="img-circle autofit2"
                  src="https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576"
                  alt="image"
                />
              </>
            )}
          </center>
        </Menu>
      </div>
    </header>
  )
}

export default UserHeader
