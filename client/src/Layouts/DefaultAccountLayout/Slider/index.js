import classNames from 'classnames/bind'
import styles from './Slider.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faKey, faPen } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import * as UserServices from '../../../service/userService'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)
function UserSlider() {
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
    <div className={cx('wrapper')}>
      <div className={cx('slider')}>
        <div class={cx('admin-user-item')}>
          <div class={cx('image')}>
            <center>
              {img !== undefined ? (
                <>
                  <img
                    class="img-circle autofit2"
                    src={url + img}
                    alt="image"
                  />
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
          </div>

          <h4></h4>
          <p class={cx('user-role')}></p>
        </div>

        <ul class={cx('admin-user-menu')}>
          <li class={cx('active')}>
            <Link to="/account/infor" className={cx('herf-slider')}>
              <FontAwesomeIcon className={cx('icon')} icon={faHome} />
              <span> Hồ sơ</span>
            </Link>
          </li>
          <li class="">
            <Link to="/account/edit" className={cx('herf-slider')}>
              <FontAwesomeIcon className={cx('icon')} icon={faPen} />
              <span> Sửa hồ sơ</span>
            </Link>
          </li>
          <li class="">
            <a href="/account/change" className={cx('herf-slider')}>
              <FontAwesomeIcon className={cx('icon')} icon={faKey} />
              <span> Thay đổi mật khẩu</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserSlider
