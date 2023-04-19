import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { connect, useDispatch } from "react-redux";
import { changePlaylist } from "../../../actions";
import Wrapper from "../Wrapper";
import styles from "./List.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import * as PlayListService from "../../../service/playListService";
import * as UserServices from "../../../service/userService";
const cx = classNames.bind(styles);

function List({ changePlaylist, userPlaylist, songAdd }) {
  const [playList, setPlayList] = useState();
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = UserServices.isLog();

  const addSong = async (a, b) => {
    const response = await PlayListService.addSong(a, b);
  };

  const ListTag = userPlaylist.map((playList) => {
    const addClick = () => {
      addSong(playList._id, songAdd._id);
      const timerId = setTimeout(() => {
        clearTimeout(timerId);

        setShowList(false);
      }, 100);
    };

    if (isAuthenticated === true) {
      return (
        <li className={cx("menu-item")} onClick={addClick}>
          {playList.name}
        </li>
      );
    } else {
      return <></>;
    }
  });

  const renderResult = (attrs) => (
    <div className={cx("menu-list", "scroll")} tabIndex="-1" {...attrs}>
      <Wrapper className={cx("menu-popper")}>
        <ul className={cx("menu-body")}>{ListTag}</ul>
      </Wrapper>
    </div>
  );

  // Reset to first page

  return (
    <Tippy
      interactive
      visible={showList}
      placement="bottom-end"
      render={renderResult}
    >
      <div class={cx("hover-like-icon")}>
        <FontAwesomeIcon
          className={cx("icon-li")}
          icon={faPlus}
          onClick={() => {
            setShowList(true);
          }}
          onDoubleClick={() => {
            setShowList(false);
          }}
        />
      </div>
    </Tippy>
  );
}

const mapStateToProps = (state) => {
  return {
    focus: state.focus,
    userPlaylist: state.userPlaylist,
    selectedSongPlay: state.selectedSongPlay,
    songAdd: state.songAdd,
  };
};

export default connect(mapStateToProps, { changePlaylist })(List);
