import classNames from 'classnames/bind'
import styles from './HeaderUpgrade.module.scss'
import images from '../../../assect/images'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function UpdateHeader() {
  // const url = 'http://localhost:8989/img/'
  // const [img, setImg] = useState()
  // useEffect(() => {
  //   const fetchApi = async () => {
  //     const res = await UserServices.isAuthen()

  //     setImg(res.user.img)
  //   }
  //   fetchApi()
  // }, [])
  return (
    <header className={cx('container')}>
      <div className={cx('logo')}>
        <Link to="#">
          <img className={cx('muzic-logo')} src={images.logo} alt="miuzzic" />
        </Link>
      </div>
      <div className={cx('account')}></div>
    </header>
  )
}

export default UpdateHeader
