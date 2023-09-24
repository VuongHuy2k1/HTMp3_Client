import classNames from 'classnames/bind'
import styles from './Slider.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faKey, faPen } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import * as UserServices from '../../../service/userService'
import { NavLink } from 'react-router-dom'
import {
  FaUserEdit,
  FaUserClock,
  FaUserCog,
  FaUserCircle,
} from 'react-icons/fa'
const cx = classNames.bind(styles)
function UserSlider() {
  const url = 'http://localhost:8989/img/'
  const [img, setImg] = useState()
  const [num, setNum] = useState(1)

  useEffect(() => {
    const fetchApi = async () => {
      const res = await UserServices.isAuthen()

      setImg(res.img)
    }
    fetchApi()
  }, [])

  const listMenu = [
    {
      id: 1,
      to: '/account/infor',
      icon: <FaUserCircle className={cx('icon')} />,
      title: 'Hồ sơ',
    },
    {
      id: 2,
      to: '/account/edit',
      icon: <FaUserEdit className={cx('icon')} />,
      title: 'Sửa hồ sơ',
    },
    {
      id: 3,
      to: '/account/change',
      icon: <FaUserCog className={cx('icon')} />,
      title: 'Thay đổi mật khẩu',
    },
    {
      id: 4,
      to: '/account/change',
      icon: <FaUserClock className={cx('icon')} />,
      title: 'Lịch sử',
    },
  ]
  const ListMenu = listMenu.map((item, index) => {
    return (
      <li
        className={cx('content', item.id === num ? 'active' : '')}
        key={index}
      >
        <NavLink
          className={cx('herf-slider')}
          to={item.to}
          onClick={() => setNum(item.id)}
        >
          {item.icon}
          <span className={cx('titel')}>{item.title}</span>
        </NavLink>
      </li>
    )
  })
  return (
    <div className={cx('wrapper')}>
      <div className={cx('slider')}>
        <div className={cx('admin-user-item')}>
          <div className={cx('image')}>
            <center>
              {img !== undefined ? (
                <>
                  <img
                    className="img-circle autofit2"
                    src={url + img}
                    alt="imag"
                  />
                </>
              ) : (
                <>
                  <img
                    className="img-circle autofit2"
                    src="https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576"
                    alt="imge"
                  />
                </>
              )}
            </center>
          </div>

          <p className={cx('user-role')}></p>
        </div>

        <ul className={cx('admin-user-menu')}>{ListMenu}</ul>
      </div>
    </div>
  )
}

export default UserSlider
