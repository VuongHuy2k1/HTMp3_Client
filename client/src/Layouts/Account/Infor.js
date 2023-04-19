import classNames from 'classnames/bind'
import styles from './Account.module.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as UserService from '../../service/userService'
const cx = classNames.bind(styles)
function InforLayout() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    img: '',
    gender: '',
    dateOfBirth: '',
    nation: '',
  })

  useEffect(() => {
    const fetchApi = async () => {
      const res = await UserService.isAuthen()

      setUser({
        name: res.user.name,
        email: res.user.email,
        img: res.user.img,
        gender: res.user.gender,
        dateOfBirth: res.user.dateOfBirth,
        nation: res.user.nation,
      })
    }
    fetchApi()
  }, [])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <h1>Tổng quan về tài khoản</h1>
        <span>Hồ sơ</span>
      </div>
      <div className={cx('content')}>
        <table className={cx('info-table')}>
          <tbody>
            <tr>
              <td className={cx('td')}>Tên người dùng</td>
              {user.name === undefined ? (
                <td className={cx('td-1')}></td>
              ) : (
                <>
                  <td className={cx('td-1')}>{user.name}</td>
                </>
              )}
            </tr>

            <tr>
              <td className={cx('td')}>Ngày sinh</td>
              {user.dateOfBirth === undefined ? (
                <td className={cx('td-1')}></td>
              ) : (
                <>
                  <td className={cx('td-1')}>{user.dateOfBirth}</td>
                </>
              )}
            </tr>
            <tr>
              <td className={cx('td')}>Giới tính</td>
              {user.gender === undefined ? (
                <td className={cx('td-1')}> </td>
              ) : (
                <>
                  <td className={cx('td-1')}>{user.gender}</td>
                </>
              )}
            </tr>
            <tr>
              <td className={cx('td')}>Email</td>
              {user.email === undefined ? (
                <td className={cx('td-1')}></td>
              ) : (
                <>
                  <td className={cx('td-1')}>{user.email}</td>
                </>
              )}
            </tr>

            <tr>
              <td className={cx('td')}>Quốc gia</td>
              {user.nation === undefined ? (
                <td className={cx('td-1')}>Bạn chưa cập nhật </td>
              ) : (
                <>
                  <td className={cx('td-1')}>{user.nation}</td>
                </>
              )}
            </tr>
          </tbody>
        </table>
        <div className={cx('move')}>
          <Link className={cx('btn-move')} to="/account/edit">
            Chỉnh sửa hồ sơ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InforLayout
