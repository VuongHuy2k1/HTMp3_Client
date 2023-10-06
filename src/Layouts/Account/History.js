import classNames from 'classnames/bind'
import styles from './Account.module.scss'

import { useEffect, useState } from 'react'
import * as UserService from '../../service/userService'

const cx = classNames.bind(styles)
function HistoryLayout() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const res = await UserService.isAuthen()
      const fetchApi = async () => {
        const resd = await UserService.getBill(res._id)
        console.log(resd)
        setData(resd)
      }

      fetchApi()
    }
    fetchApi()
  }, [])
  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months)
    return date
  }

  const bill = data.map((item, index) => {
    const dateObject = new Date(item.paymentDate)
    const start = `${dateObject.getDate()}/${dateObject.getMonth()}/${dateObject.getFullYear()}`
    const end = `${dateObject.getDate()}/${addMonths(
      dateObject,
      item.duration + 1,
    ).getMonth()}/${dateObject.getFullYear()}`
    return (
      <div className={cx('bill-table')} key={index}>
        <nav className={cx('group-tag')}>
          <div className={cx('tag', 'left')}>
            <div className={cx('td')}>Tên gói</div>
            {item.packageName === undefined ? (
              <div className={cx('td-1')}></div>
            ) : (
              <>
                <div className={cx('td-1')}>{item.packageName}</div>
              </>
            )}
          </div>
          <div className={cx('tag', 'center')}>
            <div className={cx('td')}>Ngày mua</div>
            {start === undefined ? (
              <div className={cx('td-1')}></div>
            ) : (
              <>
                <div className={cx('td-1')}>{start}</div>
              </>
            )}
          </div>
          <div className={cx('tag', 'right')}>
            <div className={cx('td')}>Ngày hết hạn</div>
            {end === undefined ? (
              <div className={cx('td-1')}> </div>
            ) : (
              <>
                <div className={cx('td-1')}>{end}</div>
              </>
            )}
          </div>
        </nav>

        <div className={cx('bill-text')}>
          Bạn đã chi trả<p> {parseFloat(item.amount).toLocaleString()}</p> VNĐ
          cho <p>{item.duration ? item.duration : ''}</p> tháng sử dụng
        </div>
      </div>
    )
  })
  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <h1>Lịch sử nâng cấp </h1>
      </div>
      <div className={cx('content-bill')}>{bill}</div>
    </div>
  )
}

export default HistoryLayout
