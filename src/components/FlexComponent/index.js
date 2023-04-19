import { connect } from "react-redux";
import classNames from "classnames/bind";
import styles from "./FlexComponent.module.scss";
import {
  selectSongByAlbum,
  setStatus,
  setFocus,
  changePlaylist,
} from "../../actions";
import { useEffect, useState } from "react";
import * as UserService from "../../service/userService";
import * as PlayListService from "../../service/playListService";
import Message from "../Message";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
const FlexComponet = ({
  selectedSongList,
  setStatus,
  status,
  focus,
  setFocus,
  changePlaylist,
  userPlaylist,
  playlistId,
}) => {
  const value = UserService.isLog();
  const id_block = status === true ? "block-actie" : "";
  const id_focus = focus === 1 ? "block-actie" : "";
  const id_focus_change = focus === 2 ? "block-actie" : "";
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [playList, setPlayList] = useState({
    name: "",
    image: "",
  });
  const url = "http://localhost:8989/img/";
  useEffect(() => {
    const fetchApi = async () => {
      const response = await PlayListService.getPlayList();
      changePlaylist(response);
    };
    fetchApi();
  }, []);
  const fepi = async () => {
    const response = await PlayListService.getPlayList();
    changePlaylist(response);
  };

  const onChange = (e) => {
    e.preventDefault();
    const newUser = { ...playList };
    newUser[e.target.name] = e.target.value;
    setPlayList(newUser);
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setPlayList({ image: file });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const valu = {
      name: playList.name,
    };

    if (playList.name !== undefined) {
      PlayListService.createPlayList(valu);

      const timerId = setTimeout(() => {
        fepi();
        clearTimeout(timerId);
        setLoading(true);
        setMessage({
          msgBody: "Tạo danh sách phát thành công",
          msgError: false,
        });
      }, 500);
      const timerLoading = setTimeout(() => {
        clearTimeout(timerLoading);
        setFocus(false);
        setLoading(false);
      }, 2000);
    } else {
      setMessage({
        msgBody: "Xin nhập tên danh sách",
        msgError: true,
      });
    }
  };

  const onChangeSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", playList.image);
    formdata.append("name", playList.name);
    PlayListService.changePlayList(playlistId._id, formdata);

    const timerId = setTimeout(() => {
      fepi();
      clearTimeout(timerId);
      setLoading(true);
      setMessage({
        msgBody: "Cập nhật  danh sách phát thành công",
        msgError: false,
      });
    }, 500);
    const timerLoading = setTimeout(() => {
      clearTimeout(timerLoading);
      setFocus(false);

      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {!value ? (
        <>
          <div className={cx("block")} id={cx(id_block)}>
            <div className={cx("block-container")}>
              <div className={cx("content")}>
                <div className={cx("img-content")}>
                  <img src="https://i.scdn.co/image/ab67706f00000002a1c5958b0e50ec08114db10f"></img>
                </div>
                <div className={cx("text-content")}>
                  <h2>Bắt đầu nghe bằng tài khoản miễn phí</h2>
                  <Link to="/user/register" className={cx("btn-signup")}>
                    Đăng ký Free
                  </Link>
                  <p className={cx("title")}>
                    Bạn đã có tài khoản?
                    <Link to="/user/login" className={cx("btn-login")}>
                      Đăng nhập
                    </Link>
                  </p>
                </div>
              </div>
              <div
                className={cx("btn-remove")}
                onClick={() => {
                  setStatus(false);
                }}
              >
                X
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={cx("block")} id={cx(id_focus)}>
            <div className={cx("list-container")}>
              <div className={cx("content")}>
                <div className={cx("img-content")}>
                  {playList.image.preview === undefined ? (
                    <>
                      <img src="https://media.proprofs.com/images/QM/user_images/2734691/1589295044.gif"></img>
                    </>
                  ) : (
                    <>
                      <img src={playList.image.preview}></img>
                    </>
                  )}
                </div>
                <div className={cx("text-content")}>
                  <h2>Tạo danh sách phát cho riêng bạn</h2>
                  <form
                    className={cx("post-form")}
                    name="crete_playlist"
                    noValidate="noValidate"
                    onSubmit={onSubmit}
                  >
                    <div className={cx("group-main")}>
                      <div className={cx("group-main")}>
                        <div className={cx("title-group")}>
                          <label for="" className={cx("label-title-list")}>
                            <span>Tên danh sách </span>
                          </label>
                        </div>
                        <input
                          className={cx("input-value")}
                          type="text"
                          placeholder="Từ 3 dến 16 ký tự"
                          name="name"
                          autoFocus={true}
                          value={playList.name}
                          onChange={onChange}
                        ></input>
                      </div>
                    </div>

                    <div className={cx("btn-form")}>
                      <button type="submit" class={cx("btn-submit")}>
                        <div class={cx("btn-submit-title")}>Lưu danh sách</div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className={cx("btn-remove")}
                onClick={() => {
                  setFocus(false);
                }}
              >
                X
              </div>
            </div>
            {loading ? (
              <>
                <div className={cx("mess")}>
                  <Message message={message} />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className={cx("block")} id={cx(id_focus_change)}>
            <div className={cx("list-container")}>
              <div className={cx("content")}>
                <div className={cx("img-content")}>
                  {playList.image.preview === undefined ? (
                    <>
                      {playlistId.img === undefined ? (
                        <>
                          <img src="https://media.proprofs.com/images/QM/user_images/2734691/1589295044.gif"></img>
                        </>
                      ) : (
                        <>
                          <img src={url + playlistId.img}></img>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <img src={playList.image.preview}></img>
                    </>
                  )}
                </div>
                <div className={cx("text-content")}>
                  <h2>Sửa thông tin</h2>
                  <form
                    className={cx("post-form")}
                    name="crete_playlist"
                    noValidate="noValidate"
                    onSubmit={onChangeSubmit}
                  >
                    <div className={cx("group-main")}>
                      <div className={cx("group-main")}>
                        <div className={cx("title-group")}>
                          <label for="" className={cx("label-title-list")}>
                            <span>Tên danh sách </span>
                          </label>
                        </div>
                        <input
                          className={cx("input-value")}
                          type="text"
                          name="name"
                          placeholder={playlistId.name}
                          value={
                            playList.name === undefined
                              ? playlistId.name
                              : playList.name
                          }
                          onChange={onChange}
                        ></input>
                      </div>
                    </div>

                    <div className={cx("group-main")}>
                      <div className={cx("title-group")}>
                        <label for="" className={cx("label-title-list")}>
                          <span>Chọn ảnh</span>
                        </label>
                      </div>
                      <input
                        className={cx("input-value")}
                        accept="image/*"
                        type="file"
                        name="image"
                        onChange={onChangeImage}
                        required
                      ></input>
                    </div>
                    <div className={cx("btn-form")}>
                      <button type="submit" class={cx("btn-submit")}>
                        <div class={cx("btn-submit-title")}>Thay đổi</div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className={cx("btn-remove")}
                onClick={() => {
                  setFocus(false);
                }}
              >
                X
              </div>
            </div>
            {loading ? (
              <>
                <div className={cx("mess")}>
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
  );
};

const mapStateToProps = (state) => {
  return {
    selectedSongList: state.selectedSongList,
    focus: state.focus,
    status: state.status,
    userPlaylist: state.userPlaylist,
    playlistId: state.playlistId,
  };
};

export default connect(mapStateToProps, {
  selectSongByAlbum,
  setStatus,
  setFocus,
  changePlaylist,
})(FlexComponet);
