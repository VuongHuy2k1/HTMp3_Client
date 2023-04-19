import classNames from 'classnames/bind'
import styles from './Account.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as UserService from '../../service/userService'
import Message from '../../components/Message'
const cx = classNames.bind(styles)
function EditLayout() {
  const [user, setUser] = useState({
    email: '',
    name: '',
    image: '',
    gender: '',
    dateOfBirth: '',
    nation: '',
  })

  const [message, setMessage] = useState(false)
  useEffect(() => {
    const fetchApi = async () => {
      const res = await UserService.isAuthen()

      setUser({
        name: res.user.name,
        email: res.user.email,

        gender: res.user.gender,
        dateOfBirth: res.user.dateOfBirth,
        nation: res.user.nation,
      })
    }
    fetchApi()
  }, [])

  const navigate = useNavigate()

  const handleChangeFile = (e) => {
    const file = e.target.files[0]

    file.preview = URL.createObjectURL(file)
    setUser({ image: file })
  }
  const onChange = (e) => {
    e.preventDefault()
    const newUser = { ...user }
    newUser[e.target.name] = e.target.value
    setUser(newUser)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const variable = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      nation: user.nation,
    }
    const formdata = new FormData()
    formdata.append('image', user.image)

    UserService.updateInfo(formdata)
    UserService.updateInfo(variable)
    setMessage({
      msgBody: 'Cập nhật thành công',
      msgError: false,
    })
    const timerReload = setTimeout(() => {
      clearTimeout(timerLoading)

      window.location.reload()
    }, 2001)
    const timerLoading = setTimeout(() => {
      clearTimeout(timerLoading)
      navigate('/account/infor')
    }, 2000)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <h1>Chỉnh sửa hồ sơ</h1>
      </div>
      <div className={cx('content')}>
        {message ? <Message message={message} /> : null}
        <form
          className={cx('post-edit')}
          onSubmit={onSubmit}
          name="sentMessage"
          noValidate="noValidate"
        >
          <div className={cx('main-form')}>
            <div className={cx('group-main')}>
              <div className={cx('title-group')}>
                <label for="" className={cx('label-title')}>
                  <span>Tên</span>
                </label>
              </div>
              <input
                className={cx('input-value')}
                type="text"
                name="name"
                value={user.name}
                onChange={onChange}
              ></input>
            </div>
            <div className={cx('group-main')}>
              <div className={cx('title-group')}>
                <label for="" className={cx('label-title')}>
                  <span>Email</span>
                </label>
              </div>
              <input
                className={cx('input-value')}
                type="email"
                name="email"
                value={user.email}
                onChange={onChange}
              ></input>
            </div>
            <div className={cx('group-main')}>
              <div className={cx('title-group')}>
                <label for="" className={cx('label-title')} type="text">
                  <span>Giới tính</span>
                </label>
              </div>
              <div class={cx('select-sex')}>
                <select
                  class={cx('select-opiton')}
                  name="gender"
                  value={user.gender}
                  onChange={onChange}
                >
                  <option disabled="" value="không chọn">
                    - không chọn -
                  </option>
                  <option value="trung lập">Giới tính trung lập</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Nam">Nam</option>
                </select>
                <svg
                  role="img"
                  height="16"
                  width="16"
                  aria-hidden="true"
                  class="Svg-sc-1bi12j5-0 EQkJl SelectArrow-sc-12qvh0d-0 igsFfm"
                  viewBox="0 0 16 16"
                >
                  <path d="M.47 4.97a.75.75 0 011.06 0L8 11.44l6.47-6.47a.75.75 0 111.06 1.06L8 13.56.47 6.03a.75.75 0 010-1.06z"></path>
                </svg>
              </div>{' '}
            </div>
            <div className={cx('group-main')}>
              <div className={cx('title-group')}>
                <label for="" className={cx('label-title')} type="text">
                  <span>Ngày sinh</span>
                </label>
              </div>
              <div className={cx('labels-inputs')}>
                <div className={cx('pad-rig')}>
                  <label for="dob-date" class={cx('lable-1')}>
                    Date
                  </label>
                  <input
                    required=""
                    type="date"
                    id="dob-date"
                    disabled=""
                    name="dateOfBirth"
                    value={user.dateOfBirth}
                    onChange={onChange}
                    class={cx('input-birthday')}
                  ></input>
                </div>
              </div>
            </div>
            <div className={cx('group-main')}>
              <div className={cx('title-group')}>
                <label for="" className={cx('label-title')}>
                  <span>Quốc gia</span>
                </label>
              </div>
              <input
                className={cx('input-value')}
                type="text"
                name="nation"
                value={user.nation}
                onChange={onChange}
              ></input>
            </div>
            <div className={cx('group-main')}>
              <div className={cx('title-group')}>
                <label for="" className={cx('label-title')}>
                  <span>Đổi ảnh đại diện</span>
                </label>
              </div>
              <input
                className={cx('input-value')}
                type="file"
                name="image"
                onChange={handleChangeFile}
                required
              ></input>
            </div>
          </div>
          <div className={cx('btn-form')}>
            <Link to="/account/infor" class={cx('btn-remove')}>
              Hủy
            </Link>
            <button type="submit" class={cx('btn-submit')}>
              <div class={cx('btn-submit-title')}>Lưu hồ sơ</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditLayout
