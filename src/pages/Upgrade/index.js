import { useState, useEffect } from 'react'
import * as UserServices from '../../service/userService'
import * as UpgradeServices from '../../service/upgredeSevrice'
import classNames from 'classnames/bind'
import styles from './Upgrade.module.scss'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { FaCreditCard, FaCcPaypal, FaCcVisa } from 'react-icons/fa'
import Message from '../../components/Message'
// import { ListGroup } from 'react-bootstrap'
// import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
// import { set } from 'date-fns'
const cx = classNames.bind(styles)
function Upgrade() {
  const [packageData, setPackageData] = useState([])
  const [cart, setCart] = useState({
    packageId: '',
    userId: '',
    isPaid: '',
    isUsed: '',
    amount: '',
    duration: '',
  })
  const url = 'http://localhost:8989/img/'
  const urlImg =
    'https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576'
  const [img, setImg] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const [value, setValue] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [valueUsd, setValueUsd] = useState('')
  var d = new Date()

  const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`

  const [endDate, setEndDate] = useState()
  const [user, setUser] = useState({
    username: '',
    userId: '',
    userPriority: '',
  })

  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months)
    return date
  }

  const [num, setNum] = useState(0)
  useEffect(() => {
    const fetchApi = async () => {
      const res = await UserServices.isAuthen()
      const respacke = await UpgradeServices.getUpgredePackage()
      setUser({
        username: res.username,
        userId: res._id,
        userPriority: res.priority,
      })

      setImg(res.img)

      setPackageData(respacke)
      setValue(respacke[0].price)
      setEndDate(
        `${d.getDate()}/${addMonths(
          d,
          respacke[0].duration + 1,
        ).getMonth()}/${d.getFullYear()}`,
      )
      setCart({
        packageId: respacke[0]._id,
        userId: res._id,
        isPaid: true,
        isUsed: true,
        amount: respacke[0].price,
        duration: respacke[0].duration,
      })
    }
    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setValueUsd((value / 23630).toFixed(2))
  }, [value])

  const [amount, setAmount] = useState('10.00')
  const pressValue = (price, index, moth, cart) => {
    var a = new Date()
    const day = addMonths(a, moth + 1)

    setValue(price)
    setCart({
      packageId: cart._id,
      userId: user.userId,
      isPaid: true,
      isUsed: true,
      amount: cart.price,
      duration: cart.duration,
    })
    setNum(index)
    setEndDate(`${day.getDate()}/${day.getMonth()}/${day.getFullYear()}`)
  }
  const handleValue = (event) => {
    // Cập nhật giá trị số tiền khi người dùng thay đổi
    setAmount(event.target.value)
  }

  const method = packageData.map((item, index) => {
    return (
      <label
        htmlFor={item.id}
        className={cx('detail-method', num === index ? 'active' : '')}
        key={index}
        value={item.price}
        onClick={() => pressValue(item.price, index, item.duration, item)}
      >
        <input
          type="radio"
          id={item.id}
          value={item.price}
          className={cx('radio')}
          name="method"
          defaultChecked={num === index ? 'checked' : ''}
          onChange={handleValue}
        ></input>

        <div htmlFor={item.id} className={cx('content-method')}>
          <p className={cx('moth')}>{item.duration} tháng </p>

          <div className={cx('price')}>
            <p className={cx('now-price')}>
              {parseFloat(item.price).toLocaleString()} VNĐ
            </p>
            {item.discount > 0 ? (
              <p className={cx('discount')}>Tiết kiệm {item.discount}%</p>
            ) : (
              <></>
            )}
          </div>
          <div className={cx('old-price')}>
            {item.discount > 0 ? (
              <p>
                {parseFloat(
                  (item.price / (100 - item.discount)) * 100,
                ).toLocaleString()}
                VNĐ
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </label>
    )
  })

  useEffect(() => {
    setValueUsd((value / 23630).toFixed(2))
  }, [value])

  const checkout = async () => {
    const timerId = setTimeout(() => {
      clearTimeout(timerId)
      setLoading(true)
      setMessage({
        msgBody: 'Thanh toán thành công',
        msgError: false,
      })

      UpgradeServices.completedUpgrede(cart)
    }, 500)
    const timerLoading = setTimeout(() => {
      clearTimeout(timerLoading)

      setLoading(false)
    }, 2000)
  }

  return (
    <div className={cx('wrapper')}>
      {user?.userPriority === 'basic' ? (
        <>
          {loading ? <Message message={message} /> : <></>}
          <div className={cx('content-upgrade')}>
            <p>HUTA MP3</p>
            <span>VIP</span>
          </div>
          <div className={cx('container')}>
            <div className={cx('container-left')}>
              <div className={cx('packages', 'bg')}>
                <div className={cx('content')}> Chọn gói nâng cấp</div>
                <form>
                  <ul>{method}</ul>
                </form>
              </div>
              <div className={cx('method', 'bg')}>
                <div className={cx('content')}> Phương thức thanh toán</div>
                <form>
                  <label
                    htmlFor="visa"
                    className={cx('container-pay')}
                    value="visa"
                  >
                    <div htmlFor="visa" className={cx('content-pay')}>
                      <div className={cx('icon-pay')}>
                        <FaCreditCard />
                      </div>
                      <div className={cx('title-pay')}>
                        <div className={cx('name-pay')}>
                          Thanh toán trực tuyến PayPal
                        </div>
                        <div className={cx('logo-pay')}>
                          <FaCcPaypal />
                          <FaCcVisa />
                        </div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      id="visa"
                      value="visa"
                      className={cx('radio')}
                      name="method"
                      defaultChecked="checked"
                    ></input>
                  </label>
                </form>
              </div>
            </div>
            <div className={cx('container-right')}>
              <div className={cx('benefit', 'bg')}>
                <div className={cx('content')}> Đặc quyền</div>
                <ul className={cx('list-benefit')}>
                  <li className={cx('content-benefit')}>
                    <i className="b">
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.695 5.282a1 1 0 01.023 1.414L9.532 18.25a1 1 0 01-1.41.026l-4.815-4.622a1 1 0 011.386-1.443l4.095 3.932 10.494-10.84a1 1 0 011.413-.022z"
                        ></path>
                      </svg>
                    </i>
                    Nghe nhạc không quảng cáo
                  </li>
                  <li className={cx('content-benefit')}>
                    <i className="b">
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.695 5.282a1 1 0 01.023 1.414L9.532 18.25a1 1 0 01-1.41.026l-4.815-4.622a1 1 0 011.386-1.443l4.095 3.932 10.494-10.84a1 1 0 011.413-.022z"
                        ></path>
                      </svg>
                    </i>
                    Nghe nhạc không quảng cáo
                  </li>
                  <li className={cx('content-benefit')}>
                    <i className="b">
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.695 5.282a1 1 0 01.023 1.414L9.532 18.25a1 1 0 01-1.41.026l-4.815-4.622a1 1 0 011.386-1.443l4.095 3.932 10.494-10.84a1 1 0 011.413-.022z"
                        ></path>
                      </svg>
                    </i>
                    Nghe nhạc không quảng cáo
                  </li>
                  <li className={cx('content-benefit')}>
                    <i className="b">
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.695 5.282a1 1 0 01.023 1.414L9.532 18.25a1 1 0 01-1.41.026l-4.815-4.622a1 1 0 011.386-1.443l4.095 3.932 10.494-10.84a1 1 0 011.413-.022z"
                        ></path>
                      </svg>
                    </i>
                    Nghe nhạc không quảng cáo
                  </li>
                  <li className={cx('content-benefit')}>
                    <i className="b">
                      <svg
                        width="24"
                        height="24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.695 5.282a1 1 0 01.023 1.414L9.532 18.25a1 1 0 01-1.41.026l-4.815-4.622a1 1 0 011.386-1.443l4.095 3.932 10.494-10.84a1 1 0 011.413-.022z"
                        ></path>
                      </svg>
                    </i>
                    Nghe nhạc không quảng cáo
                  </li>
                </ul>
              </div>
              <div className={cx('bill', 'bg')}>
                <div className={cx('infor')}>
                  <img
                    className={cx('user-img')}
                    alt=""
                    src={img !== undefined ? url + img : urlImg}
                  ></img>
                  <p className={cx('user-name')}>{user.username}</p>
                </div>

                <div className={cx('time-bill')}>
                  <div className={cx('time')}>
                    <p className={cx('left')}>Thời điểm nâng cấp</p>
                    <p className={cx('right')}>{date}</p>
                  </div>
                  <div className={cx('time')}>
                    <p className={cx('left')}>Hiệu lực đến</p>
                    <p className={cx('right')}>{endDate}</p>
                  </div>
                </div>
                <div className={cx('pay-bill')}>
                  <div className={cx('price-bill')}>
                    <p className={cx('top')}>Tổng thanh toán:</p>
                    <p className={cx('bottom')}>
                      {parseFloat(value).toLocaleString()} VNĐ
                    </p>
                  </div>

                  <button className={cx('btn')}>
                    {/* <span>THANH TOÁN</span> */}
                    <PayPalScriptProvider
                      options={{
                        'client-id':
                          'AQj4hWJh4I4BlberLgbdxysNBinX2F77M0ATvr9ziJOB7IBJ7K_yWlKYVAfHXvnx8gPcxOjejD7rjHJY',
                        components: 'buttons',
                        currency: 'VND',
                      }}
                    >
                      <PayPalButtons
                        style={{
                          layout: 'horizontal',
                          backgroundColor: 'black',
                          color: 'black',
                          shape: 'rect',
                          height: 32,
                          // label: 'paypal',
                        }}
                        forceReRender={[amount]}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: amount, // Sử dụng giá trị từ useState
                                },
                              },
                            ],
                          })
                        }}
                        onApprove={async (data, actions) => {
                          // Your code here after capture the order
                          // eslint-disable-next-line no-unused-vars
                          const order = await actions.order.capture()
                          // setUser(1)

                          checkout()
                        }}
                      />
                    </PayPalScriptProvider>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={cx('perimum-content', 'bg', 'active')}>
            <h5>
              Tài khoản của bạn là <p>HUTA MP3</p>
              <span> VIP </span>
            </h5>

            <h5>
              Bạn còn chần chờ gì mà khồng đăng nhập vào HUTA MP3 để trải nghiệm
              những bài hát tuyệt vời nhất
            </h5>
          </div>
        </>
      )}
    </div>
  )
}

export default Upgrade
