import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import styles from './FlexComponent.module.scss'
import { setStatus, setFocus, changePlaylist } from '../../actions'
import { useEffect, useState } from 'react'
import * as UserService from '../../service/userService'
import * as PlayListService from '../../service/playListService'
import Message from '../Message'
import { Link } from 'react-router-dom'
import images from '../../assect/images'
const cx = classNames.bind(styles)
const FlexComponet = ({
  setStatus,
  status,
  focus,
  setFocus,
  changePlaylist,
  playlistId,
}) => {
  const value = UserService.isLog()
  const id_block = status === true ? 'block-actie' : ''
  const id_focus = focus === 1 ? 'block-actie' : ''
  const id_focus_change = focus === 2 ? 'block-actie' : ''

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const [playList, setPlayList] = useState({
    name: '',
    image: '',
  })
  const url = 'http://localhost:8989/img/'
  useEffect(() => {
    const fetchApi = async () => {
      const response = await PlayListService.getPlayList()

      changePlaylist(response)
    }
    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fepi = async () => {
    const response = await PlayListService.getPlayList()
    changePlaylist(response)
  }

  const onChange = (e) => {
    e.preventDefault()
    const newUser = { ...playList }
    newUser[e.target.name] = e.target.value
    setPlayList(newUser)
  }

  // eslint-disable-next-line no-unused-vars
  const onChangeImage = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setPlayList({ image: file })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const valu = {
      name: playList.name,
    }

    if (playList.name !== undefined) {
      PlayListService.createPlayList(valu)

      const timerId = setTimeout(() => {
        fepi()
        clearTimeout(timerId)
        setLoading(true)
        setMessage({
          msgBody: 'Tạo danh sách phát thành công',
          msgError: false,
        })
      }, 500)
      const timerLoading = setTimeout(() => {
        clearTimeout(timerLoading)
        setFocus(false)
        setLoading(false)
      }, 2000)
    } else {
      setMessage({
        msgBody: 'Xin nhập tên danh sách',
        msgError: true,
      })
    }
  }

  const onChangeSubmit = (e) => {
    e.preventDefault()

    const formdata = new FormData()

    formdata.append('name', playList.name)
    PlayListService.changePlayList(playlistId._id, formdata)

    const timerId = setTimeout(() => {
      fepi()
      clearTimeout(timerId)
      setLoading(true)
      setMessage({
        msgBody: 'Cập nhật  danh sách phát thành công',
        msgError: false,
      })
    }, 500)
    const timerLoading = setTimeout(() => {
      clearTimeout(timerLoading)
      setFocus(false)

      setLoading(false)
    }, 2000)
  }

  return (
    <>
      {!value ? (
        <>
          <div className={cx('block')} id={cx(id_block)}>
            <div className={cx('block-container')}>
              <div className={cx('content')}>
                <div className={cx('img-content')}>
                  <img src={images.logoBlack} alt=""></img>
                </div>
                <div className={cx('text-content')}>
                  <h2>Bắt đầu nghe bằng tài khoản miễn phí</h2>
                  <Link to="/user/register" className={cx('btn-signup')}>
                    Đăng ký Free
                  </Link>
                  <p className={cx('title')}>
                    Bạn đã có tài khoản?
                    <Link to="/user/login" className={cx('btn-login')}>
                      Đăng nhập
                    </Link>
                  </p>
                </div>
              </div>
              <div
                className={cx('btn-remove')}
                onClick={() => {
                  setStatus(false)
                }}
              >
                X
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={cx('block')} id={cx(id_focus)}>
            <div className={cx('list-container')}>
              <div className={cx('content')}>
                <div className={cx('img-content')}>
                  {playList.image.preview === undefined ? (
                    <>
                      <img
                        alt=""
                        src="https://media.proprofs.com/images/QM/user_images/2734691/1589295044.gif"
                      ></img>
                    </>
                  ) : (
                    <>
                      <img alt="" src={playList.image.preview}></img>
                    </>
                  )}
                </div>
                <div className={cx('text-content')}>
                  <h2>Tạo danh sách phát cho riêng bạn</h2>
                  <form
                    className={cx('post-form')}
                    name="crete_playlist"
                    onSubmit={onSubmit}
                  >
                    <div className={cx('group-main')}>
                      <div className={cx('group-main')}>
                        <div className={cx('title-group')}>
                          <label
                            htmlFor="name"
                            className={cx('label-title-list')}
                          >
                            <span>Tên danh sách </span>
                          </label>
                        </div>
                        <input
                          className={cx('input-value')}
                          type="text"
                          placeholder="Từ 3 dến 16 ký tự"
                          name="name"
                          autoFocus={true}
                          value={playList.name}
                          onChange={onChange}
                          id="name"
                          required
                        ></input>
                      </div>
                    </div>

                    <div className={cx('btn-form')}>
                      <button type="submit" className={cx('btn-submit')}>
                        <div className={cx('btn-submit-title')}>
                          Lưu danh sách
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className={cx('btn-remove')}
                onClick={() => {
                  setFocus(false)
                }}
              >
                X
              </div>
            </div>
            {loading ? (
              <>
                <div className={cx('mess')}>
                  <Message message={message} />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className={cx('block')} id={cx(id_focus_change)}>
            <div className={cx('list-container')}>
              <div className={cx('content')}>
                <div className={cx('img-content')}>
                  {playList.image.preview === undefined ? (
                    <>
                      {playlistId.img === undefined ? (
                        <>
                          <img
                            alt=""
                            src="https://media.proprofs.com/images/QM/user_images/2734691/1589295044.gif"
                          ></img>
                        </>
                      ) : (
                        <>
                          <img alt="" src={url + playlistId.img}></img>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <img alt="" src={playList.image.preview}></img>
                    </>
                  )}
                </div>
                <div className={cx('text-content')}>
                  <h2>Sửa thông tin danh sách phát </h2>
                  <form
                    className={cx('post-form')}
                    name="crete_playlist"
                    onSubmit={onChangeSubmit}
                  >
                    <div className={cx('group-main')}>
                      <div className={cx('group-main')}>
                        <div className={cx('title-group')}>
                          <label
                            htmlFor="name-list"
                            className={cx('label-title-list')}
                          >
                            <span>Tên danh sách </span>
                          </label>
                        </div>
                        <input
                          className={cx('input-value')}
                          id="name-list"
                          type="text"
                          name="name"
                          placeholder={playlistId.name}
                          value={
                            playList.name === undefined
                              ? playlistId.name
                              : playList.name
                          }
                          onChange={onChange}
                          required
                        ></input>
                      </div>
                    </div>

                    <div className={cx('btn-form')}>
                      <button type="submit" className={cx('btn-submit')}>
                        <div className={cx('btn-submit-title')}>Thay đổi</div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className={cx('btn-remove')}
                onClick={() => {
                  setFocus(false)
                }}
              >
                X
              </div>
            </div>
            {loading ? (
              <>
                <div className={cx('mess')}>
                  <Message message={message} />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedSongList: state.selectedSongList,
    focus: state.focus,
    status: state.status,
    userPlaylist: state.userPlaylist,
    playlistId: state.playlistId,
  }
}

export default connect(mapStateToProps, {
  setStatus,
  setFocus,
  changePlaylist,
})(FlexComponet)
