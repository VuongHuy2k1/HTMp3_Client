import { useState, useEffect, Children } from 'react'
import * as UserServices from '../../service/userService'
import classNames from 'classnames/bind'
import styles from './Upgrade.module.scss'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const cx = classNames.bind(styles)
function Upgrade() {
  const url = 'http://localhost:8989/img/'
  const urlImg =
    'https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576'
  const [img, setImg] = useState()

  var d = new Date()
  const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`

  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months)

    return date
  }

  const [user, setUser] = useState({
    username: '',
  })
  const [num, setNum] = useState(0)
  useEffect(() => {
    const fetchApi = async () => {
      const res = await UserServices.isAuthen()
      setUser({
        username: res.username,
      })
      setImg(res.img)
    }
    fetchApi()
  }, [])
  const lable = [
    {
      id: 1,
      moth: 6,
      discount: '50%',
      nowPrice: '89,000 đ',
      oldPrice: '159,000 đ',
    },
    {
      id: 2,
      moth: 12,
      discount: '55%',
      nowPrice: '159,000 đ',
      oldPrice: '348,000 đ',
    },
    {
      id: 3,
      moth: 24,
      discount: '50%',
      nowPrice: '296,000 đ',
      oldPrice: '696,000 đ',
    },
  ]
  const [value, setValue] = useState(lable[0].nowPrice)
  const [endDate, setEndDate] = useState(
    `${d.getDate()}/${addMonths(
      d,
      lable[0].moth + 1,
    ).getMonth()}/${d.getFullYear()}`,
  )
  const pressValue = (price, index, moth) => {
    var a = new Date()
    const day = addMonths(a, moth + 1)

    setValue(price)
    setNum(index)
    setEndDate(`${day.getDate()}/${day.getMonth()}/${day.getFullYear()}`)
  }
  const method = lable.map((item, index) => {
    return (
      <label
        htmlFor={item.id}
        className={cx('detail-method', num === index ? 'active' : '')}
        key={index}
        value={item.nowPrice}
        onClick={() => pressValue(item.nowPrice, index, item.moth)}
      >
        <input
          type="radio"
          id={item.id}
          value={item.nowPrice}
          className={cx('radio')}
          name="method"
          checked={num === index ? 'checked' : ''}
        ></input>

        <div htmlFor={item.id} className={cx('content-method')}>
          <p className={cx('moth')}>{item.moth} tháng</p>

          <div className={cx('price')}>
            <p className={cx('now-price')}>{item.nowPrice}</p>
            <p className={cx('discount')}>Tiết kiệm {item.discount}</p>
          </div>
          <div className={cx('old-price')}>
            <p>{item.oldPrice}</p>
          </div>
        </div>
      </label>
    )
  })
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content-upgrade')}>
        <p></p>
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
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
                <p className={cx('bottom')}>{value}</p>
              </div>

              <button className={cx('btn')}>
                {/* <span>THANH TOÁN</span> */}
                <PayPalScriptProvider
                  options={{
                    'client-id':
                      'AXTOaR6OCHfijwi0qJls01wC2jNmkJ2pvxetundj6DFsvUwLWRsmrNEExPfuaeyKfCwEzpSQI41uneUF',
                    components: 'buttons',
                    currency: 'USD',
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: 'horizontal',
                      color: 'black',
                      shape: 'rect',
                      height: 32,
                      label: 'paypal',
                    }}
                    createOrder={async (data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: value,
                            },
                          },
                        ],
                      })
                    }}
                    onApprove={async (data, actions) => {
                      //
                      const order = await actions.order.capture()
                    }}
                  />
                </PayPalScriptProvider>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upgrade